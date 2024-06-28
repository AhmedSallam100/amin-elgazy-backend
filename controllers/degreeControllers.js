const express = require("express");
const Degree = require("../models/Degree");

/** =============================
 * @desc  Upload degrees
 * @route  /api/degrees
 * @method  POST
=============================*/
const uploadDegrees = async (req, res, next) => {
  try {
    const degrees = req.body.map((degree) => ({
      degreeId: degree.degreeId,
      code: degree.code,
      name: degree.name,
      time: degree.time,
      lesson1: degree.lesson1,
      lesson2: degree.lesson2,
      lesson3: degree.lesson3,
      lesson4: degree.lesson4,
      lesson5: degree.lesson5,
      lesson6: degree.lesson6,
      lesson7: degree.lesson7,
      lesson8: degree.lesson8,
      lesson9: degree.lesson9,
      lesson10: degree.lesson10,
      lesson11: degree.lesson11,
      lesson12: degree.lesson12,
    }));

    const result = await Degree.insertMany(degrees);
    res.status(200).json({ message: "Degrees have been uploaded..!" });
  } catch (error) {
    console.error("Error uploading degrees:", error);
    res.status(500).json({ message: "Error uploading degrees" });
  }
};

/** =============================
 * @desc  Get degrees
 * @route  /api/degrees
 * @method  GET
=============================*/
const getDegrees = async (req, res, next) => {
  try {
    const degrees = await Degree.find({});
    res.status(200).json(degrees);
  } catch (error) {
    console.error("Error getting degrees:", error);
    res.status(500).json({ message: "Error getting degrees" });
  }
};

/** =============================
 * @desc  Update degrees
 * @route  /api/degrees/update-degrees
 * @method  POST
=============================*/
const updateDegrees = async (req, res, next) => {
  try {
    const degrees = req.body;

    await Degree.deleteMany();

    const newDegrees = await Degree.insertMany(degrees);

    res.status(200).json({ message: "Degrees have been updated..!" });
  } catch (error) {
    console.error("Error updating degrees:", error);
    res.status(500).json({ message: "Error updating degrees" });
  }
};

/** =============================
 * @desc  Delete all degrees
 * @route  /api/degrees
 * @method  DELETE
=============================*/
const deleteDegrees = async (req, res, next) => {
  try {
    await Degree.deleteMany({});
    res.status(200).json({ message: "All degrees have been deleted..!" });
  } catch (error) {
    console.error("Error deleting degrees:", error);
    res.status(500).json({ message: "Error deleting degrees" });
  }
};

module.exports = {
  uploadDegrees,
  updateDegrees,
  getDegrees,
  deleteDegrees,
};
