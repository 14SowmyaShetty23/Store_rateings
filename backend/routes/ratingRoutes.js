const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { addOrUpdateRating, getMyRatings, getStoreRatings } = require("../controllers/ratingController");

router.get("/my", verifyToken, getMyRatings);
router.get("/store-owner", verifyToken, getStoreRatings);
router.post("/", verifyToken, addOrUpdateRating);

module.exports = router;