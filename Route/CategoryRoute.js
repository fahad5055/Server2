const express = require("express");
const route = express.Router();

// // import controllar
const {
  createCategory,
  getCategory,
  updateCategory,
} = require("../Controller/categoryController");

const { getOneProduct } = require("../Controller/ProductController");

// // api
route.get("/", getCategory);
route.post("/", createCategory);
route.patch("/:id", updateCategory);

route.get("/category", getCategory);
route.get("/product/:id", getOneProduct);

// export
module.exports = route;
