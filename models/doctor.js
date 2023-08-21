let mongoose=require("mongoose")

let doctorSchema=mongoose.Schema({
    name:{
      type:String,
      required:true,
    },
    image:{
       type:String,
       required:true
    } 
    ,specialization:{
        type:String,
        required:true
    },
    experiance:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:new Date()
    },
    slots:{
        type:Number,
        required:true
    },
    fee:{
        type:Number,
        required:true
    }

})

doctorModel=mongoose.model("doctor",doctorSchema)

module.exports={doctorModel}