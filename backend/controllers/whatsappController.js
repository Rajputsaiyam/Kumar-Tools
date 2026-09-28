const whatsappService = require("../services/whatsappAutomationService");
const WhatsAppLog = require("../models/WhatsAppLog");
const { getIsConnected } = require("../config/db");

const getSettings = (req, res) => {
  res.json({ success: true, data: whatsappService.getSettings() });
};

const updateSettings = (req, res) => {
  const updated = whatsappService.updateSettings(req.body);
  res.json({ success: true, data: updated });
};

const getLogs = async (req, res) => {
  try {
    if (getIsConnected()) {
      const dbLogs = await WhatsAppLog.find().sort({ createdAt: -1 }).lean();
      if (dbLogs.length > 0) {
        return res.json({ success: true, count: dbLogs.length, data: dbLogs, source: "mongodb" });
      }
    }
  } catch (err) {
    console.warn("MongoDB getLogs fallback:", err.message);
  }

  const logs = whatsappService.getLogs();
  res.json({ success: true, count: logs.length, data: logs, source: "in-memory" });
};

const clearLogs = async (req, res) => {
  try {
    if (getIsConnected()) {
      await WhatsAppLog.deleteMany({});
    }
  } catch (err) {
    console.warn("MongoDB clearLogs error:", err.message);
  }

  whatsappService.clearLogs();
  res.json({ success: true, message: "Logs cleared" });
};

const dispatchManualTest = async (req, res) => {
  const { eventType, recipientName, recipientPhone, orderId, serviceId, items, total, device, service, customMessage } = req.body;

  if (!recipientPhone) {
    return res.status(400).json({ success: false, message: "Recipient phone is required" });
  }

  const log = await whatsappService.dispatchAutomatedEvent(eventType || "ORDER_REQUEST_RECEIVED", {
    recipientName: recipientName || "Valued Customer",
    recipientPhone,
    orderId,
    serviceId,
    items,
    total,
    device,
    service,
    customMessage,
  });

  res.json({ success: true, data: log });
};

const broadcastAll = async (req, res) => {
  const { templateId } = req.body;
  const result = await whatsappService.broadcastAll(templateId || "summer_ac_special");
  res.json({ success: true, data: result });
};

const getTemplates = (req, res) => {
  res.json({ success: true, data: whatsappService.WHATSAPP_TEMPLATES });
};

module.exports = {
  getSettings,
  updateSettings,
  getLogs,
  clearLogs,
  dispatchManualTest,
  broadcastAll,
  getTemplates,
};
