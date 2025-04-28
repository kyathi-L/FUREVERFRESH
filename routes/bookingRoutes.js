const express = require('express');
const router = express.Router();
const BookedService = require('../models/BookedService');
const ServiceData = require('../models/ServiceData'); // If needed for listing services

// ------------------------
// POST: Book a new service
// ------------------------
// In your booking route
router.post('/api/bookedService', async (req, res) => {
  const { 
    userName, 
    petName, 
    serviceType, 
    serviceId, 
    price, 
    day, 
    time, 
    message 
  } = req.body;

  // Validate required fields
  if (!userName || !serviceType || (serviceType !== "Pet Adoption" && !petName)) {
    return res.status(400).json({ message: '❌ Please fill all required fields.' });
  }

  // Check if the service is "Pet Adoption" (doesn't require date and time)
  if (serviceType !== "Pet Adoption") {
    if (!day || !time) {
      return res.status(400).json({ message: '❌ Day and time are required for this service.' });
    }

    // Check if the selected date is in the past
    const selectedDate = new Date(`${day}T${time}`);
    const now = new Date();
    if (selectedDate < now) {
      return res.status(400).json({ message: '❌ You cannot book for a past date or time.' });
    }

    // Check if the service is already fully booked at the selected date and time
    const existingBookings = await BookedService.find({
      serviceType,
      day,
      time
    });

    // Let's assume a service is fully booked if there are more than 10 bookings for the same time slot
    if (existingBookings.length >= 10) {
      return res.status(400).json({ message: `❌ Service '${serviceType}' is fully booked for ${day} at ${time}` });
    }
  }

  try {
    // Create a new booking instance
    const newBooking = new BookedService({
      userName,
      petName: serviceType !== "Pet Adoption" ? petName : undefined,
      serviceType,
      serviceId,
      price,
      day,
      time,
      message
    });

    // Save the booking to the database
    await newBooking.save();

    // Send success response
    res.status(201).json({ message: '✅ Booking successful!' });
  } catch (error) {
    console.error("❌ Booking Error:", error);
    res.status(500).json({ message: '❌ Failed to book service.', error: error.message });
  }
});
// --------------------------------------------
// GET: Check availability for a specific slot
// --------------------------------------------
router.get('/check', async (req, res) => {
  const { serviceType, day, time } = req.query;

  try {
    const existingBooking = await BookedService.findOne({ serviceType, day, time });

    res.status(200).json({ available: !existingBooking });
  } catch (error) {
    console.error("❌ Error checking availability:", error);
    res.status(500).json({ message: '❌ Error checking bookings' });
  }
});

// -----------------------------------
// GET: Fetch all booked services
// -----------------------------------
router.get('/api/bookedServices', async (req, res) => {
  try {
    const bookedServices = await BookedService.find();
    console.log("✅ Fetched services:", bookedServices);
    res.json(bookedServices);
  } catch (err) {
    console.error("❌ Error fetching booked services:", err);
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});

// -----------------------------------
// PUT: Update a specific booked service
// -----------------------------------
router.put('/bookedServices/:id', async (req, res) => {
  try {
    const updatedBooking = await BookedService.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "❌ Booking not found" });
    }

    res.json({ message: "✅ Booking updated successfully", data: updatedBooking });
  } catch (error) {
    console.error("❌ Error updating booking:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await BookedService.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user bookings" });
  }
});

router.get("/api/bookings/user/:userId", async (req, res) => {
  try {
    const bookings = await BookedService.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user bookings" });
  }
});


module.exports = router;
