const expressAsyncHandler =require("express-async-handler")
require('dotenv').config()

//Import the bcycrytjs for hashing and jwt for token generation
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken");

const nodemailer = require('nodemailer');
//Creating connection to SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pvlnsrinath@gmail.com",
    pass: "nxjejjyvvsirglkv" // app password
  }
})
//Creating otps object
let otps={}

//Import all the required models for usage
const {User}=require('../models/user.model')
const {Employee}=require('../models/employee.model')

//User Registeration

const registerUser=expressAsyncHandler(async(req,res)=>{
    // get the body from request
  let { user_email , user_password} = req.body;
  // check the user is existed in our company database or not
  let userExistenceInWal = await Employee.findOne({where:{employee_email:user_email}});
  // if the user is not existed in our company then restrict the resgitration process
  if (userExistenceInWal==undefined) {
    res.status(200).send({alertMessage: "Unauthorized access" });
  }
  else {
    // check if the employee already exists with that email
    let userRecord = await User.findOne({where:{user_email:user_email}});
    // if user found already
    if (userRecord!= undefined) {
      res.status(200).send({ alertMessage: "User already found with that email" });
    }
    // if user not exists
    else {
      // hash the password
      let hashedPassword = await bcryptjs.hash(user_password, 6);
      req.body.user_password = hashedPassword;
      await User.create(req.body);
      res.status(200).send({ message: "User Registered" });
    }
  }
})

//User Login Controller

const loginUser=expressAsyncHandler(async(req,res)=>{
    let { user_email, user_password } = req.body;
    // check the user existence using userId
    let userRecord = await User.findOne({where: {user_email:user_email}});
    // if user not found
    if (userRecord == undefined) {
      res.status(200).send({ message: `User not found with email ${user_email}`});
    }
    // if user found check password
    else {
      let checkPassword = await bcryptjs.compare(user_password,userRecord.dataValues.user_password);
      // if password not matched
      if (!checkPassword) {
        res.status(200).send({ message: "Incorrect password" });
      } else {
        // create a jwt token
        let signedToken = jwt.sign(
          {
            user_email: userRecord.dataValues.user_email,
            user_role: userRecord.dataValues.user_role,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );
        res.status(200).send({ message: "Login successfull", payload: signedToken ,user:userRecord});
      }
    }
   
})

//Incase the User forgots the password the email should trigger

const forgotPassword=expressAsyncHandler(async(req,res)=>{
  //Generate a 6 digit OTP 
  let otp=Math.floor(Math.random()*(999999-100000 + 1))+100000
  //Add the OTP to otps object
  otps[req.body.user_email]=otp
  //Draft an email
  let mailOptions = {
      from: 'pvlnsrinath@gmail.com',
      to: req.body.user_email,
      subject: 'OTP to Reset your password',
      text: `Hello, Your reset password request is successful.Enter the following OTP to reset your password :`+otp
    }
  //Send the drafted email
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email is sent: ' + info.response);
      }
    })
  //Set a valid time-limit for OTP
  setTimeout(()=>{
      //delete OTP from object after 10 minutes
      delete otps[req.body.user_email]
  },600000)
  res.status(200).send({message:"OTP to reset your password is send to your email"})
})

//Reset Password Option to Reset the password
const resetPassword=expressAsyncHandler(async(req,res)=>{
  // checking if the otp is valid
  if (req.body.otp == otps[req.body.email]) {
    console.log(otps);

    let hashedPassword = await bcryptjs.hash(req.body.password, 10);

    let update=await User.update({user_password: hashedPassword },{where: {user_email: req.body.email}});
    console.log("Updated",update)  
    res.status(201).send({ message: "Password reset sucessfully" });
    }
    // else
    else {
      res.status(200).send({ message: "Invalid OTP" });
    }
})
//Exporting the controller to User Routes
const userapp={
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
}
module.exports=userapp;