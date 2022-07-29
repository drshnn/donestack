require('dotenv').config({path:"./config.env"})
const express = require('express')
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error')
const cors = require('cors')

//mongodb connection
connectDB()


//importing routes
const authRoute = require('./routes/auth');

//express application
const app = express()
app.use(express.json())


//cors
app.use(cors({
    origin:'http://localhost:5173'
}))

//routes
app.use('/api/auth/',authRoute)
app.use('/api/private',require('./routes/private'))
app.use(errorHandler) //should be last middleware
//PORT

PORT = process.env.PORT || 4000


//starting server
app.listen(PORT,()=>{
    console.log('server started on '+PORT)
})

process.on("unhandledRejection",(err,promise)=>{
    console.log(`Logged Error: ${err}`)
    server.close(()=>process.exit(1))
})
