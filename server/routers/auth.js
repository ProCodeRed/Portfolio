const express = require('express');
const router = express.Router();

// root route
router.get('/', (req, res) => {
    res.send("Hello Word")
})

// to get registeration data
router.post('/register', (req, res) => {
    console.log(req.body)
})

module.exports = router;
