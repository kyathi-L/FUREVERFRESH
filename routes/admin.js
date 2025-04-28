const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ✅ Get user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update user by ID
router.put("/users/:id", async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Delete user by ID
router.delete("/delete-user/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("❌ Delete User Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
