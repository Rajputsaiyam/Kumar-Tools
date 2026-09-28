import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Search,
  Clock,
  CheckCircle2,
  Truck,
  Phone,
  MessageSquare,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { orderApi, STORE_INFO, inr, waLink } from "../services/api";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

export function OrderHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [savedPhone, setSavedPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    // Check if user has a stored phone number from a previous order
    const rememberedPhone = localStorage.getItem("kt_customer_phone") || "";
    if (rememberedPhone) {
      setSavedPhone(rememberedPhone);
      setSearchQuery(rememberedPhone);
      loadOrders(rememberedPhone);
    } else {
      // Check local storage for any browser-saved orders
      const local = orderApi.getLocalHistory();
      if (local && local.length > 0) {
        setOrders(local);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  const loadOrders = async (queryToUse) => {
    const q = (queryToUse || searchQuery).trim();
    if (!q) {
      const local = orderApi.getLocalHistory();
      setOrders(local);
      setLoading(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);
    try {
      const results = await orderApi.lookup(q);
      setOrders(Array.isArray(results) ? results : []);
      if (q.replace(/\D/g, "").length >= 10) {
        localStorage.setItem("kt_customer_phone", q.replace(/\D/g, "").slice(-10));
        setSavedPhone(q.replace(/\D/g, "").slice(-10));
      }
    } catch (err) {
      console.warn("Failed fetching order history:", err);
      toast.error("Could not load order history. Showing local records.");
      setOrders(orderApi.getLocalHistory());
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.info("Please enter your 10-digit mobile number or Order ID");
      return;
    }
    loadOrders(searchQuery.trim());
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setHasSearched(false);
    const local = orderApi.getLocalHistory();
    setOrders(local);
  };

  const handleReorder = (order) => {
    if (order.rawItems && order.rawItems.length > 0) {
      order.rawItems.forEach((item) => {
        addToCart(item, item.qty || 1);
      });
      toast.success(`Items from ${order.id} added to cart!`);
    } else {
      toast.info("Opening catalogue to reorder items.");
    }
  };

  const getStatusColor = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("delivered") || s.includes("completed")) {
      return {
        bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        badge: "bg-emerald-600",
        icon: CheckCircle2,
        label: "Delivered & Completed",
        step: 4,
      };
    }
    if (s.includes("ready") || s.includes("dispatch")) {
      return {
        bg: "bg-purple-50 text-purple-700 border-purple-200",
        badge: "bg-purple-600",
        icon: Truck,
        label: "Ready / Out for Delivery",
        step: 3,
      };
    }
    if (s.includes("confirmed") || s.includes("processing")) {
      return {
        bg: "bg-blue-50 text-blue-700 border-blue-200",
        badge: "bg-blue-600",
        icon: RefreshCw,
        label: "Confirmed & In Preparation",
        step: 2,
      };
    }
    return {
      bg: "bg-amber-50 text-amber-700 border-amber-200",
      badge: "bg-amber-500",
      icon: Clock,
      label: "Order Request Pending",
      step: 1,
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-brand-orange font-bold uppercase tracking-wider mb-1">
            <Package className="h-4 w-4" />
            <span>Kumar Tools & Refrigeration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
            My Orders & Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            View your past orders, inspect item details, check live fulfillment progress, or reorder genuine HVAC parts and hardware tools.
          </p>
        </div>

        {/* Lookup / Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm mb-8">
          <form onSubmit={handleSearchSubmit} className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Search Orders by Phone Number or Order ID
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter 10-digit mobile number (e.g. 9210797245) or Order ID (e.g. KT-ORD-1001)"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-brand-orange focus:bg-white transition-all font-mono"
                />
                <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="h-12 px-6 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-xs sm:text-sm font-bold shadow-glow transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>Find Orders</span>
                  </>
                )}
              </button>
            </div>

            {/* Active search or saved phone indicator */}
            {(savedPhone || hasSearched) && (
              <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>
                    Showing orders for: <strong className="text-slate-800 font-mono">{searchQuery || savedPhone}</strong>
                  </span>
                </div>
                {hasSearched && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="text-xs text-brand-orange hover:underline font-semibold"
                  >
                    Reset Search
                  </button>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Orders List Section */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse space-y-4">
                <div className="h-5 bg-slate-200 rounded w-1/4" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
                <div className="h-12 bg-slate-50 rounded" />
              </div>
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Found <strong className="text-slate-900 font-bold">{orders.length}</strong> previous order{orders.length === 1 ? "" : "s"}</span>
              <span>Sorted newest first</span>
            </div>

            {orders.map((order) => {
              const statusInfo = getStatusColor(order.status);
              const StatusIcon = statusInfo.icon;
              const waText = `Hello Kumar Tools, I would like an update on my order ${order.id} (${inr(order.total)}).`;

              return (
                <div
                  key={order.id || order._id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Card Header */}
                  <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-5 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-brand-navy flex items-center justify-center text-brand-orange font-mono font-bold text-xs shadow-sm shrink-0">
                        KT
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-black text-xs sm:text-sm text-slate-900">
                            {order.id}
                          </span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border ${statusInfo.bg}`}>
                            <StatusIcon className="h-3 w-3" />
                            {order.status || "Pending"}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Placed on: {order.date || (order.createdAt ? order.createdAt.split("T")[0] : "Recent")}
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 flex sm:block items-center justify-between">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-500 block">Total Amount</span>
                      <span className="font-display font-black text-sm sm:text-base text-slate-900">
                        {inr(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress Stepper */}
                  <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-slate-100 bg-white">
                    <div className="grid grid-cols-4 gap-1 sm:gap-2 text-center">
                      {[
                        { num: 1, label: "Received" },
                        { num: 2, label: "Confirmed" },
                        { num: 3, label: "Ready / Transit" },
                        { num: 4, label: "Completed" },
                      ].map((step) => {
                        const isDone = statusInfo.step >= step.num;
                        const isCurrent = statusInfo.step === step.num;
                        return (
                          <div key={step.num} className="flex flex-col items-center">
                            <div
                              className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 transition-all ${
                                isDone
                                  ? "bg-brand-orange text-white"
                                  : "bg-slate-100 text-slate-400"
                              } ${isCurrent ? "ring-2 ring-brand-orange/40 ring-offset-1" : ""}`}
                            >
                              {isDone ? "✓" : step.num}
                            </div>
                            <span className={`text-[10px] leading-tight ${isDone ? "font-bold text-slate-800" : "text-slate-400"}`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4">
                    {/* Customer & Address Details */}
                    <div className="grid sm:grid-cols-2 gap-3 text-xs bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-slate-500 block text-[11px]">Customer:</span>
                        <strong className="text-slate-800">{order.customer}</strong>
                        <span className="font-mono text-slate-600 block mt-0.5">{order.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Fulfillment:</span>
                        <div className="flex items-start gap-1 text-slate-800 mt-0.5">
                          <MapPin className="h-3.5 w-3.5 text-brand-orange shrink-0 mt-0.5" />
                          <span>{order.address || `Store Counter Pickup (${STORE_INFO.address})`}</span>
                        </div>
                      </div>
                    </div>

                    {/* Items List */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Ordered Items
                      </h4>
                      {order.rawItems && order.rawItems.length > 0 ? (
                        <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                          {order.rawItems.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 text-xs bg-white">
                              <div>
                                <span className="font-semibold text-slate-800">{item.name}</span>
                                <span className="text-slate-500 block text-[11px]">Qty: {item.qty} × {inr(item.price)}</span>
                              </div>
                              <span className="font-bold text-slate-900 font-mono">
                                {inr((Number(item.price) || 0) * (Number(item.qty) || 1))}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-xl border border-slate-100 bg-white p-3 text-xs text-slate-700">
                          {order.items}
                        </div>
                      )}
                    </div>

                    {/* Actions Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={waLink(waText)}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2.5 shadow-sm transition-all"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Track on WhatsApp</span>
                        </a>

                        <a
                          href={`tel:${STORE_INFO.phone}`}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium px-3 py-2.5 transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5 text-brand-orange" />
                          <span>Call Helpline</span>
                        </a>
                      </div>

                      {order.rawItems && order.rawItems.length > 0 && (
                        <button
                          onClick={() => handleReorder(order)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-brand-orange/30 bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange text-xs font-bold px-3.5 py-2.5 transition-colors"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                          <span>Reorder All Items</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 text-center max-w-xl mx-auto shadow-sm">
            <div className="h-16 w-16 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8" />
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 mb-2">
              {hasSearched ? "No Orders Found" : "Track Your Previous Orders"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              {hasSearched
                ? `We could not find any order records matching "${searchQuery}". Please check the phone number or Order ID and try again.`
                : "Enter your 10-digit mobile number above to see all previous orders placed for hardware tools and HVAC spare parts."}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold px-5 py-2.5 shadow-glow transition-all text-center"
              >
                <span>Browse Product Catalogue</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-4 py-2.5 transition-colors text-center"
              >
                <Phone className="h-3.5 w-3.5 text-brand-orange" />
                <span>Call Store Helpline</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
