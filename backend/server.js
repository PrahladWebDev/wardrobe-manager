import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import clothingRoutes from "./routes/clothing.js";
import outfitRoutes from "./routes/outfits.js";

dotenv.config();
connectDB();

const app = express();

// ⚡ CORS SETTINGS
// Allows:
// - Production domain
// - Local development
const corsOptions = {
  origin: [process.env.CLIENT_URL, "http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📌 API ROUTES (Nginx forwards /api → backend)
app.use("/api/auth", authRoutes);
app.use("/api/clothing", clothingRoutes);
app.use("/api/outfits", outfitRoutes);

// ⚠️ IMPORTANT:
// Do NOT serve frontend from Express.
// Nginx handles frontend completely.
// This keeps backend clean and avoids routing conflicts.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
