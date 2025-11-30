const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const CompanyReg = require('./companyReg.model')

const CreatJob = sequelize.define('creatjob', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    employeeCount: {
        type: DataTypes.STRING,
        allowNull: true
    },
    employeeHire: {
        type: DataTypes.STRING,
        allowNull: true
    },
    employeeJoin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CompanyReg,
            key: 'id'
        }
    }
}, {
    tableName: 'createjob',
    timestamps: false
})

CompanyReg.hasMany(CreatJob, { foreignKey: 'companyId' })
CreatJob.belongsTo(CompanyReg, { foreignKey: 'companyId' })

module.exports = CreatJob