const express = require("express");
const route = express.Router();

// // import controllar
const {
  createProduct,
  getProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
  getCategoryProduct,
} = require("../Controller/ProductController");

// // api
route.get("/", getProduct);
route.post("/", createProduct);
route.patch("/:id", updateProduct);
route.delete("/:id", deleteProduct);
route.get("/:id", getOneProduct);

// web
route.get("/:id", getOneProduct);
route.get("/category/:id", getCategoryProduct);

// export
module.exports = route;
