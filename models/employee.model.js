const sequelize=require('../db/db.config');
const {DataTypes}=require("sequelize");
exports.Employee=sequelize.define('employee',{
    employee_email:{
        type:DataTypes.STRING,
        primaryKey:true,
    }
},{
    createdAt:false,
    updatedAt:false,
    timestamps:false,
    freezeTableName:true
});