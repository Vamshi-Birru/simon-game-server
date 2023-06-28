const express=require('express');
const mongoose=require('mongoose');
const Login=require('./routes/login');
const Register =require("./routes/register");
const User=require("./routes/user");
const uuid=require("uuid").v4;
const cors=require('cors');
require('dotenv').config();
const app=express();

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
 console.log("MongoDb is connected!!!");
})
.catch((err)=>{
    console.log("MongoDb isn't connected due to",err);
})
app.use(express.json()); // For parsing JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/",(req,res)=>{
 res.setHeader("Access-Control-Allow-Credentials","true");
 res.send("API is Running.....");
})
app.use("/login",Login);

app.use("/register",Register);
app.use("/user",User);
app.listen(8000,console.log("Backend is connected!!!"));
