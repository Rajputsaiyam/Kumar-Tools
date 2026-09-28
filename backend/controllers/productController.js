const Product = require("../models/Product");
const { CATEGORIES, PRODUCTS } = require("../data/seedData");
const { getIsConnected } = require("../config/db");

let inMemoryProducts = [...PRODUCTS];

const getProducts = async (req, res) => {
  const { category, search, brand, maxPrice, inStock } = req.query;

  try {
    if (getIsConnected()) {
      let query = { active: true };

      if (category) {
        query.category = category;
      }

      if (brand) {
        query.brand = { $in: brand.split(",") };
      }

      if (maxPrice) {
        query.price = { $lte: Number(maxPrice) };
      }

      if (inStock === "true") {
        query.stock = { $gt: 0 };
      }

      if (search) {
        const regex = new RegExp(search, "i");
        query.$or = [{ name: regex }, { short: regex }, { brand: regex }, { sku: regex }];
      }

      const products = await Product.find(query).lean();
      return res.json({ success: true, count: products.length, data: products, source: "mongodb" });
    }
  } catch (err) {
    console.warn("MongoDB getProducts fallback to memory:", err.message);
  }

  // Fallback to in-memory store
  let result = inMemoryProducts.filter((p) => p.active);

  if (category) {
    result = result.filter((p) => p.category === category);
  }

  if (brand) {
    const brands = brand.split(",");
    result = result.filter((p) => brands.includes(p.brand));
  }

  if (search) {
    const s = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.short.toLowerCase().includes(s) ||
        p.brand.toLowerCase().includes(s) ||
        p.sku.toLowerCase().includes(s)
    );
  }

  if (maxPrice) {
    result = result.filter((p) => p.price <= Number(maxPrice));
  }

  if (inStock === "true") {
    result = result.filter((p) => p.stock > 0);
  }

  res.json({ success: true, count: result.length, data: result, source: "in-memory" });
};

const getProductBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    if (getIsConnected()) {
      const product = await Product.findOne({ slug }).lean();
      if (product) {
        const related = await Product.find({
          category: product.category,
          id: { $ne: product.id },
        })
          .limit(4)
          .lean();
        return res.json({ success: true, data: { ...product, related }, source: "mongodb" });
      }
    }
  } catch (err) {
    console.warn("MongoDB getProductBySlug fallback:", err.message);
  }

  const product = inMemoryProducts.find((p) => p.slug === slug);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  const related = inMemoryProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  res.json({ success: true, data: { ...product, related }, source: "in-memory" });
};

const getCategories = (req, res) => {
  res.json({ success: true, data: CATEGORIES });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (getIsConnected()) {
      const updated = await Product.findOneAndUpdate({ id }, req.body, { new: true }).lean();
      if (updated) {
        // also keep memory in sync
        const idx = inMemoryProducts.findIndex((p) => p.id === id);
        if (idx !== -1) inMemoryProducts[idx] = { ...inMemoryProducts[idx], ...req.body };
        return res.json({ success: true, data: updated, source: "mongodb" });
      }
    }
  } catch (err) {
    console.warn("MongoDB updateProduct fallback:", err.message);
  }

  const index = inMemoryProducts.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  inMemoryProducts[index] = { ...inMemoryProducts[index], ...req.body };
  res.json({ success: true, data: inMemoryProducts[index], source: "in-memory" });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (getIsConnected()) {
      await Product.deleteOne({ id });
    }
  } catch (err) {
    console.warn("MongoDB deleteProduct fallback:", err.message);
  }

  inMemoryProducts = inMemoryProducts.filter((p) => p.id !== id);
  res.json({ success: true, message: "Product removed" });
};

module.exports = {
  getProducts,
  getProductBySlug,
  getCategories,
  updateProduct,
  deleteProduct,
};
