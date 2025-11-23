const {Router}= require('express')
const consignmentRouter=Router()
const jwt=require('jsonwebtoken')
const z=require('zod')
const { v4: uuidv4 } = require("uuid"); 
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
    const exporter_id=req.userid
    const consignment_id = uuidv4();
    const consignment=await consignmentModel.create({
           consignment_name,
           consignment_category,
           consignment_quantity,
           consignment_origin,
           consignment_destination,
           exporter_id,
           consignment_id,

      // workflow default values
      status: "PENDING_QA_ASSIGNMENT",
      assigned_qa_id: null,
      qa_report_id: null,
      dpp_certificate_id: null,
      qr_url: null,

      created_at: new Date(),
      updated_at: null
           
    })
    res.json({
        message:"your consignnment is registerd",
        consignment_id: consignment.consignment_id,
        status: consignment.status
    })
    } catch (e){
       res.status(500).json({
            message:"consignment fail",
            error:e.message 
       })
    }
})