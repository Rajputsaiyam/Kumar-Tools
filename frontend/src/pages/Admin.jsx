import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Clock,
  Wrench,
  AlertTriangle,
  Zap,
  Radio,
  Send,
  ExternalLink,
  CheckCircle2,
  Copy,
  RotateCcw,
  Settings,
  Pencil,
  Trash2,
  Plus,
  Lock,
  Shield,
  ShieldAlert,
  ShieldCheck,
  KeyRound,
  LogOut,
  Eye,
  EyeOff,
  UserCheck,
  Database,
  Key,
  X,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import {
  productApi,
  orderApi,
  serviceApi,
  whatsappApi,
  adminAuthApi,
  STORE_INFO,
  CATEGORIES,
  inr,
} from "../services/api";

export function Admin() {
  // Authentication & Security States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Login Form States
  const [loginId, setLoginId] = useState("saiyamrajput71@gmail.com");
  const [loginPass, setLoginPass] = useState("");
  const [loginMode, setLoginMode] = useState("password"); // 'password' or 'pin'
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Change Password Modal
  const [changePassModal, setChangePassModal] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPin, setNewPin] = useState("");
  const [passUpdating, setPassUpdating] = useState(false);

  // Dashboard Data States
  const [activeTab, setActiveTab] = useState("automation");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);
  const [waSettings, setWaSettings] = useState(null);
  const [waLogs, setWaLogs] = useState([]);
  const [waTemplates, setWaTemplates] = useState([]);
  const [threshold, setThreshold] = useState(5);

  // Test Console State
  const [testEvent, setTestEvent] = useState("ORDER_REQUEST_RECEIVED");
  const [testName, setTestName] = useState("Saiyam (Owner)");
  const [testPhone, setTestPhone] = useState(STORE_INFO.phone);
  const [testRunning, setTestRunning] = useState(false);
  const [broadcastRunning, setBroadcastRunning] = useState(false);
  const [templateCat, setTemplateCat] = useState("All");

  // Check existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const user = adminAuthApi.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        const res = await adminAuthApi.verify();
        if (res.authenticated) {
          setIsAuthenticated(true);
        } else {
          adminAuthApi.logout();
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setAuthLoading(false);
    };

    checkAuth();
  }, []);

  const loadData = async () => {
    try {
      const [prods, ords, srvs, settings, logs, tpls] = await Promise.all([
        productApi.getAll(),
        orderApi.getAll(),
        serviceApi.getAll(),
        whatsappApi.getSettings(),
        whatsappApi.getLogs(),
        whatsappApi.getTemplates(),
      ]);
      setProducts(prods || []);
      setOrders(ords || []);
      setServices(srvs || []);
      setWaSettings(settings);
      setWaLogs(logs || []);
      setWaTemplates(tpls || []);
    } catch (e) {
      console.warn("Failed to load admin data:", e);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    loadData();
    const interval = setInterval(async () => {
      try {
        const logs = await whatsappApi.getLogs();
        if (logs) setWaLogs(logs);
      } catch (e) {}
    }, 6000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginSubmitting(true);

    const res = await adminAuthApi.login(
      loginId,
      loginPass,
      loginMode === "pin" ? loginPass : null,
      rememberMe
    );
    setLoginSubmitting(false);

    if (res.success) {
      setIsAuthenticated(true);
      setCurrentUser(res.admin || { name: "Saiyam Rajput", role: "Owner" });
      setLoginPass("");
      toast.success(`Welcome to Kumar Tools Admin Portal, ${res.admin?.name || "Saiyam"}!`);
    } else {
      setLoginError(res.message || "Invalid Admin ID or Passkey.");
      toast.error("Access Denied: Authentication failed.");
    }
  };

  const handleLogout = () => {
    adminAuthApi.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    toast.info("Logged out from Admin Portal.");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPass || (!newPass && !newPin)) {
      toast.error("Please fill in current passkey and at least one new credential");
      return;
    }
    setPassUpdating(true);
    const res = await adminAuthApi.changePassword(currentPass, newPass, newPin);
    setPassUpdating(false);
    if (res.success) {
      toast.success(res.message || "Admin credentials updated!");
      setChangePassModal(false);
      setCurrentPass("");
      setNewPass("");
      setNewPin("");
    } else {
      toast.error(res.message || "Failed to update credentials");
    }
  };

  const handleTestDispatch = async () => {
    if (!testPhone.trim()) {
      toast.error("Please enter a recipient phone number");
      return;
    }
    setTestRunning(true);
    try {
      const res = await whatsappApi.dispatchTest({
        eventType: testEvent,
        recipientName: testName.trim(),
        recipientPhone: testPhone.trim(),
        orderId: `KT-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        serviceId: `KT-SRV-${Math.floor(2000 + Math.random() * 8000)}`,
        items: "Epcos AC Capacitor 35+5 µF × 2",
        total: 698,
        device: "Split AC (1.5 Ton)",
        service: "AC Deep Jet Servicing",
        slot: "Tomorrow Morning (9–12)",
      });
      if (res.success) {
        toast.success(`⚡ AI Auto-Dispatch successful for ${testEvent}!`);
        const updatedLogs = await whatsappApi.getLogs();
        setWaLogs(updatedLogs);
      }
    } catch (err) {
      toast.error("Test dispatch failed");
    } finally {
      setTestRunning(false);
    }
  };

  const handleMassBroadcast = async () => {
    setBroadcastRunning(true);
    try {
      const res = await whatsappApi.broadcastAll("summer_ac_special");
      if (res.success) {
        toast.success(`📢 Summer AC broadcast dispatched to ${res.data.dispatchedCount} customer & technician contacts!`);
        const updatedLogs = await whatsappApi.getLogs();
        setWaLogs(updatedLogs);
      }
    } catch {
      toast.error("Broadcast failed");
    } finally {
      setBroadcastRunning(false);
    }
  };

  const handleClearLogs = async () => {
    await whatsappApi.clearLogs();
    setWaLogs([]);
    toast.info("WhatsApp dispatch audit stream cleared");
  };

  const handleOrderStatusChange = async (id, newStatus) => {
    await orderApi.updateStatus(id, newStatus);
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    toast.success(`Order ${id} status changed to ${newStatus}. WhatsApp notification dispatched.`);
    const updatedLogs = await whatsappApi.getLogs();
    setWaLogs(updatedLogs);
  };

  const handleServiceStatusChange = async (id, newStatus) => {
    await serviceApi.updateStatus(id, newStatus);
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    toast.success(`Service Ticket ${id} updated to ${newStatus}. WhatsApp alert sent.`);
    const updatedLogs = await whatsappApi.getLogs();
    setWaLogs(updatedLogs);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const updated = await whatsappApi.updateSettings({
      enabled: f.get("enabled") === "on",
      autoSendOnOrder: f.get("autoSendOnOrder") === "on",
      autoSendOnService: f.get("autoSendOnService") === "on",
      autoSendOnStatusChange: f.get("autoSendOnStatusChange") === "on",
      provider: f.get("provider"),
      metaPhoneNumberId: f.get("metaPhoneNumberId"),
      metaAccessToken: f.get("metaAccessToken"),
      aiTone: f.get("aiTone"),
    });
    setWaSettings(updated.data || updated);
    toast.success("WhatsApp Automation Gateway settings saved!");
  };

  const lowStockProducts = products.filter((p) => p.stock <= threshold);

  // 1. Loading state while checking security token
  if (authLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-slate-950 text-white">
        <div className="h-12 w-12 rounded-full border-4 border-brand-orange border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-bold text-slate-300">Verifying Admin Access Credentials...</p>
        <span className="text-xs text-slate-500 mt-1">Kumar Tools Secure Protocol</span>
      </div>
    );
  }

  // 2. Unauthenticated: Render Strict Owner & Admin Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-slate-950 via-brand-navy to-slate-950 text-white">
        <div className="w-full max-w-md">
          {/* Top Brand & Security Emblem */}
          <div className="text-center mb-8">
            <div className="inline-flex relative mb-4 group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-orange to-amber-500 opacity-60 blur-md group-hover:opacity-100 transition-opacity" />
              <img
                src="/logo.jpg"
                alt="Kumar Tools"
                className="relative h-20 w-20 rounded-2xl object-contain bg-white p-1 border-2 border-brand-orange/60 shadow-glow"
              />
              <div className="absolute -bottom-2 -right-2 bg-rose-600 text-white p-1.5 rounded-full border-2 border-slate-950 shadow-md">
                <Lock className="h-4 w-4" />
              </div>
            </div>

            <h1 className="font-display font-black text-2xl tracking-tight text-white">
              KUMAR <span className="text-brand-orange">TOOLS</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mt-1">
              Store Owner & Admin Gate
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-700/50 text-[11px] font-semibold text-rose-300">
              <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
              Restricted Area • Store Management Only
            </div>
          </div>

          {/* Login Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-7 shadow-2xl shadow-black/80 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-brand-orange" />
                Management Authentication
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your owner credentials to access store inventory, WhatsApp automation engine, and customer orders.
              </p>
            </div>

            {loginError && (
              <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-3.5 flex items-start gap-3 text-rose-400 text-xs">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-rose-500" />
                <div className="flex-1">
                  <p className="font-bold">Access Denied</p>
                  <p className="mt-0.5 text-rose-300/90">{loginError}</p>
                </div>
              </div>
            )}

            {/* Mode Selector */}
            <div className="flex rounded-xl bg-slate-950/80 p-1 border border-slate-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLoginMode("password")}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  loginMode === "password"
                    ? "bg-brand-orange text-white shadow-md font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Master Password
              </button>
              <button
                type="button"
                onClick={() => setLoginMode("pin")}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  loginMode === "pin"
                    ? "bg-brand-orange text-white shadow-md font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Quick 4-Digit PIN
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Admin Identifier (Email / Phone / Username)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="saiyamrajput71@gmail.com or 9210797245"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {loginMode === "password" ? "Admin Master Password" : "4-Digit Security PIN"}
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {loginMode === "pin" ? "Default: 9354" : "Default: kumar9354"}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoFocus
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder={loginMode === "pin" ? "••••" : "Enter master password"}
                    maxLength={loginMode === "pin" ? 10 : 50}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-brand-orange focus:ring-brand-orange"
                  />
                  <span>Remember this device</span>
                </label>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> 256-bit Token
                </span>
              </div>

              <button
                type="submit"
                disabled={loginSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 hover:from-brand-orangeHover hover:to-orange-500 py-3.5 px-4 text-sm font-black text-white shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loginSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Unlock Admin Console</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 border-t border-slate-800 text-center">
              <Link
                to="/"
                className="text-xs font-semibold text-slate-400 hover:text-brand-orange transition-colors inline-flex items-center gap-1"
              >
                ← Return to Public Customer Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated: Render Full Admin Hub with Security Bar
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Admin Security Session Bar */}
      <div className="rounded-2xl bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy border border-slate-800 p-4 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">
                {currentUser?.name || "Saiyam Rajput"}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange">
                Owner & Super Admin
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {currentUser?.email || "saiyamrajput71@gmail.com"} • Level 1 Administrative Session Active
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-400">
            <Database className="h-3.5 w-3.5" />
            MongoDB: kumartools
          </span>

          <button
            onClick={() => setChangePassModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors"
          >
            <Key className="h-3.5 w-3.5 text-brand-orange" />
            <span>Passkey Settings</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 border border-rose-600/40 hover:border-rose-600 px-3 py-1.5 text-xs font-bold text-rose-300 hover:text-white transition-all shadow-sm"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Lock / Sign Out</span>
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {changePassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-white space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Key className="h-5 w-5 text-brand-orange" />
                Change Admin Credentials
              </h3>
              <button
                onClick={() => setChangePassModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Current Password / PIN
                </label>
                <input
                  type="password"
                  required
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="Enter current password or PIN"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  New Master Password (Optional)
                </label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Leave blank to keep unchanged"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  New 4-Digit PIN (Optional)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="e.g. 9354"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setChangePassModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passUpdating}
                  className="flex-1 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-xs font-bold text-white shadow-glow"
                >
                  {passUpdating ? "Saving..." : "Update Passkey"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <img
            src="/logo.jpg"
            alt="Kumar Tools"
            className="h-14 w-14 rounded-2xl object-contain bg-white p-1 border border-slate-200 shadow-sm shrink-0"
          />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Kumar Tools Admin
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mt-0.5">
              Operations & WhatsApp Hub
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-700">
            <Radio className="h-3.5 w-3.5 animate-pulse text-emerald-500" />
            AI WhatsApp Automation Active
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-soft">
          <Package className="h-5 w-5 text-brand-orange" />
          <p className="mt-2 text-xl sm:text-2xl font-black text-slate-900">{products.length}</p>
          <p className="text-[11px] sm:text-xs text-slate-500">Total Products</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-soft">
          <ShoppingBag className="h-5 w-5 text-sky-500" />
          <p className="mt-2 text-xl sm:text-2xl font-black text-slate-900">{orders.length}</p>
          <p className="text-[11px] sm:text-xs text-slate-500">Total Orders</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-soft">
          <Clock className="h-5 w-5 text-amber-500" />
          <p className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
            {orders.filter((o) => o.status === "Pending").length}
          </p>
          <p className="text-[11px] sm:text-xs text-slate-500">Pending Orders</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-soft">
          <Wrench className="h-5 w-5 text-indigo-500" />
          <p className="mt-2 text-xl sm:text-2xl font-black text-slate-900">{services.length}</p>
          <p className="text-[11px] sm:text-xs text-slate-500">Service Requests</p>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-soft">
          <Zap className="h-5 w-5 text-emerald-500" />
          <p className="mt-2 text-xl sm:text-2xl font-black text-slate-900">{waLogs.length}</p>
          <p className="text-[11px] sm:text-xs text-slate-500">AI Auto-Dispatches</p>
        </div>
      </div>

      {/* Tabs Navigator */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: "automation", label: "⚡ WhatsApp Automation", count: waLogs.length },
          { id: "orders", label: "Orders", count: orders.length },
          { id: "services", label: "Service Requests", count: services.length },
          { id: "products", label: "Products", count: products.length },
          { id: "inventory", label: "Low Stock Inventory", count: lowStockProducts.length },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === t.id
                ? "border-brand-orange text-brand-navy"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>{t.label}</span>
            {t.count !== undefined && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ======================= TAB: WHATSAPP AUTOMATION ======================= */}
      {activeTab === "automation" && (
        <div className="space-y-8">
          {/* Test & Witness Console */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-black text-lg text-slate-900 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-brand-orange" />
                  Test & Witness AI Auto-Dispatch
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Simulate live events and witness immediate WhatsApp formatting and dispatch to your phone.
                </p>
              </div>

              <button
                onClick={handleMassBroadcast}
                disabled={broadcastRunning}
                className="flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 text-xs font-bold transition-all shadow-sm shrink-0"
              >
                <Radio className="h-3.5 w-3.5 text-brand-orange" />
                <span>{broadcastRunning ? "Broadcasting..." : "1-Click Summer AC Broadcast"}</span>
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Event Trigger
                </label>
                <select
                  value={testEvent}
                  onChange={(e) => setTestEvent(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white"
                >
                  <option value="ORDER_REQUEST_RECEIVED">Order Request Received (Cart)</option>
                  <option value="SERVICE_BOOKED">Service Booking Confirmed (Technician)</option>
                  <option value="ORDER_STATUS_UPDATED">Order Status Changed (Ready/Dispatched)</option>
                  <option value="SERVICE_STATUS_UPDATED">Service Status Changed (Scheduled)</option>
                  <option value="MARKETING_BROADCAST">Seasonal Marketing Broadcast</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Customer / Technician Name
                </label>
                <input
                  type="text"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Recipient Mobile
                </label>
                <input
                  type="tel"
                  value={testPhone}
                  onChange={(e) => setTestPhone(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none focus:border-brand-orange focus:bg-white font-mono"
                />
              </div>

              <button
                onClick={handleTestDispatch}
                disabled={testRunning}
                className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-brand-orange text-white font-black text-xs hover:bg-brand-orangeHover shadow-glow transition-all"
              >
                <Zap className="h-4 w-4" />
                <span>{testRunning ? "Dispatching..." : "⚡ Trigger AI Auto-Send"}</span>
              </button>
            </div>
          </div>

          {/* Live Dispatch Stream Table */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-soft overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-emerald-500 animate-pulse" />
                <h3 className="font-bold text-sm text-slate-900">Live AI Auto-Dispatch Stream</h3>
                <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[10px] font-extrabold text-slate-700">
                  {waLogs.length} events
                </span>
              </div>

              {waLogs.length > 0 && (
                <button
                  onClick={handleClearLogs}
                  className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Clear Logs
                </button>
              )}
            </div>

            {waLogs.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No automated WhatsApp dispatches recorded yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-[460px] overflow-y-auto">
                {waLogs.map((log) => (
                  <div key={log.id} className="p-4 sm:p-5 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-900">{log.id}</span>
                        <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-brand-gold border border-amber-500/20">
                          {log.eventType}
                        </span>
                        <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 flex items-center gap-1 border border-emerald-500/20">
                          <CheckCircle2 className="h-3 w-3" /> {log.status}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 font-medium">
                        Recipient: <b>{log.recipientName}</b> ({log.recipientPhone})
                      </p>

                      <pre className="text-[11px] font-mono text-slate-600 bg-slate-100 p-2.5 rounded-xl border border-slate-200 whitespace-pre-line line-clamp-2">
                        {log.message}
                      </pre>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(log.message);
                          toast.success("Message text copied!");
                        }}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                      >
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </button>

                      <a
                        href={log.directWaLink}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white flex items-center gap-1.5 shadow-sm"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Open WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Template Catalog */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-black text-lg text-slate-900">
                  Pre-Configured WhatsApp Templates
                </h3>
                <p className="text-xs text-slate-500">
                  Templates dynamically populated by the AI engine based on customer events.
                </p>
              </div>

              <div className="flex gap-1.5 flex-wrap">
                {["All", "Orders", "Services", "Marketing", "Technicians"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setTemplateCat(c)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      templateCat === c
                        ? "bg-brand-dark text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {waTemplates
                .filter((t) => templateCat === "All" || t.category === templateCat)
                .map((t) => (
                  <div key={t.id} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-xs text-slate-900">{t.name}</h4>
                        <span className="rounded bg-brand-orangeLight px-2 py-0.5 text-[10px] font-bold text-brand-navy">
                          {t.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-2">{t.description}</p>
                      <pre className="rounded-xl bg-white p-3 text-[11px] font-mono text-slate-700 whitespace-pre-wrap border border-slate-200 max-h-36 overflow-y-auto leading-relaxed">
                        {t.templateText}
                      </pre>
                    </div>

                    <div className="flex justify-end pt-2 border-t border-slate-200/80">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(t.templateText);
                          toast.success(`Template ${t.name} copied!`);
                        }}
                        className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1"
                      >
                        <Copy className="h-3 w-3" /> Copy Template
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Gateway Settings Form */}
          {waSettings && (
            <form onSubmit={handleSaveSettings} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft space-y-6">
              <h3 className="font-display font-black text-lg text-slate-900 flex items-center gap-2">
                <Settings className="h-5 w-5 text-brand-orange" /> Gateway & Dispatch Provider Configuration
              </h3>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Active Gateway
                  </label>
                  <select
                    name="provider"
                    defaultValue={waSettings.provider}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                  >
                    <option value="simulation">Smart Local Queue (Zero Config / Active)</option>
                    <option value="meta">Meta Cloud API (Official WhatsApp)</option>
                    <option value="ultramsg">UltraMsg Gateway</option>
                    <option value="webhook">Custom Webhook (Zapier/n8n)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    AI Tone
                  </label>
                  <select
                    name="aiTone"
                    defaultValue={waSettings.aiTone}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                  >
                    <option value="professional">Professional Technician & Clean</option>
                    <option value="urgent">Urgent & Fast Service</option>
                    <option value="friendly">Warm & Customer-Friendly</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Meta Phone ID
                  </label>
                  <input
                    name="metaPhoneNumberId"
                    defaultValue={waSettings.metaPhoneNumberId}
                    placeholder="e.g. 10928374..."
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                    Meta Access Token
                  </label>
                  <input
                    type="password"
                    name="metaAccessToken"
                    defaultValue={waSettings.metaAccessToken}
                    placeholder="EAAG..."
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-6 pt-3 border-t border-slate-100 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input type="checkbox" name="enabled" defaultChecked={waSettings.enabled} className="rounded" />
                  Enable AI Automation
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input type="checkbox" name="autoSendOnOrder" defaultChecked={waSettings.autoSendOnOrder} className="rounded" />
                  Auto-Send on Order Placement
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input type="checkbox" name="autoSendOnService" defaultChecked={waSettings.autoSendOnService} className="rounded" />
                  Auto-Send on Service Request
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input type="checkbox" name="autoSendOnStatusChange" defaultChecked={waSettings.autoSendOnStatusChange} className="rounded" />
                  Auto-Send on Status Updates
                </label>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="rounded-xl bg-brand-orange text-white px-5 py-2.5 text-xs font-bold hover:bg-brand-orangeHover shadow-sm"
                >
                  Save Gateway Settings
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ======================= TAB: ORDERS ======================= */}
      {activeTab === "orders" && (
        <div className="rounded-3xl border border-slate-200 bg-white shadow-soft overflow-hidden">
          <div className="p-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900">Registered Customer Orders</h3>
            <span className="text-xs text-slate-500">Changing status triggers automated AI WhatsApp notification</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Order ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Phone</th>
                  <th className="p-3.5">Items</th>
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Status & WhatsApp Alert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono font-bold text-brand-dark">{o.id}</td>
                    <td className="p-3.5 font-bold text-slate-900">{o.customer}</td>
                    <td className="p-3.5 font-mono text-slate-600">{o.phone}</td>
                    <td className="p-3.5 text-slate-700 max-w-xs">{o.items}</td>
                    <td className="p-3.5 font-bold text-slate-900">{inr(o.total)}</td>
                    <td className="p-3.5 text-slate-500">{o.date}</td>
                    <td className="p-3.5">
                      <select
                        value={o.status}
                        onChange={(e) => handleOrderStatusChange(o.id, e.target.value)}
                        className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-800"
                      >
                        {["Pending", "Confirmed", "Processing", "Ready", "Completed", "Cancelled"].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================= TAB: SERVICES ======================= */}
      {activeTab === "services" && (
        <div className="rounded-3xl border border-slate-200 bg-white shadow-soft overflow-hidden">
          <div className="p-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900">Appliance Service Tickets</h3>
            <span className="text-xs text-slate-500">Updating status dispatches technician alert to customer</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Ticket ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Phone</th>
                  <th className="p-3.5">Device</th>
                  <th className="p-3.5">Service Type</th>
                  <th className="p-3.5">Address</th>
                  <th className="p-3.5">Problem Notes</th>
                  <th className="p-3.5">Status & WhatsApp Alert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono font-bold text-brand-dark">{s.id}</td>
                    <td className="p-3.5 font-bold text-slate-900">{s.name}</td>
                    <td className="p-3.5 font-mono text-slate-600">{s.phone}</td>
                    <td className="p-3.5">
                      <span className="rounded bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold text-sky-700">
                        {s.device}
                      </span>
                    </td>
                    <td className="p-3.5 font-medium text-slate-800">{s.service}</td>
                    <td className="p-3.5 text-slate-500 max-w-xs line-clamp-1">{s.address}</td>
                    <td className="p-3.5 text-slate-500 max-w-xs line-clamp-1">{s.problem}</td>
                    <td className="p-3.5">
                      <select
                        value={s.status}
                        onChange={(e) => handleServiceStatusChange(s.id, e.target.value)}
                        className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-800"
                      >
                        {["New", "Contacted", "Scheduled", "In Progress", "Completed", "Cancelled"].map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================= TAB: PRODUCTS ======================= */}
      {activeTab === "products" && (
        <div className="rounded-3xl border border-slate-200 bg-white shadow-soft overflow-hidden">
          <div className="p-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900">Products Catalog ({products.length})</h3>
            <button
              onClick={() => toast.info("Product creator connected to catalog API")}
              className="rounded-xl bg-brand-orange text-white px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 hover:bg-brand-orangeHover shadow-sm"
            >
              <Plus className="h-4 w-4" /> Add Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Brand</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900 flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="h-9 w-9 rounded-lg object-cover border" />
                      <div>
                        <span>{p.name}</span>
                        <span className="block font-mono text-[10px] text-slate-400 font-normal">{p.sku}</span>
                      </div>
                    </td>
                    <td className="p-3.5 capitalize text-slate-600">{p.category}</td>
                    <td className="p-3.5 text-slate-700">{p.brand}</td>
                    <td className="p-3.5 font-extrabold text-slate-900">{inr(p.price)}</td>
                    <td className="p-3.5 font-mono font-bold">{p.stock}</td>
                    <td className="p-3.5">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        p.stock === 0 ? "bg-rose-50 text-rose-600" : p.stock <= 5 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                      }`}>
                        {p.stock === 0 ? "Out of stock" : p.stock <= 5 ? "Low Stock" : "In Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================= TAB: INVENTORY ======================= */}
      {activeTab === "inventory" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Threshold: Parts with stock ≤ {threshold}</span>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <span>Threshold:</span>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-16 h-8 px-2 rounded-lg border border-slate-200 text-center"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">SKU</th>
                    <th className="p-3.5">Stock Left</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lowStockProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-amber-50/50">
                      <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                        <img src={p.image} alt={p.name} className="h-8 w-8 rounded object-cover border" />
                        {p.name}
                      </td>
                      <td className="p-3.5 font-mono text-slate-500">{p.sku}</td>
                      <td className="p-3.5 font-mono font-bold text-rose-600">{p.stock}</td>
                      <td className="p-3.5 font-bold text-slate-900">{inr(p.price)}</td>
                      <td className="p-3.5">
                        <button
                          onClick={() => {
                            productApi.update(p.id, { stock: p.stock + 20 });
                            setProducts((prev) =>
                              prev.map((x) => (x.id === p.id ? { ...x, stock: x.stock + 20 } : x))
                            );
                            toast.success(`Restocked 20 units of ${p.name}!`);
                          }}
                          className="rounded-lg bg-brand-orange text-white px-2.5 py-1 text-xs font-bold hover:bg-brand-orangeHover"
                        >
                          +20 Restock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
