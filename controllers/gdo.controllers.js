const expressAsyncHandler = require("express-async-handler");
const sequelize = require("../db/db.config");
require("dotenv").config();

//Import all the required models for usage
const { ProjectConcerns } = require("../models/concerns.model");
const { ProjectUpdates } = require("../models/updates.model");
const { Projects } = require("../models/projects.model");
const { ProjectTeam } = require("../models/team.model");
const { Employee } = require("../models/employee.model");

const { Op, DATE } = require("sequelize");

//Association Between Projects and Project Team -One Single project can have many Team Members.
Projects.ProjectTeam = Projects.hasMany(ProjectTeam, {
  foreignKey: "project_id",
});

//Creating a Project Team (Adding resource)

const addProjectTeam = expressAsyncHandler(async (req, res) => {
  //Verify the Employee and then create the Project Team
  let verifyEmployee = await Employee.findOne({
    where: { employee_email: req.body.resource_name },
  });
  if (verifyEmployee == undefined) {
    res
      .status(404)
      .send({ message: "Resource not a member of the organization" });
  } else {
    await ProjectTeam.create(req.body);
    res.status(200).send({ message: "Resource added succesfully" });
  }
});

//To get The GDO default Project Portfolio Dashboard

const getProjectPortfolioDashboard = expressAsyncHandler(async (req, res) => {
  //Check for the email with the required mail
  let portfolio = await Projects.findAll({
    where: { gdoemail: req.params.email },
    attributes: {
      exclude: [
        "domain_of_project",
        "type_of_project",
        "gdoemail",
        "project_manager_email",
      ],
    },
  });
  res
    .status(200)
    .send({ message: "Project-Portfolio-Dashboard", projects: portfolio });
});

//To Get The Detailed view Of the project when we click on Project

const getProjectDetails = expressAsyncHandler(async (req, res) => {
  let allprojects = await Projects.findOne({
    where: { gdoemail: req.params.email, project_id: req.params.project_id },
    //Including associations in order to get all the project details related to a project
    include: [
      {
        association: Projects.ProjectTeam,
      },
      {
        association: Projects.ProjectConcerns,
      },
      {
        association: Projects.ProjectUpdates,
      },
    ],
  });
  //Get Updates
  /* let startdate=new Date()
    let beforedate=new Date()
    beforedate.setDate(startdate.getDate()-14)
    console.log(startdate,beforedate)
    let updates= await allprojects.getProjectUpdates({where:{date:{[Op.between]:[beforedate,startdate]}}})
    console.log(updates)*/

  //To get the project Fitness
  let projectFitness = allprojects.project_fitness;
  //To get Project Team size (Of Billed Count)
  let teamSize = 0;
  allprojects.Project_Teams.forEach((team) => {
    if (team.billing_status == "billed") teamSize++;
  });
  //To get All project Concerns
  let concernindicator = 0;
  allprojects.Project_concerns.forEach((concern) => {
    if (concern.status_of_concern == "inprogress") concernindicator++;
  });
  res.status(200).send({
    message: "Project under the GDO are: ",
    ProjectFitness: projectFitness,
    TeamMembers: teamSize,
    ConcernIndicator: concernindicator,
    projects: allprojects,
  });
});

//To create resource Request
const resourceRequest = expressAsyncHandler(async (req, res) => {
  let [reqdata] = await sequelize.query(
    "insert into res_request set id=?,request_raised_by=?,project_id=?,resource_desc=?",
    {
      replacements: [
        req.body.id,
        req.body.request_raised_by,
        req.body.project_id,
        req.body.resource_desc,
      ],
    }
  );
  console.log(reqdata);
  res
    .status(200)
    .send({ message: "Resource Raised Successfully", payload: reqdata });
});

//To display the Resouces requested
const displayResourceRequest = expressAsyncHandler(async (req, res) => {
  let disdata = await sequelize.query("select * from res_request");
  res.status(200).send({ message: "Data is : ", payload: disdata[0] });
});

//export
const gdoapp = {
  getProjectPortfolioDashboard,
  getProjectDetails,
  addProjectTeam,
  resourceRequest,
  displayResourceRequest,
};
module.exports = gdoapp;
