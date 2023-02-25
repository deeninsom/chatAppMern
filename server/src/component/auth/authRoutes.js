const express = require('express')
const authControllers = require('./authControllers')
const auth = express.Router()



auth.post('/login', authControllers.loginUser)
auth.post('/register', authControllers.regisUser)



module.exports = auth