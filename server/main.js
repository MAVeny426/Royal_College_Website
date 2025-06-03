import { Client } from 'pg';
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import adminRoutes from './Routes/adminroute.js'
import authrouter from './Routes/userAuth.js'
import teachrouter from './Routes/teacherroute.js';

const collegeapp = express();
dotenv.config();

collegeapp.use(express.json());
collegeapp.use(cookieParser());

collegeapp.use('/api/admin', adminRoutes);
collegeapp.use('/api/auth', authrouter);
collegeapp.use('/api/teach', teachrouter);

const connection = new Client({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
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