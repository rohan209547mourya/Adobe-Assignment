const express = require('express');
const app = express();
const connectDB = require('./config/connectDB');
const userRoutes = require('./routes/userRoutes')



/**
 * @description Middleware functions calls
 */
app.use(express.json());
app.use('/users', userRoutes);





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