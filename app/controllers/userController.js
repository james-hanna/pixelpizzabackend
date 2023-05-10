const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../config/database");
const validation = require("../middlewares/validation");
const { loginSchema, registerSchema } = require("../middlewares/validation");

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await db.any("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// User registration
exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate the input data
    const { error, value } = validation.validate(req.body, registerSchema);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if username or email already exists in the database
    const existingUser = await db.oneOrNone(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    await db.none(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

// Get a specific user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await db.one("SELECT * FROM users WHERE id = $1", [id]);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Update a user
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    // Validate the input data
    const { error, value } = validation.validate(req.body, registerSchema);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user in the database
    await db.none(
      "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4",
      [username, email, hashedPassword, id]
    );

    res.json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete the user from the database
    await db.none("DELETE FROM users WHERE id = $1", [id]);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    // Validate the login request data
    const { error, value } = validation.validate(req.body, loginSchema);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Retrieve the username and password from the request body
    const { username, password } = value;

    // Check if the user exists
    const user = await db.oneOrNone("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the token to the client
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
