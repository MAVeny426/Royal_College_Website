import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userrouter from './Router/userrouter.js'

dotenv.config()
const collegeapp = express();

collegeapp.use(express.json());
collegeapp.use('/', userrouter);
collegeapp.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

const port = process.env.PORT;

collegeapp.listen(port, () => {

    console.log(`Server is listening to port ${port}`);
})

const url = process.env.MONGO_URL;

// mongoose.Promise = global.Promise; 

mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to DB',err.message);
    })
