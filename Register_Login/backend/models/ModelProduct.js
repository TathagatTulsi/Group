const { Sequelize} = require('sequelize');
const sequelize = require("../config/Database");
const Users = require('./UserModel');
 
const { DataTypes } = Sequelize;

const product = sequelize.define('productModel', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mfg: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  category:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: "id",
    },
    required: true,
  },
  
});

Users.hasMany(product, {
  foreignKey: "ownerId",
});

product.belongsTo(Users, {
  foreignKey: "ownerId",
});

module.exports = product;