const express = require("express");
const router = express.Router();
const {
  registerNewVistor,
  getVistorProfile,
} = require("../controllers/vistorControllers");

router.post("/", registerNewVistor);
router.get("/", getVistorProfile);
// router.get("/:id", getSingleStudent);
// router.patch("/:id", editStudent);
// router.delete("/:id", deleteStudent);

module.exports = router;
