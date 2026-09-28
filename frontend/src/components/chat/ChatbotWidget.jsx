import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bot,
  X,
  Send,
  ShieldCheck,
  ShoppingCart,
  CalendarCheck,
  Phone,
  ChevronDown,
  ChevronUp,
  Check,
  RotateCcw,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../../context/CartContext";
import { chatApi, STORE_INFO, waLink } from "../../services/api";

// Ensure zero '*' asterisks appear anywhere in the text
const cleanNoStars = (text) => {
  if (!text) return "";
  return text.replace(/\*/g, "");
};

const INITIAL_GREETING = {
  id: "init",
  role: "assistant",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  content: `Namaste! 🙏 I am your Kumar Tools & HVAC Assistant.\n\nI can help you find genuine AC & refrigerator spare parts, recommend professional hardware tools, troubleshoot appliance cooling faults, or book a certified technician visit in Delhi NCR!`,
  retrievedSources: [
    {
      title: "Kumar Tools Store & Service Center",
      category: "store",
      excerpt: "Genuine HVAC spares, Taparia tools, and doorstep repair in Delhi NCR.",
      relevanceScore: 1.0,
    },
  ],
  quickReplies: [
    "❄️ AC Capacitor (35+5 µF)",
    "🧊 Refrigerator Not Cooling?",
    "🔧 Taparia Screwdriver Set",
    "📅 Book AC Servicing",
    "📍 Store Address & Phone",
  ],
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedSources, setExpandedSources] = useState({});
  const [addedItems, setAddedItems] = useState({});

  const { addToCart } = useCart();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen, loading]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await chatApi.sendMessage(query);
      if (res.success && res.data) {
        const botData = res.data;
        const botMsg = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: botData.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          retrievedSources: botData.retrievedSources || [],
          actionSuggested: botData.actionSuggested || null,
          quickReplies: botData.quickReplies || [],
          isOutOfDomain: botData.isOutOfDomain || false,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error("Chat request failed");
      }
    } catch (err) {
      // Fallback response with strict guardrails
      const lower = query.toLowerCase();
      const isOff = ["recipe", "cook", "movie", "python", "code", "politics", "joke"].some((k) =>
        lower.includes(k)
      );

      let reply = "";
      if (isOff) {
        reply = `Namaste! 🙏 I am exclusively the Kumar Tools Assistant.\n\nI can only answer questions related to hardware tools, AC & refrigerator spare parts, repair bookings, and store details at ${STORE_INFO.address}.\n\nHow can I help you with your tools or appliance spares?`;
      } else {
        reply = `I am here to help you find spare parts or book appliance repairs. You can explore our catalog or reach our Delhi helpline directly at ${STORE_INFO.phoneDisplay}.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          quickReplies: ["❄️ AC Capacitors", "🧊 Refrigerator Relays", "🔧 Hand Tools", "📍 Store Info"],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (action, msgId) => {
    if (action.type === "ADD_TO_CART" && action.item) {
      addToCart(action.item, action.qty || 1);
      setAddedItems((prev) => ({ ...prev, [msgId]: true }));
    } else if (action.type === "BOOK_SERVICE") {
      setIsOpen(false);
      navigate(action.url || "/service-request");
    } else if (action.type === "NAVIGATE") {
      setIsOpen(false);
      navigate(action.url || "/products");
    } else if (action.type === "WHATSAPP_SUPPORT") {
      window.open(waLink("Hello Kumar Tools, I need assistance from your AI support desk."), "_blank");
    }
  };

  const resetChat = () => {
    setMessages([INITIAL_GREETING]);
    setAddedItems({});
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-navy px-3.5 py-2 text-xs font-bold text-white shadow-xl hover:scale-105 transition-all"
          >
            <Bot className="h-3.5 w-3.5 text-brand-orange" />
            <span>Need parts or AC repair? Ask AI!</span>
          </button>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Kumar AI Assistant" : "Open Kumar AI Assistant"}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-105 ${
            isOpen ? "bg-slate-800 text-white" : "bg-brand-navy text-brand-orange ring-4 ring-brand-orange/40"
          }`}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <img
                src="/logo.jpg"
                alt="Kumar AI Assistant"
                className="h-10 w-10 rounded-full object-contain bg-white p-0.5 shadow-md"
              />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-white" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-2 sm:right-6 z-50 flex h-[560px] max-h-[80vh] w-[calc(100vw-1rem)] sm:w-[420px] max-w-[420px] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-white shadow-2xl transition-all duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-brand-navy px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/logo.jpg"
                  alt="Kumar Tools Logo"
                  className="h-9 w-9 rounded-xl object-contain bg-white p-0.5 shadow-md ring-2 ring-brand-orange/50"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-brand-navy" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold tracking-tight flex items-center gap-1.5">
                  Kumar AI Assistant
                  <span className="rounded bg-brand-orange/20 px-1.5 py-0.5 text-[10px] font-bold text-brand-orange">
                    RAG
                  </span>
                </h3>
                <p className="text-[11px] text-slate-300 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Khayala & Delhi NCR • Active
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Restart Chat"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div className="flex items-start gap-2 max-w-[88%]">
                  {m.role === "assistant" && (
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-orange">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      m.role === "user"
                        ? "bg-brand-dark text-white rounded-br-none"
                        : m.isOutOfDomain
                        ? "bg-amber-50 border border-amber-200 text-slate-900 rounded-bl-none"
                        : "bg-white border border-slate-200 text-slate-900 rounded-bl-none"
                    }`}
                  >
                    <div className="whitespace-pre-line">{cleanNoStars(m.content)}</div>

                    {/* Source disclosure */}
                    {m.retrievedSources && m.retrievedSources.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200/80 text-[11px]">
                        <button
                          onClick={() => setExpandedSources((p) => ({ ...p, [m.id]: !p[m.id] }))}
                          className="flex items-center gap-1 font-medium text-slate-500 hover:text-slate-900"
                        >
                          <ShieldCheck className="h-3.5 w-3.5 text-brand-orange" />
                          <span>Source: {cleanNoStars(m.retrievedSources[0].title)}</span>
                          {expandedSources[m.id] ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        </button>
                        {expandedSources[m.id] && (
                          <p className="mt-1 rounded bg-slate-100 p-1.5 text-slate-600 italic">
                            "{cleanNoStars(m.retrievedSources[0].excerpt)}"
                          </p>
                        )}
                      </div>
                    )}

                    {/* Action button */}
                    {m.actionSuggested && (
                      <div className="mt-3 pt-2">
                        {m.actionSuggested.type === "ADD_TO_CART" ? (
                          <button
                            onClick={() => handleAction(m.actionSuggested, m.id)}
                            disabled={addedItems[m.id]}
                            className={`flex w-full items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-bold transition-all shadow-sm ${
                              addedItems[m.id]
                                ? "bg-emerald-600 text-white"
                                : "bg-brand-orange text-white hover:bg-brand-orangeHover shadow-glow"
                            }`}
                          >
                            {addedItems[m.id] ? (
                              <>
                                <Check className="h-4 w-4" /> Added to Cart!
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="h-4 w-4" /> {m.actionSuggested.label}
                              </>
                            )}
                          </button>
                        ) : m.actionSuggested.type === "BOOK_SERVICE" ? (
                          <button
                            onClick={() => handleAction(m.actionSuggested, m.id)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange text-white py-2 px-3 text-xs font-bold hover:bg-brand-orangeHover transition-all shadow-sm"
                          >
                            <CalendarCheck className="h-4 w-4" /> {m.actionSuggested.label}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAction(m.actionSuggested, m.id)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white py-2 px-3 text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm"
                          >
                            <Phone className="h-4 w-4" /> {m.actionSuggested.label}
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {m.role === "user" && (
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 px-9 mt-1">{m.timestamp}</span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-navy text-brand-orange">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl bg-white border border-slate-200 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-brand-orange animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-brand-orange animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-brand-orange animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages[messages.length - 1]?.quickReplies && (
            <div className="border-t border-slate-200 bg-white px-3 py-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Suggested questions:
              </p>
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {messages[messages.length - 1].quickReplies.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => handleSend(qr)}
                    className="whitespace-nowrap rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-colors shrink-0"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-slate-200 bg-white p-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AC capacitor, fridge relay, repair..."
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-orange text-white hover:bg-brand-orangeHover disabled:opacity-40 transition-all shadow-sm"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
