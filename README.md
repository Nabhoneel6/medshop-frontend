# 💊 MedShop — Online Medicine Store

A full-stack MERN e-commerce app for buying medicines online. Includes authentication, cart, orders, admin panel, health articles, and doctor consultation.

## 🚀 Live Demo

- **Frontend:** https://medshop-frontend.vercel.app/
- **Backend API:** https://dashboard.render.com/web/srv-dav9k6flot8c73cr3ok0/deploys


## ✨ Features

### Customer

- Browse medicines by category, search, filter, sort
- Upload prescription (UI)
- Add to cart, checkout with COD
- Order history + order tracking
- Doctor consultation page
- Health articles
- Wishlist

### Admin

- Dashboard for all orders
- Update order status (placed → delivered)
- Manage medicines & categories
- User management

### Security

- JWT authentication
- Password hashing with bcrypt
- Role-based access control

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS v4, React Router, Axios, React Hot Toast
**Backend:** Node.js, Express, MongoDB Atlas, Mongoose, JWT, bcryptjs
**Deploy:** Vercel (frontend) + Render (backend)

## 📦 Installation

### Backend

```bash
cd medicine-shop-api
npm install
# Create .env with MONGO_URI, JWT_SECRET, PORT
npm run dev
```
