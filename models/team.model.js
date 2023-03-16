const sequelize=require('../db/db.config');
const {DataTypes}=require("sequelize");
exports.ProjectTeam=sequelize.define('Project_Team',{
    resource_name:{
        type:DataTypes.STRING
    },
    role_in_project:{
        type:DataTypes.STRING
    },
    project_start_date:{
        type:DataTypes.DATE
    },
    project_end_date:{
        type:DataTypes.DATE
    },
    project_status:{
        type:DataTypes.STRING
    },
    billing_status:{
        type:DataTypes.STRING
    },
    exposed_to_customer:{
        type:DataTypes.BOOLEAN
    },
    allocation_type:{
        type:DataTypes.STRING
    }
},{
    createdAt:false,
    updatedAt:false,
    timestamps:false,
    freezeTableName:true
});