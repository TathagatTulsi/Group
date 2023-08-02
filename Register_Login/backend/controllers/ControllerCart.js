const cart = require("../models/ModelCart");
const { Op } = require("sequelize")

const Users = require("../models/UserModel")
const products = require("../models/ModelProduct")


exports.cart = async (req, res) => {
    console.log("object", req.body);

    try {
        const { ownerId, ProductId, productCount } = req.body

        const existingProduct = await cart.findOne({
            where: {
                ownerId: ownerId,
                ProductId: ProductId,
            }
        });

        if (existingProduct) {
            await existingProduct.update({
                ProductId: ProductId,
                productCount: productCount });

            return res.json({ success: true, msg: "Cart Updated" })

        } else {
            await cart.create({
                ownerId: ownerId,
                ProductId: ProductId,
                productCount: productCount });

            return res.status(200).json({ success: true, msg: "Item added to cart" })
        }

        // const user = await Users.findByPk(ownerId);
        // const product = await products.findByPk(ProductId);

        // if (!user || !product) {
        //     return res.status(200).json({ message: "user or product not found" });
        // }
        // const Item = await cart.create({ ownerId, ProductId, productCount });

        // return res.status(201).json({ message: "items addded", Item })

    } catch (error) {
        console.log(error.message, "error");
        res.status(500).send("server error");
    }
}


exports.getCart = async (req, res) => {
    const ownerId = req.params.ownerId;
    console.log("id: ", ownerId);
    try {
        const user = await Users.findByPk(ownerId);

        if (!user) {
            return res.status(200).json({ error: 'User not found' });
        }
        const Product = await cart.findAll({
            where: { ownerId: ownerId },
            include: [
                { model: products },
            ],
        })
        //   const products = user.products;
        return res.status(200).json(Product);
    } catch (error) {
        console.error('finding:', error);
        return res.status(500).json({ error: 'server error' });
    }
}


exports.deleteCart = async (req, res) => {
    try {
        // const {ownerId } = req.params;
        // const {ProductId} = req.body

        // const user =await Users.findByPk(ownerId);

        // if(!user ){
        //     return res.status(200).json({message:"user  not found"});
        // }
        // const cartItem = await cart.findOne({
        //     where:{ownerId , ProductId},
        // })
        // if(!cartItem){
        // return res.status(201).json({message:"product not found in the cart"})

        // }

        const productCart = await cart.destroy({ where: { ProductId: req.query.ProductId } });

        if (productCart) {
            return res.status(201).json({ message: "items deleted from the carts" })
        }
        else {
            return res.status(201).json({ message: "cart Product not found" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })

    }
}


exports.updateCart = async (req, res) => {
    const { ProductId, productCount, ownerId } = req.body;

    try {
        const find = await cart.findOne({
            where: {
                [Op.and]: [{ ownerId }, { ProductId }],
            },
        });
        find.productCount = productCount;
        await find.save();
        return res
            .status(200)
            .json({ success: true, msg: "Cart updated" });
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({ msg: error.message });
    }
}