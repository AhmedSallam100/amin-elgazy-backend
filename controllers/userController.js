const express = require("express");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

/** =============================
 * @desc  Auth user token
 * @route  /api/users/auth
 * @method  POST
=============================*/
const authUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    return res.status(201).json(user);
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
};

/** =============================
 * @desc  Add new user
 * @route  /api/users
 * @method  POST
=============================*/

const addNewUser = async (req, res, next) => {
  try {
    const { name, email, phone, grad, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      phone,
      grad,
      password,
    });

    if (user) {
      generateToken(res, user._id);
      return res.status(201).json(user);
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/** =============================
 * @desc  Logout user
 * @route  /api/users/logout
 * @method  POST
=============================*/

const logoutUser = async (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
};

/** =============================
 * @desc  Get user profile
 * @route  /api/users/profile
 * @method  GET
 * @access Private
=============================*/

const getUserProfile = async (req, res, next) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    phone: req.user.phone,
    grad: req.user.grad,
  };
  res.status(200).json(user);
};

/** =============================
 * @desc  Update user profile
 * @route  /api/users/profile
 * @method  PUT
 * @access Private
=============================*/

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/** =============================
 * @desc  Get All users
 * @route  /api/users
 * @method  GET
 * @access Private
=============================*/

const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
};

module.exports = {
  authUser,
  addNewUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
};
