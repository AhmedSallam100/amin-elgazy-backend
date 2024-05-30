const express = require("express");
const User = require("../models/User");

/** =============================
 * @desc  Auth user token
 * @route  /api/users/auth
 * @method  POST
=============================*/

const authUser = async (req, res, next) => {
  res.status(200).json({ message: "Auth User" });
};

/** =============================
 * @desc  Add new user
 * @route  /api/users
 * @method  POST
=============================*/

const addNewUser = async (req, res, next) => {
  res.status(200).json({ message: "Register User" });
};

/** =============================
 * @desc  Logout user
 * @route  /api/users/logout
 * @method  POST
=============================*/

const logoutUser = async (req, res, next) => {
  res.status(200).json({ message: "Logout User" });
};

/** =============================
 * @desc  Get user profile
 * @route  /api/users/profile
 * @method  GET
 * @access Private
=============================*/

const getUserProfile = async (req, res, next) => {
  res.status(200).json({ message: "User Profile" });
};

/** =============================
 * @desc  Update user profile
 * @route  /api/users/profile
 * @method  PUT
 * @access Private
=============================*/

const updateUserProfile = async (req, res, next) => {
  res.status(200).json({ message: "User Profile Updated" });
};

/** =============================
 * @desc  Get All users
 * @route  /api/users
 * @method  GET
 * @access Private
=============================*/

const getAllUsers = async (req, res, next) => {
  res.status(200).json({ message: "Get All Users" });
};

module.exports = {
  authUser,
  addNewUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
};
