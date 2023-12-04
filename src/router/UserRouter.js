const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleWare");

//Add
router.post('/register', userController.createUser)
//Login
router.post('/login', userController.loginUser)
//logout
router.post('/logout', userController.loginUser)
//Update
// router.put('/update-user/:id',userController.updateUser)
//Delete
router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser)
router.post('/delete-many', authMiddleWare, userController.deleteMany)

//Get user
router.get('/getall', authMiddleWare, userController.getAllUser)
router.get('/get-details/:id',authUserMiddleWare, userController.getDetailUser)
//Gửi token mới
router.post('/refresh-token', userController.RefreshToken)



module.exports = router