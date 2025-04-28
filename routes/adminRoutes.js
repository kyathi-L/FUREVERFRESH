const express = require("express");
const router = express.Router();

const BookedService = require("../models/BookedService");
const AdoptedPet = require("../models/AdoptedPet");
const Cart = require("../models/cart"); // Assuming products are stored here

// GET /api/admin/stats - Admin dashboard statistics
router.get("/admin/stats", async (req, res) => {
  try {
    const [serviceCount, productCount, petCount] = await Promise.all([
      BookedService.countDocuments(),
      Cart.countDocuments(),
      AdoptedPet.countDocuments()
    ]);

    const recentServices = await BookedService.find().sort({ createdAt: -1 }).limit(5);
    const recentProducts = await Cart.find().sort({ createdAt: -1 }).limit(5);
    const recentAdoptions = await AdoptedPet.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      serviceCount,
      productCount,
      petCount,
      recentActivity: {
        services: recentServices,
        products: recentProducts,
        adoptions: recentAdoptions
      }
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Failed to fetch admin stats", error });
  }
});

module.exports = router;
