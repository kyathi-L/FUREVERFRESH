const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  price: {
    basic: { type: Number, required: true },
    premium: { type: Number, required: true }
  }
});

const ServiceData = mongoose.model('ServiceData', serviceSchema);
module.exports = ServiceData;
