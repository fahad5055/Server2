const Products = require("../Model/ProductModel");

// Create User
const createProduct = async (req, res) => {
    try {
        const {
            name,
            productCategory,
            productRegPrice,
            productDiscountPrice,
            productDetails, } = req.body;

        if (!name ||
            !productCategory ||
            !productRegPrice ||
            !productDiscountPrice ||
            !productDetails) {
            return res.status(400).json({ message: "fully fill your information" });
        }

        const productObj = new Products({
            name,
            productCategory,
            productRegPrice,
            productDiscountPrice,
            productDetails
        });

        await productObj.save();

        res.status(201).json({
            message: "product created successfully",
            productObj,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while creating the user.",
            error: error.message,
        });
    }
};

// Get Users
const getProduct = async (req, res) => {
    try {
        const productsObj = await Products.find();
        res.status(200).json(productsObj);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while fetching users.",
            error: error.message,
        });
    }
};

// Delete User
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

// Update User
const updateProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedProducts = await Products.findByIdAndUpdate(id, req.body,
            { new: true });

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

// Login
const getOneProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const Products = await Products.findByIdAndUpdate({ _id: id });

        if (!Products) {
            return res.status(404).json({ message: "Products not found." });
        }

        res.status(200).json({
            message: "Products information updated successfully",
            Products,
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
};
