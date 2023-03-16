const sequelize=require('../db/db.config');
const {DataTypes}=require("sequelize");
exports.User=sequelize.define('users',{
    user_email:{
        type:DataTypes.STRING,
        primaryKey:true,
        /*validate:{
            checkEmail(email){
                let email_domain=email.slice(-18);
                if(email_domain!="@westagilelabs.com"){
                    throw new Error("Not a verified email");
                }
            }
        }*/
    },
    user_password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    user_role:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    createdAt:false,
    updatedAt:false,
    timestamps:false,
    freezeTableName:true
});