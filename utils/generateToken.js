const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });

  const cookieOptions = {
    httpOnly: false,
    maxAge: 90 * 24 * 60 * 60 * 1000,
    sameSite: "None",
    secure: false,
  };

  res.cookie("token", token, cookieOptions);
};

module.exports = generateToken;
