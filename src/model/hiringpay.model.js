const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const hiringpay = sequelize.define('hiringpay', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fullname: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(70),
        allowNull: false,
        unique: true
    },
    company: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    plan: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    paymentId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cardnumber: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    cvv2: {
        type: DataTypes.STRING(10),
        allowNull: true
    }
}, {
    tableName: 'hiringpay',
    timestamps: false
});

module.exports = hiringpay;