const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.imageswatch); //Đặt tên file
    },
});

const upload = multer({ storage: storage });
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully!')
})

const productSchema = new mongoose.Schema(
    {
        name: {type: String, require: true},
        image: {type: String, require: true},
        type: {type: String,  require: true},
        price: { type: Number, require: true},
        countInstock: {type: Number, trquire: true}, //Số lượng sp còn bao nhiêu
        rating: {type: Number, require: true},
        decription: {type: String},
        discount: { type: Number },
        selled: { type: Number }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product, upload;