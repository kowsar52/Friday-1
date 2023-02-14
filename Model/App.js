const mongoose = require("mongoose");

const appModel = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    description:{
        type:String,
        required:[true,"Description is required"]
    },
    image:{
        type:String,
        required:[true,"Image is required"]
    },
    price:{
        type:String,
        required:[true,"Price is required"]
    },
    interval:{
        type:String,
        required:[true,"Interval is required"]
    },
    trial_period_days:{
        type:String,
        required:[true,"Period Days is required"]
    },
    currency:{
        type:String,
        required:[true,"Currency is required"]
    },
    status:{
        type: String,
        enum : ['active','deactive'],
        default: 'active'
    },
    category:{
        type:String,
        required:[true,"Category is required"]
    },
    public_key:{
        type:String,
        required:[true,"Public Key is required"]
    },
    secreat_key:{
        type:String,
        required:[true,"Secreat Key is required"]
    },
    url:{
        type:String,
        required:[true,"Url is required"]
    },
},{timestamps:true});

module.exports = mongoose.model("availableApp",appModel);