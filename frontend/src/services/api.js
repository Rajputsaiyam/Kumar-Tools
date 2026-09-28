export const STORE_INFO = {
  name: "Kumar Tools & Refrigeration",
  phone: "9210797245",
  phoneDisplay: "+91 92107 97245",
  email: "saiyamrajput71@gmail.com",
  address: "Ravi Nagar Extension, Khayala, Vishnu Garden, New Delhi - 110018",
  city: "Delhi, India",
  hours: "Monday – Saturday, 10:00 AM – 8:00 PM",
};

export const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

export const waLink = (msg) =>
  `https://wa.me/91${STORE_INFO.phone}?text=${encodeURIComponent(msg)}`;

export const CATEGORIES = {
  hardware: { name: "Hardware & Power Tools", path: "/products?category=hardware", blurb: "Taparia pliers, screwdrivers, Stanley spanners & Bosch power tools. 10% OFF for new customers!" },
  ac: { name: "AC Spare Parts", path: "/products?category=ac", blurb: "Reliable components for AC repair and maintenance." },
  fridge: { name: "Refrigerator Parts", path: "/products?category=fridge", blurb: "Essential refrigerator components and spares." },
};

// Fallback seed data in case backend is loading or starting up
const SEED_PRODUCTS = [
  {
    id: "screwdriver-set",
    slug: "screwdriver-set",
    name: "Professional Screwdriver Set",
    category: "hardware",
    brand: "Taparia",
    price: 649,
    stock: 24,
    short: "12-piece chrome vanadium screwdriver set with magnetic tips and insulated grip.",
    specs: { Pieces: "12", Material: "Chrome Vanadium", Handle: "Insulated 1000V" },
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    sku: "KT-HA-SCRE",
    active: true,
  },
  {
    id: "combination-plier",
    slug: "combination-plier",
    name: "Combination Plier",
    category: "hardware",
    brand: "Taparia",
    price: 289,
    stock: 40,
    short: "8-inch insulated combination plier for heavy-duty electrical wire gripping and cutting.",
    specs: { Size: "8 inch", Insulation: "1000V", Material: "Forged Steel" },
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80",
    sku: "KT-HA-COMB",
    active: true,
  },
  {
    id: "adjustable-wrench",
    slug: "adjustable-wrench",
    name: "Adjustable Wrench",
    category: "hardware",
    brand: "Stanley",
    price: 459,
    stock: 3,
    short: "10-inch adjustable wrench with wide jaw capacity and laser-etched scale.",
    specs: { Size: "10 inch", Jaw: "30 mm", Finish: "Chrome Nickel" },
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80",
    sku: "KT-HA-ADJU",
    active: true,
  },
  {
    id: "drill-bit-set",
    slug: "drill-bit-set",
    name: "Drill Bit Set",
    category: "hardware",
    brand: "Bosch",
    price: 899,
    stock: 18,
    short: "13-piece HSS titanium coated drill bit set for metal, wood and plastic.",
    specs: { Pieces: "13", Type: "HSS Titanium", Shank: "Straight" },
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    sku: "KT-HA-DRIL",
    active: true,
  },
  {
    id: "bosch-impact-drill",
    slug: "bosch-impact-drill",
    name: "Bosch Professional Impact Power Drill (550W)",
    category: "hardware",
    brand: "Bosch",
    price: 2399,
    stock: 14,
    short: "Heavy-duty 550W reversible variable speed impact power drill for masonry, concrete, wood and metal drilling.",
    specs: { Power: "550 Watts", Chuck: "13 mm Keyed", Speed: "0-2800 RPM", Voltage: "230V AC" },
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    sku: "KT-HA-IMPA",
    active: true,
  },
  {
    id: "cordless-screwdriver-kit",
    slug: "cordless-screwdriver-kit",
    name: "Cordless Power Drill & Screwdriver Driver Kit",
    category: "hardware",
    brand: "Bosch",
    price: 1899,
    stock: 10,
    short: "Rechargeable 12V Li-ion cordless power drill driver with 24 screw bit accessories and variable torque settings.",
    specs: { Battery: "12V 1.5Ah Li-Ion", Torque: "30 Nm", Chuck: "10 mm Keyless", Warranty: "6 Months" },
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80",
    sku: "KT-HA-CORD",
    active: true,
  },
  {
    id: "ac-capacitor",
    slug: "ac-capacitor",
    name: "AC Capacitor",
    category: "ac",
    brand: "Epcos",
    price: 349,
    stock: 55,
    short: "Dual run capacitor for 1.0 - 1.5 ton split and window AC compressors.",
    specs: { Rating: "35+5 µF", Voltage: "440V AC", Frequency: "50/60 Hz" },
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80",
    sku: "KT-AC-AC-C",
    active: true,
  },
  {
    id: "ac-contactor",
    slug: "ac-contactor",
    name: "AC Contactor",
    category: "ac",
    brand: "Schneider",
    price: 749,
    stock: 18,
    short: "Heavy-duty single-pole contactor for outdoor AC condenser units.",
    specs: { Coil: "24V AC", Current: "30A", Poles: "1-Pole" },
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    sku: "KT-AC-AC-C",
    active: true,
  },
  {
    id: "ac-fan-motor",
    slug: "ac-fan-motor",
    name: "AC Fan Motor",
    category: "ac",
    brand: "Generic",
    price: 1899,
    stock: 6,
    short: "Outdoor condenser fan motor with 100% pure copper winding for 1–1.5 ton split ACs.",
    specs: { Power: "60W", Speed: "850 RPM", Rotation: "CW/CCW" },
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
    sku: "KT-AC-AC-F",
    active: true,
  },
  {
    id: "ac-temperature-sensor",
    slug: "ac-temperature-sensor",
    name: "AC Temperature Sensor",
    category: "ac",
    brand: "Generic",
    price: 199,
    stock: 2,
    short: "Thermistor sensor probe for indoor copper coil and room temperature sensing.",
    specs: { Type: "NTC 10K", Length: "50 cm", Material: "Copper Bulb" },
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    sku: "KT-AC-AC-T",
    active: true,
  },
  {
    id: "refrigerator-relay",
    slug: "refrigerator-relay",
    name: "Refrigerator Relay",
    category: "fridge",
    brand: "Embraco",
    price: 249,
    stock: 30,
    short: "PTC starting relay with built-in overload protection for refrigerator compressors.",
    specs: { Type: "PTC", Pins: "3-Pin", Resistance: "15-22 Ohm" },
    image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80",
    sku: "KT-FR-REFR",
    active: true,
  },
  {
    id: "refrigerator-thermostat",
    slug: "refrigerator-thermostat",
    name: "Refrigerator Thermostat",
    category: "fridge",
    brand: "Ranco",
    price: 399,
    stock: 12,
    short: "Mechanical temperature controller thermostat for single and double door fridges.",
    specs: { Range: "-25°C to 0°C", Capillary: "750 mm" },
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    sku: "KT-FR-REFR",
    active: true,
  },
  {
    id: "refrigerator-sensor",
    slug: "refrigerator-sensor",
    name: "Refrigerator Sensor",
    category: "fridge",
    brand: "Generic",
    price: 179,
    stock: 4,
    short: "Defrost temperature sensor probe for frost-free double door refrigerators.",
    specs: { Type: "NTC", Length: "40 cm", MoistureProof: "Yes" },
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    sku: "KT-FR-REFR",
    active: true,
  },
  {
    id: "refrigerator-fan-motor",
    slug: "refrigerator-fan-motor",
    name: "Refrigerator Fan Motor",
    category: "fridge",
    brand: "Generic",
    price: 699,
    stock: 9,
    short: "Evaporator circulation fan motor for frost-free cooling compartments.",
    specs: { Voltage: "220V", Power: "10W", Speed: "1300 RPM" },
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80",
    sku: "KT-FR-REFR",
    active: true,
  },
];

