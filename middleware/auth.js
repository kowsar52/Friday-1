const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandling");
const catchAsyncError = require("../middleware/catchAsyncError");

module.exports = catchAsyncError((req,res,next) =>{
    const authHeader = req.headers.token;
    if (!authHeader){
      return res.status(400).json({success:false, message: "Please Enter Valid Token" } );
    }
      const token = authHeader.split(" ")[1];
        if (!token) {
          return res.status(400).json({success:false,  message: "There is Something is Wrong"});
        }
        const {user} = jwt.verify(token, process.env.JWT_SEC);
        req.user = user;
        next();
     
});