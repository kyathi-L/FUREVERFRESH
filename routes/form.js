const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure path is correct

// Get user details by email
router.get('/get-form-user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send only necessary fields
    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    console.error('❌ Error fetching user:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
