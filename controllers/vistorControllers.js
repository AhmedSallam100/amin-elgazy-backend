const express = require("express");
const Vistor = require("../models/Vistor");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const dotenv = require("dotenv");
dotenv.config();

/** =============================
 * @desc  Add new vistor
 * @route  /api/vistors
 * @method  POST
=============================*/
const registerNewVistor = async (req, res, next) => {
  const { username, phone, parentPhone, address, time } = req.body;

  // Data of image
  const image = req.file ? req.file.filename : null;
  const imageName = req.file.filename;
  const imagePath = path.join(__dirname, `../uploads/${imageName}`);

  // Upload image to cloudinary
  const result = await cloudinaryUploadImage(imagePath);
  console.log(result);

  try {
    const vistor = await Vistor.create({
      username,
      phone,
      parentPhone,
      address,
      time,
      image: result.secure_url,
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

    fs.unlinkSync(imagePath);
    res.status(201).json(vistor);
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

/** =============================
  * @desc  Get all vistors
  * @route  /api/vistors
  * @method  GET
=============================*/
const getVistors = async (req, res, next) => {
  const vistors = await Vistor.find();
  res.json(vistors);
};

/** =============================
 * @desc  Update vistor check status
 * @route  /api/vistors/:id
 * @method  PATCH
=============================*/
const updateVistorCheck = async (req, res, next) => {
  const vistorId = req.params.id;
  const { check } = req.body;

  try {
    const updatedVistor = await Vistor.findByIdAndUpdate(
      vistorId,
      { check },
      { new: true }
    );

    if (!updatedVistor) {
      return res.status(404).json({ message: "Vistor not found..!" });
    }

    res.status(200).json(updatedVistor);
  } catch (error) {
    console.error("Error updating vistor:", error);
    res.status(500).json({ message: "Error updating vistor" });
  }
};

/** =============================
 * @desc  Delete vistor
 * @route  /api/vistors/:id
 * @method  DELETE
=============================*/
const deleteVistor = async (req, res, next) => {
  try {
    const vistorId = req.params.id;
    const deletedVistor = await Vistor.findByIdAndDelete(vistorId);
    if (!deletedVistor) {
      return res.status(404).json({ message: "Vistor not found..!" });
    }
    await cloudinaryRemoveImage(deletedVistor.image);
    res.status(200).json({ message: "Vistor deleted successfully" });
  } catch (error) {
    console.error("Error deleting vistor:", error);
    res.status(500).json({ message: "Error deleting vistor" });
  }
};

module.exports = {
  registerNewVistor,
  getVistors,
  updateVistorCheck,
  deleteVistor,
};
