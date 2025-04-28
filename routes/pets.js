const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet"); // Adjust path if needed
const AdoptedPet = require("../models/AdoptedPet"); // If you have one

// Get all pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pets" });
  }
});

// Adopt a pet
router.post("/adopt", async (req, res) => {
  const { _id, userName, phone } = req.body;

  if (!_id || !userName || !phone) {
    return res.status(400).json({ success: false, message: "Missing info" });
  }

  try {
    const pet = await Pet.findById(_id);
    if (!pet || !pet.available) {
      return res
        .status(400)
        .json({ success: false, message: "Pet not available" });
    }

    // Save adoption (optional)
    const adopted = new AdoptedPet({
      petId: _id,
      userName,
      phone,
      adoptedAt: new Date()
    });
    await adopted.save();

    // Update pet availability
    pet.available = false;
    await pet.save();

    res.json({ success: true });
  } catch (error) {
    console.error("Adopt error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
