import "dotenv/config";
import express from "express";
import cors from "cors";
import pool, { testConnection } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import tournamentRoutes from "./routes/tournamentRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";

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
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);

// Health Check Route
app.get("/health", async (req, res) => {
  const startTime = Date.now();
  let dbStatus = "disconnected";
  let latency = null;
  const dbName = process.env.DB_NAME || "cricpro_db";

  try {
    const connection = await pool.getConnection();
    await connection.query("SELECT 1");
    connection.release();
    dbStatus = "connected";
    latency = `${Date.now() - startTime}ms`;
  } catch (error) {
    dbStatus = "disconnected";
    console.error("Health Check DB Error:", error);
  }

  res.status(dbStatus === "connected" ? 200 : 500).json({
    status: "UP",
    database: {
      status: dbStatus,
      name: dbName,
      latency: latency
    }
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