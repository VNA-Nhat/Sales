const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
// const  createUser  = require("../service/UserService");

//Add user
router.post('/register', userController.createUser)
//get all users
// rourer.get('/sign-up',  UserService.createUser)
//Login
router.post('/login', userController.loginUser)
//Update
router.put('/update-user/:id',userController.updateUser)

module.exports = router