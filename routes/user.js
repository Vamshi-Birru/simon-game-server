const express=require("express");
const router=express.Router();
const User=require("../models/User");
router.post("/",async(req,res)=>{
    const {username}=req.body;
     try{
        
        const user=await User.findOne({username:username});
        
        res.status(200).send({score:user.score});
     }
     catch(err){
        res.status(404).send({message:err});
     }
});
router.post("/score",async(req,res)=>{
    const {username,score}=req.body;
    
    try{
        const user=await User.findOne({username:username});
        if(user.score<score){
            user.score=score;
            user.save();
            res.status(200).send({message:"Updated"});
        }
        else{
            res.status(200).send({message:"Not changed"});
        }
        
    }
    catch(err){
        res.status(404).send({message:err});
    }

});
router.get("/allScores",async (req,res)=>{
    try{
       const users=await User.find({});
       const userSummaries=users.map(user=>{
        return {
            username:user.username,
            score:user.score
        }
       });
       res.status(200).send({message:userSummaries});
    }
    catch(err){
        res.status(404).send({message:err});
    }
})
module.exports=router;