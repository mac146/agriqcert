const {Router}=require('express')
const userRouter=Router()
const jwt=require('jsonwebtoken')
const z=require('zod')
const bcrypt=require('bcrypt')
const Jwt_USER_SECRET=process.env.Jwt_USER_SECRET
const {userModel}=require("../models/db")
const usermiddleware = require('../middleware/usermiddleware');

userRouter.post("/signup",async(req,res)=>{
    const hasuppercase = (val) => /[A-Z]/.test(val);
    const haslowercase = (val) => /[a-z]/.test(val);
    const specialcase = (val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);

    const requirebody=z.object({
        email: z.string().email(), 
        password:z.string().min(3).max(8)
        .refine(hasuppercase,{message:"should contain a uppercase"})
        .refine(haslowercase,{message:"should contain a lowercase"})
        .refine(specialcase,{message:"should contain a specialcase"}),
        name: z.string().min(1),
        phone: z.string().optional(),
        companyName: z.string().optional(),
        role: z.enum(["exporter", "importer", "qa"])

        
    })

    const parsedatawithsuccess=requirebody.safeParse(req.body);

    if(!parsedatawithsuccess.success){
        res.status(400).json({
            message:"invalid form of data",
            error:parsedatawithsuccess.error.errors
        })
        return;
    }

    const {email,password,name,phone ,companyName,role}=parsedatawithsuccess.data

    const hashedpassword=await bcrypt.hash(password,10)

    try{
        await userModel.create({
            email:email,
            password:hashedpassword,
            name:name,
            companyName:companyName,
            phone:phone,
            role:role
        })
        res.json({
            message:"you are signed up"
        })
    }catch(e){
        res.status(500).json({
            message:"signed up fail",
            error:e.message
        })
    }
})

userRouter.post("/signin",async(req,res)=>{
    const {email,password}=req.body
try{
    const user=await userModel.findOne({
        where:{email}
    })
    if(!user){
        return res.json({
            message:"user not found"
        })
    }
    const matchedpassword=await bcrypt.compare(password,user.password)
    if(matchedpassword){
        const token=jwt.sign({userid: user.id,
            
        }, Jwt_USER_SECRET)
       res.json({
        message: "Login successful",
        token
    })
    }
    else{
        return res.json({
            message:"invalid password"
        })
    }
    
}catch(e){
    return res.json({
        message:"internal error"
    })
}
})

userRouter.get("/profile", usermiddleware,(req, res) => {
  res.json({ message: "User routes are live!" });
});

module.exports = { userRouter };


