const express = require('express')
const userControllers = require('./userController')
const user = express.Router()

user.get('/user', userControllers.getUser)

module.exports = user