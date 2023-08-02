const express = require('express')
const {cart, getCart, deleteCart, updateCart } = require("../controllers/ControllerCart")
const router = express.Router();

router.post('/carts', cart);
router.get('/getCarts/:ownerId', getCart);
router.delete("/deleteCart", deleteCart)
router.post("/updateCart", updateCart)

module.exports=router;