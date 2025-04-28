const express = require("express");
const router = express.Router();
const path = require("path");
console.log("Path to Payment:", path.resolve(__dirname, "../models/Payment"));
const Payment = require("../models/Payments"); // Note the 's'

// Save Checkout
router.post("/checkout", async (req, res) => {
  try {
    const { name, email, phone, cartItems } = req.body;

    console.log("🛒 Received checkout request:", { name, email, phone, cartItems });

    // Basic validation
    if (!name || !email || !phone || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Missing or invalid fields in the request." });
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce((sum, item) => {
      const itemTotal = item.cost * item.quantity;
      return sum + itemTotal;
    }, 0);

    // Create a new payment document
    const payment = new Payment({
      name,
      email,
      phone,
      cartItems,
      totalAmount,
      status: "Pending",
    });

    // Save to database
    await payment.save();

    console.log("✅ Payment record saved:", payment);

    res.status(201).json({ message: "Checkout successful", paymentId: payment._id });
  } catch (err) {
    console.error("❌ Checkout Error:", err);
    res.status(500).json({ error: "An error occurred during checkout. Please try again later." });
  }
});


router.get("/checkout/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.json({ payment });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
