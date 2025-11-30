const mainJobPost = require('../model/mainJobPost.model')
const companyReg = require('../model/companyReg.model')

const mainjobposting = async (req, res) => {
    try {
        const { companyId, jobtitle, openingcount, jobCity, candidateExp, minsalary, maxsalary, bonus, skill, contactpersonName, phone, email, employeeJoin } = req.body

        const company = await companyReg.findByPk(companyId)

        if (!company) {
            return res.status(404).json({ message: "Company not found" })
        }

        const postmainjob = await mainJobPost.create({
            companyId,
            jobtitle,
            openingcount,
            jobCity,
            candidateExp,
            minsalary,
            maxsalary,
            bonus,
            skill: Array.isArray(skill) ? skill.join(',') : skill,
            contactpersonName,
            phone,
            email,
            employeeJoin
        })

        return res.status(201).json({
            message: "Job created successfully",
            postmainjob
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }
}

const searchedSkills = async (req, res) => {
    try {
        const query = req.query.q?.toLowerCase() || ''

        const skills = [
            "HTML", "CSS", "JavaScript", "Bootstrap",
            "React", "React Native", "Node.js",
            "Express", "MongoDB", "SQL", "Git",
            "Redux", "TypeScript", "other"
        ];

        const result = skills.filter(skill =>
            skill.toLowerCase().includes(query)
        )
        res.json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

const cityList = [
    "Ahmedabad",
    "Bangalore",
    "Bhopal",
    "Bhubaneswar",
    "Chennai",
    "Coimbatore",
    "Chandigarh",
    "Delhi",
    "Gurgaon",
    "Hyderabad",
    "Indore",
    "Jaipur",
    "Kolkata",
    "Kochi",
    "Mumbai",
    "Noida",
    "Pune",
    "Trivandrum",
    "Vadodara",
];

const getcityList = async (req, res) => {
    res.status(200).json({ cityList })
}

const getAllJobs = async (req, res) => {
    try {
        const jobs = await mainJobPost.findAll({
            include: [
                {
                    model: companyReg,
                    attributes: ["companyName", "email", "phone"]
                }
            ]
        })

        return res.status(200).json(jobs);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }
}

module.exports = { mainjobposting, searchedSkills, getcityList, getAllJobs }