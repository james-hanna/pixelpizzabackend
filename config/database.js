const pgp = require("pg-promise")();
require("dotenv").config();

// Database configuration object
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

// Create a new database connection
const connectionString = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
const db = pgp(connectionString);

module.exports = db;
