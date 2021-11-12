const Sequelize = require('sequelize');
const { sequelize } = require('../database');

class ToDo extends Sequelize.Model {}

ToDo.init({
    title: {
        type: Sequelize.STRING,
        defaultValue: 'Title',
    },
    description: {
        type: Sequelize.STRING,
        defaultValue: 'Description',
    },
}, { sequelize: sequelize, underscored: true, modelName: 'todo' });

module.exports = ToDo;