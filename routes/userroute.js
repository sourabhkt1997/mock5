let express=require("express")
let userrouter=express.Router()
let jwt=require("jsonwebtoken")
require("dotenv").config()
let bcrypt=require("bcrypt")

let {userModel}=require("../models/user")


userrouter.post("/register",async(req,res)=>{
    try {
        let {email,password}=req.body
         let data=await userModel.findOne({email})
         if(data){
            res.status(402).send("already registered ,login please")
         }
         else{
            bcrypt.hash(password,5,async(err,hash)=>{
               if(hash){
                let newuser=new userModel({email,password:hash})
                await newuser.save()
                res.status(200).send("registration success full")
               }
               else {
                res.status(400).send("internal error")
               }
            })
         }
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})


userrouter.post("/login",async(req,res)=>{
    try {
        let {email,password}=req.body
        let data=await userModel.findOne({email})
        if(data){
            console.log(data)
            bcrypt.compare(password,data.password,async(err,result)=>{
               if(result){
                let accesstoken=jwt.sign({userid:data._id},process.env.access)
                res.cookie("accesstoken",accesstoken)
                res.status(200).send(accesstoken)

               }
               else{
                res.status(400).send("wrong password")
               }
            })  
        }
        else{
            res.status(402).send("please register first")
        }
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})







module.exports={userrouter}