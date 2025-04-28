const express = require("express");
const router = express.Router();
const Supplier = require("../models/Supplier");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
// Register Supplier
router.post("/register", async (req, res) => {
  try {
    const { name, company, email, phone, password } = req.body;

    const existingSupplier = await Supplier.findOne({ email });
    if (existingSupplier) {
      return res.status(400).json({ message: "Supplier already exists" });
    }

    const supplier = new Supplier({ name, company, email, phone, password });
    await supplier.save();

    res.status(201).json({ message: "Supplier registered successfully" });
  } catch (error) {
    console.error("Error in supplier registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Supplier
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const supplier = await Supplier.findOne({ email });
    if (!supplier) {
      return res.status(400).json({ message: "Supplier not found" });
    }

    const isMatch = await supplier.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const supplierData = {
      id: supplier._id,
      name: supplier.name,
      email: supplier.email,
      company: supplier.company,
      phone: supplier.phone,
    };

    res.status(200).json({ message: "Login successful", supplier });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching suppliers" });
  }
});

// GET supplier by ID
router.get("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json(supplier);
  } catch (error) {
    console.error("Error fetching supplier:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/:id/upload-image", upload.single("profileImage"), async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { profileImage: req.file.filename },
      { new: true }
    );
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ message: "Upload error", error: err.message });
  }
});



module.exports = router;

