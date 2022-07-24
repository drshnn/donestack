
//controllers
//register controller
exports.register = async(req,res,next)=>{
const {username,email,password}= req.body;
try{
    const user = await User.create({
        username,email,password
    });
    //take from here
}catch(error){
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
