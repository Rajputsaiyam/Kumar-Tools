const mongoose = require("mongoose");

const whatsAppLogSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    timestamp: { type: String, default: () => new Date().toISOString() },
    event: { type: String, required: true },
    recipient: { type: String, required: true },
    phone: { type: String, required: true },
    preview: { type: String, default: "" },
    status: { type: String, enum: ["SENT", "QUEUED", "FAILED"], default: "SENT" },
    gateway: { type: String, default: "simulation" },
    payload: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.models.WhatsAppLog || mongoose.model("WhatsAppLog", whatsAppLogSchema);
