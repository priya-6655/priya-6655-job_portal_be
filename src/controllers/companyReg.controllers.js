const companyReg = require('../model/companyReg.model')

const register = async (req, res) => {
    try {
        const { companyName, password, email, phone } = req.body
        if (!companyName || !password || !email || !phone) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const emailExist = await companyReg.findOne({ where: { email } })
        if (emailExist) {
            return res.status(400).json({
                message: "Email already registered"
            })
        }

        const phoneExist = await companyReg.findOne({ where: { phone } })
        if (phoneExist) {
            return res.status(400).json({
                message: "Phone number already registered"
            })
        }

        const newCompany = await companyReg.create({
            companyName,
            password,
            email,
            phone
        })

        res.status(201).json({
            success: true,
            message: "Registration Successful",
            data: newCompany
        })

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Email & Password required' })
        }

        const company = await companyReg.findOne({ where: { email } })
        if (!company) {
            return res.status(404).json({ message: "Email not registered" });
        }

        if (company.password !== password) {
            return res.status(401).json({ message: "Incorrect Password" })
        }

        res.status(200).json({
            message: "Login Successful",
            data: company
        })
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}


const getCompany = async (req, res) => {
    const { email } = req.params

    const company = await companyReg.findOne({ where: { email } })

    res.json({
        success: true,
        data: company
    })
}

module.exports = { register, getCompany, login }