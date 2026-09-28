const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    short: { type: String, default: "" },
    description: { type: String, default: "" },
    sku: { type: String, default: "" },
    image: { type: String, default: "" },
    active: { type: Boolean, default: true },
    specs: { type: mongoose.Schema.Types.Mixed, default: {} },
    related: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
