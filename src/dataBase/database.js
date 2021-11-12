const path = require('path');
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('ToDo', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
});

const initDB = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Sequelize was initialized');
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = {
    sequelize,
    initDB
};