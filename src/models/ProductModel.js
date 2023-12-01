// const mongoose = require('mongoose')
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // Thư mục lưu trữ hình ảnh tải lên
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname); // Đặt tên file mới
//     },  
//   });
  
//   const upload = multer({ storage: storage });


// const productSchema = new mongoose.Schema(
//     {
//         name: {type: String, require: true},
//         image: {type: String, require: true},
//         type: {type: String,  require: true},
//         price: { type: Number, require: true},
//         countInstock: {type: Number, trquire: true}, //Số lượng sp còn bao nhiêu
//         rating: {type: Number, require: true},
//         decription: {type: String, require: true},
//     },
//     {   
//         timestamps: true
//     }
// );

// const Product = mongoose.model("Product", productSchema);
// module.exports = Product;

const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        countInstock: { type: Number, required: true },
        rating: { type: Number, required: true },
        description: { type: String, required: true },
        discount: {type: Number},
        selled: {type: Number}
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;