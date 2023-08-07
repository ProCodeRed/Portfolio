const mongoose = require('mongoose');

// configure DB
const db =  process.env.DATABASE;

mongoose.connect(db).then(() => {
    console.log("DB connection successful")
}).catch((err) => console.log(err));