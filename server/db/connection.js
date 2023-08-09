const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

// configure DB
const db =  process.env.DATABASE;

mongoose.connect(db).then(() => {
    console.log("DB connection successful")
}).catch((err) => console.log(err));