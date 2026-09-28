import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Wrench,
  Snowflake,
  Refrigerator,
  CheckCircle2,
  ShieldCheck,
  Truck,
  PhoneCall,
  MessageCircle,
  Search,
  Star,
  Zap,
  CalendarCheck,
  Clock,
  MapPin,
  HelpCircle,
  Camera,
  ChevronRight,
} from "lucide-react";
import { productApi, waLink, inr, STORE_INFO } from "../services/api";
import { ProductCard } from "../components/common/ProductCard";

export function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedSymptom, setSelectedSymptom] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    productApi.getAll().then((data) => {
      setProducts(data || []);
      setLoading(false);
    });
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleTagClick = (tag) => {
    navigate(`/products?search=${encodeURIComponent(tag)}`);
  };

  const filteredProducts =
    activeFilter === "all"
      ? products.slice(0, 8)
      : products.filter((p) => p.category === activeFilter).slice(0, 8);

  const categories = [
    {
      title: "Hardware & Power Tools",
      category: "hardware",
      desc: "Taparia pliers, screwdrivers, Stanley spanners, Bosch rotary drill bits & high-torque power drills. 10% OFF for new customers!",
      icon: Wrench,
      path: "/products?category=hardware",
      badge: "10% OFF NEW USERS",
      count: "Industrial Grade",
    },
    {
      title: "AC Spare Parts",
      category: "ac",
      desc: "Epcos dual-run capacitors, 24V contactors, outdoor condenser motors & copper flare nuts.",
      icon: Snowflake,
      path: "/products?category=ac",
      badge: "Epcos & Schneider",
      count: "Tested Capacitance",
    },
    {
      title: "Refrigerator Spares",
      category: "fridge",
      desc: "Original PTC start relays, overload protectors, defrost timers & Ranco thermostats.",
      icon: Refrigerator,
      path: "/products?category=fridge",
      badge: "Embraco & Ranco",
      count: "Zero Burnout Spares",
    },
    {
      title: "Repair & Services",
      category: "services",
      desc: "Certified HVAC technician doorstep visits for AC deep jet servicing & fridge diagnostics in Delhi NCR.",
      icon: CalendarCheck,
      path: "/services",
      badge: "Verified Technicians",
      count: "From ₹299 Visit",
    },
  ];

  // Common HVAC & Appliance Symptoms with Matching Spares
  const symptoms = [
    {
      title: "AC Fan Humming / Not Spinning",
      cause: "Blown or weak dual-run capacitor (loss of microfarad capacitance)",
      matchedPart: "Epcos 36+4 MFD AC Dual-Run Capacitor",
      price: "₹349",
      slug: "epcos-36-4-mfd-ac-dual-run-capacitor",
      actionText: "View Epcos Capacitor",
      actionLink: "/products/epcos-36-4-mfd-ac-dual-run-capacitor",
    },
    {
      title: "Fridge Clicking Every 2 Mins & Warm",
      cause: "Faulty PTC start relay or tripped overload protector",
      matchedPart: "Embraco PTC 1-Pin Refrigerator Compressor Start Relay",
      price: "₹180",
      slug: "embraco-ptc-1pin-fridge-compressor-start-relay",
      actionText: "View PTC Relay",
      actionLink: "/products/embraco-ptc-1pin-fridge-compressor-start-relay",
    },
    {
      title: "AC Unit Tripping MCB On Startup",
      cause: "Pitted 2-pole contactor contacts or coil burnout",
      matchedPart: "Schneider 2-Pole 32A AC Heavy Contactor",
      price: "₹650",
      slug: "schneider-2pole-32a-ac-heavy-contactor",
      actionText: "View Contactor",
      actionLink: "/products/schneider-2pole-32a-ac-heavy-contactor",
    },
    {
      title: "AC Not Cooling / Musty Smell",
      cause: "Clogged indoor cooling coils, blocked drain tray or low air throw",
      matchedPart: "AC Deep Jet Pressure Pump Servicing Visit",
      price: "₹499",
      slug: "",
      actionText: "Book Jet Servicing",
      actionLink: "/service-request",
    },
  ];

  const quickChips = [
    "Epcos 36+4 MFD",
    "PTC Relay",
    "Taparia Plier",
    "24V Contactor",
    "Defrost Sensor",
    "AC Jet Service",
  ];

  const testimonials = [
    {
      name: "Rakesh Sharma",
      role: "HVAC Contractor (Subhash Nagar)",
      text: "I purchase wholesale capacitors and contactors from Kumar Tools counter every week. Not a single duplicate piece in 3 years. When I install their Epcos capacitors, I have zero customer callbacks.",
      stars: 5,
    },
    {
      name: "Manoj Verma",
      role: "AC Technician (Khayala & Tilak Nagar)",
      text: "The best part is their WhatsApp photo matching. Whenever I am on a terrace facing an old damaged fridge relay, I snap a photo to Kumar Tools and they have the exact pin replacement ready.",
      stars: 5,
    },
    {
      name: "Pooja Malhotra",
      role: "Homeowner (Janakpuri)",
      text: "Booked an AC Jet Servicing through their website. The technician arrived on time with proper pressure equipment, transparent pricing, and cleaned the outdoor unit thoroughly. Highly recommended!",
      stars: 5,
    },
  ];

  return (
    <div className="space-y-16 pb-20 bg-slate-50">
      {/* ========================================================
          HERO SECTION: High-Contrast Navy Canvas with Orange Spark
          ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-dark via-brand-navy to-[#0F2942] text-white py-16 md:py-24 border-b border-slate-800">
        {/* Subtle orange radiant glow in background */}
        <div className="absolute -top-32 right-10 h-96 w-96 rounded-full bg-brand-orange/15 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-brand-blue/30 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text & Interactive Search */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Verified Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5 text-xs font-bold text-brand-orange tracking-wide shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Delhi NCR's Genuine Spares & Tools Counter</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08]">
              Precision Tools. <br />
              Genuine HVAC Spares. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#FF7700] to-amber-300">
                Zero Duplicates.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Industrial hand tools, replacement AC capacitors & contactors, refrigerator relays, and certified doorstep repair services for Delhi technicians and homes.
            </p>

            {/* Embedded Live Part Search Box */}
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl max-w-xl">
              <form onSubmit={handleHeroSearch} className="flex items-center gap-2">
                <div className="relative flex-1 flex items-center">
                  <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search part name, e.g. Epcos 36+4, PTC Relay, Plier..."
                    className="w-full bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm pl-10 pr-3 py-3 rounded-xl outline-none font-medium focus:ring-2 focus:ring-brand-orange"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-brand-orange hover:bg-brand-orangeHover text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all shadow-glow flex items-center gap-1.5 shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              {/* Quick Suggestion Chips */}
              <div className="pt-2 px-1 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-300">
                <span className="text-slate-400 font-semibold mr-1">Popular:</span>
                {quickChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleTagClick(chip)}
                    className="rounded-lg bg-white/10 hover:bg-brand-orange hover:text-white px-2.5 py-0.5 transition-colors font-medium text-slate-200"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* New Customer Discount Promo Ribbon */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-brand-orange/20 via-amber-500/15 to-transparent border border-brand-orange/40 backdrop-blur-md max-w-xl shadow-lg">
              <div className="h-10 w-10 rounded-xl bg-brand-orange text-white flex items-center justify-center font-black text-sm shrink-0 shadow-glow">
                10%
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white uppercase tracking-wider">
                    Hardware & Power Tools Special Offer
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-orange text-white animate-pulse">
                    NEW CUSTOMERS
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Get a flat <strong className="text-brand-orange font-bold">10% discount</strong> on all Hand Tools, Drill Bits & Power Tools. Apply coupon code <code className="bg-slate-950/80 px-1.5 py-0.5 rounded text-amber-300 font-mono font-bold">NEW10</code> at checkout!
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                to="/products"
                className="flex items-center justify-center gap-2 rounded-xl bg-brand-orange hover:bg-brand-orangeHover px-6 py-3.5 text-xs sm:text-sm font-black text-white shadow-glow transition-all"
              >
                <span>Browse Full Catalogue</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/service-request"
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 px-6 py-3.5 text-xs sm:text-sm font-bold text-white transition-all"
              >
                <CalendarCheck className="h-4 w-4 text-brand-orange" />
                <span>Book Technician Visit</span>
              </Link>
            </div>

            {/* Trust Metrics Pill Bar */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 sm:gap-4 text-[11px] sm:text-xs text-center sm:text-left">
              <div>
                <span className="font-display font-extrabold text-base sm:text-lg text-white block">100% OEM</span>
                <span className="text-slate-400">Pre-Tested Spares</span>
              </div>
              <div>
                <span className="font-display font-extrabold text-base sm:text-lg text-white block">Same Day</span>
                <span className="text-slate-400">Delhi NCR Dispatch</span>
              </div>
              <div>
                <span className="font-display font-extrabold text-base sm:text-lg text-white block">Trade Rates</span>
                <span className="text-slate-400">Registered Techs</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Logo Feature Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900/90 via-brand-navy to-brand-dark p-5 sm:p-8 shadow-2xl text-white">
              {/* Top Card Badge */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-[11px] font-bold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Khayala Counter Open
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  Mon – Sat: 10AM – 8PM
                </span>
              </div>

              {/* 3D Metallic Logo Visual Centerpiece */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-brand-orange/20 rounded-full blur-2xl group-hover:bg-brand-orange/30 transition-all" />
                  <img
                    src="/logo.jpg"
                    alt="Kumar Tools Official 3D Seal"
                    className="relative h-36 w-36 sm:h-44 sm:w-44 rounded-2xl object-contain bg-white p-2.5 shadow-2xl ring-2 ring-brand-orange/60"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-black text-2xl tracking-tight text-white flex items-center justify-center gap-1.5">
                    KUMAR <span className="text-brand-orange">TOOLS</span>
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Hardware & Power Tools • AC • Fridge Spares • Services
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
                  Direct OEM inventory counter in Khayala, Vishnu Garden. Tested continuity, capacitance & calibrated torque.
                </p>
              </div>

              {/* Floating Verified Badge */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-orange" />
                  <span className="font-bold text-white">Zero Duplicate Policy</span>
                </div>
                <Link
                  to="/about"
                  className="text-brand-orange hover:text-white font-bold flex items-center gap-1 transition-colors"
                >
                  <span>Our Heritage</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          THE 4 CORE PILLARS (Direct from the Logo Sub-Icons)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.title}
              to={c.path}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-soft hover:-translate-y-1.5 hover:shadow-card hover:border-brand-orange transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-brand-orangeLight text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors">
                    {c.badge}
                  </span>
                </div>

                <h3 className="font-display font-black text-lg text-slate-900 group-hover:text-brand-orange transition-colors">
                  {c.title}
                </h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-brand-orange transition-colors">
                <span>{c.count}</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE TROUBLESHOOTER: "Find Parts by Symptom"
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Instant Part Matcher
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mt-1">
                Diagnose by Appliance Symptom
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select what's wrong with your AC or refrigerator to find the exact tested replacement component.
              </p>
            </div>
            <a
              href={waLink("Hello Kumar Tools, my appliance has an issue and I need help matching a part.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 self-start sm:self-auto"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Ask Counter Tech on WhatsApp</span>
            </a>
          </div>

          {/* Interactive Symptom Selector Tabs */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {symptoms.map((s, idx) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setSelectedSymptom(idx)}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  selectedSymptom === idx
                    ? "border-brand-orange bg-brand-orangeLight/60 shadow-sm"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="h-6 w-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-slate-700">
                    {idx + 1}
                  </span>
                  {selectedSymptom === idx && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                      Selected
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                  {s.title}
                </h4>
              </button>
            ))}
          </div>

          {/* Diagnostic Result Card */}
          <div className="rounded-2xl bg-gradient-to-r from-brand-navy to-[#0F2942] p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-orange/20 px-3 py-0.5 text-[10px] font-bold text-brand-orange uppercase tracking-wider">
                Diagnosis & Solution
              </span>
              <h3 className="font-display font-black text-lg sm:text-xl text-white">
                {symptoms[selectedSymptom].matchedPart}
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                <b>Likely Cause:</b> {symptoms[selectedSymptom].cause}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Estimated Cost</span>
                <span className="font-display font-black text-xl text-brand-orange">
                  {symptoms[selectedSymptom].price}
                </span>
              </div>
              <Link
                to={symptoms[selectedSymptom].actionLink}
                className="flex items-center gap-2 rounded-xl bg-brand-orange hover:bg-brand-orangeHover px-5 py-3 text-xs font-black text-white shadow-glow transition-all"
              >
                <span>{symptoms[selectedSymptom].actionText}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FEATURED PRODUCTS: With Category Filter Tabs
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Catalogue Highlights
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mt-1">
              Popular Tools & HVAC Spares
            </h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "all", label: "All Items" },
              { id: "hardware", label: "Hardware Tools" },
              { id: "ac", label: "AC Spare Parts" },
              { id: "fridge", label: "Refrigerator Spares" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === tab.id
                    ? "bg-brand-navy text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-brand-orange hover:text-brand-orange"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="h-72 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* View All CTA */}
        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white hover:border-brand-orange hover:text-brand-orange px-6 py-3 text-xs font-bold text-slate-700 shadow-soft transition-all"
          >
            <span>View Full 12+ Spares & Tools Catalogue</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================
          DOORSTEP REPAIR & SERVICING PROPOSITION
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-soft grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orangeLight px-3 py-1 text-xs font-bold text-brand-orange">
              <CalendarCheck className="h-3.5 w-3.5" /> Certified Doorstep Service
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
              Need a Certified HVAC Technician to Visit Your Home?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Skip unverified local handymen. Our technicians carry original Kumar Tools tested spare parts and specialized equipment for high-pressure AC jet pump servicing, refrigerant leak tests, and refrigerator compressor repairs.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Transparent fixed pricing (No surprise costs)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>100% Genuine OEM replacement parts</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>High pressure jet pump coil cleaning</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Same-day visits across West Delhi & NCR</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/service-request"
                className="flex items-center justify-center gap-2 rounded-xl bg-brand-orange hover:bg-brand-orangeHover px-6 py-3 text-xs font-black text-white shadow-glow transition-all"
              >
                <span>Book Service Visit Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 px-6 py-3 text-xs font-bold text-slate-800 transition-colors"
              >
                <span>View Service Rate Card</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
              <Snowflake className="h-8 w-8 text-sky-500" />
              <h4 className="font-bold text-sm text-slate-900">AC Jet Wash</h4>
              <p className="text-[11px] text-slate-500">Pressure wash of coils, drain tray & outdoor unit.</p>
              <span className="font-display font-black text-brand-navy block text-sm">₹499 Fixed</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
              <Refrigerator className="h-8 w-8 text-emerald-500" />
              <h4 className="font-bold text-sm text-slate-900">Fridge Inspection</h4>
              <p className="text-[11px] text-slate-500">Cooling check, relay test & thermostat diagnosis.</p>
              <span className="font-display font-black text-brand-navy block text-sm">₹299 Visit</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
              <Zap className="h-8 w-8 text-brand-orange" />
              <h4 className="font-bold text-sm text-slate-900">Capacitor Replace</h4>
              <p className="text-[11px] text-slate-500">Dual run capacitor test & immediate installation.</p>
              <span className="font-display font-black text-brand-navy block text-sm">From ₹349 + Lab</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
              <ShieldCheck className="h-8 w-8 text-indigo-500" />
              <h4 className="font-bold text-sm text-slate-900">Gas Leak Check</h4>
              <p className="text-[11px] text-slate-500">Nitrogen testing & virgin R32/R410A charging.</p>
              <span className="font-display font-black text-brand-navy block text-sm">Custom Quote</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          TECHNICIAN & TRADE PERKS (Wholesale Counter)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-brand-navy text-white p-8 sm:p-10 shadow-xl grid md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <ShieldCheck className="h-8 w-8 text-brand-orange" />
            <h4 className="font-bold text-sm text-white">Multi-Meter Bench Tested</h4>
            <p className="text-xs text-slate-300">
              Every capacitor and relay is capacitance-tested on our digital meters before leaving the counter.
            </p>
          </div>

          <div className="space-y-2">
            <Truck className="h-8 w-8 text-sky-400" />
            <h4 className="font-bold text-sm text-white">Same-Day Delhi Dispatch</h4>
            <p className="text-xs text-slate-300">
              Urgent job delivery across West Delhi, Tilak Nagar, Subhash Nagar, and surrounding NCR areas.
            </p>
          </div>

          <div className="space-y-2">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            <h4 className="font-bold text-sm text-white">Wholesale Trade Rates</h4>
            <p className="text-xs text-slate-300">
              Carton discounts and GST invoices available for independent HVAC technicians and electricians.
            </p>
          </div>

          <div className="space-y-2">
            <PhoneCall className="h-8 w-8 text-brand-orange" />
            <h4 className="font-bold text-sm text-white">Direct Counter Helpline</h4>
            <p className="text-xs text-slate-300">
              Call or WhatsApp {STORE_INFO.phoneDisplay} for live stock verification and instant hold orders.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          VERIFIED TECHNICIAN & CUSTOMER REVIEWS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            Technician & Homeowner Trust
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900">
            Backed by Delhi's Repair Community
          </h2>
          <p className="text-xs text-slate-500">
            Real feedback from mechanics, contractors, and families who rely on our spares.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <h4 className="font-bold text-xs text-slate-900">{t.name}</h4>
                <p className="text-[11px] text-slate-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          WHATSAPP PART PHOTO MATCHER BANNER
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-brand-navy p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-900/40">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
              <Camera className="h-3.5 w-3.5" /> 2-Minute Part Match Guarantee
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              Can't identify the right capacitor, relay, or switch?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Don't guess and risk damaging your compressor. Take a photo of the old burnt part or your appliance model plate and send it to our WhatsApp counter. Our senior technicians will identify the exact replacement specs within 2 minutes!
            </p>
          </div>

          <a
            href={waLink("Hello Kumar Tools, I am sharing a photo of my old appliance part. Please help me match the exact replacement.")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg hover:scale-105 transition-all w-full sm:w-auto shrink-0"
          >
            <MessageCircle className="h-5 w-5 fill-current" />
            <span>Send Part Photo on WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
}
