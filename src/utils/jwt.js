require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.sign = (payload) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  return jwt.sign(payload, secret, { expiresIn: "30d" });
};

exports.verify = (token) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Token verification failed");
  }
};
