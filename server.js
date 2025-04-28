require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require("bcryptjs");
const path = require("path");
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "../client/dist")));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/registrationForm";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(error => console.error("❌ MongoDB Connection Error:", error));



  app.get("/api/bookings/user/:userId", async (req, res) => {
    try {
      const bookings = await BookedService.find({ _id: req.params.userId });
      res.json(bookings);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch user bookings" });
    }
  });

  

  const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

const adminStatsRoutes = require("./routes/adminStats");
app.use("/api/admin", adminStatsRoutes);

const supplierRoutes = require("./routes/supplierRoutes");
app.use("/api/suppliers", supplierRoutes);
console.log("⚙️  Mounting supplierRoutes on /api/suppliers");

const supplierproductRoutes = require("./routes/supplier/products");
app.use("/api/supplier/products", supplierproductRoutes);

const profileRoutes = require('./routes/profileRoutes'); // adjust the path to your profile route
app.use("/api/profile", profileRoutes);

const authRoutes = require("./routes/authRoutes");
const auth = require('./middleware/auth');
const User = require('./models/User');

const adoptRoutes = require("./routes/adopt");
app.use("/", authRoutes);
app.use("/api", adoptRoutes);

// const bookServiceRoutes = require('./routes/bookServiceRoute'); // adjust the path as needed
// app.use('/', bookServiceRoutes);

const petsRoutes = require("./routes/pets"); // ✅ This path must match the filename
app.use("/api/pets", petsRoutes);

const checkoutRoutes = require("./routes/checkout");
const userRoutes = require("./routes/users");

app.use("/", userRoutes);
app.use("/", checkoutRoutes);



app.use("/payments", require("./routes/payments"));

const formRoutes = require('./routes/form'); // Adjust path if different
app.use('/', formRoutes);



const ServiceData = require('./models/ServiceData');
const BookedService = require('./models/BookedService');

const bookingRoutes = require('./routes/bookingRoutes');
app.use('/', bookingRoutes);

const serviceRoutes = require('./routes/serviceDataRoute');
app.use(serviceRoutes);

const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);


app.use("/cart", require("./routes/cart"));


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
app.get('/dashboard',(req, res) => {
  res.json({ message: "Welcome to the dashboard!", user: req.user });
});
app.get('/', (req, res) => {
  res.send('Server is running');
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
