const Order = require("../models/Order");
const { INITIAL_ORDERS } = require("../data/seedData");
const { getIsConnected } = require("../config/db");
const whatsappService = require("../services/whatsappAutomationService");

let ordersList = [...INITIAL_ORDERS];

const getOrders = async (req, res) => {
  const { phone, orderId, search } = req.query;

  const filter = {};
  if (orderId) {
    filter.id = new RegExp(`^${orderId.trim()}$`, "i");
  } else if (phone) {
    const cleanDigits = phone.replace(/\D/g, "").slice(-10);
    if (cleanDigits) {
      filter.phone = new RegExp(cleanDigits);
    }
  } else if (search) {
    const s = search.trim();
    const cleanDigits = s.replace(/\D/g, "").slice(-10);
    const conditions = [
      { id: new RegExp(s, "i") },
      { customer: new RegExp(s, "i") },
    ];
    if (cleanDigits) {
      conditions.push({ phone: new RegExp(cleanDigits) });
    }
    filter.$or = conditions;
  }

  try {
    if (getIsConnected()) {
      const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();
      return res.json({ success: true, count: orders.length, data: orders, source: "mongodb" });
    }
  } catch (err) {
    console.warn("MongoDB getOrders error, falling back to memory:", err.message);
  }

  // Fallback in-memory filter
  let results = [...ordersList];
  if (orderId) {
    results = results.filter((o) => o.id.toLowerCase() === orderId.trim().toLowerCase());
  } else if (phone) {
    const cleanDigits = phone.replace(/\D/g, "").slice(-10);
    results = results.filter((o) => (o.phone || "").replace(/\D/g, "").includes(cleanDigits));
  } else if (search) {
    const s = search.trim().toLowerCase();
    const cleanDigits = s.replace(/\D/g, "").slice(-10);
    results = results.filter(
      (o) =>
        o.id.toLowerCase().includes(s) ||
        (o.customer || "").toLowerCase().includes(s) ||
        (cleanDigits && (o.phone || "").replace(/\D/g, "").includes(cleanDigits))
    );
  }

  res.json({ success: true, count: results.length, data: results, source: "in-memory" });
};

const lookupOrder = async (req, res) => {
  const { query } = req.params;
  if (!query || !query.trim()) {
    return res.status(400).json({ success: false, message: "Search query is required" });
  }

  const q = query.trim();
  const digits = q.replace(/\D/g, "").slice(-10);
  const isPhone = digits.length >= 10;

  try {
    if (getIsConnected()) {
      let orders = [];
      if (isPhone) {
        orders = await Order.find({ phone: new RegExp(digits) }).sort({ createdAt: -1 }).lean();
      } else {
        orders = await Order.find({ id: new RegExp(`^${q}$`, "i") }).sort({ createdAt: -1 }).lean();
      }
      return res.json({ success: true, count: orders.length, data: orders, type: isPhone ? "phone" : "orderId" });
    }
  } catch (err) {
    console.warn("MongoDB lookupOrder error:", err.message);
  }

  // Memory fallback
  let matches = [];
  if (isPhone) {
    matches = ordersList.filter((o) => (o.phone || "").replace(/\D/g, "").includes(digits));
  } else {
    matches = ordersList.filter((o) => o.id.toLowerCase() === q.toLowerCase());
  }

  res.json({ success: true, count: matches.length, data: matches, type: isPhone ? "phone" : "orderId" });
};

const createOrder = async (req, res) => {
  const { customer, phone, items, itemsList, total, address } = req.body;

  if (!customer || !phone) {
    return res.status(400).json({ success: false, message: "Customer name and phone number are required" });
  }

  const newOrder = {
    id: `KT-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    customer: customer.trim(),
    phone: phone.trim(),
    address: (address || "").trim(),
    items: items || (itemsList ? itemsList.map((i) => `${i.name} × ${i.qty}`).join(", ") : "Tools & Spares"),
    rawItems: itemsList || [],
    total: Number(total) || 0,
    date: new Date().toISOString().split("T")[0],
    status: "Pending",
  };

  let savedOrder = newOrder;

  // Persist directly to MongoDB
  try {
    if (getIsConnected()) {
      const created = await Order.create(newOrder);
      savedOrder = created.toObject ? created.toObject() : created;
    }
  } catch (err) {
    console.warn("MongoDB createOrder error:", err.message);
  }

  // Also maintain in-memory copy
  ordersList.unshift(savedOrder);

  // Trigger Autonomous WhatsApp Event
  try {
    await whatsappService.dispatchAutomatedEvent("ORDER_REQUEST_RECEIVED", {
      recipientName: savedOrder.customer,
      recipientPhone: savedOrder.phone,
      orderId: savedOrder.id,
      items: savedOrder.items,
      total: savedOrder.total,
    });
  } catch (err) {
    console.warn("Auto WhatsApp dispatch error:", err);
  }

  res.status(201).json({ success: true, data: savedOrder });
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  let updatedOrder = null;

  try {
    if (getIsConnected()) {
      updatedOrder = await Order.findOneAndUpdate({ id }, { status }, { new: true }).lean();
    }
  } catch (err) {
    console.warn("MongoDB updateOrderStatus error:", err.message);
  }

  const order = ordersList.find((o) => o.id === id);
  if (order) {
    order.status = status;
    if (!updatedOrder) updatedOrder = order;
  }

  if (!updatedOrder) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  // Trigger Autonomous WhatsApp Event on Status Change
  try {
    await whatsappService.dispatchAutomatedEvent("ORDER_STATUS_UPDATED", {
      recipientName: updatedOrder.customer,
      recipientPhone: updatedOrder.phone,
      orderId: updatedOrder.id,
      items: updatedOrder.items,
      total: updatedOrder.total,
      status: updatedOrder.status,
    });
  } catch (err) {
    console.warn("Auto WhatsApp status update error:", err);
  }

  res.json({ success: true, data: updatedOrder });
};

module.exports = {
  getOrders,
  lookupOrder,
  createOrder,
  updateOrderStatus,
};
