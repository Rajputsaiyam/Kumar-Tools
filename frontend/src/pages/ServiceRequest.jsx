import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, CalendarCheck, Clock, MapPin, Phone, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { serviceApi, STORE_INFO } from "../services/api";

const SERVICE_OPTIONS = {
  AC: [
    "AC Deep Jet Servicing",
    "AC Repair & Troubleshooting",
    "AC Capacitor / Contactor Replacement",
    "AC Installation / Uninstallation",
    "AC Gas Leakage Detection & Gas Refill",
  ],
  Refrigerator: [
    "Cooling Problem Checkup",
    "Compressor Relay & Overload Replacement",
    "Thermostat Replacement",
    "Defrost Sensor & Blower Repair",
    "Gas Leakage & Charging",
  ],
};

export function ServiceRequest() {
  const [searchParams] = useSearchParams();
  const initialDevice = searchParams.get("device") === "Refrigerator" ? "Refrigerator" : "AC";
  const initialService = searchParams.get("service") || SERVICE_OPTIONS[initialDevice][0];

  const [device, setDevice] = useState(initialDevice);
  const [service, setService] = useState(initialService);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning (9–12)");
  const [address, setAddress] = useState("");
  const [problem, setProblem] = useState("");

  const [loading, setLoading] = useState(false);
  const [confirmedTicket, setConfirmedTicket] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 10 || !address.trim() || !problem.trim()) {
      toast.error("Please fill in your name, 10-digit phone, address, and describe the problem.");
      return;
    }

    setLoading(true);

    try {
      const ticket = await serviceApi.create({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        device,
        service,
        date: date || new Date().toISOString().split("T")[0],
        timeSlot,
        address: address.trim(),
        problem: problem.trim(),
      });

      setConfirmedTicket(ticket);
      toast.success(`Service Ticket ${ticket.id} booked! Autonomous AI WhatsApp confirmation dispatched.`);
    } catch (err) {
      toast.error("Failed to book service request");
    } finally {
      setLoading(false);
    }
  };

  if (confirmedTicket) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-500/5">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            Technician Visit Scheduled
          </span>
          <h1 className="font-display font-black text-3xl text-slate-900">
            Booking Received!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Ticket ID: <b className="text-slate-900 font-mono">{confirmedTicket.id}</b>. Your service request for <b className="text-slate-900">{confirmedTicket.device} ({confirmedTicket.service})</b> has been logged in our system.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 bg-white text-left text-xs space-y-2 shadow-soft">
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Customer:</span>
            <span className="font-bold text-slate-900">{confirmedTicket.name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Contact Number:</span>
            <span className="font-mono text-slate-900">{confirmedTicket.phone}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Service Slot:</span>
            <span className="font-bold text-slate-900">{confirmedTicket.date} ({confirmedTicket.timeSlot})</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Service Location:</span>
            <span className="text-slate-900">{confirmedTicket.address}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-slate-500">Technician Dispatch:</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> AI WhatsApp Alert Sent to Workshop
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
          <Link
            to="/"
            className="rounded-xl bg-brand-orange px-5 py-3 text-xs font-bold text-white hover:bg-brand-orangeHover shadow-sm text-center"
          >
            Back to Home
          </Link>
          <Link
            to="/admin"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 text-center"
          >
            View in Admin Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
          Direct Workshop Booking
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900">
          Book an Appliance Technician
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Certified HVAC technicians arrive with genuine testing meters and replacement parts.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-soft space-y-6"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Customer Name */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
              Full Name
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vikram Malhotra"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
              Mobile Number (WhatsApp)
            </label>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9811XXXXXX"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white font-mono"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
              Email (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. vikram@example.com"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white"
            />
          </div>

          {/* Device Type */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
              Appliance Type
            </label>
            <select
              value={device}
              onChange={(e) => {
                setDevice(e.target.value);
                setService(SERVICE_OPTIONS[e.target.value][0]);
              }}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white"
            >
              <option value="AC">Air Conditioner (Split / Window / Inverter)</option>
              <option value="Refrigerator">Refrigerator (Single / Double Door)</option>
            </select>
          </div>

          {/* Service Type */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
              Requested Service
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white"
            >
              {SERVICE_OPTIONS[device].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Preferred Date */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
              Preferred Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white"
            />
          </div>

          {/* Time Slot */}
          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
              Preferred Time Window
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {["Morning (9–12)", "Afternoon (12–4)", "Evening (4–8)"].map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setTimeSlot(slot)}
                  className={`h-11 rounded-xl text-xs font-bold border transition-all ${
                    timeSlot === slot
                      ? "border-brand-orange bg-brand-orangeLight text-brand-navy"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
              Service Address in Delhi NCR
            </label>
            <textarea
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Ravi Nagar Extension, Khayala, Vishnu Garden, New Delhi - 110018"
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white resize-none"
            />
          </div>

          {/* Problem Description */}
          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
              Problem Description
            </label>
            <textarea
              required
              rows={3}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Please describe the symptoms (e.g. AC blowing warm air, outdoor unit not turning on, fridge freezer cooling but lower part warm, water leakage...)"
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white py-4 text-xs font-black shadow-glow transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Logging Service Ticket...</span>
            </>
          ) : (
            <>
              <CalendarCheck className="h-4 w-4" />
              <span>Confirm Service Booking & Send Alert</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-400 text-center">
          Our verified technician will carry original testing meters and genuine spare parts directly from Kumar Tools.
        </p>
      </form>
    </div>
  );
}
