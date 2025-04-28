require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Models


// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "../client/dist")));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/registrationForm";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(error => console.error("❌ MongoDB Connection Error:", error));

// Routes

const User = require("./models/User");
const AdoptedPet = require("./models/AdoptedPet");
const bookServiceRoute = require("./routes/bookServiceRoute");
const serviceDataRoute = require("./routes/serviceDataRoute");
const userRoutes = require("./routes/usersRoutes");
const adoptRoute = require("./routes/adopt");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");

app.use("/api", bookServiceRoute);
app.use("/api", serviceDataRoute);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/profile", profileRoutes);
app.use("/", userRoutes);
app.use("/", adoptRoute);

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false });

    res.json({ success: true, user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// Admin login route
app.post("/admin-login", (req, res) => {
  const { username, password } = req.body;
  if (username === "Kyathi" && password === "1234@K") {
    res.status(200).json({ success: true, message: "Admin login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
