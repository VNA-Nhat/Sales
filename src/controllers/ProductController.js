const ProductService = require('../service/ProductService')
const path = require('path');
const jimp = require('jimp');

const createProduct = async (req, res) => {
    try {
        // const { name, image, type, countInStock, price, rating, description, discount } = req.body
        // if (!name || !image || !type || !countInStock || !price || !rating || !discount) {
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'The input is required'
        //     })
        // }
        // const response = await ProductService.createProduct(req.body)
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
        return res.status(200).json(savedProduct)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllType = async (req, res) => {
    try {
        const response = await ProductService.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = { createProduct, updateProduct, getDetailsProduct, deleteProduct, getAllProduct, deleteMany, getAllType }