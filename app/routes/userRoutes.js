const express = require("express");
const authentication = require("../middlewares/authentication");
const userController = require("../controllers/userController");

const router = express.Router();

// Get all users
router.get("/", userController.getAllUsers);

// Get a specific user
router.get("/:id", userController.getUserById);

// Create a new user
router.post("/register", userController.registerUser);

// Update a user
router.put("/:id", authentication, userController.updateUser);

// Delete a user
router.delete("/:id", authentication, userController.deleteUser);

// User login
router.post("/login", userController.login);

module.exports = router;
