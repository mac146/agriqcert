const express =require ('express')
const jwt = require("jsonwebtoken")
const cors= require ("cors")

const { sequelize } = require("./config/db"); // Import sequelize instance

const app=express()

app.use (express.json())
app.use(cors())

// Sync database
sequelize.sync({ force: false }) 
    .then(() => {
        console.log("Database & tables synced!");
    })
    .catch((err) => {
        console.error("Error syncing database:", err);
    });

const {authRouter}=require("./routes/auth");

app.use("/auth",authRouter);

module.exports=app;