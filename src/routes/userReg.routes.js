const express = require('express')
const { newJobSeeker, userLogin, getUserById, updateUserProfile } = require('../controllers/userReg.controller')
const router = express.Router()

router.post('/newUser', newJobSeeker)
router.post('/usrLogin', userLogin)
router.get('/:id', getUserById)
router.put('/update/:id', updateUserProfile)

module.exports = router