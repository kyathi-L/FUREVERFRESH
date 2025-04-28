const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, default: "" },
  quantity: { type: String, required: true },
  cost: { type: Number, required: true },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true
  },
  availableQuantity: {
    type: Number,
    required: true,
    default: 0 // initial stock
  }
});

// ✅ Check if the model is already compiled
const Product = mongoose.models.Product || mongoose.model("Product", productSchema, "products");

module.exports = Product;
