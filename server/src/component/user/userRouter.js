const express = require('express')
const userControllers = require('./userController')
const user = express.Router()

user.get('/user', userControllers.getUser)
user.get('/user/:id', userControllers.getUserById)
user.put('/user/:id', userControllers.updateUser)
user.delete('/user/:id', userControllers.deletedUser)

module.exports = user