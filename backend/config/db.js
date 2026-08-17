import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "cricpro_db",
  port: parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection on initialization
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("⚡ MySQL Database connected successfully to:", process.env.DB_NAME || "cricpro_db");
    connection.release();
    return true;
  } catch (error) {
    console.error("⚠️ MySQL Database connection failed!");
    console.error("Connection Error Object:", error);
    console.error("Error Message:", error?.message);
    console.error("Error Code:", error?.code);
    console.error("Error Errno:", error?.errno);
    console.error("Error SQLState:", error?.sqlState);
    console.error("Error Stack Trace:", error?.stack);
    console.log("ℹ️ Ensure your MySQL server is running, the credentials in '.env' are correct, and the database exists.");
    return false;
  }
};

export default pool;
