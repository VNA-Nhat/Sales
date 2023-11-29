const Product = require('../../src/models/ProductModel');
const path = require('path')

//create Product
const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        newProduct.image = req.file.path; // Lấy đường dẫn hình ảnh từ req.file
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            throw new Error('Product not found');
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedProduct) {
            throw new Error('Product not found');
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createProduct, deleteProduct, updateProduct }