const express = require("express")
const {connection}=require("./config/db")
const {userRouter} = require("./route/user.route")

const app = express()
app.use(express.json())

app.use("/user",userRouter)

app.get("/",(req,res)=>{
    res.send("Home page")
})

app.listen(9000,async()=>{
    try{
        await connection
    }catch(err){
        console.log(err)
    }
    console.log("server in running at port 9000")
})
