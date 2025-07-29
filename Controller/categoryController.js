const macaddress = require("macaddress");
const Category = require("../Model/CategoryModel");

// Create category
const createCategory = async (req, res) => {
  try {
    const { name, slug, image, coverImage } = req.body;

    if (!name && !slug) {
      return res.status(400).json({ message: "Name and Slug are required." });
    }

    // Then check individually
    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }

    if (!slug) {
      return res.status(400).json({ message: "Slug is required." });
    }

    const ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket?.remoteAddress ||
      req.ip;

    const mac = await macaddress.one();

    const categoryObj = new Category({
      name,
      slug,
      image,
      coverImage,
      ipAddress: ip,
      macAddress: mac,
    });

    await categoryObj.save();

    res.status(201).json({
      message: "Category created successfully",
      category: categoryObj,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({
      message: "An error occurred while creating the category.",
      error: error.message,
    });
  }
};

// Get category list
const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({
      message: "An error occurred while fetching categories.",
      error: error.message,
    });
  }
};

// Update category
const updateCategory = async (req, res) => {
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

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      message: "An error occurred while updating the category.",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
};
