// controllers/adminController.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
    [name, email, hashedPassword, address, role],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "User created" });
    }
  );
};

exports.addStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;

  db.query(
    "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
    [name, email, address, owner_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Store added" });
    }
  );
};


exports.getDashboard = (req, res) => {
  const queries = {
    users: "SELECT COUNT(*) as total FROM users",
    stores: "SELECT COUNT(*) as total FROM stores",
    ratings: "SELECT COUNT(*) as total FROM ratings",
  };

  let result = {};

  db.query(queries.users, (err, users) => {
    result.users = users[0].total;

    db.query(queries.stores, (err, stores) => {
      result.stores = stores[0].total;

      db.query(queries.ratings, (err, ratings) => {
        result.ratings = ratings[0].total;

        res.json(result);
      });
    });
  });
};
exports.getUsers = (req, res) => {
  db.query(
    "SELECT id, name, email, address, role FROM users",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};
exports.getStores = (req, res) => {
  const query = `
    SELECT s.*, 
    IFNULL(AVG(r.rating), 0) as rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: "User deleted" });
  });
};

exports.deleteStore = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM stores WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: "Store deleted" });
  });
};