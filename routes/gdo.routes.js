const exp=require("express");
const GdoApp=exp.Router();
const {
    getProjectDetails,
    getProjectPortfolioDashboard,
    addProjectTeam
}=require("../controllers/gdo.controllers");
const verifyGDOToken = require("../middleware/verifyGDOtoken");
 
GdoApp.use(exp.json())

//For the GDO head to Raise Project Resource (adding team members)
GdoApp.post('/addProjectTeam',verifyGDOToken,addProjectTeam)
//For the GDO head to Get the default portfolio Dashboard
GdoApp.get('/getPortfolioDashboard/:email',verifyGDOToken,getProjectPortfolioDashboard)
//For a GDO Head to access all the project details 
GdoApp.get('/getProjectDetails/:email/:project_id',verifyGDOToken,getProjectDetails)


module.exports=GdoApp;