const pool = require("../mysql");

async function getAllUsers() {
  const [rows] = await pool.query(
    "SELECT id, username, email, role FROM users"
  );
  return rows;
}

async function getUserById(id) {
  const [rows] = await pool.query(
    "SELECT id, username, email, role FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
}

module.exports = { getAllUsers, getUserById };
