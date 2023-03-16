//Create a Server using express
require('dotenv').config();
const app=require('express')()
PORT=process.env.PORT;
app.listen(PORT,()=>console.log(`Server on port ${PORT}`))

//connect to database
const sequelize=require('./db/db.config');
sequelize.authenticate()
.then(()=>console.log("DB connected succesfully"))
.catch(err=>console.log("DB connection error",err))

//Super-Admin Routes import and usage
const AdminApp=require('./routes/superadmin.routes')
app.use('/super-admin',AdminApp)

//User Routes import and usage
const UserApp=require('./routes/user.routes')
app.use('/user',UserApp)

//GDO Routes import and usage
const GdoApp=require('./routes/gdo.routes')
app.use('/gdo',GdoApp)

//Project Manager Routes import and usage
const ProjectManagerApp=require('./routes/projectmanager.routes')
app.use('/projectManager',ProjectManagerApp)

//Admin Route import and usage
const AdmApp=require('./routes/admin.routes')
app.use('/admin',AdmApp)


sequelize.sync();

app.use((err,req,res,next)=>{
    res.send({message:"Error occured",err});
})