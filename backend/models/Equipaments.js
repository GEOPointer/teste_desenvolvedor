const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Equipaments = sequelize.define('Equipaments', {
    tag: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    latitude: {
        type: DataTypes.STRING
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING
    }
});

module.exports = Equipaments;
