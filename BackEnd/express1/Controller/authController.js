const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../mysql");

const register = async (req, res) => {
  const { username, password, email, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await pool.query(
    "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)",
    [username, hashed, email, role || "user"]
  );
  res.json({ message: "Registracija sėkminga" });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  const user = users[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Neteisingi duomenys" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
};

module.exports = { register, login };
