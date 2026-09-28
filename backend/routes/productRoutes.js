const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductBySlug,
  getCategories,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { requireAdminAuth } = require("../middleware/authMiddleware");

router.get("/categories", getCategories);
router.get("/:slug", getProductBySlug);
router.put("/:id", requireAdminAuth, updateProduct);
router.delete("/:id", requireAdminAuth, deleteProduct);
router.get("/", getProducts);

module.exports = router;
