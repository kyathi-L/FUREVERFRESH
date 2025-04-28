// In your server.js or routes/service.js file
const express = require('express');
const router = express.Router();
const Service = require('../models/ServiceData');  // Assuming the model is Service.js and points to the 'servicedatas' collection

// Fetch all services from the 'servicedatas' collection
router.get('/api/servicedatas', async (req, res) => {
  try {
    const services = await Service.find(); // Fetch data from servicedatas collection
    res.json(services);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ message: "Error fetching services" });
  }
});

module.exports = router;
