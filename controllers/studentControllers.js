const express = require("express");
const Student = require("../models/Student");
const path = require("path");
const fs = require("fs");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");

/** =============================
 * @desc  Add new student
 * @route  /api/students
 * @method  POST
=============================*/

const addNewStudent = async (req, res, next) => {
  try {
    const { name, code, grad, place } = req.body;

    console.log(req.body);

    // Create new exam
    const newStudent = await Student.create({
      name: name,
      code: code,
      grad: grad,
      place: place,
    });

    res.json(newStudent);
  } catch (error) {
    console.error("Error adding new student:", error);
    res.status(500).json({ message: "Error adding new student" });
  }
};

/** =============================
 * @desc  Get all students
 * @route  /api/students
 * @method  GET
  =============================*/
const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/** =============================
 * @desc  Get single studen
 * @route  /api/students/:id
 * @method  GET
  =============================*/
const getSingleStudent = async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found..!" });
    }
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};

/** =============================
 * @desc  Edit student
 * @route  /api/students/:id
 * @method  PATACH
  =============================*/
const editStudent = async (req, res, next) => {};

/** =============================
 * @desc  Delete student
 * @route  /api/students/:id
 * @method  DELETE
  =============================*/
const deleteStudent = async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found..!" });
    }
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Error deleting student" });
  }
};

module.exports = {
  addNewStudent,
  getAllStudents,
  getSingleStudent,
  editStudent,
  deleteStudent,
};
