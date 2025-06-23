import { Client } from 'pg';
import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';

import adminRoutes from './Routes/adminroute.js'
import authrouter from './Routes/userAuth.js'
import teachrouter from './Routes/teacherroute.js';
import assignmentRoute from './Routes/studentRoute.js'

const collegeapp = express();
collegeapp.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:5000', 'http://192.168.253.27:5000'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));


collegeapp.use(express.json());
collegeapp.use(cookieParser());

collegeapp.use('/api/admin', adminRoutes);
collegeapp.use('/api/auth', authrouter);
collegeapp.use('/api/teach', teachrouter);

collegeapp.use("/uploads", express.static("uploads")); 
collegeapp.use("/api/assignment", assignmentRoute);


const connection = new Client({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  port: parseInt(process.env.DBPORT),
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME
})

connection.connect()
  .then(() => {
    console.log("Connected to DB")
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
    process.exit(1);
  });

const PORT = process.env.PORT;
collegeapp.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { connection }