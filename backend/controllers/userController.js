const catchAsyncError = require('../middlewares/catchAsyncError')
const { ErrorHandler } = require('../middlewares/error')
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')

const register = catchAsyncError(async (req, res, next) => {
    const { name, email, password, phone, role } = req.body
    if (!name || !email || !password || !phone || !role) {
        return next(new ErrorHandler("Please fill entire form."))
    }

    const isEmail = await User.findOne({ email: email })
    if (isEmail) {
        return next(new ErrorHandler("Email already exists"))
    }

    const user = await User.create({
        name, email, password, phone, role
    })

    sendToken(user, 200, res, "User registered successfully")

})

//login controller
const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return next(new ErrorHandler("Please enter all fields",400))
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler("Invalid email or password",400))
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        return next(new ErrorHandler("Invalid email or password",400))

    }

    if(user.role !== role){
        return next(new ErrorHandler(`User with role ${role} not found`,  403))
    }
    
    //send token
    sendToken(user, 200, res,"User logged in successfully");
})

const logout = catchAsyncError( async (req,res,next)=>{
    res.status(201).cookie("token","",{
        httpOnly: true,
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"Logged out"
    })
})


module.exports = {register, login, logout}