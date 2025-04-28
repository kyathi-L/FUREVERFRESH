const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const { auth } = require("../middleware/auth"); // ✅ fixed path

// Setup storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Get profile using token auth
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // From token
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      profilePic: user.profilePic,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update profile
router.put("/update-profile", auth, upload.single("profileImage"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      phone: req.body.phone,
    };

    if (req.file) {
      updateData.profilePic = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
