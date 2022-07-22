require('dotenv').config({path:"./config.env"})
const express = require('express')
const cors = require('cors')

//express application
const app = express()
app.use(express.json())


//cors
app.use(cors({
    origin:'http://localhost:3000'
}))

//routes


//PORT
PORT = process.env.PORT || 4000

