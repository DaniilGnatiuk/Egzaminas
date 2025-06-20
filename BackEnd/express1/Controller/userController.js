const userModel = require("../Model/userModel");

async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Nepavyko gauti vartotojų" });
  }
}

async function getUserById(req, res) {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "Vartotojas nerastas" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Nepavyko gauti vartotojo" });
  }
}

module.exports = { getAllUsers, getUserById };
