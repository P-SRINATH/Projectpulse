const expressAsyncHandler =require("express-async-handler")
const sequelize=require('../db/db.config');

const {User}=require('../models/user.model')
const jwt=require("jsonwebtoken");
const bcryptjs=require("bcryptjs")
const { Projects } = require("../models/projects.model");

//Super Admin Login to the portal
const adminlogin=expressAsyncHandler(async(req,res)=>{
    let { user_email, user_password } = req.body;
    let userRecord = await User.findOne({where: {user_email:user_email}});
    if (userRecord == undefined) {
      res.status(404).send({ message: `User not found with email ${user_email}`});
    }
    // if user found check password
    else {
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
        res.status(200).send({ message: "Login successfull", payload: signedToken });
    }

})

//View all the users that are present in the portal

const viewAllUsers=expressAsyncHandler(async(req,res)=>{
   let result=await User.findAll({
    attributes:{
        exclude:["user_password"]
    }
   });
   res.status(200).send({message:"All users are here",Users:result});
})

//The Super-Admin will assign users with their respective roles

const createUserRole=expressAsyncHandler(async(req,res)=>{
    let finduser=await User.findOne({where:{user_email:req.body.user_email}})
    if(finduser==undefined){
        res.status(200).send({message:"No user Found!"})
    }
    else{
        await User.update(req.body,{where:{user_email:req.body.user_email}})
        res.status(200).send({message:"Updated user Role successfully"});
    }
})

//The Super-admin Can View the Projects if needed

const viewAllProjects=expressAsyncHandler(async(req,res)=>{
    let allprojects=await Projects.findAll();
    res.status(200).send({message:"Projects are all present here:",projects:allprojects})
})

//Super admin can update the password in case it cant be updated by the user.

const updatePassword=expressAsyncHandler(async(req,res)=>{
    let usermail=await User.findOne({where:{user_email:req.body.user_email}})
    if(usermail==undefined){
        res.status(404).send({message:"User not found"})
    }
    else{
        let hashedPassword = await bcryptjs.hash(req.body.user_password, 6);
        req.body.user_password = hashedPassword;
        await User.update(req.body,{where:{user_email:req.body.user_email}});
        res.status(201).send({ message: "User Password updated" });
    }
})

const userapp={
    adminlogin,
    viewAllUsers,
    createUserRole,
    viewAllProjects,
    updatePassword
}

module.exports=userapp