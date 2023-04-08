const express = require('express');
const app = express();
const connectDB = require('./config/connectDB');
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')



/**
 * @description Middleware functions calls
 */
app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);





process.on('uncaughtException', (err) => {
    console.error('An uncaught error occurred:', err);
    process.exit(1);
});

  
process.on('unhandledRejection', (err) => {
    console.error('An unhandled promise rejection occurred:', err);
    process.exit(1);
});
  




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