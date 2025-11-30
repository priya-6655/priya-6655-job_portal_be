const express = require('express')
const { register, getCompany } = require('../controllers/companyReg.controllers')
const { login } = require('../controllers/companyReg.controllers')
const router = express.Router()

router.post('/companyReg', register)
router.post('/companyLogin', login)
router.get('/getcompany/:email', getCompany)

module.exports = router