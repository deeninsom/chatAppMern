const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const connection = require('./config/config')
const auth = require('./component/auth/auth');
const user = require('./component/user/userRouter');


const app = express();
const PORT = process.env.PORT || 3030 

app.use(express.json());
app.use(morgan('dev'))


app.use('/', auth, user)


app.listen(PORT, ()=>{
    connection
    console.log(`app running at http://localhost:${PORT}`)
})