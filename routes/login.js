const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const User=require("../models/User");

router.post("/",async (req,res)=>{
   try{
     const {username,password}=req.body;
     
     if(username===undefined||!username){
      
      return res.status(404).send({message:"Incomplete Username"});
      
     }

     const user=await User.findOne({username:username});
     if(!user){
        return res.status(404).send({message:"Incorrect Username"});
     }
     
     const match=await bcrypt.compareSync(password,user.password);
     if(!match){
        return res.status(404).send({message:"Incorrect password"});
     }
    return res.status(200).send({message: "User is successfully logged in"});

   }
   catch(err){
    res.status(500).send({message:err});
   }
})
module.exports=router;