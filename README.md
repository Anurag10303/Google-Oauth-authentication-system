<div align="center">

# 🔐 Google OAuth Authentication System

**A production-ready full-stack authentication system powered by Google OAuth 2.0**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

[🌐 Live Demo](https://google-oauth-authentication-system.vercel.app) · [🔗 Backend API](https://google-oauth-authentication-system-x3l9.onrender.com) · [🐛 Report Bug](https://github.com/your-username/your-repo/issues) · [✨ Request Feature](https://github.com/your-username/your-repo/issues)

</div>

---

## 📸 Preview

> _Login with your Google account and land on a clean, responsive dashboard — with dark mode support._

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Authentication Flow](#-authentication-flow)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Security](#-security)
- [Roadmap](#-roadmap)
- [Key Learnings](#-key-learnings)
- [Author](#-author)

---

## 🧭 Overview

This project demonstrates a complete, secure authentication system built from scratch. Users sign in via their Google account — no passwords, no friction. On the backend, their identity is verified using the official Google Auth Library, persisted in MongoDB, and a JWT is issued in an HTTP-only cookie to maintain the session securely across requests.

---

## 🛠 Tech Stack

| Layer          | Technology                                                          |
| -------------- | ------------------------------------------------------------------- |
| **Frontend**   | Next.js (App Router), Tailwind CSS v4, Axios, `@react-oauth/google` |
| **Backend**    | Node.js, Express.js                                                 |
| **Database**   | MongoDB with Mongoose ODM                                           |
| **Auth**       | Google OAuth 2.0, JWT (HTTP-only cookies)                           |
| **Deployment** | Vercel (frontend) · Render (backend)                                |

---

## ✨ Features

### 🔑 Authentication

- One-click Google Sign-In via OAuth 2.0
- Server-side token verification using the official Google Auth Library
- Auto-registers new users on first login

### 👤 User Management

- Stores `name`, `email`, `profile picture`, and `createdAt` in MongoDB
- Idempotent user creation — existing users are fetched, not duplicated

### 🔒 Session Handling

- JWT issued after successful login
- Stored in **HTTP-only cookies** — inaccessible to JavaScript, safe from XSS
- Secure logout clears the cookie server-side

### 🎨 UI / UX

- Fully responsive across all screen sizes
- Dark mode toggle with system preference detection 🌙
- Loading spinners and graceful error handling
- Smooth theme transitions

---

## 🔐 Authentication Flow

```
User clicks "Sign in with Google"
        │
        ▼
Google returns a credential token
        │
        ▼
Frontend sends token → POST /api/auth/google
        │
        ▼
Backend verifies token via Google Auth Library
        │
        ├── New user? → Save to MongoDB
        │
        ▼
JWT generated → stored in HTTP-only cookie
        │
        ▼
User redirected to /dashboard ✅
```

---

## 📁 Project Structure

```
project-root/
│
├── backend/
│   ├── config/           # DB connection, environment setup
│   ├── controllers/      # Route logic (auth, user)
│   ├── middlewares/      # JWT verification middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express route definitions
│   └── server.js         # Entry point
│
└── frontend/
    ├── app/
    │   ├── dashboard/    # Protected dashboard page
    │   ├── login/        # Google OAuth login page
    │   └── layout.tsx    # Root layout with AuthProvider
    ├── components/
    │   ├── DarkModeToggle.jsx
    │   └── Spinner.jsx
    ├── context/
    │   └── AuthContext.tsx   # Global auth state
    └── utils/
        └── api.ts            # Axios instance with baseURL + credentials
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- MongoDB URI (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- Google OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file (see [Environment Variables](#-environment-variables)), then:

```bash
npm run dev
# Server running at http://localhost:5000
```

### 3. Set up the Frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file, then:

```bash
npm run dev
# App running at http://localhost:3000
```

---

## ⚙️ Environment Variables

### Backend — `backend/.env`

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### Frontend — `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

> ⚠️ Never commit `.env` files. Add them to `.gitignore`.

---

## 🌍 Deployment

### Backend → [Render](https://render.com)

1. Push backend to a GitHub repo and connect to Render
2. Set **Build Command**: `npm install`
3. Set **Start Command**: `npm start`
4. Add all environment variables from `backend/.env`
5. Set `NODE_ENV=production` and `CLIENT_URL=https://your-frontend.vercel.app`

### Frontend → [Vercel](https://vercel.com)

1. Import the frontend repo into Vercel
2. Add environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id`
3. Deploy — Vercel auto-detects Next.js

> 💡 Also add `https://your-frontend.vercel.app` as an **Authorized JavaScript Origin** and **Redirect URI** in your Google Cloud Console OAuth config.

---

## 🔒 Security

| Measure                       | Detail                                                                             |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| **HTTP-only cookies**         | JWT is never accessible via `document.cookie`                                      |
| **SameSite=None + Secure**    | Required for cross-origin cookie sharing in production                             |
| **Google token verification** | Tokens are verified server-side using the official library — never trusted blindly |
| **CORS whitelist**            | Only the frontend origin is allowed to make credentialed requests                  |
| **No password storage**       | Authentication is fully delegated to Google                                        |

---

## 🗺 Roadmap

- [x] Google OAuth 2.0 login
- [x] JWT in HTTP-only cookies
- [x] MongoDB user persistence
- [x] Dark mode toggle
- [ ] Refresh token rotation
- [ ] Role-based access control (RBAC)
- [ ] Profile update page
- [ ] Email/password auth as fallback
- [ ] Rate limiting on auth endpoints

---

## 🧠 Key Learnings

- Implementing the full **OAuth 2.0 authorization code flow** end-to-end
- Why **HTTP-only cookies** are safer than `localStorage` for storing tokens
- Handling **CORS with credentials** (`withCredentials: true` + explicit origin)
- Managing **global auth state** in React with Context + custom hooks
- Debugging **cross-origin cookie** issues between Vercel and Render in production

---

## 👨‍💻 Author

**Anurag Singh**

---

<div align="center">

If this project helped you, consider giving it a ⭐ on GitHub — it means a lot!

</div>
