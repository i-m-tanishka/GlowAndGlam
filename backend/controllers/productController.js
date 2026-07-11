const Product = require("../models/product");

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Add new product
const addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();

        res.status(201).json(product);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Export all controllers
module.exports = {
    getProducts,
    getProductById,
    addProduct
};