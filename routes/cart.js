const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

// POST /add-to-cart
router.post("/add-to-cart", async (req, res) => {
  const { name, email, phone, cartItems } = req.body;

  try {
    let cart = await Cart.findOne({ "user.email": email });

    if (cart) {
      cart.cartItems = cartItems; // update cart
    } else {
      cart = new Cart({
        user: { name, email, phone },
        cartItems
      });
    }

    await cart.save();
    res.status(200).json({ message: "Cart saved successfully" });
  } catch (error) {
    console.error("Error saving cart:", error);
    res.status(500).json({ error: "Failed to save cart" });
  }
});



module.exports = router;
