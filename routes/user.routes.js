//Create Express Route
const exp=require("express");
const UserApp=exp.Router();
const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
}=require("../controllers/user.controllers")
 
UserApp.use(exp.json())

//For a user to register to the portal
UserApp.post('/registerUser',registerUser)

//For a user to login to the portal
UserApp.post('/loginUser',loginUser)

//For a user to trigger email in case of forgot password 
UserApp.post('/forgotPassword',forgotPassword)

//For a user to reset the password 
UserApp.post('/resetPassword',resetPassword)

module.exports=UserApp;