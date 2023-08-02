const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize
const sequelize = require("../config/Database");

const Users = require('./UserModel');
const product = require('./ModelProduct')

const cart = sequelize.define('cartModel', {
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

Users.hasMany(cart , {foreignKey:'ownerId'})
cart.belongsTo(Users , {foreignKey:'ownerId'})

product.hasMany(cart ,{foreignKey:"ProductId"})
cart.belongsTo(product , {foreignKey:"ProductId"})

module.exports = cart;