const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const User = require('../models/userModels')
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next) => {
    const {token} = req.cookies;
    if(!token) return next(new ErrorHandler('Login to handle the resource',401));

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    console.log(decoded);
    req.user = await User.findById(decoded.id);
    next();
});

exports.authoriseRole = (...roles) => {
    console.log('Hello from authorise Role');
    return (req,res,next) => {
        if(!roles.includes(req.user.role)) return next(new ErrorHandler(`Role ${req.user.role} is not authorized`,401));
        next();
    }
}