const exp=require("express");
const ProjectManagerApp=exp.Router();
const {
    createProjectConcerns,
    createProjectUpdates,
    getProjectConcerns,
    getProjectUpdates,
    getProjectsByManager,
    getSpecificProjectDetails,
    updateProjectConcerns,
    updateProjectUpdates
}=require("../controllers/projectmanager.controllers");
const verifyPMtoken=require('../middleware/verifyPMtoken')
 
ProjectManagerApp.use(exp.json())

//PM route to create Project Concerns
ProjectManagerApp.post('/createProjectConcerns',verifyPMtoken,createProjectConcerns)

//PM route to create project Updates
ProjectManagerApp.post('/createProjectUpdates',verifyPMtoken,createProjectUpdates)

//PM route to get Project Concerns
ProjectManagerApp.get('/getProjectConcerns',verifyPMtoken,getProjectConcerns)

//Pm route to get Project Updates
ProjectManagerApp.get('/getProjectUpdates',verifyPMtoken,getProjectUpdates)

//PM route to get project By manager
ProjectManagerApp.get('/getProjectByManager/:email',verifyPMtoken,getProjectsByManager)

//PM route to update the project concerns
ProjectManagerApp.put('/updateProjectConcerns',verifyPMtoken,updateProjectConcerns)

//PM route to update the project Updates
ProjectManagerApp.put('/updateProjectUpdates',verifyPMtoken,updateProjectUpdates)

//PM route to get specific project Details
ProjectManagerApp.get('/getSpecificProjectDetails/:email/:project_id',verifyPMtoken,getSpecificProjectDetails)

module.exports=ProjectManagerApp;