const express = require("express");
const Student = require("../models/Student");

/** =============================
 * @desc  Upload students
 * @route  /api/students
 * @method  POST
=============================*/
const uploadStudents = async (req, res, next) => {
  console.log(req.body);
  try {
    const students = req.body.map((student) => ({
      studentId: student.studentId,
      code: student.code,
      name: student.name,
      time: student.time,
      phone: student.phone,
      parentPhone: student.parentPhone,
      adress: student.adress,
    }));

    const result = await Student.insertMany(students);
    res.status(200).json({ message: "Students have been uploaded..!" });
  } catch (error) {
    console.error("Error uploading students:", error);
    res.status(500).json({ message: "Error uploading students" });
  }
};

/** =============================
 * @desc  Get students
 * @route  /api/students
 * @method  GET
=============================*/
const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    console.error("Error getting students:", error);
    res.status(500).json({ message: "Error getting students" });
  }
};

/** =============================
 * @desc  Update students
 * @route  /api/students/update-students
 * @method  POST
=============================*/
const updateStudents = async (req, res, next) => {
  try {
    const students = req.body;

    await Student.deleteMany();

    const newStudents = await Student.insertMany(students);

    res.status(200).json({ message: "Students have been updated..!" });
  } catch (error) {
    console.error("Error updating students:", error);
    res.status(500).json({ message: "Error updating students" });
  }
};

/** =============================
 * @desc  Delete all students
 * @route  /api/students
 * @method  DELETE
=============================*/
const deleteStudents = async (req, res, next) => {
  try {
    await Student.deleteMany({});
    res.status(200).json({ message: "All students have been deleted..!" });
  } catch (error) {
    console.error("Error deleting students:", error);
    res.status(500).json({ message: "Error deleting students" });
  }
};

module.exports = {
  uploadStudents,
  getStudents,
  updateStudents,
  deleteStudents,
};
