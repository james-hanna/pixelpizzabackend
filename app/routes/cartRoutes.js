const express = require("express");
const cartController = require("../controllers/cartController");
const authentication = require("../middlewares/authentication");

const router = express.Router();

// Add item to cart
router.post("/", authentication, cartController.addToCart);

// Remove item from cart
router.delete("/:id", authentication, cartController.removeFromCart);

// Update item quantity in cart
router.put("/:id", authentication, cartController.updateCartItemQuantity);

// Get cart items for a user
router.get("/", authentication, cartController.getCartItems);

module.exports = router;
