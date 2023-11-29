const express = require("express");
const router = express.Router();
const ProductCtrl = require("../models/ProductModel");

//Product
router.post('/product',ProductCtrl.createProduct)
router.delete('/product/:id',ProductCtrl.deleteProduct)
router.put('/product/:id', ProductCtrl.updateProduct);