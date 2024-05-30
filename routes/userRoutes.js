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

router.post("/", authUser);
router.post("/auth", addNewUser);
router.post("/logout", logoutUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.get("/", getAllUsers);

module.exports = router;
