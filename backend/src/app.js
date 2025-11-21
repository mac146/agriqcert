require("dotenv").config(); 
const express =require ('express')
const jwt = require("jsonwebtoken")
const cors= require ("cors")

const app=express()

app.use (express.json())
app.use(cors())

const {userRouter}=require("./routes/user");

app.use("/user",userRouter);

module.exports=app;