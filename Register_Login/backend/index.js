const express = require('express')
const app = express();
const dotenv = require ("dotenv");
const cookieParser =require ("cookie-parser");
const cors = require ("cors");
const  db = require( "./config/Database.js")
require("./models/tableSync.js")
const router = require("./routes/router.js");
const product = require("./routes/routerS");
const cart = require("./routes/cartRouter")
const order = require("./routes/orderRoute")
var bodyParser = require('body-parser');    


dotenv.config();

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use("/", router);
app.use("/", product)
app.use("/", cart)
app.use("/", order)
 
app.listen(5000, ()=> console.log('Server running at port 5000'));
