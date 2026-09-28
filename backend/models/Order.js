const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    customer: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, default: "" },
    items: { type: String, required: true },
    rawItems: { type: mongoose.Schema.Types.Mixed, default: [] },
    subtotal: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Processing", "Ready", "Completed", "Cancelled"],
      default: "Pending",
    },
    date: { type: String, default: () => new Date().toISOString().split("T")[0] },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
