const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const connection = require('./config/config')
const auth = require('./component/auth/authRoutes');
const user = require('./component/user/userRouter');


const app = express();
const PORT = process.env.PORT || 3030 


//middleware
app.use(express.json());
app.use(morgan('dev'))


//routes
app.use('/', auth, user)

//listen app
app.listen(PORT, ()=>{
    connection
    console.log(`app running at http://localhost:${PORT}`)
})