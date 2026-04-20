const db = require("../config/db");

exports.addOrUpdateRating = (req, res) => {
  const { storeId, rating } = req.body;
  const userId = req.user.id;

  const checkQuery = "SELECT * FROM ratings WHERE user_id=? AND store_id=?";

  db.query(checkQuery, [userId, storeId], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      const updateQuery = "UPDATE ratings SET rating=? WHERE user_id=? AND store_id=?";
      db.query(updateQuery, [rating, userId, storeId], (err2) => {
        if (err2) return res.status(500).json(err2);
        res.json({ message: "Rating updated" });
      });
    } else {
      const insertQuery = "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)";
      db.query(insertQuery, [userId, storeId, rating], (err3) => {
        if (err3) return res.status(500).json(err3);
        res.json({ message: "Rating added" });
      });
    }
  });
};

exports.getMyRatings = (req, res) => {
  const userId = req.user.id;
  const query = `
    SELECT r.id, r.rating, r.store_id, s.name, s.address, s.email,
           IFNULL(AVG(all_r.rating), 0) as avgRating
    FROM ratings r
    JOIN stores s ON r.store_id = s.id
    LEFT JOIN ratings all_r ON all_r.store_id = s.id
    WHERE r.user_id = ?
    GROUP BY r.id, s.id
  `;
  db.query(query, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getStoreRatings = (req, res) => {
  const ownerId = req.user.id;
  const query = `
    SELECT r.id, r.rating, r.user_id,
           u.name as user_name, u.email as user_email,
           s.id as store_id, s.name as store_name, s.address,
           IFNULL(AVG(all_r.rating), 0) as avgRating,
           COUNT(all_r.id) as totalRatings
    FROM stores s
    LEFT JOIN ratings r ON r.store_id = s.id
    LEFT JOIN users u ON u.id = r.user_id
    LEFT JOIN ratings all_r ON all_r.store_id = s.id
    WHERE s.owner_id = ?
    GROUP BY s.id, r.id
    ORDER BY s.id, r.id
  `;
  db.query(query, [ownerId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
