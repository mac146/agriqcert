require("dotenv").config(); 
const express =require ('express')
const jwt = require("jsonwebtoken")
const cors= require ("cors")

const { sequelize } = require("./config/db"); // Import sequelize instance

const app=express()

app.use (express.json())
app.use(cors())

const {userRouter}=require("./routes/user");
// Sync database
sequelize.sync({ force: false }) 
    .then(() => {
        console.log("Database & tables synced!");
    })
    .catch((err) => {
        console.error("Error syncing database:", err);
    });



app.use("/user",userRouter);

module.exports=app;