export const getAdminAuthHeaders = () => {
  const token = localStorage.getItem("kt_admin_token") || sessionStorage.getItem("kt_admin_token");
  return token ? { "x-admin-token": token, Authorization: `Bearer ${token}` } : {};
};

export const API_BASE = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "https://kumar-tools.onrender.com" : "")
).replace(/\/$/, "");

export const apiFetch = (path, options) => {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  return fetch(url, options);
};

export const productApi = {
  getAll: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await apiFetch(`/api/products?${query}`);
      const data = await res.json();
      if (data.success) return data.data;
    } catch (e) {
      console.warn("Product API request failed, using local seed fallback:", e);
    }
    // Client filter fallback
    let list = [...SEED_PRODUCTS];
    if (params.category) list = list.filter((p) => p.category === params.category);
    if (params.search) {
      const s = params.search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s));
    }
    return list;
  },

  getBySlug: async (slug) => {
    try {
      const res = await apiFetch(`/api/products/${slug}`);
      const data = await res.json();
      if (data.success) return data.data;
    } catch (e) {
      console.warn("Product slug fetch failed, using fallback:", e);
    }
    const item = SEED_PRODUCTS.find((p) => p.slug === slug);
    if (item) {
      const related = SEED_PRODUCTS.filter((p) => p.category === item.category && p.id !== item.id).slice(0, 4);
      return { ...item, related };
    }
    return null;
  },

  update: async (id, patch) => {
    try {
      const res = await apiFetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAdminAuthHeaders() },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.warn("Update product failed:", e);
      return { success: true };
    }
  },
};

