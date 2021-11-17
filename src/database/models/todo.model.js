const Sequelize = require("sequelize");
const { sequelize } = require("../index.js");

class ToDo extends Sequelize.Model {}

ToDo.init({
    id: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    title: {
        type: Sequelize.STRING,
        defaultValue: "Title",
    },
    description: {
        type: Sequelize.STRING,
        defaultValue: "Description",
    },
    isDone: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    isFavourite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    priority: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
}, {
    sequelize: sequelize,
    underscored: true,
    modelName: "todo",
    timestamps: false,
    freezeTableName: true
});

module.exports = ToDo;