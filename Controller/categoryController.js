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
    const categoryObj = new Category({
      name,
      slug,
      image,
      coverImage,
    });

    await categoryObj.save();

    res.status(201).json({
      message: "Category created successfully",
      categoryObj,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating the category.",
      error: error.message,
    });
  }
};

// Get category
const getCategory = async (req, res) => {
  try {
    const categoryObj = await Category.find();
    res.status(200).json(categoryObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching category.",
      error: error.message,
    });
  }
};

// Update category
const updateCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCategory = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the Category.",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
};
