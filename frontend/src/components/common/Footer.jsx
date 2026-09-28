import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Wrench, Snowflake, Refrigerator } from "lucide-react";
import { STORE_INFO, CATEGORIES } from "../../services/api";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="Kumar Tools Logo"
              className="h-10 w-10 rounded-xl object-contain bg-white p-0.5 shadow-glow ring-2 ring-brand-orange/40"
            />
            <span className="font-display font-black text-xl text-white tracking-tight">
              KUMAR <span className="text-brand-orange">TOOLS</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Delhi's trusted counter for genuine hardware tools, AC & refrigerator spare parts, and certified technician repair services.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Guaranteed Genuine OEM Components</span>
          </div>
        </div>

        {/* Product Categories */}
        <div>
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-brand-orange pl-2">
            Spare Parts & Tools
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/products?category=hardware" className="hover:text-brand-orange transition-colors flex items-center gap-2">
                <Wrench className="h-3.5 w-3.5 text-brand-orange" /> Hardware Tools
              </Link>
            </li>
            <li>
              <Link to="/products?category=ac" className="hover:text-brand-orange transition-colors flex items-center gap-2">
                <Snowflake className="h-3.5 w-3.5 text-brand-cyan" /> AC Spare Parts
              </Link>
            </li>
            <li>
              <Link to="/products?category=fridge" className="hover:text-brand-orange transition-colors flex items-center gap-2">
                <Refrigerator className="h-3.5 w-3.5 text-brand-orange" /> Refrigerator Parts
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-brand-orange transition-colors text-slate-400">
                View All Catalog →
              </Link>
            </li>
          </ul>
        </div>

        {/* Company & Support */}
        <div>
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-brand-orange pl-2">
            Services & Company
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/services" className="hover:text-brand-orange transition-colors">
                AC & Refrigerator Repair
              </Link>
            </li>
            <li>
              <Link to="/service-request" className="hover:text-brand-orange transition-colors">
                Book a Technician Visit
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-brand-orange transition-colors font-semibold text-brand-orange">
                Track Previous Orders →
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-brand-orange transition-colors">
                About Kumar Tools
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-brand-orange transition-colors">
                Contact & Store Location
              </Link>
            </li>
          </ul>
        </div>

        {/* Store Location & Helpline */}
        <div>
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-brand-orange pl-2">
            Store & Helpline
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
              <span className="text-slate-300">{STORE_INFO.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-brand-orange shrink-0" />
              <a href={`tel:${STORE_INFO.phone}`} className="hover:text-brand-orange transition-colors font-medium">
                {STORE_INFO.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-brand-orange shrink-0" />
              <span className="text-slate-300">{STORE_INFO.email}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-brand-orange shrink-0" />
              <span className="text-slate-400">{STORE_INFO.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800/80 py-4 px-4 text-center text-xs text-slate-500 bg-brand-dark">
        © {new Date().getFullYear()} Kumar Tools & Refrigeration. All rights reserved. • Built for Delhi Technicians & Homes.
      </div>
    </footer>
  );
}
