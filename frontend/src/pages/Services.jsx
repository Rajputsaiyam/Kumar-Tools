import React from "react";
import { Link } from "react-router-dom";
import {
  Wrench,
  Snowflake,
  Refrigerator,
  CheckCircle2,
  CalendarCheck,
  ShieldCheck,
  PhoneCall,
  Clock,
} from "lucide-react";
import { waLink, STORE_INFO } from "../services/api";

export function Services() {
  const acServices = [
    {
      title: "AC Deep Jet Servicing",
      price: "₹499",
      desc: "High-pressure jet pump cleaning of indoor cooling coil, blower, drain tray and outdoor condenser.",
      highlights: ["Improves cooling efficiency", "Removes odor & bacteria", "Checks refrigerant gas pressure"],
    },
    {
      title: "AC Capacitor & Contactor Repair",
      price: "From ₹349 + Labour",
      desc: "Diagnosis and replacement of blown dual-run capacitors or pitted contactor switches causing outdoor trip.",
      highlights: ["Genuine Epcos/Schneider parts", "Tested microfarad ratings", "Immediate on-site replacement"],
    },
    {
      title: "AC Gas Leakage & Charging",
      price: "Custom Estimate",
      desc: "Nitrogen pressure testing, brazing of copper hairline leaks, vacuuming and pure R32/R410A refrigerant gas charging.",
      highlights: ["Electronic leak testing", "100% pure virgin gas", "Cooling temperature guarantee"],
    },
  ];

  const fridgeServices = [
    {
      title: "Refrigerator Cooling Issue Checkup",
      price: "₹299 Inspection",
      desc: "Full inspection when freezer works but lower compartment is warm, or ice forms on the back coil.",
      highlights: ["Defrost sensor inspection", "Evaporator fan testing", "Thermal fuse check"],
    },
    {
      title: "Compressor Starting Relay & Overload",
      price: "From ₹249 + Labour",
      desc: "Fixes compressor clicking/humming sound when the fridge fails to turn on and cool.",
      highlights: ["Original Embraco PTC relays", "Prevents compressor burnout", "Same-day technician visit"],
    },
    {
      title: "Thermostat Replacement",
      price: "From ₹399 + Labour",
      desc: "Replacement of faulty mechanical thermostats causing continuous running, food freezing, or no cooling.",
      highlights: ["Ranco mechanical controllers", "Calibrated temperature cutoff", "Single & double door fridges"],
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-brand-dark via-brand-navy to-[#0F2942] text-white py-16 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-3.5 py-1 text-xs font-bold text-brand-orange uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5" /> Doorstep Technician Visits in Delhi NCR
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight">
            AC & Refrigerator Repair Services
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Professional appliance servicing by certified HVAC technicians with authentic spare parts from our own store counter in Khayala.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
            <Link
              to="/service-request"
              className="flex items-center justify-center gap-2 rounded-xl bg-brand-orange hover:bg-brand-orangeHover px-6 py-3 text-xs font-black text-white shadow-glow transition-all"
            >
              <CalendarCheck className="h-4 w-4" /> Book a Service Visit
            </Link>
            <a
              href={waLink("Hello Kumar Tools, I want to book an appliance service visit.")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-6 py-3 text-xs font-bold text-white border border-slate-700 transition-all"
            >
              <span>Consult on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* AC Services Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="border-b border-slate-200 pb-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
            <Snowflake className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display font-black text-2xl text-slate-900">
              Air Conditioner Repair & Servicing
            </h2>
            <p className="text-xs text-slate-500">Split AC, Window AC, Inverter ACs across Delhi</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {acServices.map((s) => (
            <div key={s.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-slate-900">{s.title}</h3>
                </div>
                <div className="text-xl font-extrabold text-brand-dark">{s.price}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  {s.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Link
                  to={`/service-request?device=AC&service=${encodeURIComponent(s.title)}`}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white py-2.5 text-xs font-bold transition-all"
                >
                  <CalendarCheck className="h-4 w-4" /> Book this service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Refrigerator Services Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="border-b border-slate-200 pb-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-orangeLight text-brand-orange flex items-center justify-center">
            <Refrigerator className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display font-black text-2xl text-slate-900">
              Refrigerator Repair & Diagnostics
            </h2>
            <p className="text-xs text-slate-500">Single door, double door, frost-free fridges</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {fridgeServices.map((s) => (
            <div key={s.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-slate-900">{s.title}</h3>
                </div>
                <div className="text-xl font-extrabold text-brand-navy">{s.price}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  {s.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Link
                  to={`/service-request?device=Refrigerator&service=${encodeURIComponent(s.title)}`}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-navy hover:bg-slate-800 text-white py-2.5 text-xs font-bold transition-all shadow-sm"
                >
                  <CalendarCheck className="h-4 w-4 text-brand-orange" /> Book this service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose Kumar Tools */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-soft space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Quality Assurance
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mt-1">
              Why Book With Kumar Tools?
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <ShieldCheck className="h-6 w-6 text-brand-orange" />
              <h3 className="font-bold text-sm text-slate-900">Direct Store Counter Spares</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Technicians do not use cheap duplicate spares; they bring genuine components directly from our Khayala shop.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <Clock className="h-6 w-6 text-sky-500" />
              <h3 className="font-bold text-sm text-slate-900">On-Time Scheduled Slots</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Select morning, afternoon, or evening slots. Our technician calls before arrival.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <Wrench className="h-6 w-6 text-emerald-500" />
              <h3 className="font-bold text-sm text-slate-900">Calibrated Testing Tools</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We verify capacitor microfarad ratings and compressor running amps with genuine digital meters on-site.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
