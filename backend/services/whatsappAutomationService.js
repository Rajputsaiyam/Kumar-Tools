const { STORE_INFO } = require("../data/seedData");

const WHATSAPP_TEMPLATES = [
  {
    id: "order_confirmation",
    name: "Order Request Confirmation",
    category: "Orders",
    description: "Sent automatically when a customer submits an order request via cart.",
    templateText: `🔧 Kumar Tools & Refrigeration — Order Received!

Namaste {{customer_name}},
We have received your order request:

📦 Order ID: {{order_id}}
🛒 Items Ordered:
{{items}}

💰 Total Amount: {{total}}
📍 Store: ${STORE_INFO.address}

📞 Our team will call you within 15–30 minutes to confirm dispatch / pickup.
Need immediate assistance? Call us at ${STORE_INFO.phoneDisplay}.`,
    sampleVariables: {
      customer_name: "Saiyam Rajput",
      order_id: "KT-ORD-1042",
      items: "• Epcos AC Capacitor (35+5 µF) × 2\n• Taparia Combination Plier 8\" × 1",
      total: "₹987",
    },
  },
  {
    id: "order_ready",
    name: "Order Ready for Pickup / Out for Delivery",
    category: "Orders",
    description: "Sent when order status changes to Ready or Dispatched.",
    templateText: `🚚 Kumar Tools — Order Update!

Hello {{customer_name}},
Your order {{order_id}} is now {{status}}!

📋 Order Details: {{items}}
💵 Amount to Pay: {{total}}
📍 Pickup Location: ${STORE_INFO.address}

Please keep cash or UPI ready upon delivery/pickup.
Helpline: ${STORE_INFO.phoneDisplay}`,
    sampleVariables: {
      customer_name: "Amit Sharma",
      order_id: "KT-ORD-1039",
      status: "Ready for Store Pickup",
      items: "Schneider AC Contactor 30A × 1",
      total: "₹749",
    },
  },
  {
    id: "service_booked",
    name: "Service Request Confirmed",
    category: "Services",
    description: "Sent automatically when customer books AC or Refrigerator service.",
    templateText: `❄️ Kumar Tools Service Center — Booking Confirmed

Namaste {{customer_name}},
Your service request has been logged successfully:

🎫 Ticket ID: {{service_id}}
🛠️ Appliance: {{device}}
📋 Service Type: {{service}}
📅 Preferred Slot: {{slot}}
🏠 Address: {{address}}
📝 Problem Reported: {{problem}}

Our certified HVAC technician will call you shortly to confirm arrival time.
Helpline: ${STORE_INFO.phoneDisplay}`,
    sampleVariables: {
      customer_name: "Rajesh Kumar",
      service_id: "KT-SRV-3011",
      device: "Split AC (1.5 Ton)",
      service: "AC Deep Servicing & Gas Check",
      slot: "Tomorrow, Morning (9–12)",
      address: "Vishnu Garden, New Delhi",
      problem: "Water leakage from indoor unit and low cooling",
    },
  },
  {
    id: "technician_scheduled",
    name: "Technician Dispatched / Scheduled",
    category: "Services",
    description: "Sent when technician is assigned and scheduled for home visit.",
    templateText: `👨‍🔧 Kumar Tools — Technician Scheduled

Hello {{customer_name}},
A certified technician has been scheduled for your {{device}} service.

🎫 Booking ID: {{service_id}}
📅 Scheduled Time: {{slot}}
🛠️ Work: {{service}}

Technician will carry genuine testing meters, capacitors, and spare parts.
Store Contact: ${STORE_INFO.phoneDisplay}`,
    sampleVariables: {
      customer_name: "Pooja Verma",
      service_id: "KT-SRV-3011",
      device: "Double Door Refrigerator",
      slot: "Today at 2:30 PM",
      service: "Cooling Problem / Thermostat Check",
    },
  },
  {
    id: "summer_ac_special",
    name: "Summer AC Maintenance & Spares Broadcast",
    category: "Marketing",
    description: "Mass broadcast to past customers offering seasonal maintenance discount.",
    templateText: `☀️ Beat the Heat! Kumar Tools AC Special Offer

Namaste {{customer_name}},
Prepare your Air Conditioners before peak summer!

✅ AC Deep Jet Servicing: ₹499 only
✅ Dual Run Capacitors (Epcos/Tibcon): In Stock from ₹349
✅ Outdoor Condenser Fan Motors & Contactors: Available with 1-Year Guarantee
✅ Quick Technician Home Visits in Delhi NCR

📍 Visit Store: ${STORE_INFO.address}
📲 Reply to this WhatsApp to book your slot or order genuine HVAC parts today!`,
    sampleVariables: {
      customer_name: "Valued Customer",
    },
  },
  {
    id: "technician_wholesale_deal",
    name: "Technician Wholesale Hardware Offer",
    category: "Technicians",
    description: "Broadcast to registered HVAC/electrician technicians with wholesale discounts.",
    templateText: `⚡ Kumar Tools — Trade & Technician Wholesale Alert!

Hello {{customer_name}},
Special bulk pricing for registered AC & Fridge technicians this week:

🔩 Taparia Screwdriver Sets & Pliers: Up to 25% Off Trade Price
🔋 Epcos/Schneider AC Contactors & Capacitors: Bulk carton rates available
❄️ Embraco Relays, Ranco Thermostats & Copper Tubing in bulk stock!

Pickup at ${STORE_INFO.address} or call ${STORE_INFO.phoneDisplay} for direct workshop dispatch.`,
    sampleVariables: {
      customer_name: "Technician Partner",
    },
  },
];

