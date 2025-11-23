const {Router}= require('express')
const consignmentRouter=Router()
const jwt=require('jsonwebtoken')
const z=require('zod')
const bcrypt=require('bcrypt')
const Jwt_USER_SECRET=process.env.Jwt_USER_SECRET
const {consignmentModel}=require("../models/consignment");
const usermiddleware = require('../middlewares/usermiddleware')

//this function is for consigment details

consignmentRouter.post("/",usermiddleware,async (req,res)=>{
    const {consignment_name,
           consignment_category,
           consignment_quantity,
           consignment_origin,
           consignment_destination}=req.body

try{
    const exporterid=req.userid
    const consigment=await consignmentModel.create({
           consignment_name,
           consignment_category,
           consignment_quantity,
           consignment_origin,
           consignment_destination,
           exporter_id: exporterid

    })
    
    }

    

}
})