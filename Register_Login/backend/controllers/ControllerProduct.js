const product = require("../models/ModelProduct");
const { Op } = require("sequelize")

exports.add = async (req, res) => {
    console.log("object", req.body);
    try {
        const { name, price, mfg, category, userId } = req.body;
        const path = "http://localhost:5000/"
        const Seq = await product.create({ name, price, mfg, category, ownerId: userId })
        res.status(200).json({ Seq })
        console.log(Seq)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}


exports.get = async (req, res) => {
    try {

        const data = await product.findAll({ where: { ownerId: req.query.userId } });
        res.status(200).json({ data: data })
        console.log(data)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}

exports.search = async (req, res) => {
    try {

        const { name } = req.query;
        console.log(req.query)
        const results = await product.findAll({
            where: {

                [Op.and]: [
                    { ownerId: req.query.userId },
                    {
                        name: {
                            [Op.like]: `%${name}%`
                        }
                    }
                ]


            }
        })
        return res.status(200).json({ success: true, products: results })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}

exports.searchcategory = async (req, res) => {
    try {

        const { category } = req.query;
        console.log(req.query)
        const result = await product.findAll({
            where: {
                [Op.and]: [
                    { ownerId: req.query.userId },
                    {
                        category: {
                            [Op.like]: `%${category}%`
                        }
                    }
                ]
            }
        })
        return res.status(200).json({ success: true, products: result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}

exports.deleted = async (req, res) => {
    try {
        const { productId } = req.query;
        const result = await product.destroy({
            where: { id: productId }
        })
        if (result) {
            // await result.destroy();
            return res.status(200).json({ message: 'deleted' })
        }
        return res.status(200).json({ message: "error" })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}

// exports.edit = async (req, res) => {
//     const { productId } = req.params;
//     const { name, price, mfg, category } = req.body;

//     try {
//             const path = "http://localhost:5000/";
//             const update = await product.update(
//                 { name, price, mfg, category },
//                 {
//                     where: { id: productId },
//                 }
//             );
        
//         if (update) {
//             return res.status(200).json({ success: true, msg: "updated" });
//         }
//     } catch (error) {
//         return res.status(404).json({ msg: error });
//     }
// }

