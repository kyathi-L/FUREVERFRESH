const mongoose = require('mongoose');
const bookedServiceSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'User name is required']
    },
    petName: {
      type: String,
      default: null // Explicitly set to null if not provided (e.g., Pet Adoption)
    },
    serviceType: {
      type: String,
      required: [true, 'Service type is required']
    },
    day: {
      type: String,
      required: [true, 'Booking day is required']
    },
    time: {
      type: String,
      required: [true, 'Booking time is required']
    },
    message: {
      type: String,
      default: ''
    },
    price: {
      basic: { type: Number, required: false },
      premium: { type: Number, required: false }
    } // Add price object with basic and premium fields
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields automatically
  }
);

// Model
const BookedService = mongoose.model('BookedService', bookedServiceSchema);

module.exports = BookedService;
