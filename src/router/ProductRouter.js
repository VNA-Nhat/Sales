// const express = require("express");
// const router = express.Router()
// const ProductCtrl = require("../../src/controllers/ProductCtrl")

// router.post('/product',ProductCtrl.createProduct)
// router.delete('/product/:id',ProductCtrl.deleteProduct)
// router.put('/product/:id', ProductCtrl.updateProduct);
// module.exports = router

const express = require("express");
const router = express.Router();
const ProductCtrl = require("../../src/controllers/ProductCtrl");

router.post('/product', ProductCtrl.createProduct);
router.delete('/product/:id', ProductCtrl.deleteProduct);
router.put('/product/:id', ProductCtrl.updateProduct);

module.exports = router;