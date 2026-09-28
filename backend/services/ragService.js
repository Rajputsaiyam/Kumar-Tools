const { PRODUCTS, STORE_INFO } = require("../data/seedData");

const UNRELATED_KEYWORDS = [
  "recipe", "cook", "biryani", "food", "movie", "song", "actor", "cricket", "football",
  "python", "javascript", "code", "programming", "software", "crypto", "bitcoin",
  "politics", "election", "modi", "president", "weather", "poem", "story", "joke",
  "dating", "love", "game", "gaming", "fitness", "gym", "horoscope", "astrology"
];

const inr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
const cleanStars = (str) => (str ? str.replace(/\*/g, "") : "");

const queryKnowledgeBase = (query) => {
  const q = (query || "").trim().toLowerCase();

  let response = null;

  // 1. Strict Out-of-Domain Guardrail Check
  const hasUnrelated = UNRELATED_KEYWORDS.some((kw) => {
    const regex = new RegExp(`\\b${kw}\\b`, "i");
    return regex.test(q);
  });

  if (hasUnrelated) {
    response = {
      reply: `Namaste! 🙏 I am the dedicated Kumar Tools Assistant.\n\nI am exclusively designed to help with Kumar Tools & Refrigeration queries:
• Hardware tools (Taparia pliers, screwdrivers, wrenches, drill bits)
• AC spare parts (Capacitors, contactors, fan motors, temp sensors)
• Refrigerator spare parts (PTC relays, thermostats, defrost sensors)
• Doorstep AC & Refrigerator repair services in Delhi NCR
• Order tracking and store contact at ${STORE_INFO.address}\n\nHow can I help you with your tools or appliance spares today?`,
      retrievedSources: [
        {
          title: "Kumar Tools Domain Policy",
          category: "policies",
          excerpt: "Kumar Tools Assistant strictly handles hardware tools, HVAC spare parts, and appliance services.",
          relevanceScore: 1.0,
        },
      ],
      actionSuggested: {
        type: "WHATSAPP_SUPPORT",
        label: "Contact Store Helpline",
        phone: STORE_INFO.phone,
      },
      quickReplies: [
        "❄️ Dual Run AC Capacitors",
        "🧊 Refrigerator Not Cooling?",
        "🔧 Taparia Screwdriver Set",
        "📅 Book AC Servicing",
        "📍 Store Address & Phone",
      ],
      isOutOfDomain: true,
    };
  }

  // 2. Direct Product Match Search
  if (!response) {
    const matchingProducts = PRODUCTS.filter((p) => {
      const slugMatch = q.includes(p.slug.replace(/-/g, " "));
      const nameMatch = q.includes(p.name.toLowerCase());
      const brandMatch = q.includes(p.brand.toLowerCase());
      const catMatch = q.includes(p.category);
      const kwMatch =
        (q.includes("capacitor") && p.slug === "ac-capacitor") ||
        (q.includes("contactor") && p.slug === "ac-contactor") ||
        (q.includes("fan motor") && p.slug.includes("fan-motor")) ||
        (q.includes("plier") && p.slug === "combination-plier") ||
        (q.includes("screwdriver") && p.slug === "screwdriver-set") ||
        (q.includes("wrench") && p.slug === "adjustable-wrench") ||
        (q.includes("drill") && (p.slug === "drill-bit-set" || p.slug === "bosch-impact-drill" || p.slug === "cordless-screwdriver-kit")) ||
        (q.includes("relay") && p.slug === "refrigerator-relay") ||
        (q.includes("thermostat") && p.slug === "refrigerator-thermostat") ||
        (q.includes("sensor") && (p.slug === "ac-temperature-sensor" || p.slug === "refrigerator-sensor"));

      return slugMatch || nameMatch || kwMatch;
    });

    if (matchingProducts.length > 0) {
      const prod = matchingProducts[0];
      const stockStatus = prod.stock === 0 ? "⚠️ Out of stock" : prod.stock <= 5 ? `⚡ Low stock (Only ${prod.stock} left)` : `✅ In Stock (${prod.stock} units)`;
      
      let advice = "";
      if (prod.category === "ac") {
        advice = "\n💡 Technician Tip: Ensure power is disconnected before installing AC electrical components.";
      } else if (prod.category === "fridge") {
        advice = "\n💡 Tip: Check model number or pin configuration on your old compressor relay or thermostat for exact fit.";
      }

      response = {
        reply: `Here are the details for ${prod.name}:\n\n• Brand: ${prod.brand}\n• Price: ${inr(prod.price)}\n• Availability: ${stockStatus}\n• SKU: ${prod.sku}\n• Overview: ${prod.short}\n• Specifications: ${Object.entries(prod.specs).map(([k, v]) => `${k}: ${v}`).join(", ")}${advice}\n\nWould you like to add this to your cart or order directly via WhatsApp?`,
        retrievedSources: [
          {
            title: `${prod.name} (${prod.brand})`,
            category: "products",
            excerpt: `${prod.short} Price: ${inr(prod.price)}. In stock: ${prod.stock}.`,
            relevanceScore: 0.98,
          },
        ],
        actionSuggested: {
          type: "ADD_TO_CART",
          label: `Add ${prod.name} to Cart (${inr(prod.price)})`,
          item: prod,
          qty: 1,
        },
        quickReplies: [
          `🛒 Add ${prod.name}`,
          "❄️ Other AC Spare Parts",
          "🧊 Refrigerator Spares",
          "🛠️ Book a Technician",
          "📍 Store Address",
        ],
      };
    }
  }

  // 3. Problem Diagnosis & Service Queries (Appliance Repair)
  if (!response && (
    q.includes("repair") ||
    q.includes("service") ||
    q.includes("not cooling") ||
    q.includes("leak") ||
    q.includes("dripping") ||
    q.includes("noise") ||
    q.includes("tripping") ||
    q.includes("technician") ||
    q.includes("book")
  )) {
    let diagnosis = "";
    let suggestedDevice = "AC";
    let suggestedService = "AC Servicing";

    if (q.includes("fridge") || q.includes("refrigerator") || q.includes("freezer")) {
      suggestedDevice = "Refrigerator";
      suggestedService = "Cooling Problems";
      diagnosis = `If your refrigerator is not cooling properly:
1. Compressor humming/clicking but not starting: Often caused by a worn-out PTC Starting Relay (We carry Embraco relays for ₹249).
2. Freezer working but fridge cabin warm: Defrost sensor failure or evaporator fan motor issue.
3. Continuous running without cutoff: Faulty Thermostat (Ranco thermostats in stock for ₹399).`;
    } else {
      suggestedDevice = "AC";
      suggestedService = "AC Repair";
      diagnosis = `For Air Conditioner issues:
1. Fan running but no cooling / outdoor unit not humming: Frequently a blown Dual Run Capacitor (Epcos 35+5 µF in stock for ₹349).
2. Water dripping indoors: Blocked drain pipe or choked cooling coils requiring Deep Jet Servicing.
3. Outdoor unit tripping MCB: Contactor contact pitting or compressor grounding.`;
    }

    response = {
      reply: `${diagnosis}\n\nOur verified HVAC technicians provide home visits in Delhi NCR for diagnosis, deep servicing, and part replacements.\n\nYou can book a service slot online or message our service desk!`,
      retrievedSources: [
        {
          title: "HVAC Troubleshooting & Service Booking",
          category: "services",
          excerpt: "On-site diagnosis, deep jet cleaning, and genuine spare replacements across Delhi NCR.",
          relevanceScore: 0.95,
        },
      ],
      actionSuggested: {
        type: "BOOK_SERVICE",
        label: `Book ${suggestedDevice} Service Online`,
        url: `/service-request?device=${suggestedDevice}&service=${encodeURIComponent(suggestedService)}`,
      },
      quickReplies: [
        `📅 Book ${suggestedDevice} Service`,
        "❄️ Epcos AC Capacitor (₹349)",
        "🧊 Refrigerator PTC Relay (₹249)",
        "📞 Call Technician Helpline",
      ],
    };
  }

  // 4. Store Info, Location, Timings
  if (!response && (
    q.includes("address") ||
    q.includes("where") ||
    q.includes("location") ||
    q.includes("contact") ||
    q.includes("phone") ||
    q.includes("email") ||
    q.includes("timing") ||
    q.includes("open") ||
    q.includes("khayala") ||
    q.includes("vishnu garden")
  )) {
    response = {
      reply: `📍 Kumar Tools & Refrigeration — Store Information:\n\n• Address: ${STORE_INFO.address}\n• Phone / WhatsApp: ${STORE_INFO.phoneDisplay}\n• Email: ${STORE_INFO.email}\n• Operating Hours: ${STORE_INFO.hours}\n• Area Served: West Delhi, Khayala, Vishnu Garden, Rajouri Garden, Tilak Nagar & all Delhi NCR\n\nFeel free to walk in to pick up tools/spares or call us for same-day dispatch!`,
      retrievedSources: [
        {
          title: "Kumar Tools Location & Contact",
          category: "store",
          excerpt: `${STORE_INFO.address}. Open ${STORE_INFO.hours}. Phone: ${STORE_INFO.phoneDisplay}`,
          relevanceScore: 0.99,
        },
      ],
      actionSuggested: {
        type: "WHATSAPP_SUPPORT",
        label: "Chat with Store on WhatsApp",
        phone: STORE_INFO.phone,
      },
      quickReplies: [
        "📦 View All Products",
        "❄️ AC Spare Parts",
        "🔧 Hardware Tools",
        "📅 Book a Service Visit",
      ],
    };
  }

  // 5. Default General Response
  if (!response) {
    response = {
      reply: `Namaste! 🙏 I am your Kumar Tools & HVAC Assistant.\n\nI can help you with:\n1. Hardware Tools: Professional Taparia pliers, screwdrivers, Stanley wrenches, Bosch drill bits & power tools\n2. AC Spare Parts: Dual run capacitors, contactors, condenser fan motors, copper sensors\n3. Refrigerator Spares: PTC compressor relays, thermostats, defrost sensors, fan motors\n4. Service Booking: AC servicing, refrigerator repair, and technician visits in Delhi NCR\n5. Store Pickup & Delivery: We are located at ${STORE_INFO.address}.\n\nWhat item or service are you looking for today?`,
      retrievedSources: [
        {
          title: "Kumar Tools Product & Service Catalog",
          category: "store",
          excerpt: "Full catalog of hardware tools, AC parts, refrigerator spares, and repair services.",
          relevanceScore: 0.9,
        },
      ],
      actionSuggested: {
        type: "NAVIGATE",
        label: "Explore All Products",
        url: "/products",
      },
      quickReplies: [
        "❄️ AC Capacitors & Motors",
        "🧊 Refrigerator Relays & Sensors",
        "🔧 Taparia Hand Tools",
        "📅 Book AC Servicing",
        "📍 Store Location & Hours",
      ],
    };
  }

  // Final guarantee: clean any remaining asterisks
  if (response && response.reply) {
    response.reply = cleanStars(response.reply);
  }

  return response;
};

module.exports = {
  queryKnowledgeBase,
};
