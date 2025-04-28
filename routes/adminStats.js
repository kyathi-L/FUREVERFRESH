const express = require('express');
const router = express.Router();

// Import models
const User = require('../models/User');
const Supplier = require('../models/Supplier');
const Product = require('../models/products');
const AdoptedPet = require('../models/AdoptedPet');
const BookedService = require('../models/BookedService');

// Route to get statistics
router.get('/stats', async (req, res) => {
  try {
    // Get total counts for each collection
    const totalUsers = await User.countDocuments();
    const totalSuppliers = await Supplier.countDocuments();
    const totalBookedProducts = await Product.countDocuments({ booked: true }); // Adjust 'booked' field as per your schema
    const totalAdoptedPets = await AdoptedPet.countDocuments();
    const totalBookedServices = await BookedService.countDocuments();

    // Send the counts as a response
    res.json({
      totalUsers,
      totalSuppliers,
      totalBookedProducts,
      totalAdoptedPets,
      totalBookedServices,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Server error while fetching statistics' });
  }
});

module.exports = router;
