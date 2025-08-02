const express = require("express");
const router = express.Router();

// category route
const CategoryRoute = require("./Route/CategoryRoute");
router.use("/category", CategoryRoute);

// product Route
const ProductRoute = require("./Route/ProductRoute");
router.use("/product", ProductRoute);

module.exports = router;
