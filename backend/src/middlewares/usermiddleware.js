const express=require ('express')
const jwt =require ('jsonwebtoken')

require ('dotenv').config()
const Jwt_USER_SECRET=process.env.Jwt_USER_SECRET

//this function works as a middleware

async function usermiddleware(req,res,next){
    try{
        const token =req.headers.token
        if(!token){
            return res.json({
                message:"token not found"
            })
        }
        const decoded =jwt.verify (token,Jwt_USER_SECRET)
        req.userid=decoded.userid
        next()
    } catch(e){
        res.json({
            message:"something went wrong"
        })
    }
}

module.exports=usermiddleware