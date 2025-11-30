const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const jobSeekerReg = sequelize.define('newUser', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fname: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    lname: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    usrname: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    pass: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    gender: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
}, {
    tableName: 'newUser',
    timestamps: false
})

module.exports = jobSeekerReg