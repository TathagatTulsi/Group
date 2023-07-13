// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require("../config/Database");

import { Sequelize} from "sequelize";
import sequelize from "../config/Database.js";
 
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
  }
  
});
module.exports = product;