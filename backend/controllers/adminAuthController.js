const AdminUser = require("../models/AdminUser");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Service = require("../models/Service");
const WhatsAppLog = require("../models/WhatsAppLog");
const { getIsConnected } = require("../config/db");
const { generateAdminToken, verifyAdminToken } = require("../middleware/authMiddleware");

// Default Fallback Admin configuration for Saiyam Rajput
const DEFAULT_ADMIN = {
  name: "Saiyam Rajput",
  email: (process.env.ADMIN_EMAIL || "saiyamrajput71@gmail.com").toLowerCase(),
  phone: process.env.ADMIN_PHONE || "9210797245",
  username: "admin",
  password: process.env.ADMIN_PASSWORD || "kumar9354",
  pin: process.env.ADMIN_PIN || "9354",
  role: "Owner & Administrator",
};

/**
 * Initialize Default Admin User in MongoDB if not exists
 */
async function ensureAdminUserExists() {
  if (!getIsConnected()) return null;
  try {
    let admin = await AdminUser.findOne({
      $or: [{ email: DEFAULT_ADMIN.email }, { username: DEFAULT_ADMIN.username }],
    });

    if (!admin) {
      admin = await AdminUser.create({
        username: DEFAULT_ADMIN.username,
        name: DEFAULT_ADMIN.name,
        email: DEFAULT_ADMIN.email,
        phone: DEFAULT_ADMIN.phone,
        role: DEFAULT_ADMIN.role,
        passwordHash: AdminUser.hashPassword(DEFAULT_ADMIN.password),
        pin: DEFAULT_ADMIN.pin,
      });
      console.log("🛡️ Initialized Super Admin user for Saiyam Rajput in MongoDB.");
    }
    return admin;
  } catch (err) {
    console.warn("Could not ensure admin user in DB:", err.message);
    return null;
  }
}

/**
 * Admin Login Endpoint
 */
const login = async (req, res) => {
  const { identifier, password, pin } = req.body;
  const inputCred = (password || pin || "").trim();
  const inputId = (identifier || "").trim().toLowerCase();

  if (!inputId || !inputCred) {
    return res.status(400).json({
      success: false,
      message: "Please enter your Admin Email / Username and Password / PIN.",
    });
  }

  try {
    let matchedAdmin = null;

    if (getIsConnected()) {
      await ensureAdminUserExists();
      const adminDoc = await AdminUser.findOne({
        $or: [
          { email: inputId },
          { username: inputId },
          { phone: inputId.replace(/\D/g, "") },
        ],
        active: true,
      });

      if (adminDoc && adminDoc.verifyPassword(inputCred)) {
        matchedAdmin = adminDoc;
        adminDoc.lastLogin = new Date();
        adminDoc.loginCount = (adminDoc.loginCount || 0) + 1;
        await adminDoc.save();
      }
    }

    // Fallback comparison if MongoDB offline or matching default env credentials
    if (!matchedAdmin) {
      const isIdMatch =
        inputId === DEFAULT_ADMIN.email ||
        inputId === DEFAULT_ADMIN.username ||
        inputId === DEFAULT_ADMIN.phone ||
        inputId === "saiyam";

      const isPassMatch =
        inputCred === DEFAULT_ADMIN.password || inputCred === DEFAULT_ADMIN.pin;

      if (isIdMatch && isPassMatch) {
        matchedAdmin = {
          _id: "default-admin-saiyam",
          name: DEFAULT_ADMIN.name,
          email: DEFAULT_ADMIN.email,
          phone: DEFAULT_ADMIN.phone,
          role: DEFAULT_ADMIN.role,
        };
      }
    }

    if (!matchedAdmin) {
      return res.status(401).json({
        success: false,
        message: "Access Denied: Invalid administrator credentials.",
      });
    }

    const token = generateAdminToken({
      adminId: matchedAdmin._id.toString(),
      name: matchedAdmin.name,
      email: matchedAdmin.email,
      role: matchedAdmin.role,
    });

    return res.json({
      success: true,
      message: `Welcome back, ${matchedAdmin.name}!`,
      token,
      admin: {
        id: matchedAdmin._id,
        name: matchedAdmin.name,
        email: matchedAdmin.email,
        phone: matchedAdmin.phone,
        role: matchedAdmin.role,
        lastLogin: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ success: false, message: "Authentication server error." });
  }
};

/**
 * Verify Admin Session Token
 */
const verifySession = async (req, res) => {
  const token = req.headers["x-admin-token"] || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ success: false, authenticated: false, message: "No token provided" });
  }

  const payload = verifyAdminToken(token);
  if (!payload) {
    return res.status(401).json({ success: false, authenticated: false, message: "Invalid or expired session" });
  }

  return res.json({
    success: true,
    authenticated: true,
    admin: {
      name: payload.name,
      email: payload.email,
      role: payload.role,
    },
  });
};

