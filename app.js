// Required packages
const express = require("express");
const app = express();
const port = 5432;

// Middleware to parse JSON
app.use(express.json());

// Import routes
const userRoutes = require("./app/routes/userRoutes");
const authRoutes = require("./app/routes/authRoutes");

// Use routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
