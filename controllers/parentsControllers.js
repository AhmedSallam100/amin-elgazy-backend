const express = require("express");
const Student = require("../models/Student");
const Degree = require("../models/Degree");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

/** =============================
 * @desc  Auth user token
 * @route  /api/users/auth
 * @method  POST
=============================*/
const authUser = async (req, res, next) => {
  const { code, email, password } = req.body;
  const student = await Degree.findOne({ code });
  if (student) {
    generateToken(res, student._id);
    return res.status(201).json(student);
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
};

module.exports = {
  authUser,
};
