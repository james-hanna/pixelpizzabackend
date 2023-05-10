const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: "Authorization token not provided" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the user ID to the request object
    req.userId = decoded.userId;

    // Proceed to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authentication;
