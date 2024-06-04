const express = require("express");
const router = express.Router();
const {
  authUser,
  addNewUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} = require("../controllers/userController");
const protect = require("../middlewares/auth");

router.post("/", addNewUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get("/", getAllUsers);

module.exports = router;
