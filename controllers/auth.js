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
exports.login= async(req,res,next)=>{
const {email,password}= req.body;
if(!email||!password){
    return next(new ErrorResponse("Please provide an email and password"),401)
}
try {
   const user = await User.findOne({email}).select("+password")
   if(!user){
    return next(new ErrorResponse("User not found ",401))
   }
   const isMatch = await user.matchPassword(password)
   if(!isMatch){
    return next(new ErrorResponse("Invalid Credentials",401))
   }
   sendToken(user,201,res)
} catch (error) {
return next(error)
}
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
