const express = require("express");
const router = express.Router();
const AdoptedPet = require("../models/AdoptedPet");
const Pet = require("../models/Pet");

router.post("/adopt", async (req, res) => {
  const { userName, phone, name, age, breed, weight, color, species, image } = req.body;

  if (!userName || !phone || !name) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const pet = await Pet.findOne({ name, species });

    if (!pet || !pet.available) {
      return res.status(400).json({ success: false, message: "Pet is not available for adoption" });
    }

    const newAdoption = new AdoptedPet({ userName, phone, name, age, breed, weight, color, species, image });
    await newAdoption.save();

    pet.available = false;
    await pet.save();

    res.status(201).json({ success: true, message: "Pet adopted successfully" });
  } catch (error) {
    console.error("❌ Adoption Error:", error);
    res.status(500).json({ success: false, message: "Failed to adopt pet", error: error.message });
  }
});

router.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pets", error: err.message });
  }
});

router.get("/adoptedPets", async (req, res) => {
  try {
    const adopted = await AdoptedPet.find();
    res.status(200).json(adopted);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch adopted pets", error: err.message });
  }
});

// PUT /adopt/undo/:id
router.put("/undo/:id", async (req, res) => {
  try {
    const adoption = await AdoptedPet.findById(req.params.id);
    if (!adoption) {
      return res.status(404).json({ success: false, message: "Adoption not found" });
    }

    // Make pet available again
    const pet = await Pet.findOne({ name: adoption.name, species: adoption.species });
    if (pet) {
      pet.available = true;
      await pet.save();
    }

    // Remove from adopted list
    await AdoptedPet.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Adoption undone successfully" });
  } catch (error) {
    console.error("Undo error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;
