const db = require("../../config/database");

// Add an item to the cart
exports.addToCart = async (req, res, next) => {
  try {
    const { userId } = req;
    const { productId, quantity } = req.body;

    // Check if the user already has the product in their cart
    const existingCartItem = await db.oneOrNone(
      "SELECT * FROM cart WHERE user_id = $1 AND product_id = $2",
      [userId, productId]
    );

    if (existingCartItem) {
      // If the product already exists in the cart, update the quantity
      await db.none(
        "UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3",
        [quantity, userId, productId]
      );
    } else {
      // If the product doesn't exist in the cart, add a new entry
      await db.none(
        "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)",
        [userId, productId, quantity]
      );
    }

    res.json({ message: "Item added to cart successfully" });
  } catch (error) {
    next(error);
  }
};

// Get the items in the cart for a user
exports.getCartItems = async (req, res, next) => {
  try {
    const { userId } = req;

    const cartItems = await db.any(
      "SELECT c.quantity, p.id as product_id, p.name, p.price FROM cart c INNER JOIN pizza p ON c.product_id = p.id WHERE c.user_id = $1",
      [userId]
    );

    res.json(cartItems);
  } catch (error) {
    console.log("req.header:", req.header);
    next(error);
  }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res, next) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    // Remove the item from the cart
    await db.none("DELETE FROM cart WHERE user_id = $1 AND product_id = $2", [
      userId,
      id,
    ]);

    res.json({ message: "Item removed from cart successfully" });
  } catch (error) {
    next(error);
  }
};

// Update the quantity of an item in the cart
exports.updateCartItemQuantity = async (req, res, next) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const { quantity } = req.body;

    await db.none(
      "UPDATE cart SET quantity = $1 WHERE user_id = $2 AND product_id = $3",
      [quantity, userId, id]
    );

    res.json({ message: "Cart item quantity updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Clear the entire cart for a user
exports.clearCart = async (req, res, next) => {
  try {
    const { userId } = req;

    // Clear the cart for the user
    await db.none("DELETE FROM cart WHERE user_id = $1", [userId]);

    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    next(error);
  }
};
