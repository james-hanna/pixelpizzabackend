const db = require("../../config/database");

// Get all Pizzas
exports.getAllPizzas = async (req, res, next) => {
  try {
    const pizzas = await db.any("SELECT * FROM pizza");
    res.json(pizzas);
  } catch (error) {
    next(error);
  }
};
