const pool = require("../mysql");

async function getAllEvents() {
  const [rows] = await pool.query("SELECT * FROM events");
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

async function rejectEvent(id) {
  await pool.query("UPDATE events SET rejected = TRUE WHERE id = ?", [id]);
}

async function getEventById(id) {
  const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
  return rows[0];
}

async function getEventAverageRating(eventId) {
  const [rows] = await pool.query(
    "SELECT AVG(rating) as avg FROM ratings WHERE event_id = ?",
    [eventId]
  );
  return rows[0].avg ? Number(rows[0].avg) : 0;
}

async function deleteEvent(id) {
  await pool.query("DELETE FROM events WHERE id = ?", [id]);
}

module.exports = {
  getAllEvents,
  createEvent,
  approveEvent,
  rejectEvent,
  getEventById,
  getEventAverageRating,
  deleteEvent,
};
