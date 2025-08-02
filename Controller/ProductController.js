const macaddress = require("macaddress");
const Products = require("../Model/ProductModel");
const Category = require("../Model/CategoryModel"); // adjust path accordingly

const createProduct = async (req, res) => {
  try {
    const {
      category,
      productNameEnglish,
      productNameBangla,
      productSlug,
      brand,
      featured,
      Status,
      Details,
      regularPrice,
      discountPrice,
      warranty,
      expiryDate,
      quantity,
      code,
      returnPolicy,
      Images,
    } = req.body;

    // Validate required fields
    if (
      !category ||
      !productNameEnglish ||
      !productNameBangla ||
      !brand ||
      !Status ||
      !regularPrice ||
      !expiryDate ||
      !quantity ||
      !returnPolicy
    ) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }

    const categoryData = await Category.findById(category);
    if (!categoryData) {
      return res.status(400).json({ message: "Invalid category ID" });
    }
    // Get IP and MAC
    const ip =
      req.headers["x-forwarded-for"] ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      req.ip;

    const mac = await macaddress.one();

    // Create product object
    const productObj = new Products({
      category, // original ObjectId
      categoryName: categoryData.name,
      productNameEnglish,
      productNameBangla,
      productSlug,
      brand,
      featured,
      Status,
      Details,
      regularPrice,
      discountPrice,
      warranty,
      expiryDate,
      quantity,
      code,
      returnPolicy,
      Images,
      ipAddress: ip,
      macAddress: mac,
    });

    await productObj.save();

    res.status(201).json({
      message: "Product created successfully",
      product: productObj,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      message: "An error occurred while creating the product.",
      error: error.message,
    });
  }
};

// Get product
const getProduct = async (req, res) => {
  try {
    const productsObj = await Products.find().populate("category");
    res.status(200).json(productsObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching users.",
      error: error.message,
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteproducts = await Products.findByIdAndDelete({ _id: id });
    if (!deleteproducts) {
      return res.status(404).json({ message: "Products not found." });
    }

    res.status(200).json({
      message: "Products deleted successfully",
      deleteproducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while deleting the user.",
      error: error.message,
    });
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket?.remoteAddress ||
      req.ip;

    const mac = await macaddress.one();

    const updateData = {
      ...req.body,
      ipAddress: ip,
      macAddress: mac,
    };
    const updatedProducts = await Products.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProducts) {
      return res.status(404).json({ message: "Products not found." });
    }

    res.status(200).json({
      message: "Products updated successfully",
      updatedProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the user.",
      error: error.message,
    });
  }
};

// getonecategory
const getOneProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findOne({
      productSlug: id,
    }).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Products not found." });
    }

    res.status(200).json({
      message: "Products information updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the user.",
      error: error.message,
    });
  }
};

// getonecategory
const getCategoryProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const categoryId = await Category.findOne({ slug: id });

    const product = await Products.find({
      category: categoryId._id,
    }).populate("category");

    console.log(product);

    if (!product) {
      return res.status(404).json({ message: "Products not found." });
    }

    res.status(200).json({
      message: "Products information updated successfully",
      product,
      categoryId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the user.",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
  getCategoryProduct,
};
