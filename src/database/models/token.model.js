const Sequelize = require("sequelize");
const { sequelize } = require("../index.js");
class Token extends Sequelize.Model {}

Token.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        primaryKey: true,
    },
    value: {
        type: Sequelize.STRING,
    },
}, {
    sequelize: sequelize,
    underscored: true,
    modelName: "token",
    timestamps: false,
    freezeTableName: true
});

module.exports = Token;