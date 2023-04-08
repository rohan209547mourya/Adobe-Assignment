const mongoose = require('mongoose')


const MONGO_URI = process.env.MONGO_URI || "mongodb://0.0.0.0:27017/social_media_db"
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