const catchAsyncError = require('../middlewares/catchAsyncError')
const {ErrorHandler} = require('../middlewares/error')
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')

const register = catchAsyncError( async (req,res,next) => {
    const {name,email,password,phone,role} = req.body
    if(!name || !email || !password||!phone ||!role){
        return next(new ErrorHandler("Please fill entire form."))
    }

    const isEmail = await User.findOne({email:email})
        if(isEmail){
            return next(new ErrorHandler("Email already exists"))
        }

    const user = await User.create({
        name,email,password,phone,role
    })

    sendToken(user,200,res,"User registered successfully")

})


module.exports = register