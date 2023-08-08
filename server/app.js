const express = require('express');
const app = express();
const dotenv = require('dotenv');
const user = require("./model/UserSchema");
const auth = require('./routers/auth');
dotenv.config({path: './config.env'});

// calling DB
require('./db/connection')
app.use(express.json());

// configure port
const PORT = process.env.PORT

// middlewares
const middleware = (req, res, next) => {
    next();
}

// routing
app.use(auth)


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

