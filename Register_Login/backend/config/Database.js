const Sequelize = require('sequelize')
 
const db = new Sequelize('loginregister', 'root', 'smart@2099', {
    host: "localhost",
    dialect: "mysql"
});


db.authenticate().then(async () => {
    console.log("Connection has been established successfully.");
}).catch((e) => {

    console.log(e);

})

module.exports = db;