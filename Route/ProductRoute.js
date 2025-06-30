const express = require("express");
const route = express.Router();

// // import controllar
const {
    createProduct,
    getProduct,
    getOneProduct,
    deleteProduct,
    updateProduct,
} = require("../Controller/ProductController");

// // api
route.get("/", getProduct);
route.post("/", createProduct);
route.patch("/:id", updateProduct);
route.delete("/:id", deleteProduct);
route.get("/:id", getOneProduct);

// export
module.exports = route;