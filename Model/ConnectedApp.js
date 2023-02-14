const mongoose = require("mongoose");

const connectedModel = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    appId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'availableApp',
        required:true
    },
    extra:{
        type:String
    },   
    status:{
        type: String,
        enum : ['active','deactive'],
        default: 'active'
    },
    
},{timestamps:true});

module.exports = mongoose.model("connectedApp",connectedModel);