import { Router } from "express";
import User from "../Models/userSchema.js";
import Teacher from "../Models/teacherSchema.js";
import authenticate from "../Middleware/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userrouter = Router();

userrouter.post("/signupuser", async (req, res) => {
  try {
    const { name, email, password, course, role } = req.body;

    const hashpswd = await bcrypt.hash(password, 10);

    const lastUser = await User.findOne().sort({ dbUserId: -1 });
    console.log("1", lastUser);

    let nextUserId;
    if (lastUser) {
      const numericPart = parseInt(lastUser.dbUserId.replace(/\D/g, ""), 10);
      nextUserId = `stud${String(numericPart + 1).padStart(4, "0")}`;
    } else {
      nextUserId = "stud0001";
    }
    console.log("2", nextUserId);

    const existingUser = await User.findOne({ dbEmail: email });
    if (existingUser) {
      res.status(409).json("User details already present");
      console.log("User record present");
      return;
    }

    const newUser = new User({
      dbUserId: nextUserId,
      dbName: name,
      dbEmail: email,
      dbPassword: hashpswd,
      dbCourse: course,
      dbRole: role,
    });

    await newUser.save();
    res.status(201).json("New User record created");
    console.log("User record added");
  } catch (error) {
    res.status(500).json({ error: "Unable to perform signup operation" });
    console.error("Signup error:", error.message);
  }
});

userrouter.post("/loginuser", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ dbEmail: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const secretkey = process.env.SECRET_KEY;
    const isPasswordValid = await bcrypt.compare(password, user.dbPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.dbEmail, role: user.dbRole },
      secretkey,
      { expiresIn: "1h" }
    );
    res.cookie("StudntToken", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Unable to perform login operation" });
    console.log("Login Error: ",error.message)
  }
});

userrouter.get("/fetchUser", authenticate, async (req, res) => {
  try {
    const loginId = req.email;
    const existingUser = await User.findOne({ dbEmail: loginId });
    if (!existingUser) {
      res.status(404).json({ message: "No Users present in DB" });
      console.log("User record not found");
    } else {
      res.status(200).json({ existingUser });
      console.log("User details are displayed");
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to perform fetch operation" });
    console.log("Fetch Error: ",error.message)
  }
});

userrouter.patch("/updateStudent", authenticate, async (req, res) => {
  try {
    const loginId = req.role;
    if (loginId == "admin") {
      const { studentName, teacherName } = req.body;
      const TeacherExist = await Teacher.findOne({ dbName: teacherName });
      if (TeacherExist) {
        const updatedStudent = await User.findOneAndUpdate(
          { dbName: studentName },
          { dbTeacher: TeacherExist._id },
          { new: true }
        );
        if (!updatedStudent) {
          return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Teacher updated successfully", updatedStudent });
      }
      else{
        return res.status(404).json({ message: "Teacher not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Unabel to perform Update operation" });
    console.log("Update Error: ",error.message)
  }
});

export default userrouter;
