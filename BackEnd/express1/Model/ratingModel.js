const pool = require("../mysql");

async function getRatingsByEvent(event_id) {
  const [rows] = await pool.query(
    `SELECT ratings.*, users.username 
     FROM ratings 
     LEFT JOIN users ON ratings.user_id = users.id 
     WHERE event_id = ?`,
    [event_id]
  );
  return rows;
}

async function addRating({ event_id, user_id, rating, comment }) {
  await pool.query(
    "INSERT INTO ratings (event_id, user_id, rating, comment) VALUES (?, ?, ?, ?)",
    [event_id, user_id, rating, comment]
  );
}

async function getEventAverageRating(eventId) {
  const [rows] = await pool.query(
    "SELECT AVG(rating) as avg FROM ratings WHERE event_id = ?",
    [eventId]
  );
  return rows[0].avg || 0;
}

module.exports = { getRatingsByEvent, addRating, getEventAverageRating };
