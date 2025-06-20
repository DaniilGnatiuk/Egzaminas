const eventModel = require("../Model/eventModel");

async function getAllEvents(req, res) {
  try {
    const events = await eventModel.getAllEvents();
    res.json(events.filter((ev) => ev.approved)); // Tik patvirtinti
  } catch (err) {
    res.status(500).json({ error: "Nepavyko gauti renginių" });
  }
}

async function getUnapprovedEvents(req, res) {
  try {
    const events = await eventModel.getAllEvents();
    res.json(events.filter((ev) => !ev.approved));
  } catch (err) {
    res.status(500).json({ error: "Nepavyko gauti renginių" });
  }
}

async function getEventById(req, res) {
  try {
    const event = await eventModel.getEventById(req.params.id);
    if (!event) return res.status(404).json({ error: "Renginys nerastas" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Nepavyko gauti renginio" });
  }
}

async function createEvent(req, res) {
  try {
    const { title, description, location, date, category_id } = req.body;
    const user_id = req.user.id; // iš JWT
    const image_url = req.file ? req.file.filename : null;
    await eventModel.createEvent({
      title,
      description,
      location,
      date,
      user_id,
      category_id,
      image_url,
    });
    res.json({ message: "Renginys pateiktas patvirtinimui" });
  } catch (err) {
    res.status(500).json({ error: "Nepavyko pateikti renginio" });
  }
}

async function approveEvent(req, res) {
  try {
    await eventModel.approveEvent(req.params.id);
    res.json({ message: "Renginys patvirtintas" });
  } catch (err) {
    res.status(500).json({ error: "Nepavyko patvirtinti renginio" });
  }
}

module.exports = {
  getAllEvents,
  getEventById: eventModel.getEventById,
  createEvent,
  approveEvent,
  getUnapprovedEvents,
};
