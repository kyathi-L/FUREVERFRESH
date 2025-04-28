const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  profilePic: { type: String, default: "" },
  role: { type: String, enum: ["user", "admin", "supplier"], default: "user" }
});

module.exports = mongoose.model("User", userSchema, "forms");
