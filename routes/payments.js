const express = require("express");
const router = express.Router();
const Payment = require("../models/Payments");
const Product = require("../models/products");

// GET all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

// PUT update payment status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Payment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update payment status" });
  }
});

// DELETE payment
router.delete("/:id", async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: "Payment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete payment" });
  }
});

router.post("/payment", async (req, res) => {
  try {
    const { name, email, phone, cartItems, totalAmount } = req.body;
    // Step 1: Check stock availability for each cart item
    for (let item of cartItems) {
      const product = await Product.findOne({ name: item.name });

      if (!product) {
        return res.status(404).json({ message: `Product ${item.name} not found` });
      }
      if (product.availableQuantity < item.quantity) {
        return res.status(400).json({ message: `Product ${item.name} is not available in requested quantity` });
      }
    }
    // Step 2: All items are available, proceed to reduce quantity
    for (let item of cartItems) {
      await Product.updateOne(
        { name: item.name },
        { $inc: { availableQuantity: -item.quantity } }
      );
    }
    // Step 3: Save payment info
    const payment = new Payment({
      name,
      email,
      phone,
      cartItems,
      totalAmount,
      status: "Success"
    });
    await payment.save();
    res.status(200).json({ message: "Payment successful", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment failed", error: err.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const payments = await Payment.find({ email: req.params.userId });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user payments" });
  }
});


module.exports = router;
