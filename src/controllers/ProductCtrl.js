const express = require('express');
// const mongoose = require('mongoose');
const Product = require('../../src/models/ProductModel');
const path = require('path');
const jimp = require('jimp');
//create Product
// Thêm một sản phẩm mới
const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        // Kiểm tra xem có tệp được tải lên hay không
        if (req.file) {
            // Điều chỉnh kích thước ảnh
            const image = await jimp.read(req.file.buffer);
            image.resize(500, 500);
            await image.writeAsync(path.join(`public/images/imageswatch/${req.file.filename}.jpeg`));
            // Lưu đường dẫn hình ảnh vào đối tượng sản phẩm
            newProduct.image = `/images/imageswatch/${req.file.filename}.jpeg`;
        }
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteProduct = async (req, res) => {
    // try {
    //     const { id } = req.params;
    //     const deletedProduct = await Product.findByIdAndDelete(id);
    //     if (!deletedProduct) {
    //         throw new Error('Product not found');
    //     }
    //     res.status(200).json({ message: 'Product deleted successfully' });
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
};

const updateProduct = async (req, res) => {
    // try {
    //     const { id } = req.params;
    //     const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    //         new: true,
    //     });
    //     if (!updatedProduct) {
    //         throw new Error('Product not found');
    //     }
    //     res.status(200).json(updatedProduct);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
};

module.exports = { createProduct, deleteProduct, updateProduct }