const express = require('express')
const { postJob } = require('../controllers/createJob.controller')

const router = express.Router()

router.post('/jobPosting', postJob)

module.exports = router