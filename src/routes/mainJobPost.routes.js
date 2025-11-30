const express = require('express')
const { mainjobposting, searchedSkills, getcityList, getAllJobs } = require('../controllers/mainJobPost.controller')

const router = express.Router()

router.post('/mainjobcreate', mainjobposting)
router.get('/search-skill', searchedSkills)
router.get('/job-cities', getcityList)
router.get('/joblist', getAllJobs)

module.exports = router