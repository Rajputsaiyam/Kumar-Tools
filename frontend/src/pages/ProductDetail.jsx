import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Minus,
  Plus,
  ShoppingCart,
  MessageCircle,
  HelpCircle,
  ArrowLeft,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { productApi, inr, waLink, CATEGORIES } from "../services/api";
import { useCart } from "../context/CartContext";
import { StockBadge, ProductCard } from "../components/common/ProductCard";

export function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    productApi.getBySlug(slug).then((data) => {
      setProduct(data);
      setQty(1);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-96 rounded-3xl bg-slate-200 animate-pulse" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-4">
        <h2 className="font-display font-black text-2xl text-slate-900">Product not found</h2>
        <p className="text-xs text-slate-500 mt-2">The requested tool or spare part does not exist.</p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-orangeHover shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Back to catalogue
        </Link>
      </div>
    );
  }

  const categoryMeta = CATEGORIES[product.category] || { name: product.category, path: "/products" };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-900">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-slate-900">Products</Link>
        <span>/</span>
        <Link to={categoryMeta.path} className="hover:text-slate-900">{categoryMeta.name}</Link>
        <span>/</span>
        <span className="font-bold text-slate-900">{product.name}</span>
      </nav>

      {/* Main Showcase */}
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Product Photo Box */}
        <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-soft group">
          <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-4 left-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm">
              {product.brand} OEM
            </span>
          </div>
        </div>

        {/* Product Info & Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                {categoryMeta.name}
              </span>
              <StockBadge stock={product.stock} />
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
              <span>Brand: <b className="text-slate-900">{product.brand}</b></span>
              <span>SKU: <code className="text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">{product.sku}</code></span>
            </div>
          </div>

          {/* Price */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-baseline gap-3">
            <span className="font-display font-black text-3xl text-brand-navy">
              {inr(product.price)}
            </span>
            <span className="text-xs text-slate-500">Includes all taxes • Delhi Counter Pickup Available</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Qty & Add to Cart */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Quantity</span>
              <div className="flex items-center rounded-xl border border-slate-200 bg-white">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-2 text-slate-500 hover:text-slate-900"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-xs font-extrabold text-slate-900">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-2 text-slate-500 hover:text-slate-900"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => addToCart(product, qty)}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-xs font-black text-white hover:bg-brand-orangeHover disabled:opacity-40 shadow-glow transition-all active:scale-95"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart ({inr(product.price * qty)})</span>
              </button>

              <a
                href={waLink(`Hello Kumar Tools, I want to order/enquire about:\nProduct: ${product.name} (${product.sku})\nQuantity: ${qty}`)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-3.5 text-xs font-bold text-white shadow-sm transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Specifications Table */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-soft">
              <div className="bg-slate-50 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200">
                Technical Specifications
              </div>
              <dl className="divide-y divide-slate-100 text-xs">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:justify-between px-4 py-2.5 gap-1">
                    <dt className="text-slate-500 font-medium">{key}</dt>
                    <dd className="font-bold text-slate-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Need identification card */}
          <div className="rounded-2xl border border-brand-orange/30 bg-brand-orangeLight p-4 flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
            <div className="text-xs">
              <h4 className="font-bold text-slate-900">Unsure about compatibility with your appliance?</h4>
              <p className="text-slate-600 mt-0.5">
                Send a photo of your old part or model sticker on WhatsApp. We will cross-verify exact voltage, microfarad ratings, or pin configurations for you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {product.related && product.related.length > 0 && (
        <section className="space-y-6 pt-10 border-t border-slate-200">
          <h2 className="font-display font-black text-2xl text-slate-900">
            Related Spare Parts & Tools
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {product.related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
