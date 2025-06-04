const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModels");
const sendEmail = require("../utils/email");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");
const crypto = require('crypto');

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

exports.forgotPassword = catchAsyncError(async(req,res,next) => {
  console.log(req.body.email);
  const user = await User.findOne({email: req.body.email});
  console.log(user);
  if(!user) return next(new ErrorHandler('Given email is not found',404));
  const resetToken = user.getResetToken();
 
  await user.save({validateBeforeSave: false});
  
  console.log(req.protocol)
  const resetUrl = `${req.protocol}://${req.host}/password/reset/${resetToken}`;

  const message = `Your Password reset url is as follows \n \n ${resetUrl} \n \n  If you have not requested this email please ignore it.`;
  console.log('Here')

  console.log("User:", process.env.SMTP_USER);
console.log("Pass:", process.env.SMTP_PASS);
console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS);


  try{
    sendEmail({
      email: user.email,
      subject: "Mycart password Recovery",
      message

    })

    res.status(200).json({
      success: true,
      messsage: `Email sent to ${user.email}`
    })
  }
  catch(error){
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpire = undefined,
      await user.save({validateBeforeSave : false});
      return next(new ErrorHandler('error.message',500));
    }
  }
);

exports.resetPassword = catchAsyncError(async(req,res,next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  console.log('reset',resetPasswordToken);
   const user = await User.findOne( {
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt : Date.now()
        }
    } )
    console.log(user);
  if(!user)  return next(new ErrorHandler('Password reset token is invalid or expired'));

  if( req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match'));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave: false})
    sendToken(user, 201, res)
})
