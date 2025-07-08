# jhinku-backend 🚀

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-5.x-black?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen?logo=mongodb)](https://www.mongodb.com/)
[![Firebase Admin](https://img.shields.io/badge/Firebase_Admin-13.x-yellow?logo=firebase)](https://firebase.google.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

A modern backend boilerplate for Node.js projects using **Express**, **MongoDB (Mongoose)**, and **Firebase Admin** for authentication.  
Ready for deployment on [Vercel](https://vercel.com/) and easy local development.

---

## ✨ Features

- ⚡ **Express 5** API server
- 🔒 JWT/Firebase authentication middleware
- 🗄️ MongoDB with Mongoose ODM
- 🌱 Environment variable support with `.env`
- 🚀 Ready for Vercel serverless deployment
- 📁 Clean project structure

---

## 📂 Project Structure

```
jhinku-backend/
├── src/
│   ├── config/           # Database & Firebase configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom Express middleware (e.g., auth)
│   ├── models/           # Mongoose models
│   ├── routes/           # Express route definitions
│   └── server.js         # App entry point
├── .env                  # Environment variables
├── package.json          # Project metadata & scripts
├── vercel.json           # Vercel deployment config
└── README.md             # Project documentation
```

---

## 🛠️ Example `.env` file

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
JWT_SECRET=your_jwt_secret
```
*Replace the values with your actual configuration settings.*
