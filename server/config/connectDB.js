const mongoose = require('mongoose')
require('dotenv').config();

const MONGO_URI = "mongodb+srv://rohanmourya671:rohan9899@taskplannerclustor.3mryuzl.mongodb.net/?retryWrites=true&w=majority"
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB