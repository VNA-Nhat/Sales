const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController'); // goi den controller 
const { authMiddleWare, authUserMiddleWare } = require("../service/JwtService");

//Add
router.post('/register', userController.createUser)
//Login
router.post('/login', userController.loginUser)
//Update
router.put('/update-user/:id',userController.updateUser)
//Delete
router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser)
//logout
router.post('/logout', userController.loginUser)

//Get user
router.get('/getall', authMiddleWare, userController.getAllUser)
router.get('/get-details/:id',authUserMiddleWare, userController.getDetailUser)
//Gửi token mới
router.post('/refresh-token', userController.RefreshToken)


module.exports = router