const pool = require("../mysql");

async function getAllEvents() {
  const [rows] = await pool.query(
    `SELECT events.*, categories.name AS category, users.username 
     FROM events 
     LEFT JOIN categories ON events.category_id = categories.id 
     LEFT JOIN users ON events.user_id = users.id`
  );
  return rows;
}

async function createEvent({
  title,
  description,
  location,
  date,
  user_id,
  category_id,
  image_url,
}) {
  await pool.query(
    "INSERT INTO events (title, description, location, date, user_id, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [title, description, location, date, user_id, category_id, image_url]
  );
}

async function approveEvent(id) {
  await pool.query("UPDATE events SET approved = TRUE WHERE id = ?", [id]);
}

async function getEventById(id) {
  const [rows] = await pool.query(
    `SELECT events.*, categories.name AS category, users.username 
     FROM events 
     LEFT JOIN categories ON events.category_id = categories.id 
     LEFT JOIN users ON events.user_id = users.id
     WHERE events.id = ?`,
    [id]
  );
  return rows[0];
}

module.exports = { getAllEvents, createEvent, approveEvent, getEventById };
