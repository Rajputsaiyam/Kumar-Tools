# Kumar Tools & Refrigeration - Production Deployment Guide

This guide explains how to deploy both the **Backend API** and **Frontend** to the cloud safely and easily.

---

## 🔒 Secret Environment Variables Checklist

Before deploying, make sure you configure these environment variables in your cloud hosting dashboard (e.g. Render, Railway, or Vercel). **Never commit the `.env` file to GitHub.**

| Variable | Description | Production Example |
| :--- | :--- | :--- |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server listening port | `5002` (or provided by host) |
| `MONGO_URI` | MongoDB Atlas Connection String | `mongodb+srv://<user>:<password>@cluster0.mongodb.net/kumartools?retryWrites=true&w=majority` |
| `FRONTEND_URL` | Live URL of your frontend | `https://kumar-tools.vercel.app` (or same domain) |
| `WHATSAPP_NUMBER` | Official store WhatsApp line | `9210797245` |
| `ADMIN_EMAIL` | Owner administrative login | `saiyamrajput71@gmail.com` |
| `ADMIN_PHONE` | Owner administrative phone | `9210797245` |
| `ADMIN_PASSWORD` | Owner passkey for Admin Panel | *(Your chosen secure password)* |
| `ADMIN_PIN` | 4-digit quick passkey PIN | `9354` |
| `ADMIN_SECRET_KEY` | JWT secret signature | *(A 32+ character random string)* |

---

## 🚀 Option 1: Unified 1-Service Deployment (Recommended: Render / Railway)

In this setup, your Node.js Express server automatically builds the Vite frontend and serves it directly. There are **zero CORS issues**, only 1 service to manage, and it can be run completely on free/starter tiers.

### Deploying on [Render.com](https://render.com):
1. Sign in to Render and click **New +** → **Web Service**.
2. Connect your GitHub repository (`kumar-tools`).
3. Set the following settings:
   - **Name**: `kumar-tools`
   - **Region**: Singapore or Frankfurt (close to India)
   - **Branch**: `main`
   - **Root Directory**: Leave blank (uses repository root)
   - **Runtime**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
4. Under **Environment Variables**, add the keys from the checklist above:
   - Set `MONGO_URI` to your MongoDB Atlas connection string.
   - Set `NODE_ENV` = `production`.
   - Set your `ADMIN_PASSWORD`, `ADMIN_PIN`, and `ADMIN_SECRET_KEY`.
5. Click **Deploy Web Service**.
6. Render will automatically build the React frontend into `dist/` and launch the Express backend. Your website will be live at `https://kumar-tools.onrender.com`!

---

## ⚡ Option 2: Decoupled (Frontend on Vercel + Backend on Render/Railway)

If you prefer deploying the frontend on **Vercel** for global edge CDN speed, follow these steps:

### Part A: Deploy Backend on Render / Railway
1. Create a **Web Service** on Render pointing to your repo.
2. Set **Root Directory**: `backend`
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm start`
5. Add all backend environment variables (including `MONGO_URI`).
6. Copy your live backend URL (e.g. `https://kumar-tools-api.onrender.com`).

### Part B: Deploy Frontend on Vercel
1. Go to [Vercel.com](https://vercel.com) and click **Add New Project**.
2. Import your GitHub repository.
3. In **Root Directory**, click edit and select `frontend`.
4. Framework Preset will automatically detect **Vite**.
5. Under **Environment Variables**, add:
   - `VITE_API_URL` = `https://kumar-tools-api.onrender.com` (Your live backend URL from Part A)
6. Click **Deploy**.
7. Vercel will build the frontend with `vercel.json` SPA rewrite rules and launch your site with a custom `.vercel.app` domain.

---

## 🍃 Setting up Free MongoDB Atlas Database

If you haven't set up a cloud MongoDB Atlas instance yet:
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free M0 cluster.
2. In **Database Access**, create a user with a secure password.
3. In **Network Access**, add IP `0.0.0.0/0` (Allow access from anywhere) so your cloud host can connect.
4. Click **Connect** → **Connect your application** (Drivers) and copy the URI:
   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/kumartools?retryWrites=true&w=majority`
5. Paste this connection string into your host's `MONGO_URI` environment variable.
