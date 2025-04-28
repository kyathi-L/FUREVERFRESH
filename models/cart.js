const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    name: String,
    email: String,
    phone: String
  },
  cartItems: [
    {
      name: String,
      quantity: Number,
      cost: Number
    }
  ],
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
