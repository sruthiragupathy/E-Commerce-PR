require("dotenv").config()
const mongoose = require("mongoose")

const connectMongoDb = async () => {
    try {
    await mongoose.connect( process.env.DATABASE, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    console.log("DB Connected");
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = connectMongoDb;