const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const userReg = require('../model/userReg.model')
const companyReg = require('../model/companyReg.model')
const MainJobPost = require('../model/mainJobPost.model')

const jobApply = sequelize.define('jobapply', {
    applyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userReg,
            key: 'id'
        }
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: companyReg,
            key: 'id'
        }
    },
    jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MainJobPost,
            key: 'JobId'
        }
    },
    fname: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    lname: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gender: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    exp: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    skill: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resume: {
        type: DataTypes.STRING, // you can store filename/path
        allowNull: true
    },
    cLetter: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'jobapply',
    timestamps: false
})



module.exports = jobApply