const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandling");
const catchAsyncError = require("../middleware/catchAsyncError");
const bcrypt = require("bcrypt");

const Token = (user) =>{
    return jwt.sign({ user }, process.env.JWT_SEC, {
        expiresIn: "1d",
    });
}

exports.Register = catchAsyncError(async(req,res) =>{
    const {name,email,password,total_app} = req.body;
    
        const emailalreday = await User.findOne({email});
        
        if(emailalreday) {
            return res.status(403).json({success:false,message:"Email alredy exists"});
        }

        const hashedPassword = await bcrypt.hash( password,10)

        const user = await User.create({
            name,email,password:hashedPassword
        });

        const token = Token(user);
        
        res.status(201).json({success:true,message:"User Registered sucessfully..",token,user});
    
})


exports.Login = catchAsyncError(async(req,res) =>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
   

        if(!user){
            return res.status(403).json({success:false,message:"Please enter valid credentials"});
        }

        const validPassword = await bcrypt.compare(password,user.password);

        if(!validPassword){
            return res.status(403).json({success:false,message:"Please enter valid credentials"});
        }

        const token = Token(user);

        return res.status(200).json({success:true,message:"Login Successfully",token,user});
})

exports.userDetail = catchAsyncError(async(req,res) =>{
    const {_id} = req.user;
    try {
        const user = await User.findById({_id});

        if(!user){
            return res.status(403).json({success:false,message:"User does't exists"});
        }
        res.status(200).json({success:true,user});
    } catch (error) {
        return res.status(500).json({error})
    }
})