/**
 * Change Admin Password or PIN
 */
const changePassword = async (req, res) => {
  const { currentPassword, newPassword, newPin } = req.body;

  if (!currentPassword || (!newPassword && !newPin)) {
    return res.status(400).json({
      success: false,
      message: "Current password and new password/PIN are required.",
    });
  }

  try {
    if (getIsConnected()) {
      const admin = await AdminUser.findOne({ email: DEFAULT_ADMIN.email });
      if (admin) {
        if (!admin.verifyPassword(currentPassword)) {
          return res.status(401).json({ success: false, message: "Current password is incorrect." });
        }

        if (newPassword) {
          admin.passwordHash = AdminUser.hashPassword(newPassword);
        }
        if (newPin) {
          admin.pin = String(newPin).trim();
        }

        await admin.save();
        return res.json({ success: true, message: "Admin credentials successfully updated in database." });
      }
    }

    if (currentPassword === DEFAULT_ADMIN.password || currentPassword === DEFAULT_ADMIN.pin) {
      if (newPassword) DEFAULT_ADMIN.password = newPassword;
      if (newPin) DEFAULT_ADMIN.pin = newPin;
      return res.json({ success: true, message: "Admin credentials updated for current session." });
    }

    return res.status(401).json({ success: false, message: "Current password does not match." });
  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).json({ success: false, message: "Failed to update admin credentials." });
  }
};

/**
 * Get Comprehensive Store Analytics for Admin Dashboard
 */
const getStoreStats = async (req, res) => {
  try {
    let productCount = 0;
    let lowStockCount = 0;
    let orderCount = 0;
    let pendingOrdersCount = 0;
    let totalRevenue = 0;
    let serviceCount = 0;
    let pendingServicesCount = 0;
    let waLogsCount = 0;

    if (getIsConnected()) {
      productCount = await Product.countDocuments();
      lowStockCount = await Product.countDocuments({ stock: { $lte: 5 } });

      const orders = await Order.find().lean();
      orderCount = orders.length;
      pendingOrdersCount = orders.filter((o) => o.status === "Pending" || o.status === "Confirmed").length;
      totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

      const services = await Service.find().lean();
      serviceCount = services.length;
      pendingServicesCount = services.filter((s) => s.status === "New" || s.status === "Scheduled").length;

      waLogsCount = await WhatsAppLog.countDocuments();
    }

    res.json({
      success: true,
      stats: {
        products: { total: productCount, lowStock: lowStockCount },
        orders: { total: orderCount, pending: pendingOrdersCount, revenue: totalRevenue },
        services: { total: serviceCount, pending: pendingServicesCount },
        whatsapp: { totalDispatched: waLogsCount },
        database: getIsConnected() ? "Connected (MongoDB)" : "Fallback (In-Memory)",
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch store statistics." });
  }
};

module.exports = {
  login,
  verifySession,
  changePassword,
  getStoreStats,
  ensureAdminUserExists,
};
