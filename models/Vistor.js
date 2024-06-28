const mongoose = require("mongoose");

const vistorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    parentPhone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Vistor = mongoose.model("Vistor", vistorSchema);

module.exports = Vistor;
