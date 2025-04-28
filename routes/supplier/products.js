const express = require("express");
const router = express.Router();
const Product = require("../../models/products"); // Assuming you already have this model

// Get all products
router.get("/", async (req, res) => {
  const { supplierId } = req.query;
  try {
    const products = await Product.find({ supplier: supplierId });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Add a product
router.post("/", async (req, res) => {
  const { name, img, quantity, cost,availableQuantity, supplierId } = req.body;
  try {
    const newProduct = new Product({
      name,
      img,
      quantity,
      availableQuantity,
      cost,
      supplier: supplierId
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product" });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

module.exports = router;
