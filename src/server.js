import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

// routes
import userRoutes from "./routes/userRoutes.js";
import policeRoutes from "./routes/policeRoutes.js";
import applicationRouter from "./routes/applicationRouter.js";
import blogRoutes from "./routes/blogRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://secure-nest-client.vercel.app"],
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

// Routes for application
app.use("/api/v1", applicationRouter);

// Routes for blogs
app.use("/api/v1", blogRoutes);

// Routes for newsletter
app.use("/api/v1", newsletterRoutes);

// Routes for claims
app.use("/api/v1", claimRoutes);

// review routes
app.use("/api/v1", reviewRoutes);

// Routes for payment
app.use("/api/v1", paymentRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Secure Nest Server  is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
