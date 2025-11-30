const express = require('express')
const { payment, paymentSuccess } = require('../controllers/hiringpay.controller')

const router = express.Router()

router.post('/payment', payment)

router.post('/paymentSuccess', paymentSuccess)

module.exports = router