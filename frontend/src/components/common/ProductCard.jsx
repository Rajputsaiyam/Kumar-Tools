import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Eye, AlertCircle, CheckCircle2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { inr, CATEGORIES } from "../../services/api";

export function StockBadge({ stock }) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-600 border border-rose-500/20">
        Out of stock
      </span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 border border-amber-500/20">
        Low stock ({stock} left)
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 border border-emerald-500/20">
      <CheckCircle2 className="h-2.5 w-2.5" /> In stock
    </span>
  );
}

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const categoryMeta = CATEGORIES[product.category] || { name: product.category };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-slate-300">
      {/* Product Image Box */}
      <Link
        to={`/products/${product.slug}`}
        className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 block"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Brand Tag */}
        <span className="absolute top-3 left-3 rounded-lg bg-white/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-slate-800 shadow-sm border border-slate-200">
          {product.brand}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category & Stock */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {categoryMeta.name}
          </span>
          <StockBadge stock={product.stock} />
        </div>

        {/* Title */}
        <Link
          to={`/products/${product.slug}`}
          className="font-display font-bold text-slate-900 line-clamp-1 hover:text-brand-orange transition-colors text-base"
        >
          {product.name}
        </Link>

        {/* Short description */}
        <p className="mt-1 line-clamp-2 text-xs text-slate-500 leading-relaxed">
          {product.short}
        </p>

        {/* Price & Actions */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Price</span>
            <span className="font-display font-extrabold text-lg text-brand-navy">
              {inr(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              to={`/products/${product.slug}`}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-brand-navy hover:border-slate-300 hover:bg-slate-50 transition-colors"
              title="View specifications"
            >
              <Eye className="h-4 w-4" />
            </Link>

            <button
              onClick={() => addToCart(product, 1)}
              disabled={product.stock === 0}
              className="flex items-center gap-1.5 rounded-xl bg-brand-orange px-3.5 py-2 text-xs font-bold text-white hover:bg-brand-orangeHover disabled:opacity-40 disabled:cursor-not-allowed shadow-soft transition-all active:scale-95"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
