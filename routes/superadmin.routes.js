const exp=require("express");
const AdminApp=exp.Router();
const {
    adminlogin,
    viewAllUsers,
    createUserRole,
    viewAllProjects,
    updatePassword
}=require("../controllers/superadmin.controllers")
 
const verifySuperAdminToken=require('../middleware/verifysuperadmintoken')
AdminApp.use(exp.json())

//For Super-admin to login to the Product
AdminApp.post('/superAdminLogin',adminlogin)

//Super-admin need to Create UserRole 
AdminApp.put('/createUserRole',verifySuperAdminToken,createUserRole)

//For Super-admin to View all users 
AdminApp.get('/viewAllUsers',verifySuperAdminToken,viewAllUsers)

//For Super-admin to view all projects
AdminApp.get('/viewAllProjects',verifySuperAdminToken,viewAllProjects)

//For super-admin to Update user password
AdminApp.post('/updatePassword',updatePassword)

module.exports=AdminApp;
