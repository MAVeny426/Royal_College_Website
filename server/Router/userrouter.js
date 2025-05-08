import { Router } from "express";
import Student from "../Models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userrouter = Router();

userrouter.post("/signupuser", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    const hashpswd = await bcrypt.hash(password, 10);

    const lastStudent = await Student.findOne().sort({ dbStudentId: -1 });
    console.log("1", lastStudent);

    let nextStudId;
    if (lastStudent) {
     
      const numericPart = parseInt(lastStudent.dbStudentId.replace(/\D/g, ""), 10); 
      nextStudId = `stud${String(numericPart + 1).padStart(4, "0")}`; 
    } else {
      nextStudId = "stud0001"; 
    }
    console.log("2", nextStudId);

    const existingStudent = await Student.findOne({ dbEmail: email });
    if (existingStudent) {
      res.status(409).json("Student details already present");
      console.log("Student record present");
      return;
    }

    const newstudent = new Student({
      dbStudentId: nextStudId,
      dbName: name,
      dbEmail: email,
      dbPassword: hashpswd,
      dbCourse: course,
    });

    await newstudent.save();
    res.status(201).json("New Student record created");
    console.log("Student record added");
  } catch (error) {
    res.status(500).json({ error: "Unable to perform signup operation" });
    console.error("Error:", error.message);
  }
});

userrouter.post("/loginuser", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Student.findOne({ dbEmail: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const secretkey = process.env.SECRET_KEY;
    const isPasswordValid = await bcrypt.compare(password, user.dbPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.dbEmail }, secretkey, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Unable to perform login operation" });
  }
});

export default userrouter;
