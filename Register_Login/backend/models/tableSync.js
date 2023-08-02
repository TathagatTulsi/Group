const Users = require("./UserModel")
const product = require("./ModelProduct")
const cart = require("./ModelCart");
const order = require("./ModelOrder");
// const Order = require("./ModelOrder")

(async() => {
    await Users.sync();
    await product.sync();
    await cart.sync();
    await order.sync()
})()