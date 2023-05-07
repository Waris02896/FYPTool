const joi = require('joi');
const { DataTypes } = require('sequelize');

const tasks = {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    task_name: {
        type: DataTypes.STRING
    }
}

module.exports = {
    tasks
}