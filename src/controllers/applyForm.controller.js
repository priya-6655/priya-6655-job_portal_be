const jobapply = require('../model/applyForm.model')
const userReg = require('../model/userReg.model')
const companyReg = require('../model/companyReg.model')
const mainjobPost = require('../model/mainJobPost.model')

const saveuserApplyData = async (req, res) => {
    try {
        const { fname, lname, dob, email, phone, gender, city, exp, skill, cLetter, userId, companyId, jobId } = req.body
        const resume = req.file?.path || req.file?.secure_url || null;
        const jobSeeker = await userReg.findByPk(Number(userId))
        const company = await companyReg.findByPk(companyId)
        const job = await mainjobPost.findByPk(jobId)

        console.log("Uploaded resume response:", req.file);

        if (!company) {
            return res.status(404).json({ message: "Company not found" })
        }

        if (!jobSeeker) {
            return res.status(404).json({ message: 'User not found' })
        }

        if (!job) {
            return res.status(404).json({ message: 'Job not found' })
        }

        const duplicate = await jobapply.findOne({ where: { userId, jobId } })

        if (duplicate) {
            return res.status(400).json({ message: "You have already applied for this job" })
        }

        const newApplication = await jobapply.create({
            userId,
            companyId,
            fname,
            lname,
            dob,
            email,
            phone,
            gender,
            city,
            exp,
            skill,
            resume,
            cLetter,
            jobId
        })

        res.status(201).json({ message: 'Application submitted successfully', data: newApplication });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getapplyJobDetails = async (req, res) => {
    try {
        const { userId } = req.params

        const application = await jobapply.findAll({
            where: { userId },
            include: [
                {
                    model: companyReg,
                    attributes: ['id', 'companyName']
                },
                {
                    model: mainjobPost,
                    attributes: ['JobId', 'jobtitle', 'jobCity']
                }
            ]
        })

        if (application.length === 0) {
            return res.status(200).json({ message: "No applications found", applications: [] });
        }
        const result = application.map(app => ({
            applyId: app.applyId,
            resume: app.resume,
            jobTitle: app?.mainjobpost?.jobtitle || '',
            jobCity: app?.mainjobpost?.jobCity || '',
            companyName: app?.companyreg?.companyName || ''
        }));

        res.status(200).json({ applications: result });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const viewUserApplication = async (req, res) => {
    try {
        const { companyId } = req.params

        const getCompany = await companyReg.findByPk(companyId, {
            include: {
                model: jobapply,
                include: {
                    model: userReg,
                    attributes: ['id', 'fname', 'lname', 'mobile']
                }
            }
        })

        if (!getCompany) {
            return res.status(404).json({ message: "Company not found" });
        }

        const applications = getCompany.jobapplies || [];

        if (applications.length === 0) {
            return res.status(200).json({ message: "No applications found", userApplications: [] });
        }

        const viewUserDetails = applications.map(app => ({
            fname: app.newUser?.fname || '',
            lname: app.newUser?.lname || '',
            applyId: app.applyId,
            phone: app.phone,
            email: app.email,  // email comes from jobapply table, not newUser
            exp: app.exp,
            skill: app.skill,
            resume: app.resume,
        }));

        res.status(200).json({ userApplications: viewUserDetails });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { saveuserApplyData, getapplyJobDetails, viewUserApplication }