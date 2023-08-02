

const Sequelize = require("sequelize");
const db = require("../config/Database")
const { DataTypes } = Sequelize;
 
const Users = db.define('users',{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [5, 15] }
        
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [3, 15] }
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    freezeTableName:true
});

 

module.exports = Users;