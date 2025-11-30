const companyReg = require('../model/companyReg.model')
const jobApply = require('./applyForm.model')
const userReg = require('./userReg.model')
const mainjobPost = require('./mainJobPost.model')
const applyForm = require('./applyForm.model')


companyReg.hasMany(mainjobPost, { foreignKey: 'companyId' })
mainjobPost.belongsTo(companyReg, { foreignKey: 'companyId' })

//user--->job apply
userReg.hasMany(jobApply, { foreignKey: 'userId' })
jobApply.belongsTo(userReg, { foreignKey: 'userId' })

//company-->job apply
companyReg.hasMany(jobApply, { foreignKey: 'companyId' })
jobApply.belongsTo(companyReg, { foreignKey: 'companyId' })

//mainjobpost--->job apply
mainjobPost.hasMany(jobApply, { foreignKey: 'jobId' })
jobApply.belongsTo(mainjobPost, { foreignKey: 'jobId' })



module.exports = { mainjobPost, companyReg, userReg, jobApply, applyForm }