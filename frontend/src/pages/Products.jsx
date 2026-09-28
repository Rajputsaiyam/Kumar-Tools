import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, X, SlidersHorizontal, PackageSearch } from "lucide-react";
import { productApi, CATEGORIES, inr } from "../services/api";
import { ProductCard } from "../components/common/ProductCard";

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const categoryParam = searchParams.get("category") || "all";
  const searchParam = searchParams.get("search") || "";

  const [selectedCat, setSelectedCat] = useState(categoryParam);
  const [query, setQuery] = useState(searchParam);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(2500);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setSelectedCat(searchParams.get("category") || "all");
    if (searchParams.get("search")) {
      setQuery(searchParams.get("search"));
    }
  }, [searchParams]);

  useEffect(() => {
    productApi.getAll().then((data) => {
      setProducts(data || []);
      setLoading(false);
    });
  }, []);

  const allBrands = useMemo(() => {
    return [...new Set(products.map((p) => p.brand).filter(Boolean))];
  }, [products]);

  const toggleBrand = (b) => {
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCat !== "all" && p.category !== selectedCat) return false;
      // Search filter
      if (query.trim()) {
        const q = query.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.short.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }
      // Price filter
      if (p.price > maxPrice) return false;
      // In stock filter
      if (inStockOnly && p.stock <= 0) return false;

      return true;
    });
  }, [products, selectedCat, query, selectedBrands, maxPrice, inStockOnly]);

  const clearAllFilters = () => {
    setSelectedCat("all");
    setQuery("");
    setSelectedBrands([]);
    setMaxPrice(2500);
    setInStockOnly(false);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            Inventory & Catalogue
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 mt-1">
            Browse All Tools & Spares
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing {filteredProducts.length} verified products available for Delhi NCR pickup and shipping.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search screwdriver, capacitor..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 shadow-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => {
            setSelectedCat("all");
            setSearchParams({});
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCat === "all"
              ? "bg-brand-navy text-white shadow-sm"
              : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
          }`}
        >
          All Items ({products.length})
        </button>

        {Object.entries(CATEGORIES).map(([k, c]) => (
          <button
            key={k}
            onClick={() => {
              setSelectedCat(k);
              setSearchParams({ category: k });
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCat === k
                ? "bg-brand-orange text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            {c.name}
          </button>
        ))}

        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="lg:hidden ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-brand-orange" />
          <span>Filters</span>
        </button>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside
          className={`${
            mobileFilterOpen ? "block" : "hidden"
          } lg:block space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sticky top-24`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
              <Filter className="h-4 w-4 text-brand-orange" /> Filters
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-semibold text-slate-400 hover:text-brand-orange transition-colors"
              >
                Reset all
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="lg:hidden p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                aria-label="Close filters"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Brands */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Brand
            </h4>
            <div className="space-y-2">
              {allBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="rounded text-brand-orange focus:ring-brand-orange/30 h-4 w-4"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-400">Max Price</span>
              <span className="font-extrabold text-brand-navy">{inr(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={100}
              max={2500}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-orange cursor-pointer"
            />
          </div>

          {/* In Stock Only */}
          <div className="pt-3 border-t border-slate-100">
            <label className="flex items-center gap-2.5 text-xs font-bold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-brand-orange focus:ring-brand-orange/30 h-4 w-4"
              />
              <span>In-stock items only</span>
            </label>
          </div>

          {/* Mobile Apply Button */}
          <div className="pt-3 lg:hidden">
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 rounded-xl bg-brand-orange text-white text-xs font-bold shadow-soft hover:bg-brand-orangeHover transition-all text-center"
            >
              Show {filteredProducts.length} Result{filteredProducts.length === 1 ? "" : "s"}
            </button>
          </div>
        </aside>

        {/* Product Cards Grid */}
        <div>
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center rounded-2xl border border-dashed border-slate-300 bg-white p-8">
              <PackageSearch className="mx-auto h-12 w-12 text-slate-300 mb-3" />
              <h3 className="font-display font-bold text-lg text-slate-800">
                No matching products found
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                We couldn't find any products matching your active filters. Try clearing your search query or reset filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-5 rounded-xl bg-brand-orange text-white px-4 py-2 text-xs font-bold hover:bg-brand-orangeHover transition-all shadow-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
