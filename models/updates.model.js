const sequelize=require('../db/db.config');
const {DataTypes, DATE}=require("sequelize");
exports.ProjectUpdates=sequelize.define('Project_updates',{
    date:{
        type:DataTypes.DATE,
    },
    project_status_update:{
        type:DataTypes.STRING
    },
    resourcing_status:{
        type:DataTypes.STRING
    },
    quality_status:{
        type:DataTypes.STRING
    },
    waiting_for_client:{
        type:DataTypes.STRING
    }
},{
    createdAt:false,
    updatedAt:false,
    timestamps:false,
    freezeTableName:true
});