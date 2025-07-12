import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

// routes
import userRoutes from "./routes/userRoutes.js";
import policeRoutes from "./routes/policeRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Connect to DB
connectDB();

// Routes for articles
app.use("/api/v1", userRoutes);

// Routes for polices
app.use("/api/v1", policeRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Secure Nest Server  is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
