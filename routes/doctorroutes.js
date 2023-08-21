let express=require("express")
const { doctorModel } = require("../models/doctor")
const { userModel } = require("../models/user")
let doctorrouter=express.Router()



doctorrouter.post("/adddoctor",async(req,res)=>{
    try {
        let {name,image,specialization,experiance,location,slots,fee}=req.body
        console.log(req.body)
         let data=new doctorModel({name,image,specialization,experiance,location,slots,fee})
         await data.save()
         res.status(200).send("new doctor added")
        
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})


doctorrouter.get("/",async(req,res)=>{
    try {
        let data=await doctorModel.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

doctorrouter.get("/finddoctor",async(req,res)=>{
    try {
        let {doctor}=req.query
        let data=await doctorModel.find({name:{$regex:doctor,$options:"i"}})
         res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

doctorrouter.get("/filterdoctor",async(req,res)=>{
    try {
        let {filter}=req.query
        let data=await doctorModel.find({specialization:req.query})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
})



doctorrouter.get("/sortdoctor",async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

doctorrouter.delete("/deletedoctor/:id",async(req,res)=>{
    try {
        let {id}=req.params
        console.log(id)
        await doctorModel.findByIdAndDelete({_id:id})
        res.status(200).send("deleted")
    } catch (error) {
        res.status(400).send(error.message)
    }
})

doctorrouter.patch("/editdoctor/:id",async(req,res)=>{
    try {
        let {id}=req.params
        await doctorModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send("updated")
    } catch (error) {
        res.status(400).send(error.message)
    }
})




module.exports={doctorrouter}