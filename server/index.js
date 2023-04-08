const express = require('express');
const app = express();
const connectDB = require('./config/connectDB');



/**
 * @description Middleware functions calls
 */
app.use(express.json());





/**
 * @description Server configurations
 * MongoDb Connection and Server PORT
 */
connectDB();
const PORT = process.env.PORT || 8080
app.listen(
    PORT,
    () => {
        console.log(`Server is running on port ${PORT}.`);
    }
)