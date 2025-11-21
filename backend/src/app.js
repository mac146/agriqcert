const express =require ('express')
const jwt = require("jsonwebtoken")
const cors= require ("cors")

const app=express()

app.use (express.json())
app.use(cors())

const {authRouter}=require("./routes/auth");

app.use("/auth",authRouter);

module.exports=app;