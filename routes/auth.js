const express = require('express');

const authController = require('../controllers/auth')

const router = express.Router();

 router.post('/register', authController.register );// redirected to authcontrollers for login and signup

 router.post('/login', authController.login);//sending data safely to the controllers

module.exports = router;