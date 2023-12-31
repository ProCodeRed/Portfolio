const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('../db/connection');
const User = require('../model/UserSchema');

// root route
router.get('/', (req, res) => {
    res.send("Hello Word")
})

// to get registeration data
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "some Data are missing" })
    }

    try {
        const userexist = await User.findOne({ email: email });

        if (userexist) {
            return res.status(422).json({ error: "This email already has been registered" })
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Oops! password mismached" })
        } else {

            const users = new User({ name, email, phone, work, password, cpassword });
            const userData = await users.save();

            // console.log(userData)

            if (userData) {
                res.status(201).json({ message: "user registered successfully" })
            }
        }

    } catch (error) {
        console.log(error)
    }
});


// user login
router.get('/login', async (req, res) => {
    // console.log(req.body)

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please enter valid email and password !" })
        }

        const loggedinUser = await User.findOne({ email: email });

        if (loggedinUser) {
            const matchPassd = await bcrypt.compare(password, loggedinUser.password);
            let token = await loggedinUser.generateAuthToken();
            // console.log(token)
            // console.log(loggedinUser)

            // storing token in cookies
            res.cookie("portfolioToken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
            })

            if (!matchPassd) {
                res.status(400).json({ error: "Invalid Credentials" })
            } else {
                res.status(200).json({ message: "Logged in !" })
            }
        } else {
            res.status(400).json({ error: "Invalid User" })
        }


    } catch (error) {
        console.log(error)
    }


})

module.exports = router;
