const mysql = require("mysql2/promise");
require("dotenv").config();

// Create connection pool instead of single connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "myappuser",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || "Egzaminas",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the MySQL database.");
    connection.release();
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
};

testConnection();

module.exports = pool;
