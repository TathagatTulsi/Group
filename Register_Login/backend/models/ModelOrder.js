const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const Users = require('./UserModel');
const product = require('./ModelProduct')
const cart = require('./ModelCart')

const order = sequelize.define("orderModel",{

      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          module: Users,
          key:"id"
        }
    },
      productId: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
          module: product,
          key:"id"
        }
      },
      productCount: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
      totalPrice: {
        type: DataTypes.INTEGER,
        required: true,
      }

})

Users.hasMany(order , {foreignKey:'ownerId'})
order.belongsTo(Users , {foreignKey:'ownerId'})

product.hasMany(order ,{foreignKey:"productId"})
order.belongsTo(product , {foreignKey:"productId"})

module.exports = order