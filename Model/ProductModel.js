const mongoose = require("mongoose");

const { Schema } = mongoose;

const productsModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    productRegPrice: {
        type: String,
        required: true,
    },
    productDiscountPrice: {
        type: String,
        required: true,
    },
    productDetails: {
        type: String,
    },
});


const Products = mongoose.model("Products", productsModel);
module.exports = Products;