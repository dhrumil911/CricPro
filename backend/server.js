import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS middleware
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Configure parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use("/api/auth", authRoutes);

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CricPro Backend Running"
  });
});

// Graceful 404 Route handler for API endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route Not Found: ${req.method} ${req.originalUrl}`
  });
});

// Boot Express Server
app.listen(PORT, async () => {
  console.log(`🚀 CricPro API Server is running on port ${PORT}`);
  console.log(`📡 Health check URL: http://localhost:${PORT}/health`);
  
  // Test Database connectivity
  await testConnection();
});

export default app;