let settings = {
  enabled: true,
  autoSendOnOrder: true,
  autoSendOnService: true,
  autoSendOnStatusChange: true,
  provider: "simulation",
  metaPhoneNumberId: "",
  metaAccessToken: "",
  ultraMsgInstance: "",
  ultraMsgToken: "",
  webhookUrl: "",
  aiTone: "professional",
  businessPhone: STORE_INFO.phone,
};

let logs = [
  {
    id: "LOG-9001",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    eventType: "ORDER_REQUEST_RECEIVED",
    recipientName: "Saiyam (Owner)",
    recipientPhone: STORE_INFO.phone,
    status: "DELIVERED",
    provider: "Smart Local Queue",
    message: `🔧 Kumar Tools & Refrigeration — Order Received!\n\nNamaste Saiyam (Owner),\nWe have received your order request KT-ORD-1001 for AC Capacitor × 2.\nTotal: ₹698. Store: ${STORE_INFO.address}`,
    orderId: "KT-ORD-1001",
    directWaLink: `https://wa.me/91${STORE_INFO.phone}?text=${encodeURIComponent("Hello, your order has been received at Kumar Tools.")}`,
  },
  {
    id: "LOG-9002",
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    eventType: "SERVICE_BOOKED",
    recipientName: "Vikram Malhotra",
    recipientPhone: "9899112233",
    status: "DELIVERED",
    provider: "Smart Local Queue",
    message: `❄️ Kumar Tools Service Center — Booking Confirmed\n\nNamaste Vikram Malhotra,\nTicket ID: KT-SRV-2001 (AC Servicing) has been scheduled. Our technician will visit soon!`,
    serviceId: "KT-SRV-2001",
    directWaLink: `https://wa.me/919899112233?text=${encodeURIComponent("Hello Vikram Malhotra, your AC service is scheduled.")}`,
  },
];

const inr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

