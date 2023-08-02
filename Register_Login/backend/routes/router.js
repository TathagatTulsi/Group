const express = require('express')
const {Register, Login, forgot, changepassword} = require("../controllers/Users.js");

 
const router = express.Router();
 
router.post('/register', Register);
router.post('/login', Login);
router.post('/forgot', forgot)
router.post('/changepassword', changepassword)

module.exports=router;
