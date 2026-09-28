# Kumar Tools & Refrigeration 🔧❄️

Fullstack E-Commerce & Service Platform for Hardware Tools, AC & Refrigerator Spare Parts, and Certified Doorstep Appliance Repairs with Autonomous AI WhatsApp Automation & RAG AI Assistant.

---

## 📁 Project Architecture

The project is structured into separate **Frontend** and **Backend** folders, built 100% in **JavaScript (ES Modules & Node.js CommonJS)** without any TypeScript dependencies:

```
Kumar-Tools/
├── backend/                  # Node.js + Express REST API Server (Port 5002)
│   ├── .env                  # Port, store credentials, WhatsApp configs
│   ├── package.json
│   ├── server.js             # Express entry point
│   ├── controllers/          # Business logic handlers
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── serviceController.js
│   │   ├── whatsappController.js
│   │   └── chatController.js
│   ├── data/
│   │   └── seedData.js       # Verified product catalog with HD images & store info
│   ├── routes/               # Express API endpoints
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── serviceRoutes.js
│   │   ├── whatsappRoutes.js
│   │   └── chatRoutes.js
│   └── services/
│       ├── whatsappAutomationService.js  # Autonomous AI WhatsApp engine
│       └── ragService.js                 # RAG AI Assistant with strict domain guardrails
│
└── frontend/                 # React (Vite) + Tailwind CSS (Port 5174)
    ├── index.html
    ├── package.json
    ├── vite.config.js        # Configured with proxy to backend /api
    ├── tailwind.config.js    # Industrial dark slate, gold & cyan theme
    └── src/
        ├── main.jsx
        ├── App.jsx           # React Router DOM configuration
        ├── index.css
        ├── components/
        │   ├── common/       # Navbar, Footer, ProductCard, WhatsAppFab
        │   └── chat/         # Floating Kumar AI Assistant widget
        ├── context/          # CartContext (persistent cart state)
        ├── pages/            # Home, Products, ProductDetail, Cart, Services, ServiceRequest, About, Contact, Admin
        └── services/         # Centralized API service with resilience fallbacks
```

---

## 🚀 How to Run Locally

### 1. Start Backend API Server
```bash
cd backend
npm run dev
# Running on http://localhost:5002
```

### 2. Start Frontend Web App
```bash
cd frontend
npm run dev
# Running on http://localhost:5174
```

---

## ✨ Features & Upgrades

- **Deep Precision & Industrial Theme**: Premium dark slate `#0B132B`, warm electric amber `#F59E0B`, and HVAC ice cyan `#0EA5E9`.
- **RAG AI Assistant with Strict Domain Guardrails**: Only answers queries regarding Kumar Tools, hardware tools, AC capacitors/contactors, refrigerator relays, and doorstep repairs. Politely refuses out-of-domain questions. Includes 1-click cart addition and direct service booking.
- **Autonomous AI WhatsApp Automation**: Automatically dispatches notifications upon order placement, service booking, and admin status changes.
- **Admin Control Center**:
  - Live AI WhatsApp auto-dispatch audit stream.
  - Interactive test & witness simulator console.
  - 1-click mass promotional broadcasts for technicians.
  - Live order and service ticket status managers.
- **HD Realistic Product Images**: All 12 products now feature high-definition photography with hover zoom effects.
