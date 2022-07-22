require('dotenv').config({path:"./config.env"})
const express = require('express')
const cors = require('cors')
//importing routes
const authRoute = require('./routes/auth')

//express application
const app = express()
app.use(express.json())


//cors
app.use(cors({
    origin:'http://localhost:3000'
}))

//routes
app.use('/api/auth/',authRoute)

//PORT
PORT = process.env.PORT || 4000


//starting server
app.listen(PORT,()=>{
    console.log('server started on '+PORT)
})
