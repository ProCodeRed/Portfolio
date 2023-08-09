const express = require('express');
const router = express.Router();
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
        }

        const users = new User({ name, email, phone, work, password, cpassword });
        const userData = await users.save();

        // console.log(userData)

        if (userData) {
            res.status(201).json({ message: "user registered successfully" })
        }

    } catch (error) {
        console.log(error)
    }
});

module.exports = router;
