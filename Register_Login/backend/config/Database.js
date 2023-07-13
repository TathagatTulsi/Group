import { Sequelize } from "sequelize";
 
const db = new Sequelize('auth_db', 'root', 'smart@2099', {
    host: "localhost",
    dialect: "mysql"
});


db.authenticate().then(async () => {
    console.log("Connection has been established successfully.");
    await db.sync();

}).catch((e) => {

    console.log(e);

})

export default db;