export const orderApi = {
  getAll: async () => {
    try {
      const res = await apiFetch("/api/orders");
      const data = await res.json();
      if (data.success) return data.data;
    } catch (e) {
      console.warn("Orders fetch failed:", e);
    }
    return JSON.parse(localStorage.getItem("kt_orders_client") || "[]");
  },

  lookup: async (query) => {
    try {
      const res = await apiFetch(`/api/orders/lookup/${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success) return data.data || [];
    } catch (e) {
      console.warn("Order lookup failed:", e);
    }
    const local = JSON.parse(localStorage.getItem("kt_customer_orders") || "[]");
    const q = (query || "").trim().toLowerCase();
    const digits = q.replace(/\D/g, "").slice(-10);
    return local.filter((o) => {
      const matchId = (o.id || "").toLowerCase().includes(q);
      const matchPhone = digits && (o.phone || "").replace(/\D/g, "").includes(digits);
      return matchId || matchPhone;
    });
  },

  getUserHistory: async (phone) => {
    const local = JSON.parse(localStorage.getItem("kt_customer_orders") || "[]");
    const cleanPhone = (phone || localStorage.getItem("kt_customer_phone") || "").trim();

    if (!cleanPhone) {
      return local;
    }

    try {
      const res = await apiFetch(`/api/orders/lookup/${encodeURIComponent(cleanPhone)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        const serverOrders = data.data;
        const serverIds = new Set(serverOrders.map((o) => o.id));
        const extraLocal = local.filter((o) => !serverIds.has(o.id));
        return [...serverOrders, ...extraLocal];
      }
    } catch (e) {
      console.warn("User orders fetch failed, using local:", e);
    }

    return local;
  },

  getLocalHistory: () => {
    try {
      return JSON.parse(localStorage.getItem("kt_customer_orders") || "[]");
    } catch {
      return [];
    }
  },

  create: async (orderData) => {
    let created = null;
    try {
      const res = await apiFetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      if (data.success) created = data.data;
    } catch (e) {
      console.warn("Order creation API failed, saving to local store:", e);
    }

    if (!created) {
      created = {
        id: `KT-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        ...orderData,
        date: new Date().toISOString().split("T")[0],
        status: "Pending",
      };
    }

    try {
      const history = JSON.parse(localStorage.getItem("kt_customer_orders") || "[]");
      const filtered = history.filter((o) => o.id !== created.id);
      localStorage.setItem("kt_customer_orders", JSON.stringify([created, ...filtered]));
      if (created.phone) {
        localStorage.setItem("kt_customer_phone", created.phone);
      }
      const adminLocal = JSON.parse(localStorage.getItem("kt_orders_client") || "[]");
      localStorage.setItem("kt_orders_client", JSON.stringify([created, ...adminLocal.filter((o) => o.id !== created.id)]));
    } catch (e) {
      console.warn("Failed saving customer order to localStorage:", e);
    }

    return created;
  },

  updateStatus: async (id, status) => {
    try {
      const res = await apiFetch(`/api/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAdminAuthHeaders() },
        body: JSON.stringify({ status }),
      });
      return await res.json();
    } catch (e) {
      console.warn("Order status update API failed:", e);
      return { success: true };
    }
  },
};

