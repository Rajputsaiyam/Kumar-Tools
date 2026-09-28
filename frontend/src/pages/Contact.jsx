import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { STORE_INFO, waLink } from "../services/api";

export function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      toast.error("Please fill in your name, phone, and message.");
      return;
    }

    setSent(true);
    toast.success("Thank you! Your message has been received. Our team will contact you shortly.");
  };

  const contactCards = [
    {
      icon: MapPin,
      title: "Store Location",
      value: STORE_INFO.address,
      sub: "West Delhi (Khayala / Vishnu Garden)",
    },
    {
      icon: Phone,
      title: "Phone & WhatsApp",
      value: STORE_INFO.phoneDisplay,
      sub: "Available during business hours",
      href: `tel:${STORE_INFO.phone}`,
    },
    {
      icon: Mail,
      title: "Email Support",
      value: STORE_INFO.email,
      sub: "Responses within 24 hours",
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: STORE_INFO.hours,
      sub: "Closed on Sundays",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
          Get in Touch
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900">
          Contact Kumar Tools
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Questions about a specific capacitor, relay, tool kit, or booking a technician visit? We are here to help.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {contactCards.map((c) => (
          <div key={c.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft space-y-2">
            <div className="h-10 w-10 rounded-xl bg-brand-orangeLight text-brand-orange flex items-center justify-center mb-3">
              <c.icon className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">{c.title}</h3>
            {c.href ? (
              <a href={c.href} className="font-bold text-xs text-brand-navy hover:text-brand-orange block transition-colors">
                {c.value}
              </a>
            ) : (
              <p className="font-bold text-xs text-slate-800">{c.value}</p>
            )}
            <p className="text-[11px] text-slate-400">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Quick WhatsApp Connect */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Fastest Response
            </span>
            <h2 className="font-display font-black text-2xl text-slate-900">
              Message Directly on WhatsApp
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              For quick part inquiries, price quotes, or sharing pictures of damaged components, WhatsApp is the fastest way to connect with our counter team.
            </p>
          </div>

          <a
            href={waLink("Hello Kumar Tools, I have an inquiry about parts/services.")}
            target="_blank"
            rel="noreferrer"
            className="flex sm:inline-flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 px-6 py-4 text-xs font-bold text-white shadow-md hover:scale-105 transition-all w-full sm:w-auto text-center"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Chat on WhatsApp ({STORE_INFO.phoneDisplay})</span>
          </a>

          {/* Map Representation */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col items-center justify-center text-center space-y-3">
            <img
              src="/logo.jpg"
              alt="Kumar Tools Counter"
              className="h-16 w-16 rounded-2xl object-contain bg-white p-1 border border-slate-200 shadow-sm"
            />
            <div>
              <h4 className="font-bold text-sm text-slate-900">Kumar Tools Counter</h4>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                {STORE_INFO.address}
              </p>
              <span className="text-[10px] text-brand-orange font-bold block mt-1">
                Landmark: Khayala / Vishnu Garden, New Delhi
              </span>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft space-y-6">
          <div className="space-y-1">
            <h2 className="font-display font-black text-2xl text-slate-900">Send an Inquiry</h2>
            <p className="text-xs text-slate-500">Fill in the form below and we'll reply shortly.</p>
          </div>

          {sent ? (
            <div className="p-8 text-center space-y-3 rounded-2xl bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-sm text-slate-900">Inquiry Received!</h3>
              <p className="text-xs text-slate-600">
                Thank you, {name}. Our technical desk will reach out to you at {phone}.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-xs font-bold text-brand-orange hover:underline pt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Name
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Message / Part Details
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what tool or HVAC spare part you need..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white py-3.5 text-xs font-black shadow-glow transition-all active:scale-95"
              >
                <Send className="h-4 w-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
