const catchAsyncError = require('./catchAsyncError')
const {ErrorHandler} = require('./error')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const isAuthorized = catchAsyncError( async (req,res,next) => {
    const {token}  = req.cookies;
    if(!token){
        return next(new ErrorHandler("User not authorized", 400))
    }

    const decoded = await jwt.verify(token,process.env.JWT_SECRET_KEY) //decoded here will be object

    req.user = await User.findById(decoded.id); //findbyid cannot take object as parameter so cannot pass "decoded" we have to pass "decoded.id"

    next();
})

module.exports = isAuthorized