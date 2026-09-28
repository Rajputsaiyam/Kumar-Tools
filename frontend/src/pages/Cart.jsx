import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Truck,
  MessageCircle,
  Tag,
  Package,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { inr, waLink, orderApi } from "../services/api";

export function Cart() {
  const { items, updateQty, removeFromCart, subtotal, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // New Customer 10% Discount Coupon
  const [couponCode, setCouponCode] = useState("NEW10");
  const [appliedCoupon, setAppliedCoupon] = useState({ code: "NEW10", percent: 10 });

  // Calculate discount (10% on hardware & power tools, or order subtotal)
  const hardwareSubtotal = items
    .filter(
      (i) =>
        i.category === "hardware" ||
        (i.name &&
          (i.name.toLowerCase().includes("drill") ||
            i.name.toLowerCase().includes("plier") ||
            i.name.toLowerCase().includes("screwdriver") ||
            i.name.toLowerCase().includes("wrench") ||
            i.name.toLowerCase().includes("tool")))
    )
    .reduce((sum, i) => sum + (Number(i.price) || 0) * (Number(i.qty) || 1), 0);

  const discountAmount =
    appliedCoupon?.code === "NEW10"
      ? Math.round((hardwareSubtotal > 0 ? hardwareSubtotal : subtotal) * 0.1)
      : 0;

  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || phone.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid customer name and 10-digit phone number");
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customer: customerName.trim(),
        phone: phone.trim(),
        address: address.trim() || "Store Counter Pickup (Khayala)",
        items: items.map((i) => `${i.name} × ${i.qty}`).join(", "),
        itemsList: items.map((i) => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
        total: finalTotal,
      };

      const newOrder = await orderApi.create(orderPayload);
      setConfirmedOrder({ ...newOrder, discount: discountAmount });

      // Open WhatsApp link with prefilled order details
      const itemsText = items.map((i) => `• ${i.name} × ${i.qty} (${inr(i.price * i.qty)})`).join("\n");
      const discountText = discountAmount > 0 ? `\n🎉 New Customer Discount (10%): -${inr(discountAmount)}` : "";
      const msg = `Kumar Tools Order Request: ${newOrder.id}\n\nCustomer: ${customerName}\nPhone: ${phone}\nAddress: ${address || "Store Pickup"}\n\nItems:\n${itemsText}${discountText}\n\nNet Total: ${inr(finalTotal)}`;
      window.open(waLink(msg), "_blank");

      clearCart();
      toast.success(`Order ${newOrder.id} placed! Autonomous AI WhatsApp confirmation dispatched.`);
    } catch (err) {
      toast.error("Failed to submit order request");
    } finally {
      setLoading(false);
    }
  };

  if (confirmedOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-500/5">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            Order Request Logged
          </span>
          <h1 className="font-display font-black text-3xl text-slate-900">
            Order Confirmed!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Order ID: <b className="text-slate-900 font-mono">{confirmedOrder.id}</b>. Your order has been registered in our system and an automated AI WhatsApp notification has been dispatched to our service team.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 bg-white text-left text-xs space-y-2 shadow-soft">
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Customer:</span>
            <span className="font-bold text-slate-900">{confirmedOrder.customer}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Phone:</span>
            <span className="font-mono text-slate-900">{confirmedOrder.phone}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Total:</span>
            <span className="font-bold text-slate-900">{inr(confirmedOrder.total)}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-slate-500">Payment:</span>
            <span className="text-emerald-600 font-semibold">Cash or UPI upon delivery / pickup</span>
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-4">
          <Link
            to="/products"
            className="rounded-xl bg-brand-orange px-5 py-3 text-xs font-bold text-white hover:bg-brand-orangeHover shadow-sm"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
          >
            <Package className="h-4 w-4 text-brand-orange" />
            <span>Track in My Orders</span>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <ShoppingCart className="mx-auto h-16 w-16 text-slate-300" />
        <h1 className="font-display font-black text-2xl text-slate-900">Your cart is empty</h1>
        <p className="text-xs text-slate-500">
          Looks like you haven't added any tools or HVAC spare parts yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-xs font-bold text-white hover:bg-brand-orangeHover shadow-sm transition-all"
        >
          <span>Browse Catalogue</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Checkout</span>
        <h1 className="font-display font-black text-3xl text-slate-900 mt-1">Review Your Cart</h1>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
        {/* Cart Items Table */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-soft overflow-hidden divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.id} className="p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${item.slug}`}
                      className="font-display font-bold text-xs sm:text-sm text-slate-900 hover:text-brand-orange transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{item.sku}</p>
                    <p className="text-xs font-bold text-brand-dark mt-0.5 sm:mt-1">{inr(item.price)} each</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  {/* Qty controller */}
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="p-1.5 text-slate-500 hover:text-slate-900"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-extrabold text-slate-900">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="p-1.5 text-slate-500 hover:text-slate-900"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="text-right sm:w-24">
                    <span className="font-display font-extrabold text-xs sm:text-sm text-slate-900">
                      {inr(item.price * item.qty)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center px-2">
            <button
              onClick={clearCart}
              className="text-xs text-slate-400 hover:text-rose-600 transition-colors"
            >
              Clear entire cart
            </button>
            <Link to="/products" className="text-xs font-bold text-brand-orange hover:underline">
              ← Add more tools/spares
            </Link>
          </div>
        </div>

        {/* Order Summary & Customer Info */}
        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft space-y-6 sticky top-24">
          <h3 className="font-display font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
            Order Summary
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Items Total ({items.reduce((a, b) => a + b.qty, 0)})</span>
              <span className="font-bold text-slate-900">{inr(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                <span className="flex items-center gap-1">
                  <Tag className="h-3 w-3" /> 10% New Customer Discount
                </span>
                <span>-{inr(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>Delhi Shipping / Pickup</span>
              <span className="font-bold text-emerald-600">Confirmed on Call</span>
            </div>

            <div className="flex justify-between text-sm font-extrabold text-brand-navy pt-3 border-t border-slate-100">
              <span>Net Payable</span>
              <span className="text-xl text-brand-orange">{inr(finalTotal)}</span>
            </div>
          </div>

          {/* New Customer Promo Code Card */}
          <div className="rounded-xl border border-brand-orange/40 bg-gradient-to-r from-brand-orange/5 via-amber-500/5 to-transparent p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-brand-orange" />
                Hardware & Power Tools Offer
              </span>
              <span className="text-[10px] font-mono font-bold bg-brand-orange text-white px-2 py-0.5 rounded-full">
                NEW10
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              10% discount on all Hand & Power Tools for new customers!
            </p>
            {appliedCoupon ? (
              <div className="flex items-center justify-between text-xs text-emerald-700 font-bold bg-emerald-100/70 px-2.5 py-1.5 rounded-lg border border-emerald-300">
                <span>✓ Coupon NEW10 Active</span>
                <button
                  type="button"
                  onClick={() => {
                    setAppliedCoupon(null);
                    toast.info("Coupon removed");
                  }}
                  className="text-rose-500 hover:underline text-[11px] font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAppliedCoupon({ code: "NEW10", percent: 10 });
                  toast.success("Coupon NEW10 applied! 10% discount added.");
                }}
                className="w-full py-1.5 rounded-lg bg-brand-orange text-white text-xs font-bold hover:bg-brand-orangeHover shadow-sm transition-all"
              >
                Apply 10% Discount
              </button>
            )}
          </div>

          {/* Customer form */}
          <form onSubmit={handleCheckout} className="space-y-3 pt-2">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Your Full Name *
              </label>
              <input
                required
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Saiyam Rajput"
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Mobile Number *
              </label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 98XXXXXXXX"
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Delivery Address or Store Pickup
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ravi Nagar Extension, Vishnu Garden / Counter Pickup..."
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !customerName || phone.length < 10}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white py-3.5 text-xs font-black shadow-glow disabled:opacity-40 transition-all active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{loading ? "Logging Order..." : "Send Order Request via WhatsApp"}</span>
            </button>

            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
              No immediate online card payment needed. Our workshop will call you within 15–30 mins to confirm delivery and stock availability.
            </p>
          </form>
        </aside>
      </div>
    </div>
  );
}
