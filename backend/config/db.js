const mongoose = require("mongoose");
const { PRODUCTS, INITIAL_ORDERS, INITIAL_SERVICES } = require("../data/seedData");

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/kumartools";

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected successfully to database: ${conn.connection.name} at ${conn.connection.host}`);

    // Auto-seed initial catalog into MongoDB if empty
    await autoSeedDatabase();

    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB connection error: ${error.message}`);
    console.log("⚡ Backend will fallback to in-memory data store until MongoDB connects.");
    isConnected = false;
    return false;
  }
};

// Seed initial data into MongoDB so user can see it immediately in MongoDB Compass/mongosh
async function autoSeedDatabase() {
  try {
    const Product = require("../models/Product");
    const Order = require("../models/Order");
    const Service = require("../models/Service");

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log("🌱 Seeding 12 hardware & HVAC products into MongoDB...");
      await Product.insertMany(PRODUCTS);
      console.log(`✨ Successfully seeded ${PRODUCTS.length} products into MongoDB!`);
    }

    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      console.log("🌱 Seeding initial orders into MongoDB...");
      await Order.insertMany(INITIAL_ORDERS);
    }

    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      console.log("🌱 Seeding initial service tickets into MongoDB...");
      await Service.insertMany(INITIAL_SERVICES);
    }

    // Ensure Owner Admin user exists
    const { ensureAdminUserExists } = require("../controllers/adminAuthController");
    await ensureAdminUserExists();
  } catch (err) {
    console.error("Auto-seed error:", err.message);
  }
}

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
