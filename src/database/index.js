 
const path = require("path");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    database: "toDo",
    username: "postgres",
    password: "1234",
});

//const conStringPri = `postgres://postgres:1234@localhost/postgres`;
//const Client = pg.Client;
//const client = new Client({connectionString: conStringPri});
//client.connect();

//  client.query(`CREATE DATABASE ${dataBaseName}`)
//  .then(() => client.end());

const initDB = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Sequelize was initialized");
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = {
    sequelize,
    initDB,
};