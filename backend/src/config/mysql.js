import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "aurelien",
  database: process.env.DB_NAME || "skilltree_rpg",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Connected to MySQL database");
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ Error connecting to MySQL database:", error);
    return false;
  }
};

export default pool;
