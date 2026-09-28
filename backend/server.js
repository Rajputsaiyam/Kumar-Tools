const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const { connectDB, getIsConnected } = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const whatsappRoutes = require("./routes/whatsappRoutes");
const chatRoutes = require("./routes/chatRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");

const app = express();
const PORT = process.env.PORT || 5002;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// API Routes
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/chat", chatRoutes);

// Serve static frontend assets in production if built
const frontendDistPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendDistPath));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    store: "Kumar Tools & Refrigeration",
    mongoConnected: getIsConnected(),
    database: "kumartools",
    time: new Date().toISOString(),
  });
});

// Single Page Application (SPA) fallback for frontend client routing
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  const indexHtml = path.join(frontendDistPath, "index.html");
  res.sendFile(indexHtml, (err) => {
    if (err) {
      res.json({
        message: "Kumar Tools & Refrigeration API Server Running",
        endpoints: [
          "/api/products",
          "/api/orders",
          "/api/services",
          "/api/whatsapp/settings",
          "/api/whatsapp/logs",
          "/api/chat/message",
        ],
      });
    }
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Kumar Tools Backend API running on http://localhost:${PORT}`);
  console.log(`📡 Autonomous AI WhatsApp Engine & RAG Knowledge Server Active`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use by another process.`);
    console.error(`👉 Run 'lsof -ti :${PORT} | xargs kill -9' to free the port.`);
    process.exit(1);
  } else {
    console.error("Server error:", err);
  }
});
