const mongoose=require("mongoose");
const UserSchema= mongoose.Schema({
     username:{
        type:String,
        required:true
     },
     emailId:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     score:{
        type:Number,
        default:0
     }
});
module.exports=mongoose.model("User",UserSchema);