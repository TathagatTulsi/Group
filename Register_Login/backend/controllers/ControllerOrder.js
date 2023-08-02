const order = require("../models/ModelOrder");

const Users = require("../models/UserModel")
const products = require("../models/ModelProduct")
const cart = require("../models/ModelCart")

exports.orders = async (req, res) => {
    try {
        const { data } = req.body;
        console.log("data from the frontend", data)
        {
            data && data.length > 0 && data.map(async (dataObj) => {

                await order.create({
                    productId: dataObj.ProductId,
                    ownerId: dataObj.ownerId,
                    productCount: dataObj.productCount,
                    totalPrice: dataObj.productCount * dataObj.productModel.price
                })

                await cart.destroy({
                    where: {
                        ownerId: dataObj.ownerId,
                        productId: dataObj.ProductId
                    }
                })

            })
        }

        return res.status(200).json({ success: true, msg: "Your Order Has Been Placed" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}


exports.getOrder = async (req, res) => {
     const {ownerId} =req.query
    try {
        const get = await order.findAll({
            where: {
                ownerId: ownerId
            },
            include: {
                model: products
            }
        })
        return res.status(200).json({ success: true, get:get })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}


exports.cancleOrder = async (req, res) => {
    const {id} = req.query
    console.log("object", id);
    try {
        const destroy = await order.destroy({
            where: {
                id: id
            }
        })
        return res.status(200).json({ success: true, destroy:destroy, msg: "Your Order has been Cancle" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}