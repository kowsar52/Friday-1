const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    email_verified_at:{
        type:Date,
        default:null
    },
    phone:{
        type:String,
        required:[true,"Phone Number is required"]
    },
    total_app:{
        type:String,
    },
    avatar:{
        type:String,
    },
    rember_token:{
        type:String,
    }
},{timestamps:true});

module.exports = mongoose.model("User",userModel);