const mongoose = require("mongoose")

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
        required:[true,"Please enter a password"],
        minlength:6,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
},
{
  timestamps: true
})

const user = mongoose.model("User",UserSchema)

module.exports = User;
