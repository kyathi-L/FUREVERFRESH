const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: String,
  age: String,
  breed: String,
  weight: String,
  color: String,
  species: String,
  image: String,
  available: { type: Boolean, default: true }
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
