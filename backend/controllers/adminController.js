// controllers/adminController.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.addUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, address, role],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "User created" });
    }
  );
};

exports.addStore = async (req, res) => {
  const { name, owner_name, location, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👉 Step 1: create store owner user
    const userQuery = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, 'OWNER')
    `;

    db.query(userQuery, [owner_name, email, hashedPassword], (err, userResult) => {
      if (err) {
        return res.status(500).json({ error: "User creation failed", err });
      }

      const ownerId = userResult.insertId;

      // 👉 Step 2: create store (use YOUR columns)
      const storeQuery = `
        INSERT INTO stores (name, email, address, owner_id)
        VALUES (?, ?, ?, ?)
      `;

      db.query(storeQuery, [name, email, location, ownerId], (err2, storeResult) => {
        if (err2) {
          return res.status(500).json({ error: "Store creation failed", err2 });
        }

        res.json({
          message: "Store created successfully",
          storeId: storeResult.insertId
        });
      });
    });

  } catch (error) {
    res.status(500).json({ error });
  }
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
    "SELECT id, name, email, role FROM users",
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