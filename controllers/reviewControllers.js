const express = require("express");
const Review = require("../models/Review");

/** =============================
 * @desc  Add new review
 * @route  /api/reviews
 * @method  POST
=============================*/

const addNewReview = async (req, res, next) => {
  try {
    const { name, phone, email, message } = req.body;

    // Create new review
    const newReview = await Review.create({
      name: name,
      phone: phone,
      email: email,
      message: message,
    });

    res.json(newReview);
  } catch (error) {
    console.error("Error adding new review:", error);
    res.status(500).json({ message: "Error adding new review" });
  }
};

/** =============================
 * @desc  Get all reviews
 * @route  /api/reviews
 * @method  GET
  =============================*/
const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/** =============================
 * @desc  Get single review
 * @route  /api/reviews/:id
 * @method  GET
  =============================*/
const getSingleReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found..!" });
    }
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};

/** =============================
 * @desc  Edit review
 * @route  /api/reviews/:id
 * @method  PATACH
  =============================*/
const editReview = async (req, res, next) => {};

/** =============================
 * @desc  Delete review
 * @route  /api/reviews/:id
 * @method  DELETE
  =============================*/
const deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found..!" });
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Error deleting review" });
  }
};

module.exports = {
  addNewReview,
  getAllReviews,
  getSingleReview,
  editReview,
  deleteReview,
};
