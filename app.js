// Required packages
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

// Middleware to parse JSON
app.use(express.json());

//enable CORS
app.use(cors());

// Import routes
const userRoutes = require("./app/routes/userRoutes");
const pizzaRoutes = require("./app/routes/pizzaRoutes");

// Use routes
app.use("/users", userRoutes);
app.use("/pizza", pizzaRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
