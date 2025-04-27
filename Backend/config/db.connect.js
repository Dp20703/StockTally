const mongoose = require("mongoose");
const URL = process.env.MONGODB_URL;


function connectDB() {
    mongoose.connect(URL).then(() => {
        console.log("Connect to Db ✅")
    }).catch((error) => {
        console.log("Failed to connect with db", error)
    })
}

module.exports = connectDB;
