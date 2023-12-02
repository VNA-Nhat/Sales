const multer = require('multer');
const jimp = require('jimp');
const path = require('path');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb({
            message: 'Unsupported file format',
        }, false);
    }
};

const photoUpload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fieldSize: 1000000 }
});

const profilePhotoResize = async (req, res, next) => {
    if (!req.file) return next();
    req.file.fileName = `user-${Date.now()}-${req.file.originalname}`;
    console.log('Resize', req.file);
    const image = await jimp.read(req.file.buffer);
    image.resize(250, 250);
    await image.writeAsync(path.join(`public/images/imageswatch/${req.file.fileName}.jpeg`));
    next();
};

const postImgResize = async (req, res, next) => {
    if (!req.file) return next();
    req.file.fileName = `user-${Date.now()}-${req.file.originalname}`;
    console.log('Resize', req.file);
    const image = await jimp.read(req.file.buffer);
    image.resize(500, 500);
    await image.writeAsync(path.join(`public/images/posts/${req.file.fileName}.jpeg`));
    next();
};

module.exports = { photoUpload, profilePhotoResize, postImgResize };