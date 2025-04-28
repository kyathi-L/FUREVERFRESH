const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: "" },
});

supplierSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

supplierSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Supplier", supplierSchema);
