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

app.listen(PORT, () => {
    console.log(`server is started at ${PORT}`)
})

