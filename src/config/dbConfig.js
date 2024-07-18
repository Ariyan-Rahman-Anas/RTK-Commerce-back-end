const mongoose = require("mongoose")

function dbConfig() {
    mongoose.connect(`${process.env.DB_URI}`)
    .then(() => console.log("MongoDb is Connected!"))
    .catch((error)=>console.log("MongoDb Connecting error is: ", error))
}
module.exports = dbConfig;