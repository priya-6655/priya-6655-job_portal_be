const { json } = require('body-parser')
const newUserReg = require('../model/userReg.model')

const newJobSeeker = async (req, res) => {
    try {
        const { fname, lname, mobile, usrname, pass, gender } = req.body

        if (!fname || !lname || !mobile || !usrname || !pass || !gender) {
            res.status(400).json({
                message: 'All fields are required'
            })
        }

        const phoneExist = await newUserReg.findOne({ where: { mobile } })

        if (phoneExist) {
            return res.status(400).json({
                message: "Phone number already registered"
            })
        }

        const newUser = await newUserReg.create({
            fname,
            lname,
            mobile,
            usrname,
            pass,
            gender
        })

        res.status(201).json({
            message: 'Register Successfully',
            user: newUser
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

const userLogin = async (req, res) => {
    try {
        const { usrname, pass } = req.body

        if (!usrname || !pass) {
            return res.status(400).json({ message: 'userName & password are required' });
        }

        const existUser = await newUserReg.findOne({ where: { usrname } })

        if (!existUser) {
            return res.status(401).json({ message: 'User not register' })
        }

        if (existUser.pass !== pass) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        return res.status(200).json({
            message: 'Login successful',
            user: existUser
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await newUserReg.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { fname, lname, mobile, usrname, pass, gender } = req.body;

        const user = await newUserReg.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update({ fname, lname, mobile, usrname, pass, gender });
        res.status(200).json({ message: 'Profile updated successfully', updatedUser: user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = { newJobSeeker, userLogin, getUserById, updateUserProfile }