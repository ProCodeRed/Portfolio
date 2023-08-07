const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello Word")
})

app.get('/aboutme', (req, res) => {
    res.send("This is about me page")
})

app.get('/contact', (req, res) => {
    res.send("This is contact page")
})

app.get('/login', (req, res) => {
    res.send("This is login page")
})

app.get('/register', (req, res) => {
    res.send("This is register page")
})

app.listen(5000, () => {
    console.log("server is started at post 3000")
})

