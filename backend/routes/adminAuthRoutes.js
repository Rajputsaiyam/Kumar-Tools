const express = require("express");
const router = express.Router();
const {
  login,
  verifySession,
  changePassword,
  getStoreStats,
} = require("../controllers/adminAuthController");
const { requireAdminAuth } = require("../middleware/authMiddleware");

// Public Admin Login & Verification
router.post("/login", login);
router.get("/verify", verifySession);

// Protected Admin Routes
router.post("/change-password", requireAdminAuth, changePassword);
router.get("/stats", requireAdminAuth, getStoreStats);

module.exports = router;
