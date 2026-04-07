# 🔐 Google OAuth Authentication System

A full-stack authentication system built with **Next.js, Node.js, Express, MongoDB**, and **Google OAuth 2.0**.  
Users can securely log in using their Google account, maintain sessions using JWT (stored in HTTP-only cookies), and log out safely.

---

## 🚀 Live Demo

🌐 Frontend: https://google-oauth-authentication-system.vercel.app
🔗 Backend API: https://google-oauth-authentication-system-x3l9.onrender.com

---

## 🛠 Tech Stack

### Frontend

- Next.js (React)
- Tailwind CSS
- Axios
- Google OAuth (`@react-oauth/google`)

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Google Auth Library

---

## ✨ Features

### 🔑 Authentication

- Google Sign-In using OAuth 2.0
- Fetch user profile (name, email, image)
- Store user in MongoDB (if not exists)
- Secure authentication using JWT (HTTP-only cookies)

### 👤 User Management

- Stores:
  - Name
  - Email
  - Profile Picture
  - Created At

### 🔓 Login / Logout

- Login via Google account
- Logout clears JWT cookie securely

### 🎨 UI Features

- Fully responsive design
- Dark Mode toggle 🌙
- Loading states & error handling

---

## 🔐 Authentication Flow

1. User clicks **Google Login**
2. Google returns a credential token
3. Frontend sends token to backend
4. Backend verifies token using Google API
5. User is created (if new) in MongoDB
6. JWT is generated and stored in **HTTP-only cookie**
7. User session is maintained securely

---

## 📁 Project Structure

```
project-root/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── frontend/
│ ├── app/
│ ├── components/
│ ├── context/
│ ├── utils/
│ └── styles/
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
CLIENT_URL=http://localhost:3000

NODE_ENV=development

---

### Frontend (`frontend/.env.local`)

NEXT_PUBLIC_API_URL=http://localhost:5000/api

NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

---

## 🧪 Running Locally

### 1️⃣ Clone the repo

git clone https://github.com/your-username/your-repo.git

---

### 2️⃣ Setup Backend

cd backend
npm install
npm run dev

---

### 3️⃣ Setup Frontend

cd frontend
npm install
npm run dev

---

## 🌍 Deployment

### Backend (Render)

- Add environment variables
- Set:
  - `NODE_ENV=production`
  - `CLIENT_URL=https://your-frontend.vercel.app`

### Frontend (Vercel)

- Add:
  - `NEXT_PUBLIC_API_URL`
  - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`

---

## 🔒 Security

- JWT stored in **HTTP-only cookies**
- `SameSite=None` and `Secure=true` in production
- Google token verification using official library
- CORS configured for trusted origins only

---

## 🧠 Key Learnings

- OAuth 2.0 authentication flow
- Secure cookie-based authentication
- Full-stack integration (frontend + backend)
- Handling CORS and production deployment issues
- Managing authentication state in React

---

## 📌 Future Improvements

- Refresh token implementation
- Role-based authentication
- Profile update functionality
- Better UI animations

---

## 🙌 Acknowledgements

- Google OAuth Documentation
- Next.js & Tailwind CSS Docs

---

## 👨‍💻 Author

**Anurag Singh**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
