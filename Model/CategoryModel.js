const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoryModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    coverImage: {
      type: String,
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

const Category = mongoose.model("Category", categoryModel);
module.exports = Category;
