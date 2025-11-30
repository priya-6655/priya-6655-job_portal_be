const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const companyReg = require('../model/companyReg.model')

const MainJobPost = sequelize.define('mainjobpost', {
    JobId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    jobtitle: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    openingcount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    jobCity: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    candidateExp: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    minsalary: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    maxsalary: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    bonus: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    skill: {
        type: DataTypes.STRING,
        allowNull: true
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: companyReg,
            key: 'id'
        }
    },
    contactpersonName: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    employeeJoin: {
        type: DataTypes.STRING(25),
        allowNull: true
    }
}, {
    tableName: 'mainjobpost',
    timestamps: false
})


module.exports = MainJobPost