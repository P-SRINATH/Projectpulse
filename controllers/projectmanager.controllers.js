const expressAsyncHandler =require("express-async-handler")
const sequelize=require('../db/db.config');
require('dotenv').config()

//Import all the required models for usage
const {Projects}=require('../models/projects.model')
const {ProjectConcerns}=require('../models/concerns.model')
const {ProjectUpdates}=require('../models/updates.model')

const nodemailer = require('nodemailer');
//Creating connection to SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pvlnsrinath@gmail.com",
    pass: "nxjejjyvvsirglkv" // app password
  }
})

//Asssociations are involved As A single project can have many Concerns and Updates
Projects.ProjectConcerns=Projects.hasMany(ProjectConcerns,{foreignKey:'project_id'});
Projects.ProjectUpdates=Projects.hasMany(ProjectUpdates,{foreignKey:'project_id'});

//The Project Concern is raised by the Project manager using below controller

const createProjectConcerns=expressAsyncHandler(async(req,res)=>{
    await ProjectConcerns.create(req.body);
     //mail options for nodemailer
    let mailOptions = {
    from: "pvlnsrinath@gmail.com",
    to: "pvlnsrinath@gmail.com",
    subject: `Project concern is raised for project ${req.body.project_id}`,
    text: `Hi Admin,
     A project concern is raised
     Concern Description: ${req.body.concern_description}
     severity:${req.body.severity_of_concern}`,
    };
    //send email
     transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
        console.log(error);
        } else {
        console.log("Email sent: " + info.response);
    }
  });
    res.status(201).send({message:"Project Concern Raised "})
})

//The Project Updates can be created using the below controller

const createProjectUpdates=expressAsyncHandler(async(req,res)=>{
    await ProjectUpdates.create(req.body);
    res.status(201).send({message:"Project Updates added"})
})

//To get the required Project Concerns
const getProjectConcerns=expressAsyncHandler(async(req,res)=>{
    let allconcerns=await ProjectConcerns.findAll();
    //Check for concerns
    if(allconcerns==undefined){
        res.status(404).send({message:"There are no concerns."})
    }
    else{
        res.status(200).send({message:"All project concerns:",Concerns:allconcerns});
    }
})

//To get the required Project Updates 
const getProjectUpdates=expressAsyncHandler(async(req,res)=>{
    let allupdates=await ProjectUpdates.findAll();
    //Check for the updates
    if(allupdates==undefined){
        res.status(400).send({message:"There are no Updates present"})
    }
    else{
        res.status(200).send({message:"All project updates",Updates:allupdates})
    }
})

//To get the Projects under that Project manager 
const getProjectsByManager=expressAsyncHandler(async(req,res)=>{
    let projectbymanager=await Projects.findAll({where:{project_manager_email:req.params.email}})
    //check for the manager
    if(projectbymanager==undefined){
        res.status(404).send({message:"There are no projects under this Project manager"})
    }
    else{
        res.status(200).send({message:"The projects Under Project Manager are : ",projects:projectbymanager})
    }
   
})

//Updating the project Concerns
const updateProjectConcerns=expressAsyncHandler(async(req,res)=>{
    let getprojectconcern=await ProjectConcerns.findOne({where:{id:req.body.id}})
    if(getprojectconcern==undefined){
        res.status(404).send({message:"There is no Project Concern raised with the given id "})
    }
    else{
        await ProjectConcerns.update({concern_description:req.body.concern_description,concern_raised_internally:req.body.concern_raised_internally,status_of_concern:req.body.status_of_concern}
            ,{where:{id:req.body.id}})
        res.status(201).send({message:"Concern Updated successfully"});
    }
})

//Updating the Project Updates
const updateProjectUpdates=expressAsyncHandler(async(req,res)=>{
    let getprojectupdate=await ProjectUpdates.findOne({where:{id:req.body.id}})
    if(getprojectupdate==undefined){
        res.status(404).send({message:"There is no Project-Update available to modify "})
    }
    else{
        await ProjectUpdates.update({project_status_update:req.body.project_status_update,waiting_for_client:req.body.waiting_for_client},
            {where:{id:req.body.id}})
            res.status(201).send({message:"Project Updates are modified"})
     }
})
//To get the specific project details of a particular project by the project manager
const getSpecificProjectDetails=expressAsyncHandler(async(req,res)=>{
    let allprojects=await Projects.findOne({where:{project_manager_email:req.params.email,project_id:req.params.project_id},
        //Including Associations to get the required data all together.
        include:[
            {
                association:Projects.ProjectTeam
            },
            {
                association:Projects.ProjectConcerns
            },
            {
                association:Projects.ProjectUpdates
            }
        ]
    });
  let projectFitness=allprojects.project_fitness
  let teamSize=0;
  allprojects.Project_Teams.forEach((team)=>{
    if(team.billing_status == "billed") teamSize++;
  })
  let concernindicator=0;
  allprojects.Project_concerns.forEach((concern) => {
    if (concern.status_of_concern == "inprogress") concernindicator++;
  });
  res.status(200).send({message:`Project ${req.params.project_id} under the project manager with email ${req.params.email}:`,ProjectFitness:projectFitness,TeamMembers:teamSize,ConcernIndicator:concernindicator,projects:allprojects})
})
const PMapp={
    createProjectConcerns,
    createProjectUpdates,
    getProjectConcerns,
    getProjectUpdates,
    getProjectsByManager,
    getSpecificProjectDetails,
    updateProjectConcerns,
    updateProjectUpdates
}
module.exports=PMapp;