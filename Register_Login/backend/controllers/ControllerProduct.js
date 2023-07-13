const product = require("../models/ModelProduct");
const {Op} = require("sequelize")

exports.add = async (req, res) => {
    try {
        const { name, price, mfg, category } = req.body;
        const Seq = await product.create({ name, price, mfg, category })
        res.json({ Seq })
        console.log(Seq)
    } catch (error) {
        console.log(error)
    }
}


exports.get = async (req, res) => {
    try {

        const data = await product.findAll();
        res.status(200).json({ data: data })
        console.log(data)

    } catch (error) {
        console.log(error)
    }

}

exports.search = async(req,res) =>{
    try {
        
        const {name} = req.query;
        console.log(req.query)
        const results = await product.findAll({
            where:{
                name:{
                    [Op.like]: `%${name}%`
                }
            }
        })
        return res.json({success : true, products : results})
    } catch (error) {
        
    }
}

exports.searchcategory = async(req,res) =>{
    try {
        
        const {category} = req.query;
        console.log(req.query)
        const result = await product.findAll({
            where:{
                category:{
                    [Op.like]: `%${category}%`
                }
            }
        })
        return res.json({success : true, products : result})
    } catch (error) {
        
    }
}

exports.deleted = async(req, res) => {
    try {
        const {id} = req.query
        const result = await product.findAll({
            where : { id }
        })

        await result.destroy();
        return res.status(200).json({ message: 'deleted' })

    } catch (error) {
        
    }
}