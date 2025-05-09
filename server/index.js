import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import studentrouter from './Router/studentroute.js'
import attendanceRouter from './Router/attendanceroute.js'
import cookieParser from 'cookie-parser';

dotenv.config()
const collegeapp = express();

collegeapp.use(express.json());
collegeapp.use(cookieParser());
collegeapp.use('/', studentrouter);
collegeapp.use('/', attendanceRouter) 
collegeapp.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

const port = process.env.PORT;

collegeapp.listen(port, () => {

    console.log(`Server is listening to port ${port}`);
})

const url = process.env.MONGO_URL;

mongoose
  .connect(url, { serverSelectionTimeoutMS: 5000 }) 
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err.message);
    process.exit(1);
  });
