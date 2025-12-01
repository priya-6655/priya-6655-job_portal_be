require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./src/config/db')
const app = express()
const port = process.env.PORT || 3000
const association = require('./src/model/association.model')

console.log("association", association)

const hireRoutes = require('./src/routes/hiringpay.routes')
const newComReg = require('./src/routes/companyReg.routes')
const jobcreate = require('./src/routes/createJob.routes')
const mainJobcreate = require('./src/routes/mainJobPost.routes')
const userRoute = require('./src/routes/userReg.routes')
const applyRouter = require('./src/routes/applyForm.routes')

app.use(cors())
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }));

app.use('/api', hireRoutes)
app.use('/newCompany', newComReg)
app.use('/createJob', jobcreate)
app.use('/mainJob', mainJobcreate)


app.use('/jobseeker', userRoute)
app.use('/applyJob', applyRouter)



app.get('/', (req, res) => {
    res.send('Welcome to Job Portal')
})

sequelize.sync().then(() => {
    console.log('DB Synced')
}).catch((err) => {
    console.error('DB connection error:', err)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

module.exports = app