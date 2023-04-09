const express = require('express');
const app = express();
const connectDB = require('./config/connectDB');
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const cors = require('cors')
const adminRoutes = require('./routes/adminRoutes')



/**
 * @description Middleware functions calls
 */
app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/analytics', adminRoutes);
app.use(errorHandler);





process.on('uncaughtException', (reason, promise) => {
    console.error('An uncaught error occurred:', promise, 'Reason:', reason);
    express.response.status(500).json({
        status: "Internal Server Error",
        code: 500,
        message: "Something went wrong! please try again"
    })
    process.exit(1);
});


process.on('unhandledRejection', (reason, promise) => {
    console.error('An unhandled promise rejection occurred:',  promise, 'Reason:', reason);
    express.response.status(500).json({
        status: "Internal Server Error",
        code: 500,
        message: "Something went wrong! please try again"
    })
    process.exit(1);
});

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message || 'An error occurred while processing your request! please try again'
    });
}
  
  




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