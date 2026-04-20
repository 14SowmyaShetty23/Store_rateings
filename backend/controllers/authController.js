// controllers/authController.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN ATTEMPT:", email, password);

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json(err);
    }
    console.log("DB RESULT:", result);

    if (result.length === 0)
      return res.status(404).json({ msg: "User not found" });

    const user = result[0];
    console.log("USER FROM DB:", user);
    console.log("STORED HASH:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ token, user });
  });
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(query, [name, email, hashedPassword, role || "USER"], (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "User registered successfully" });
    });

  } catch (err) {
    res.status(500).json(err);
  }
};