const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController'); // goi den controller 

//Add
router.post('/register', userController.createUser)
//Login
router.post('/login', userController.loginUser)
//Update
router.put('/update-user/:id',userController.updateUser)

module.exports = router