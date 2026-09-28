import React from "react";
import { MessageCircle } from "lucide-react";
import { waLink } from "../../services/api";

export function WhatsAppFab() {
  return (
    <a
      href={waLink("Hello Kumar Tools, I have an enquiry about spare parts or servicing.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 sm:bottom-6 left-3 sm:left-6 z-40 flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 px-3.5 sm:px-4 py-2.5 sm:py-3 text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
    >
      <MessageCircle className="h-5 w-5 fill-current" />
      <span className="hidden sm:inline text-xs font-bold tracking-wide">
        WhatsApp Us
      </span>
    </a>
  );
}
