const mongoose = require("mongoose");

const degreeSchema = new mongoose.Schema(
  {
    degreeId: {
      type: String,
    },
    code: {
      type: String,
    },
    name: {
      type: String,
    },
    time: {
      type: String,
    },
    lesson1: {
      type: String,
    },
    lesson2: {
      type: String,
    },
    lesson3: {
      type: String,
    },
    lesson4: {
      type: String,
    },
    lesson5: {
      type: String,
    },
    lesson6: {
      type: String,
    },
    lesson7: {
      type: String,
    },
    lesson8: {
      type: String,
    },
    lesson9: {
      type: String,
    },
    lesson10: {
      type: String,
    },
    lesson11: {
      type: String,
    },
    lesson12: {
      type: String,
    },
  },
  { timestamps: true }
);

const Degree = mongoose.model("Degree", degreeSchema);

module.exports = Degree;
