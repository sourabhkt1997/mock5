let express=require("express")
const { connection } = require("./db")
const { userrouter } = require("./routes/userroute")
const { doctorrouter } = require("./routes/doctorroutes")
let app=express()
app.use(express.json())
require("dotenv").config()
cors=require("cors")
app.use(cors())

app.get("/test",async(req,res)=>{
    try {
        res.send("hello")
    } catch (error) {
        res.send(error)
    }
})

app.use("/user",userrouter)
app.use("/doctor",doctorrouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("server running")
    } catch (error) {
        console.log(error)
    }
})