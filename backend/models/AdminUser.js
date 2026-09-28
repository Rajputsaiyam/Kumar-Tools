const mongoose = require("mongoose");
const crypto = require("crypto");

const adminUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, default: "admin" },
    name: { type: String, default: "Saiyam Rajput" },
    email: { type: String, required: true, unique: true, default: "saiyamrajput71@gmail.com" },
    phone: { type: String, default: "9210797245" },
    role: { type: String, default: "Owner & Administrator" },
    passwordHash: { type: String, required: true },
    pin: { type: String, default: "9354" },
    lastLogin: { type: Date, default: null },
    loginCount: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

adminUserSchema.methods.verifyPassword = function (inputPassword) {
  const hash = crypto.createHash("sha256").update(String(inputPassword).trim()).digest("hex");
  return this.passwordHash === hash || this.pin === String(inputPassword).trim();
};

adminUserSchema.statics.hashPassword = function (plainPassword) {
  return crypto.createHash("sha256").update(String(plainPassword).trim()).digest("hex");
};

module.exports = mongoose.models.AdminUser || mongoose.model("AdminUser", adminUserSchema);
