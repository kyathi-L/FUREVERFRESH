// controllers/productsController.js

const Product = require("../models/products");

const updateProductStock = async (req, res) => {
  try {
    const { cartItems } = req.body; // Array of { name, quantity }

    for (const item of cartItems) {
      const product = await Product.findOne({ name: item.name });

      if (!product) {
        return res.status(404).json({ message: `Product ${item.name} not found` });
      }

      if (product.availableQuantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${item.name}. Available: ${product.availableQuantity}`,
        });
      }

      // Deduct purchased quantity
      product.availableQuantity -= item.quantity;
      await product.save();
    }

    res.status(200).json({ message: "Stock updated after purchase" });
  } catch (err) {
    console.error("Error updating stock:", err);
    res.status(500).json({ message: "Stock update failed", error: err.message });
  }
};

module.exports = {
  updateProductStock,
};
