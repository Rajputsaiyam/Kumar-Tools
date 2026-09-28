import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { WhatsAppFab } from "./components/common/WhatsAppFab";
import { ChatbotWidget } from "./components/chat/ChatbotWidget";

import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Services } from "./pages/Services";
import { ServiceRequest } from "./pages/ServiceRequest";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Admin } from "./pages/Admin";
import { OrderHistory } from "./pages/OrderHistory";

export function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 font-sans selection:bg-brand-orange selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/track-order" element={<OrderHistory />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service-request" element={<ServiceRequest />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              {/* Fallback */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />

          {/* Floating Action Elements */}
          <WhatsAppFab />
          <ChatbotWidget />
          <Toaster position="top-center" richColors />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
