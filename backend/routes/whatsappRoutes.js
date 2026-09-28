const express = require("express");
const router = express.Router();
const {
  getSettings,
  updateSettings,
  getLogs,
  clearLogs,
  dispatchManualTest,
  broadcastAll,
  getTemplates,
} = require("../controllers/whatsappController");
const { requireAdminAuth } = require("../middleware/authMiddleware");

router.get("/settings", requireAdminAuth, getSettings);
router.post("/settings", requireAdminAuth, updateSettings);
router.get("/logs", requireAdminAuth, getLogs);
router.delete("/logs", requireAdminAuth, clearLogs);
router.post("/dispatch-test", requireAdminAuth, dispatchManualTest);
router.post("/broadcast-all", requireAdminAuth, broadcastAll);
router.get("/templates", requireAdminAuth, getTemplates);

module.exports = router;
