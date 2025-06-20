const pool = require("../mysql");

async function getAllCategories() {
  const [rows] = await pool.query("SELECT * FROM categories");
  return rows;
}

async function createCategory(name) {
  await pool.query("INSERT INTO categories (name) VALUES (?)", [name]);
}

module.exports = { getAllCategories, createCategory };
