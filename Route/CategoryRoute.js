const express = require("express");
const route = express.Router();

// // import controllar
const {
  createCategory,
  getCategory,
  updateCategory,
} = require("../Controller/categoryController");

// // api
route.get("/", getCategory);
route.post("/", createCategory);
route.patch("/:id", updateCategory);

// web
route.get("/", getCategory);

// export
module.exports = route;
