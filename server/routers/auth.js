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
        }else if(password != cpassword){
            return res.status(422).json({ error: "Oops! password mismached" })
        }else{

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

        const loggedinUser = await User.findOne({ email : email})

        // console.log(loggedinUser)

        if(!loggedinUser){
            res.status(400).json({ error: "User not found" })
        }else{
            res.status(200).json({ message: "Logged in !" })
        }

        

    } catch (error) {
        console.log(error)
    }


})

module.exports = router;
