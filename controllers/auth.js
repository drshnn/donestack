const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

// add sendEmail



//controllers
//register controller
exports.register = async(req,res,next)=>{
const {username,email,password}= req.body;
try{
    const user = await User.create({
        username,email,password
    });
    //take from here
    sendToken(user,201,res)
}catch(error){
next(error)
}
}

//login controller
exports.login= (req,res,next)=>{
    res.send('Login route')
}

//forgot password controller
exports.forgotPwd= (req,res,next)=>{
    res.send('Forgot password route')
}


//reset password controller
exports.resetPwd= (req,res,next)=>{
    res.send('Reset password route')
}

const sendToken = (user,statusCode,res)=>{
    const token = user.getSignedToken()
    const userData = user.getUsernameEmail()
    res.status(statusCode).json({success:true,token,userData})
}
