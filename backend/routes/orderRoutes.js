const express = require("express");
const router = express.Router();
const {
  getOrders,
  lookupOrder,
  createOrder,
  updateOrderStatus,
} = require("../controllers/orderController");
const { requireAdminAuth } = require("../middleware/authMiddleware");

router.get("/", getOrders);
router.get("/lookup/:query", lookupOrder);
router.post("/", createOrder);
router.put("/:id/status", requireAdminAuth, updateOrderStatus);

module.exports = router;