const dispatchAutomatedEvent = async (eventType, payload) => {
  let messageText = payload.customMessage || "";

  if (!messageText) {
    if (eventType === "ORDER_REQUEST_RECEIVED") {
      messageText = `🔧 Kumar Tools & Refrigeration — Order Request Received!

Namaste ${payload.recipientName || "Customer"},
We have received your order request:

📦 Order ID: ${payload.orderId || "KT-ORD-" + Math.floor(1000 + Math.random() * 9000)}
🛒 Items:
${payload.items || "Tools & Spare Parts"}

💰 Estimated Total: ${typeof payload.total === "number" ? inr(payload.total) : payload.total || "₹0"}
📍 Store: ${STORE_INFO.address}

📞 Our team will call you at ${payload.recipientPhone} within 15–30 minutes to confirm dispatch or store pickup.
Need immediate help? Call ${STORE_INFO.phoneDisplay}.`;
    } else if (eventType === "ORDER_STATUS_UPDATED") {
      messageText = `🚚 Kumar Tools — Order Update!

Hello ${payload.recipientName || "Customer"},
Your order ${payload.orderId || "KT-ORD"} is now ${payload.status || "Updated"}!

📋 Items: ${payload.items || "Ordered Spares"}
💵 Amount: ${typeof payload.total === "number" ? inr(payload.total) : payload.total || ""}
📍 Address/Store: ${STORE_INFO.address}

Helpline: ${STORE_INFO.phoneDisplay}`;
    } else if (eventType === "SERVICE_BOOKED") {
      messageText = `❄️ Kumar Tools Service Center — Booking Received

Namaste ${payload.recipientName || "Customer"},
Your service request has been logged into our system:

🎫 Ticket ID: ${payload.serviceId || "KT-SRV-" + Math.floor(1000 + Math.random() * 9000)}
🛠️ Appliance: ${payload.device || "Appliance"}
📋 Service Type: ${payload.service || "Repair & Inspection"}
📅 Preferred Slot: ${payload.slot || "Earliest available"}
🏠 Service Address: ${payload.address || "Delhi NCR"}
📝 Reported Issue: ${payload.problem || "Inspection requested"}

Our certified HVAC technician will call you shortly to confirm visit timing.
Store Helpline: ${STORE_INFO.phoneDisplay}`;
    } else if (eventType === "SERVICE_STATUS_UPDATED") {
      messageText = `👨‍🔧 Kumar Tools Service Status: ${payload.status || "In Progress"}

Hello ${payload.recipientName || "Customer"},
Update on Ticket ${payload.serviceId || "KT-SRV"}:
Appliance: ${payload.device || "AC / Refrigerator"} (${payload.service || "Service"})
Status: ${payload.status}

Technicians carry genuine spares and calibrated testing equipment.
Contact: ${STORE_INFO.phoneDisplay}`;
    } else {
      messageText = `⚡ Kumar Tools Special Update

Namaste ${payload.recipientName || "Valued Customer"},
Thank you for trusting Kumar Tools for genuine hardware & HVAC spares in Delhi NCR.
Contact us anytime at ${STORE_INFO.phoneDisplay}.`;
    }
  }

  // Ensure no asterisks in the final message
  messageText = messageText.replace(/\*/g, "");

  const rawPhone = (payload.recipientPhone || "").replace(/\D/g, "");
  const targetPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone || `91${STORE_INFO.phone}`;

  const logEntry = {
    id: `LOG-${Date.now().toString().slice(-5)}`,
    timestamp: new Date().toISOString(),
    eventType,
    recipientName: payload.recipientName || "Customer",
    recipientPhone: payload.recipientPhone,
    status: "DELIVERED",
    provider:
      settings.provider === "simulation"
        ? "Smart Local Queue"
        : settings.provider === "meta"
        ? "Meta Cloud API"
        : settings.provider === "ultramsg"
        ? "UltraMsg Gateway"
        : "Webhook",
    message: messageText,
    orderId: payload.orderId,
    serviceId: payload.serviceId,
    directWaLink: `https://wa.me/${targetPhone}?text=${encodeURIComponent(messageText)}`,
  };

  logs.unshift(logEntry);
  if (logs.length > 100) logs.pop();

  // Persist to MongoDB WhatsAppLog collection
  try {
    const WhatsAppLog = require("../models/WhatsAppLog");
    const { getIsConnected } = require("../config/db");
    if (getIsConnected()) {
      WhatsAppLog.create({
        id: logEntry.id,
        timestamp: logEntry.timestamp,
        event: eventType,
        recipient: logEntry.recipientName,
        phone: logEntry.recipientPhone,
        preview: logEntry.message.slice(0, 160),
        status: "SENT",
        gateway: settings.provider,
        payload: {
          orderId: logEntry.orderId,
          serviceId: logEntry.serviceId,
          fullMessage: logEntry.message,
          directWaLink: logEntry.directWaLink,
        },
      }).catch((err) => console.warn("WhatsAppLog.create failed:", err.message));
    }
  } catch (e) {
    // Ignore schema loading error if any
  }

  return logEntry;
};

const broadcastAll = async (templateId = "summer_ac_special") => {
  const template = WHATSAPP_TEMPLATES.find((t) => t.id === templateId) || WHATSAPP_TEMPLATES[4];
  const recipients = [
    { name: "Saiyam (Owner)", phone: STORE_INFO.phone },
    { name: "Technician Rakesh (Vishnu Garden)", phone: "9810198765" },
    { name: "Technician Sunil (Khayala)", phone: "9871234567" },
    { name: "Vikas Refrigeration (Rajouri Garden)", phone: "9899887766" },
  ];

  for (const r of recipients) {
    await dispatchAutomatedEvent("MARKETING_BROADCAST", {
      recipientName: r.name,
      recipientPhone: r.phone,
      customMessage: template.templateText.replace(/\{\{customer_name\}\}/g, r.name),
    });
  }

  return { dispatchedCount: recipients.length };
};

module.exports = {
  WHATSAPP_TEMPLATES,
  getSettings: () => settings,
  updateSettings: (newSettings) => {
    settings = { ...settings, ...newSettings };
    return settings;
  },
  getLogs: () => logs,
  clearLogs: () => {
    logs = [];
    return true;
  },
  dispatchAutomatedEvent,
  broadcastAll,
};
