import express from "express";
import { connection } from "../main.js";
import multer from "multer";
// import path from "path";
import fs from "fs";

const studentrouter = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./uploads";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// POST /api/assignment/addAssignment
studentrouter.post("/addAssignment", upload.single("file"), async (req, res) => {
  try {
    const { title, submission_date } = req.body;
    const file_url = req.file ? `/uploads/${req.file.filename}` : null;
    console.log(file_url);
    

    if (!title || !file_url || !submission_date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const query = `
      INSERT INTO assignment (title, file_url, submission_date)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const result = await connection.query(query, [title, file_url, submission_date]);
    res.status(201).json({ message: "Assignment created successfully", assignment: result.rows[0] });
  } catch (error) {
    console.error("Error inserting assignment:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/assignment/getAssignment
studentrouter.get("/getAssignment", async (req, res) => {
  try {
    const result = await connection.query(
      "SELECT * FROM assignment ORDER BY created_at DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching assignments:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default studentrouter;
