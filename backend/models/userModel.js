const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Please  provide your name"],
        minLength: [3,"Name must be at least 3 characters"] ,
        maxLength:[30, "Name must not exceed 30 characters"],
    },
    email:{
        type:String,
        unique: true,
        required:[true,"Please provide your email"],
        validate:[validator.isEmail,"Invalid Email provided"],
    },
    phone:{
        type: Number,
        required:[true, "Please provide  your Phone number"],
    },
    password:{
        type: String,
        required:[true,"Please provide your password"],
        minLength: [8,"Password must be at least 8 characters"] ,
        maxLength:[32, "Password must not exceed 32 characters"],
        select:false,
    },
    role:{
        type:String,
        required:[true,"Please provide your role"],
        enum: ["Job Seeker","Employer"],
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
})


//hashing password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }

    this.password = await bcrypt.hash(this.password,10)
})

//comparing password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//generating jwt token for authorization
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id} , process.env.JWT_SECRET_KEY, {expiresIn:process.env.JWT_EXPIRE})
}

module.exports =mongoose.model('User', userSchema);