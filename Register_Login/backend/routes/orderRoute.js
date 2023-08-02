const express = require('express')
const {orders, getOrder, cancleOrder} = require("../controllers/ControllerOrder")
const router = express.Router();

router.post('/order', orders);
router.get('/getOrder/', getOrder);
router.delete("/cancleorder", cancleOrder)

module.exports=router;