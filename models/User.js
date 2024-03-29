const crypto = require('crypto')
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//user schema
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true,"Please Provide a Username"]
    },
    email:{
        type:String,
        require:[true,"Please Provide an Email"],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please Provide a Valid Email"]
    },
    password:{
        type:String,
        unique:true,
        required:[true,"Please enter a password"],
        minlength:[6,"Password is too short, Enter more than 6 characters"],
        select:false
        },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
},
{
  timestamps: true
})

//middleware: Begin
UserSchema.pre('save',async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    next();
}) // hashing the password

UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

UserSchema.methods.getSignedToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRE})
}

UserSchema.methods.getUsernameEmail = function(){
    return {username:this.username,email:this.email}
}
//middleware: End

//model export
const User= mongoose.model("User",UserSchema)
module.exports = User;
