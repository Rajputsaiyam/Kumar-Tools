const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: "" },
    device: { type: String, required: true },
    service: { type: String, required: true },
    address: { type: String, required: true },
    problem: { type: String, default: "" },
    date: { type: String, default: () => new Date().toISOString().split("T")[0] },
    timeSlot: { type: String, default: "Morning (9–12)" },
    status: {
      type: String,
      enum: ["New", "Contacted", "Scheduled", "In Progress", "Completed", "Cancelled"],
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Service || mongoose.model("Service", serviceSchema);
