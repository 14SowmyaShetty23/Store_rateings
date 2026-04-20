const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all stores with avg rating
// router.get("/stores", (req, res) => {
//   const query = `
//     SELECT stores.*, AVG(ratings.rating) as avgRating
//     FROM stores
//     LEFT JOIN ratings ON stores.id = ratings.store_id
//     GROUP BY stores.id
//   `;

//   db.query(query, (err, result) => {
//     if (err) return res.status(500).json(err);

//     res.json(result);
//   });
// });
router.get("/stores", (req, res) => {
  const query = `
    SELECT stores.*, 
           IFNULL(AVG(ratings.rating), 0) as avgRating
    FROM stores
    LEFT JOIN ratings ON stores.id = ratings.store_id
    GROUP BY stores.id
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});
module.exports = router;