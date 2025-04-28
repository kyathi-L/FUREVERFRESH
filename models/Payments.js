const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  cost: Number
});

const paymentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  cartItems: [cartItemSchema],
  totalAmount: Number,
  status: {
    type: String,
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Payment", paymentSchema, "payments");
