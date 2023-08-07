const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

// calling DB
require('./db/connection')

// configure port
const PORT = process.env.PORT

// middlewares
const middleware = (req, res, next) => {
    next();
}

app.get('/', (req, res) => {
    res.send("Hello Word")
})

app.get('/aboutme', middleware, (req, res) => {
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

app.listen(PORT, () => {
    console.log(`server is started at ${PORT}`)
})

