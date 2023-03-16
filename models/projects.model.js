const sequelize=require('../db/db.config');
const {DataTypes}=require("sequelize");
const { User } = require('./user.model');
exports.Projects=sequelize.define('projects',{
    project_id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    gdoemail:{
        type:DataTypes.STRING,
        references:{
            model:User,
            key: "user_email"
        }
    },
    project_manager_email:{
        type:DataTypes.STRING,
        references:{
            model:User,
            key: "user_email"
        }
    },
    project_name:{
        type:DataTypes.STRING
    },
    project_client:{
        type:DataTypes.STRING
    },
    client_account:{
        type:DataTypes.INTEGER
    },
    client_account_manager:{
        type:DataTypes.STRING
    },
    status_of_project:{
        type:DataTypes.STRING
    },
    project_start_date:{
        type:DataTypes.DATE
    },
    project_end_date:{
        type:DataTypes.DATE
    },
    project_fitness:{
        type:DataTypes.STRING
    },
    domain_of_project:{
        type:DataTypes.STRING
    },
    type_of_project:{
        type:DataTypes.STRING
    }
},{
    createdAt:false,
    updatedAt:false,
    timestamps:false,
    freezeTableName:true
});