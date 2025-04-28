const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Order = require("../models/Order");
const Inventory = require("../models/Inventory");
const Notification = require("../models/Notification");
const Report = require("../models/Report");
const Support = require("../models/Support");

// Products
router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Orders
router.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Inventory
router.get("/inventory", async (req, res) => {
  const inventory = await Inventory.find();
  res.json(inventory);
});

// Notifications
router.get("/notifications", async (req, res) => {
  const notifications = await Notification.find();
  res.json(notifications);
});

// Reports
router.get("/reports", async (req, res) => {
  const reports = await Report.find();
  res.json(reports);
});

// Support
router.get("/support", async (req, res) => {
  const supportTickets = await Support.find();
  res.json(supportTickets);
});

module.exports = router;
