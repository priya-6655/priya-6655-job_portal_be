const createjob = require('../model/createJob.model')
const companyReg = require('../model/companyReg.model')

const postJob = async (req, res) => {
    try {
        const { companyId, employeeCount, employeeHire, employeeJoin } = req.body

        const company = await companyReg.findByPk(companyId)

        if (!company) {
            return res.status(404).json({ message: "Company not found" })
        }

        const job = await createjob.create({
            companyId,
            employeeCount,
            employeeHire,
            employeeJoin
        })

        return res.status(201).json({
            message: "success..! Go to main job creation page",
            job
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }
}

module.exports = { postJob }