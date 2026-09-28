const Service = require("../models/Service");
const { INITIAL_SERVICES } = require("../data/seedData");
const { getIsConnected } = require("../config/db");
const whatsappService = require("../services/whatsappAutomationService");

let servicesList = [...INITIAL_SERVICES];

const getServices = async (req, res) => {
  try {
    if (getIsConnected()) {
      const services = await Service.find().sort({ createdAt: -1 }).lean();
      return res.json({ success: true, count: services.length, data: services, source: "mongodb" });
    }
  } catch (err) {
    console.warn("MongoDB getServices error, falling back to memory:", err.message);
  }

  res.json({ success: true, count: servicesList.length, data: servicesList, source: "in-memory" });
};

const createServiceRequest = async (req, res) => {
  const { name, phone, email, device, service, date, timeSlot, address, problem } = req.body;

  if (!name || !phone || !address || !problem) {
    return res.status(400).json({ success: false, message: "Name, phone, address and problem description are required" });
  }

  const newService = {
    id: `KT-SRV-${Math.floor(2000 + Math.random() * 8000)}`,
    name: name.trim(),
    phone: phone.trim(),
    email: (email || "").trim(),
    device: device || "AC",
    service: service || "AC Servicing",
    date: date || new Date().toISOString().split("T")[0],
    timeSlot: timeSlot || "Morning (9–12)",
    address: address.trim(),
    problem: problem.trim(),
    status: "New",
  };

  let savedService = newService;

  // Persist directly to MongoDB
  try {
    if (getIsConnected()) {
      const created = await Service.create(newService);
      savedService = created.toObject ? created.toObject() : created;
    }
  } catch (err) {
    console.warn("MongoDB createServiceRequest error:", err.message);
  }

  // Also maintain in-memory copy
  servicesList.unshift(savedService);

  // Trigger Autonomous WhatsApp Event
  try {
    await whatsappService.dispatchAutomatedEvent("SERVICE_BOOKED", {
      recipientName: savedService.name,
      recipientPhone: savedService.phone,
      serviceId: savedService.id,
      device: savedService.device,
      service: savedService.service,
      slot: `${savedService.date} (${savedService.timeSlot})`,
      address: savedService.address,
      problem: savedService.problem,
    });
  } catch (err) {
    console.warn("Auto WhatsApp service dispatch error:", err);
  }

  res.status(201).json({ success: true, data: savedService });
};

const updateServiceStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  let updatedService = null;

  try {
    if (getIsConnected()) {
      updatedService = await Service.findOneAndUpdate({ id }, { status }, { new: true }).lean();
    }
  } catch (err) {
    console.warn("MongoDB updateServiceStatus error:", err.message);
  }

  const item = servicesList.find((s) => s.id === id);
  if (item) {
    item.status = status;
    if (!updatedService) updatedService = item;
  }

  if (!updatedService) {
    return res.status(404).json({ success: false, message: "Service request not found" });
  }

  // Trigger Autonomous WhatsApp Event on Status Change
  try {
    await whatsappService.dispatchAutomatedEvent("SERVICE_STATUS_UPDATED", {
      recipientName: updatedService.name,
      recipientPhone: updatedService.phone,
      serviceId: updatedService.id,
      device: updatedService.device,
      service: updatedService.service,
      status: updatedService.status,
    });
  } catch (err) {
    console.warn("Auto WhatsApp service status update error:", err);
  }

  res.json({ success: true, data: updatedService });
};

module.exports = {
  getServices,
  createServiceRequest,
  updateServiceStatus,
};
