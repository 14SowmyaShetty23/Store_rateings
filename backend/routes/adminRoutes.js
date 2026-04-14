// routes/adminRoutes.js
const router = require("express").Router();
const {
  addUser,
  addStore,
  getDashboard,
  getUsers,
  getStores,
  deleteUser,
  deleteStore 
} = require("../controllers/adminController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");


// router.post("/add-user", addUser);
router.post("/add-user", verifyToken, isAdmin, addUser);
router.post("/add-store", verifyToken, isAdmin, addStore);
router.get("/dashboard", verifyToken, isAdmin, getDashboard);
router.get("/users", verifyToken, isAdmin, getUsers);
router.get("/stores", verifyToken, isAdmin, getStores);
router.delete("/delete-user/:id", verifyToken, isAdmin, deleteUser);
router.delete("/delete-store/:id", verifyToken, isAdmin, deleteStore);


module.exports = router;