const express = require("express");
const Vistor = require("../models/Vistor");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/** =============================
 * @desc  Add new vistor
 * @route  /api/vistors
 * @method  POST
=============================*/

const registerNewVistor = async (req, res, next) => {
  const { username, phone, parentPhone, address, time } = req.body;

  try {
    const vistor = await Vistor.create({
      username,
      phone,
      parentPhone,
      address,
      time,
    });

    jwt.sign(
      { vistorId: vistor._id, username },
      process.env.JWT_SECRET,
      { expiresIn: "90d" },
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            sameSite: "none",
            secure: true,
            httpOnly: false,
            maxAge: 90 * 24 * 60 * 60 * 1000,
          })
          .status(201)
          .json({ id: vistor._id, token });
      }
    );
  } catch (error) {
    next(error);
  }
};

/** =============================
  * @desc  Get vistor profile
  * @route  /api/vistors
  * @method  GET
=============================*/
const getVistorProfile = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    res.json(userData);
  });
};

module.exports = {
  registerNewVistor,
  getVistorProfile,
};
