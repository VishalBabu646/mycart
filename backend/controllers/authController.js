const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModels");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });


  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  console.log("Entered loginUser");

  if (!email || !password) {
    next(new ErrorHandler("Please Enter Email and Password", 400));
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  console.log('before is valid');
  if (! await user.isValidPassword(password))
    return next(new ErrorHandler("Invalid Email or Password", 401));

  sendToken(user, 201, res);
});


exports.logOutUser = (req,res,next) => {
  return res.cookie('token',null,{
    expires:new Date(Date.now()),
    httpOnly: true
  }).status(200).json({
    success: true,
    message:"Logged out successfully"
  });
}
