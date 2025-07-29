const express = require("express");
const route = express.Router();

// // import controllar
const {
  createUser,
  getUser,
  updateUser,
  login,
  verifyOtp,
  forgotPassword,
  resetPassword,
} = require("../Controller/UsersController");

// // api
route.get("/", getUser);
route.post("/create", createUser);
route.patch("/:id", updateUser);
route.post("/login", login);

// export
module.exports = route;