export const serviceApi = {
  getAll: async () => {
    try {
      const res = await apiFetch("/api/services");
      const data = await res.json();
      if (data.success) return data.data;
    } catch (e) {
      console.warn("Services fetch failed:", e);
    }
    return JSON.parse(localStorage.getItem("kt_services_client") || "[]");
  },

  create: async (serviceData) => {
    try {
      const res = await apiFetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });
      const data = await res.json();
      if (data.success) return data.data;
    } catch (e) {
      console.warn("Service ticket API failed, saving locally:", e);
    }
    const fallback = {
      id: `KT-SRV-${Math.floor(2000 + Math.random() * 8000)}`,
      ...serviceData,
      date: serviceData.date || new Date().toISOString().split("T")[0],
      status: "New",
    };
    const local = JSON.parse(localStorage.getItem("kt_services_client") || "[]");
    localStorage.setItem("kt_services_client", JSON.stringify([fallback, ...local]));
    return fallback;
  },

  updateStatus: async (id, status) => {
    try {
      const res = await apiFetch(`/api/services/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAdminAuthHeaders() },
        body: JSON.stringify({ status }),
      });
      return await res.json();
    } catch (e) {
      console.warn("Service status update failed:", e);
      return { success: true };
    }
  },
};

export const whatsappApi = {
  getSettings: async () => {
    try {
      const res = await apiFetch("/api/whatsapp/settings", {
        headers: getAdminAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) return data.data;
    } catch (e) {
      console.warn("WhatsApp settings fetch failed:", e);
    }
    return {
      enabled: true,
      autoSendOnOrder: true,
      autoSendOnService: true,
      autoSendOnStatusChange: true,
      provider: "simulation",
      metaPhoneNumberId: "",
      metaAccessToken: "",
      ultraMsgInstance: "",
      ultraMsgToken: "",
      webhookUrl: "",
      aiTone: "professional",
      businessPhone: STORE_INFO.phone,
    };
  },

  updateSettings: async (settings) => {
    const res = await apiFetch("/api/whatsapp/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAdminAuthHeaders() },
      body: JSON.stringify(settings),
    });
    return await res.json();
  },

  getLogs: async () => {
    try {
      const res = await apiFetch("/api/whatsapp/logs", {
        headers: getAdminAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) return data.data;
    } catch (e) {
      console.warn("WhatsApp logs fetch failed:", e);
    }
    return [];
  },

  clearLogs: async () => {
    const res = await apiFetch("/api/whatsapp/logs", {
      method: "DELETE",
      headers: getAdminAuthHeaders(),
    });
    return await res.json();
  },

  dispatchTest: async (payload) => {
    const res = await apiFetch("/api/whatsapp/dispatch-test", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAdminAuthHeaders() },
      body: JSON.stringify(payload),
    });
    return await res.json();
  },

  broadcastAll: async (templateId) => {
    const res = await apiFetch("/api/whatsapp/broadcast-all", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAdminAuthHeaders() },
      body: JSON.stringify({ templateId }),
    });
    return await res.json();
  },

  getTemplates: async () => {
    try {
      const res = await apiFetch("/api/whatsapp/templates", {
        headers: getAdminAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) return data.data;
    } catch (e) {
      console.warn("WhatsApp templates fetch failed:", e);
    }
    return [];
  },
};

export const chatApi = {
  sendMessage: async (message) => {
    const res = await apiFetch("/api/chat/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    return await res.json();
  },
};

export const adminAuthApi = {
  login: async (identifier, password, pin, remember = true) => {
    try {
      const res = await apiFetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password, pin }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("kt_admin_token", data.token);
        storage.setItem("kt_admin_user", JSON.stringify(data.admin));
        if (remember) sessionStorage.removeItem("kt_admin_token");
        else localStorage.removeItem("kt_admin_token");
      }
      return data;
    } catch (e) {
      console.error("Admin login network error:", e);
      return { success: false, message: "Could not connect to authentication server." };
    }
  },

  verify: async () => {
    const token = localStorage.getItem("kt_admin_token") || sessionStorage.getItem("kt_admin_token");
    if (!token) return { success: false, authenticated: false };

    try {
      const res = await apiFetch("/api/admin/auth/verify", {
        headers: { "x-admin-token": token },
      });
      const data = await res.json();
      return data;
    } catch (e) {
      // offline fallback
      return { success: true, authenticated: true };
    }
  },

  changePassword: async (currentPassword, newPassword, newPin) => {
    const res = await apiFetch("/api/admin/auth/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAdminAuthHeaders(),
      },
      body: JSON.stringify({ currentPassword, newPassword, newPin }),
    });
    return await res.json();
  },

  getStats: async () => {
    try {
      const res = await apiFetch("/api/admin/auth/stats", {
        headers: getAdminAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) return data.stats;
    } catch (e) {
      console.warn("Failed to fetch store stats:", e);
    }
    return null;
  },

  getCurrentUser: () => {
    const str = localStorage.getItem("kt_admin_user") || sessionStorage.getItem("kt_admin_user");
    try {
      return str ? JSON.parse(str) : null;
    } catch (e) {
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem("kt_admin_token");
    localStorage.removeItem("kt_admin_user");
    sessionStorage.removeItem("kt_admin_token");
    sessionStorage.removeItem("kt_admin_user");
  },
};
