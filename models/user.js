let mongoose=require("mongoose")

let userSchema=mongoose.Schema({
    email:{
      type:String,
      required:true,
      unique:true
    },
    password:{
       type:String,
       required:true
    }
})

userModel=mongoose.model("user",userSchema)

module.exports={userModel}