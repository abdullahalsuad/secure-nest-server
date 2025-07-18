# Secure Nest Server

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-5.x-black?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen?logo=mongodb)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-payments-blue?logo=stripe)](https://stripe.com/)
[![Firebase Admin](https://img.shields.io/badge/Firebase_Admin-13.x-yellow?logo=firebase)](https://firebase.google.com/)

A robust, production-ready backend for insurance management, built with **Express 5**, **MongoDB (Mongoose)**, **JWT/Firebase authentication**, and **Stripe** for secure payments.  
Easily deployable on [Vercel](https://vercel.com/) and optimized for modern full-stack applications.

---

## Features

- Express 5 RESTful API server
- JWT & Firebase authentication middleware
- MongoDB with Mongoose ODM
- Stripe integration for payments
- Environment variable support with `.env`
- Modular, scalable project structure
- Role-based access control (Admin, Agent, Customer)
- Ready for Vercel serverless deployment

---

## Project Structure

```
secure-nest-server/
├── src/
│   ├── config/           # Database, Stripe, and Firebase configuration
│   ├── controllers/      # Route controllers (business logic)
│   ├── middleware/       # Express middleware (auth, error handling, RBAC)
│   ├── models/           # Mongoose models (User, Policy, Payment, etc.)
│   ├── routes/           # Express route definitions
│   ├── utils/            # Utility/helper functions
│   └── server.js         # App entry point
├── .env                  # Environment variables
├── package.json          # Project metadata & scripts
├── vercel.json           # Vercel deployment config
└── README.md             # Project documentation
```

---

## Example `.env` file

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

_Replace the values with your actual configuration settings._

---

## API Documentation

Base URL: [https://secure-nest-server.vercel.app/](https://secure-nest-server.vercel.app/)

### Users & Auth

| Method | Endpoint                        | Description                        | Auth         |
|--------|---------------------------------|------------------------------------|--------------|
| POST   | `/jwt`                          | Create JWT cookie                  | No           |
| POST   | `/logout`                       | Clear JWT cookie                   | No           |
| POST   | `/add-user`                     | Add a user                         | No           |
| PATCH  | `/update-profile/:userId`       | Update user profile                | Yes (User)   |
| PATCH  | `/update-agent-profile/:userId` | Update agent profile               | Yes (User)   |
| GET    | `/user/:userId`                 | Get user by ID                     | No           |
| GET    | `/agents`                       | Get all agents                     | No           |
| GET    | `/users`                        | Get all users                      | Yes (Admin)  |
| PATCH  | `/role/:userId`                 | Change user role                   | Yes (Admin)  |

---

### Applications

| Method | Endpoint                                   | Description                        | Auth           |
|--------|--------------------------------------------|------------------------------------|----------------|
| POST   | `/application`                             | Create an application              | Yes (User)     |
| PATCH  | `/applications/assign-agent/:applicationId`| Assign agent to application        | Yes (Admin)    |
| GET    | `/applications`                            | Get all applications               | Yes (User)     |
| GET    | `/my-applications/:userId`                 | Get user's applications            | Yes (User)     |
| PATCH  | `/applications/:applicationId`             | Update application status          | Yes (User)     |
| GET    | `/assigned-applications/:userId`           | Get assigned applications (agent)  | Yes (User)     |
| GET    | `/single-application/:applicationId`       | Get single application             | No             |
| GET    | `/approved-policies/:userId`               | Get all approved policies for user | Yes (User)     |

---

### Blogs

| Method | Endpoint                | Description                    | Auth         |
|--------|-------------------------|--------------------------------|--------------|
| POST   | `/add-blog`             | Create a new blog              | No           |
| GET    | `/blogs`                | Get all blogs                  | No           |
| GET    | `/blogs/:id`            | Get a single blog              | No           |
| DELETE | `/blogs/:id`            | Delete a blog                  | No           |
| PATCH  | `/blogs/:id`            | Update a blog                  | No           |
| GET    | `/my-blogs/:userId`     | Get blogs by user              | No           |
| GET    | `/latest-blogs`         | Get latest blogs               | No           |

---

### Claims

| Method | Endpoint                        | Description                        | Auth         |
|--------|---------------------------------|------------------------------------|--------------|
| POST   | `/claims`                       | Submit a claim                     | Yes (User)   |
| GET    | `/claims`                       | Get all claims (admin)             | Yes (Admin)  |
| GET    | `/claims/:assignedAgentId`      | Get all claims (agent)             | Yes (Agent)  |
| PATCH  | `/claims/:claimId`              | Approve claim                      | Yes (Agent)  |

---

### Newsletter

| Method | Endpoint        | Description                | Auth |
|--------|----------------|----------------------------|------|
| POST   | `/subscribe`   | Subscribe to newsletter    | No   |

---

### Payments

| Method | Endpoint                         | Description                        | Auth         |
|--------|----------------------------------|------------------------------------|--------------|
| POST   | `/create-payment-intent`         | Create Stripe payment intent       | No           |
| POST   | `/payments`                      | Add a payment                      | No           |
| GET    | `/all-payments`                  | Get all payment history (admin)    | No           |
| GET    | `/income-stats`                  | Get income stats                   | No           |
| GET    | `/payments-history/:userId`      | Get payment history by user        | No           |

---

### Policies

| Method | Endpoint                        | Description                        | Auth         |
|--------|---------------------------------|------------------------------------|--------------|
| POST   | `/add-police`                   | Create new policy                  | Yes (Admin)  |
| GET    | `/top-police`                   | Get top 6 most purchased policies  | No           |
| GET    | `/polices`                      | Get all policies                   | No           |
| GET    | `/all-polices`                  | Get all policies (admin)           | Yes (Admin)  |
| GET    | `/policies/categories`          | Get policy categories              | No           |
| GET    | `/polices/:id`                  | Get a policy by ID                 | No           |
| DELETE | `/policies/:id`                 | Delete a policy                    | Yes (Admin)  |
| PATCH  | `/policies/:id`                 | Update a policy                    | Yes (Admin)  |

---

### Reviews

| Method | Endpoint        | Description                | Auth       |
|--------|----------------|----------------------------|------------|
| POST   | `/reviews`     | Submit a review            | Yes (User) |
| GET    | `/reviews`     | List all reviews           | No         |

---

