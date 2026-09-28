import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Wrench, Snowflake, Users, Award, MapPin, ArrowRight } from "lucide-react";
import { STORE_INFO } from "../services/api";

export function About() {
  return (
    <div className="space-y-16 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-brand-dark via-brand-navy to-[#0F2942] text-white py-16 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            Serving Delhi Technicians & Homes
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight">
            About Kumar Tools & Refrigeration
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Founded with a singular mission: providing genuine, tested hardware tools and HVAC spare parts with transparent pricing and certified technical support.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Our Story</span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900">
            Built on Technician Trust & Genuine Spares
          </h2>
          <p>
            Operating from <b>{STORE_INFO.address}</b>, Kumar Tools started as a neighborhood HVAC specialist counter. We recognized that technicians and homeowners were frustrated with duplicate capacitors, substandard relays, and counterfeit hand tools that failed within weeks.
          </p>
          <p>
            We established direct relationships with trusted brands like <b>Taparia, Stanley, Bosch, Epcos, Schneider, Embraco, and Ranco</b>. Every component that leaves our counter is bench-tested for continuity and capacitance.
          </p>
          <p>
            Today, hundreds of HVAC technicians and electricians across West Delhi and NCR rely on Kumar Tools for their daily job parts, while families trust our doorstep repair team for honest appliance fixes.
          </p>
        </div>

        <div className="relative rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 via-brand-navy to-brand-dark p-8 sm:p-10 text-white shadow-2xl flex flex-col items-center justify-center text-center space-y-6">
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-orange/20 rounded-full blur-2xl animate-pulse" />
            <img
              src="/logo.jpg"
              alt="Kumar Tools Official Seal"
              className="relative h-48 w-48 sm:h-56 sm:w-56 rounded-3xl object-contain bg-white p-3 shadow-2xl border-2 border-brand-orange/40"
            />
          </div>
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">
              Official Trademark & Warranty Seal
            </span>
            <h3 className="font-display font-black text-2xl text-white">Kumar Tools</h3>
            <p className="text-xs text-slate-300 font-medium max-w-sm">
              Hardware Tools • AC Spare Parts • Refrigerator Parts • Repair & Services
            </p>
          </div>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold text-slate-400">
            <span className="rounded-full bg-slate-800/80 px-3 py-1 border border-slate-700">Khayala Counter</span>
            <span className="rounded-full bg-slate-800/80 px-3 py-1 border border-slate-700">100% Tested Parts</span>
            <span className="rounded-full bg-slate-800/80 px-3 py-1 border border-slate-700">Delhi NCR Service</span>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft space-y-3">
            <ShieldCheck className="h-8 w-8 text-brand-orange" />
            <h3 className="font-bold text-base text-slate-900">Zero Duplicates Guarantee</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We never stock B-grade or duplicate spares. If it carries a brand badge, it is 100% original OEM.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft space-y-3">
            <Users className="h-8 w-8 text-sky-500" />
            <h3 className="font-bold text-base text-slate-900">Technician Network</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We supply over 200 registered AC mechanics in Delhi NCR with wholesale carton prices.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft space-y-3">
            <Award className="h-8 w-8 text-emerald-500" />
            <h3 className="font-bold text-base text-slate-900">Certified Repair Crew</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our technicians carry calibrated testing equipment and adhere to safety-first installation protocols.
            </p>
          </div>
        </div>
      </section>

      {/* Counter Visit Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-brand-navy p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display font-black text-2xl">Visit Our Workshop Counter</h3>
            <p className="text-xs text-slate-300">
              Open Monday to Saturday, 10:00 AM – 8:00 PM at {STORE_INFO.address}.
            </p>
          </div>
          <Link
            to="/contact"
            className="rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white px-6 py-3 text-xs font-black shadow-glow transition-all shrink-0"
          >
            Get Directions & Contact
          </Link>
        </div>
      </section>
    </div>
  );
}
