
//controllers
//register controller
exports.register = (req,res,next)=>{
    res.send('register route')
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
