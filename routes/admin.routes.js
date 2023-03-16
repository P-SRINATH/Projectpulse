const exp=require("express");
const GdoApp=exp.Router();
const {
    createProject,
    getProjectDetails,
    getProjectConcerns,
    getProjectUpdates,
    getProjectResources,
    getProjectSpecificDetails
}=require("../controllers/admin.controller");
 
GdoApp.use(exp.json())
const verifyadmintoken=require('../middleware/verifyadmintoken')

//For the GDO head to create project
GdoApp.post('/createProject',verifyadmintoken,createProject)

//For a Admin to access all the project details 
GdoApp.get('/getProjectDetails',verifyadmintoken,getProjectDetails)

//For a Admin to access all the Concern details 
GdoApp.get('/getProjectConcerns',verifyadmintoken,getProjectConcerns)

//For a Admin to access all the Update details 
GdoApp.get('/getProjectUpdates',verifyadmintoken,getProjectUpdates)

//For a Admin to access all the Resources details
GdoApp.get('/getProjectResources',verifyadmintoken,getProjectResources)

//For the Admin to get specific project details through admin
GdoApp.get('/getSpecificProjectDetails/:project_id',verifyadmintoken,getProjectSpecificDetails)
module.exports=GdoApp;