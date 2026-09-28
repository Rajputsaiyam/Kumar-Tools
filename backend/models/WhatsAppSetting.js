const mongoose = require("mongoose");

const whatsAppSettingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "global" },
    provider: { type: String, default: "simulation" },
    enabled: { type: Boolean, default: true },
    metaPhoneNumberId: { type: String, default: "" },
    metaAccessToken: { type: String, default: "" },
    ultraMsgInstanceId: { type: String, default: "" },
    ultraMsgToken: { type: String, default: "" },
    webhookUrl: { type: String, default: "" },
    autoSendOnOrder: { type: Boolean, default: true },
    autoSendOnService: { type: Boolean, default: true },
    autoSendOnStatusChange: { type: Boolean, default: true },
    aiTone: { type: String, default: "professional" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.WhatsAppSetting || mongoose.model("WhatsAppSetting", whatsAppSettingSchema);
