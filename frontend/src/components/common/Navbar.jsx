import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Wrench,
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  PhoneCall,
  CalendarCheck,
  ShieldCheck,
  Package,
  MessageCircle,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { STORE_INFO, CATEGORIES, waLink } from "../../services/api";

export function Navbar() {
  const { count } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [prodDropdown, setProdDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-brand-navy/95 backdrop-blur-md border-b border-slate-800 text-white shadow-md">
      {/* Top micro announcement bar */}
      <div className="bg-brand-dark border-b border-slate-800/80 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 text-brand-orange font-bold">
              ⚡ NEW CUSTOMER OFFER: Flat 10% OFF on Hardware & Power Tools! Use code:{" "}
              <span className="bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-1.5 py-0.5 rounded font-mono font-black text-[10px] sm:text-xs">
                NEW10
              </span>
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="hidden md:inline">Khayala & Vishnu Garden, Delhi NCR</span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="flex items-center gap-1 hover:text-brand-orange transition-colors font-medium text-[11px] sm:text-xs"
            >
              <PhoneCall className="h-3 w-3 text-brand-orange" />
              <span>Helpline: {STORE_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <img
            src="/logo.jpg"
            alt="Kumar Tools Logo"
            className="h-11 w-11 rounded-xl object-contain bg-white p-0.5 shadow-glow ring-2 ring-brand-orange/40 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-display font-black text-lg sm:text-xl tracking-tight leading-tight flex items-center gap-1.5">
              KUMAR <span className="text-brand-orange">TOOLS</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium hidden sm:block">
              Hardware & Power Tools • AC & Fridge Spares
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <Link
            to="/"
            className={`hover:text-brand-orange transition-colors ${
              isActive("/") ? "text-brand-orange font-bold" : ""
            }`}
          >
            Home
          </Link>

          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProdDropdown(true)}
            onMouseLeave={() => setProdDropdown(false)}
          >
            <Link
              to="/products"
              className={`flex items-center gap-1 hover:text-brand-orange transition-colors ${
                location.pathname.startsWith("/products") ? "text-brand-orange font-bold" : ""
              }`}
            >
              Catalogue <ChevronDown className="h-4 w-4" />
            </Link>

            {prodDropdown && (
              <div className="absolute left-0 top-full pt-2 w-56">
                <div className="bg-brand-navy border border-slate-700/80 rounded-xl shadow-2xl p-2 space-y-1">
                  <Link
                    to="/products"
                    className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-brand-orange transition-colors"
                  >
                    All Products
                  </Link>
                  <Link
                    to="/products?category=hardware"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-brand-orange transition-colors"
                  >
                    <span>Hardware & Power Tools</span>
                    <span className="text-[9px] bg-brand-orange/20 text-brand-orange px-1.5 py-0.5 rounded font-bold">10% OFF</span>
                  </Link>
                  <Link
                    to="/products?category=ac"
                    className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-brand-orange transition-colors"
                  >
                    AC Spare Parts
                  </Link>
                  <Link
                    to="/products?category=fridge"
                    className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-brand-orange transition-colors"
                  >
                    Refrigerator Parts
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/services"
            className={`hover:text-brand-orange transition-colors ${
              isActive("/services") ? "text-brand-orange font-bold" : ""
            }`}
          >
            Repair Services
          </Link>
          <Link
            to="/orders"
            className={`hover:text-brand-orange transition-colors flex items-center gap-1 ${
              isActive("/orders") ? "text-brand-orange font-bold" : ""
            }`}
          >
            <Package className="h-3.5 w-3.5 text-brand-orange" />
            <span>My Orders</span>
          </Link>
          <Link
            to="/about"
            className={`hover:text-brand-orange transition-colors ${
              isActive("/about") ? "text-brand-orange font-bold" : ""
            }`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`hover:text-brand-orange transition-colors ${
              isActive("/contact") ? "text-brand-orange font-bold" : ""
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Action Icons & Search */}
        <div className="flex items-center gap-2.5">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setSearchOpen(false)}
                placeholder="Search tools, capacitors..."
                className="h-9 w-32 xs:w-44 sm:w-60 rounded-lg bg-slate-800 border border-slate-700 pl-3 pr-8 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-orange transition-all"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-2 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-slate-300 hover:text-brand-orange hover:bg-slate-800/80 rounded-lg transition-colors"
              title="Search catalogue"
            >
              <Search className="h-5 w-5" />
            </button>
          )}

          {/* Cart Icon Button */}
          <Link
            to="/cart"
            className="relative p-2 text-slate-300 hover:text-brand-orange hover:bg-slate-800/80 rounded-lg transition-colors"
            title="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-black text-white animate-pulse">
                {count}
              </span>
            )}
          </Link>

          {/* Request Service CTA */}
          <Link
            to="/service-request"
            className="hidden sm:flex items-center gap-1.5 rounded-lg bg-brand-orange hover:bg-brand-orangeHover px-3.5 py-2 text-xs font-black text-white shadow-glow transition-all"
          >
            <CalendarCheck className="h-4 w-4" />
            <span>Book Service</span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-brand-navy/98 px-5 py-5 space-y-4">
          <nav className="flex flex-col gap-3 text-sm font-semibold">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-orange transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-orange transition-colors"
            >
              All Products
            </Link>
            <Link
              to="/products?category=hardware"
              onClick={() => setMobileMenuOpen(false)}
              className="pl-3 text-xs text-slate-400 hover:text-brand-orange flex items-center justify-between"
            >
              <span>• Hardware & Power Tools</span>
              <span className="text-[9px] bg-brand-orange/20 text-brand-orange px-1.5 py-0.5 rounded font-bold">10% OFF</span>
            </Link>
            <Link
              to="/products?category=ac"
              onClick={() => setMobileMenuOpen(false)}
              className="pl-3 text-xs text-slate-400 hover:text-brand-orange"
            >
              • AC Spare Parts
            </Link>
            <Link
              to="/products?category=fridge"
              onClick={() => setMobileMenuOpen(false)}
              className="pl-3 text-xs text-slate-400 hover:text-brand-orange"
            >
              • Refrigerator Parts
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-orange transition-colors"
            >
              Repair & Servicing
            </Link>
            <Link
              to="/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-orange transition-colors flex items-center justify-between"
            >
              <span>My Orders & Tracking</span>
              <span className="text-[10px] bg-brand-orange/20 text-brand-orange px-2 py-0.5 rounded font-bold">History</span>
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-orange transition-colors"
            >
              About Kumar Tools
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-orange transition-colors"
            >
              Store Contact
            </Link>
          </nav>

          <Link
            to="/service-request"
            onClick={() => setMobileMenuOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange py-2.5 text-xs font-black text-white shadow-glow"
          >
            <CalendarCheck className="h-4 w-4" /> Book a Service Visit
          </Link>

          <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition-colors"
            >
              <PhoneCall className="h-3.5 w-3.5 text-brand-orange" />
              <span>Call Helpline</span>
            </a>
            <a
              href={waLink("Hello Kumar Tools, I need assistance with tools or spare parts.")}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 py-2.5 text-xs font-bold text-white transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
