const express = require("express");
const router = express.Router();
const {
  addNewStudent,
  getAllStudents,
  getSingleStudent,
  editStudent,
  deleteStudent,
} = require("../controllers/studentControllers");

router.post("/", addNewStudent);
router.get("/", getAllStudents);
router.get("/:id", getSingleStudent);
router.patch("/:id", editStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
