const mongoose = require('mongoose');

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
module.exports = Product;