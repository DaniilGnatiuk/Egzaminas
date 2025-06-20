const ratingModel = require("../Model/ratingModel");

async function getRatingsByEvent(req, res) {
  try {
    const ratings = await ratingModel.getRatingsByEvent(req.params.event_id);
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: "Nepavyko gauti įvertinimų" });
  }
}

async function addRating(req, res) {
  try {
    const { rating, comment } = req.body;
    const event_id = req.params.event_id;
    const user_id = req.user.id; // iš JWT
    await ratingModel.addRating({ event_id, user_id, rating, comment });
    res.json({ message: "Įvertinimas pridėtas" });
  } catch (err) {
    res.status(500).json({ error: "Nepavyko pridėti įvertinimo" });
  }
}

async function getEventById(req, res) {
  try {
    const event = await eventModel.getEventById(req.params.id);
    if (!event) return res.status(404).json({ error: "Renginys nerastas" });
    event.avgRating = await eventModel.getEventAverageRating(event.id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Nepavyko gauti renginio" });
  }
}

module.exports = { getRatingsByEvent, addRating, getEventById };
