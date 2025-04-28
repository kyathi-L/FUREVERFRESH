const mongoose = require("mongoose");

const adoptedPetSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  phone: { type: String, required: true },
  name: String,
  age: String,
  breed: String,
  weight: String,
  color: String,
  species: String,
  image: String,
adoptedAt: { type: Date, default: Date.now },
});

const AdoptedPet = mongoose.model("AdoptedPet", adoptedPetSchema);

module.exports = AdoptedPet;
