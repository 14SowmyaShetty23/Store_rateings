const jwt = require("jsonwebtoken");

// ✅ VERIFY TOKEN
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ msg: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

// ✅ ADMIN CHECK
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({ msg: "Admin access only" });
  }
  next();
};

module.exports = { verifyToken, isAdmin };