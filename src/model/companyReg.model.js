const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const CompanyReg = sequelize.define('companyreg', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    companyName: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    isSubscribed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    subscriptionPlan: {
        type: DataTypes.STRING,
        allowNull: true
    },
    subscriptionAmount: {
        type: DataTypes.STRING,
        allowNull: true
    },
    subscribedOn: {
        type: DataTypes.DATE,
        allowNull: true
    },
    subscriptionExpiry: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'companyreg',
    timestamps: false
})

module.exports = CompanyReg