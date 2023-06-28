const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const uuid=require("uuid").v4;
const nodemailer = require('nodemailer');
const router = express.Router();
let ttt;
router.get("/verify", async (req, res) => {
    
  const { token,username,email,password } = req.query;
  
  if (token === ttt) {
    try {
      const newUser = new User({
        username:username,
        emailId:email,
        password:password,
        Token:token
    });
    
      await newUser.save();
      
      res.status(200).send( "Success!!!" );
    }
    catch (err) {
        console.log(err);
      res.status(500).send(err);
    }
  }
  else {
    res.status(404).send({ message: "Wrong verification Token" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if(username===undefined||!username){
      return res.status(404).send({message:"Incomplete Username"});
     }
     if(email===undefined||!email){
      
      return res.status(404).send({message:"Incomplete mail ID"});
      
     }
     if(password===undefined||!password){
      
      return res.status(404).send({message:"Incomplete Password"});
      
     }
    
    const user=await User.findOne({username:username})||await User.findOne({emailId:email});
    if(user){
       return res.status(404).send({message:"User is already registered!!!"});
    }


    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const Token=uuid();
    ttt=Token;

    const verificationLink =  `http://localhost:8000/register/verify?token=${encodeURIComponent(Token)}&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(hash)}}`;
    sendVerificationEmail(email, verificationLink);
    return res.status(200).send({ message: "Please check the mail and click on the verification link to get registered" });
  }
  catch (err) {
    console.log("error: ", err);
    res.status(500).send({ message: err });
  }
});

const sendVerificationEmail = async (email, verificationLink) => {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ironman053103@gmail.com',
      pass: 'paqxgxpmqrmuoqmy'
    }
  });

  // Prepare the email content
  const mailOptions = {
    from: 'ironman053103@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Please click the following link to verify your email: ${verificationLink}`
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};



module.exports = router;
