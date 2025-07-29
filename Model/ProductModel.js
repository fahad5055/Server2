const mongoose = require("mongoose");

const { Schema } = mongoose;

const productsModel = new Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    categoryName: {
      type: String,
    },
    productNameEnglish: {
      type: String,
      required: true,
    },
    productNameBangla: {
      type: String,
      required: true,
    },
    productSlug: {
      type: String,
    },
    brand: {
      type: String,
      required: true,
    },
    featured: {
      type: String,
    },
    Status: {
      type: String,
      required: true,
    },
    Details: {
      type: String,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    warranty: {
      type: String,
    },
    expiryDate: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    returnPolicy: {
      type: String,
      required: true,
    },
    Images: {
      type: [String],
      default: [],
    },
    macAddress: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productsModel);
module.exports = Products;
