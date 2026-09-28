const express = require("express");
const router = express.Router();
const {
  getServices,
  createServiceRequest,
  updateServiceStatus,
} = require("../controllers/serviceController");
const { requireAdminAuth } = require("../middleware/authMiddleware");

router.get("/", getServices);
router.post("/", createServiceRequest);
router.put("/:id/status", requireAdminAuth, updateServiceStatus);

module.exports = router;
