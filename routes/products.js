const express = require("express");
const router = express.Router();
const Product = require("../models/products"); // ✅ corrected model path
const { updateProductStock } = require("../controllers/productsController"); // ✅ controller

// Example route (can remove if unnecessary)
router.get("/products", (req, res) => {
  res.json({ message: "Products list will go here" });
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Failed to fetch products:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// PATCH: Restock a product (Supplier only)
router.patch("/restock/:id", async (req, res) => {
  try {
    const { quantity } = req.body;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { availableQuantity: quantity } }, // ✅ restocking updates availableQuantity
      { new: true }
    );

    res.status(200).json({ message: "Product restocked!", product: updated });
  } catch (err) {
    console.error("Restock error:", err);
    res.status(500).json({ message: "Failed to restock", error: err.message });
  }
});

// PATCH: Update product stock after sale (Frontend will call this)
router.patch("/update-stock", updateProductStock); // ✅ stock update on purchase

module.exports = router;
