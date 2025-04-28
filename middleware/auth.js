const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = "yourSuperSecretKey";
// General authentication middleware
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // user: { _id, email, ... }
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};
// Optional: Admin check middleware
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // req.user was set by `auth`
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  auth,
  isAdmin,
};
