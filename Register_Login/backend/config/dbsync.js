const product = require("../models/ModelProduct");


const sync=async()=>{
   await product.sync();
}


module.exports.SyncModels=sync
