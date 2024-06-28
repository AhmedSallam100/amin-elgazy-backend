const express = require("express");
const router = express.Router();
const {
  registerNewVistor,
  getVistors,
  deleteVistor,
  updateVistorCheck,
} = require("../controllers/vistorControllers");
const imageUpload = require("../middlewares/imageUpload");

router.post("/", imageUpload.single("image"), registerNewVistor);
router.get("/", getVistors);
router.patch("/:id", updateVistorCheck);
router.delete("/:id", deleteVistor);
// router.get("/:id", getSingleStudent);
// router.delete("/:id", deleteStudent);

module.exports = router;
