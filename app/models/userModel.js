const db = require("../config/database");

// Create a new user
async function createUser(username, email, password) {
  const query =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id";
  const values = [username, email, password];

  const result = await db.one(query, values);
  return result.id;
}

// Find a user by their username
async function findUserByUsername(username) {
  const query = "SELECT * FROM users WHERE username = $1";
  const values = [username];

  const user = await db.oneOrNone(query, values);
  return user;
}

// Find a user by their email
async function findUserByEmail(email) {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  const user = await db.oneOrNone(query, values);
  return user;
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserByEmail,
};
