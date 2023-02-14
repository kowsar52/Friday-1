const ConnectApp = require("../Model/ConnectedApp");
const ErrorHandler = require("../utils/errorHandling");
const catchAsyncError = require("../middleware/catchAsyncError");
const App = require("../Model/App");
const stripeConnect = require("../utils/Stripe");

exports.addConection = catchAsyncError(async(req,res) =>{
    const {_id} = req.user;
    const {extra,appId} = req.body;
  
        const data = await ConnectApp.create({
            userId:_id,appId,extra
        });

        return res.status(201).json({success:true,message:"App Connected Successfully"});
    
})

exports.getUserConnect = catchAsyncError(async(req,res) =>{
    const {_id} = req.user;
   
        const data = await ConnectApp.find({userId:_id});
        return res.status(201).json({success:true,data});
});

exports.getApp = catchAsyncError(async(req,res) =>{
    const {_id} = req.user;
    const {appId} = req.params;
    if(!appId){
        return res.status(403).json({success:false,message:"App is not exists.."});
    }

    const connectedApp = await ConnectApp.find({userId:_id,appId}).populate('userId').populate('appId');
    console.log("🚀 ~ file: connectedController.js:34 ~ exports.getApp=catchAsyncError ~ connectedApp", connectedApp)
    const availableApp = await App.findOne({_id:appId});  

    if(connectedApp.length){
        // if(availableApp.name === "Stripe"){
        //     // stripeConnect(availableApp,connectedApp,_id);
        // }
    }else{
        console.log("🚀 ~ file: connectedController.js:43 ~ exports.getApp=catchAsyncError ~ availableApp", availableApp)
        if(availableApp.name === "Stripe"){
            console.log("first")
            stripeConnect(availableApp,connectedApp,_id);
        }
    }

    // if(connectedApp.length <= 0){
    //     return res.status(201).json({success:true,message:"Get App Data",availableApp});
    // }else{
        
    //     return res.status(201).json({success:true,message:"App Data is available",connectedApp});
    // }

});