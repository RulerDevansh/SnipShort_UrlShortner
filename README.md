# 🚀 SnipShort — Redis-Powered URL Shortener

![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Redis](https://img.shields.io/badge/Redis-7-DC382D?logo=redis&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-24-2496ED?logo=docker&logoColor=white)

**SnipShort** is a high-performance, production-ready URL shortener designed for speed and scale. Built with a hybrid architecture (Vercel + AWS), it leverages Redis caching for sub-millisecond redirects and robust rate limiting.

### 🔗 [Live Demo](https://snipshort.vercel.app)

---

## 📸 Screenshots

| Home Page | Dashboard |
| :---: | :---: |
| ![Home](frontend/public/Home.png) | ![Dashboard](frontend/public/dashboard.png) |

| Guest Experience | Login |
| :---: | :---: |
| ![Guest](frontend/public/Devlogo.svg) | ![Login](frontend/public/Login.png) |

---

## ✨ Features

- ⚡ **Sub-millisecond Redirects:** Powered by Redis caching.
- 🔐 **Secure Auth:** Google OAuth 2.0 & JWT-based authentication.
- 👤 **Guest Mode:** Allow unauthenticated users to create temporary (24h) links.
- 📊 **Analytics:** Track click counts and recent activity for every link.
- 🏷️ **Custom Aliases:** Create branded, memorable short codes.
- 🛡️ **Rate Limiting:** IP-based protection using Redis.
- 🐳 **Dockerized:** Fully containerised backend for seamless deployment.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Vanilla CSS (Modern Design), Axios.
- **Backend:** Node.js, Express, Sequelize ORM.
- **Data:** MySQL (Permanent storage), Redis (Cache & Rate limiting).
- **Deployment:** Vercel (Frontend), AWS EC2 (Dockerized Backend).

---

## 🚀 Quick Start (Local)

### 1. Clone the repository
```bash
git clone https://github.com/RulerDevansh/Snip_UrlShortner.git
cd Snip_UrlShortner
```

### 2. Backend Setup
```bash
cd backend
npm install
# Configure your .env file
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## 📝 License
Built with ❤️ by [RulerDevansh](https://github.com/RulerDevansh)
