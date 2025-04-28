const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const JWT_SECRET = "yourSuperSecretKey";

// ✅ User Registration Route
router.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;
  console.log("📦 Incoming Register Body:", req.body); 
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, name, email }, JWT_SECRET, { expiresIn: "2h" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.error("❌ User registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ User Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id, name: user.name, email }, JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { _id: user._id, name: user.name, email, phone: user.phone },
    });
  } catch (error) {
    console.error("User login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
