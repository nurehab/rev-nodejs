const { string, required } = require("joi");
const mongoose = require ("mongoose");
const bcrypt = require ("bcrypt")


const userScema = new mongoose.Schema({
    userName : {type:String,required:true,default:"NNN"},
    email : {type:String,required:true},
    password : {type:String,required:true},
    role : String ,
    isAuth : Boolean,
    googleId : String  
})

userScema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password,5)
    next();
})




module.exports = userScema