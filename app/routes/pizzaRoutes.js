const express = require("express");
const pizzaController = require("../controllers/pizzaController");

const router = express.Router();

// Get all Pizzas
router.get("/", pizzaController.getAllPizzas);

module.exports = router;
