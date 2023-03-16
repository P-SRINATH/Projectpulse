const expressAsyncHandler =require("express-async-handler")
const sequelize=require('../db/db.config');
require('dotenv').config()

//Import all the required models for usage
const {ProjectConcerns}=require('../models/concerns.model')
const {ProjectUpdates}=require('../models/updates.model')
const {Projects}=require('../models/projects.model')
const {ProjectTeam}=require('../models/team.model')

Projects.ProjectConcerns=Projects.hasMany(ProjectConcerns,{foreignKey:'project_id'})
Projects.ProjectUpdates=Projects.hasMany(ProjectUpdates,{foreignKey:'project_id'})
Projects.ProjectTeam=Projects.hasMany(ProjectTeam,{foreignKey:'project_id'})

//Create of a Project
const createProject=expressAsyncHandler(async(req,res)=>{
    await Projects.create(req.body);
    res.status(200).send({message:"New project created"});
})

//Get Project Details
const getProjectDetails=expressAsyncHandler(async(req,res)=>{
    let allprojects=await Projects.findAll();
    res.status(200).send({message:"All projects ",projects:allprojects})
})

//Get Project Concerns
const getProjectConcerns=expressAsyncHandler(async(req,res)=>{
    let allconcerns=await ProjectConcerns.findAll();
    res.status(200).send({message:"All project concerns:",Concerns:allconcerns});
})

//Get the project Updates
const getProjectUpdates=expressAsyncHandler(async(req,res)=>{
    let allupdates=await ProjectUpdates.findAll();
    res.status(200).send({message:"All project updates",Updates:allupdates})
})

//Get Project Rources
const getProjectResources=expressAsyncHandler(async(req,res)=>{
    let allresources=await ProjectTeam.findAll();
    res.status(200).send({message:"Project Resources are:",Resources:allresources})
})

//Get Project Specific details by admin
const getProjectSpecificDetails=expressAsyncHandler(async(req,res)=>{
    let allprojects=await Projects.findOne({where:{project_id:req.params.project_id},
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
  res.status(200).send({message:"Project details",ProjectFitness:projectFitness,TeamMembers:teamSize,ConcernIndicator:concernindicator,projects:allprojects})
})
const adminapp={
    createProject,
    getProjectDetails,
    getProjectConcerns,
    getProjectUpdates,
    getProjectResources,
    getProjectSpecificDetails
}
module.exports=adminapp;