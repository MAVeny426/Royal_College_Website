import { Router } from "express";
import Attendance from "../Models/attendanceSchema.js";
import Student from "../Models/userSchema.js";
import authenticate from "../Middleware/auth.js";

const attendanceRouter = Router();

attendanceRouter.post("/submitattendance", authenticate, async (req, res) => {
  try {
    const loginId = req.email;
    if (!loginId) {
      res.status(404).json({ message: "Please login to the application" });
      console.log("Login Required");
    } 
    else {
      const { stuentId, name, course, attendance } = req.body;
      const currentDate = new Date();
      const date = currentDate.toISOString().split("T")[0];
      const time = currentDate.toLocaleTimeString();

      const existingAttendance = await Attendance.findOne({ course, date });
      if (existingAttendance) {
        return res
          .status(409)
          .json({
            error: "Attendance for this course and date already exists",
          });
      } else {
        const newAttendance = new Attendance({
          dbStudentId: stuentId,
          dbName: name,
          dbcourse: course,
          dbdate: date,
          dbtime: time,
          dbattendance: attendance,
        });

        await newAttendance.save();
        res.status(201).json({ message: "Attendance submitted successfully" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to submit attendance" });
  }
});

attendanceRouter.get("/students", authenticate, async (req, res) => {
  try {
    const loginId = req.userId;
    // if(loginId == "")
    const { course } = req.params;
    const students = await Student.find({ dbCourse: course }).select(
      "dbStudentId dbName"
    );

    if (!students.length) {
      return res
        .status(404)
        .json({ error: "No students found for this course" });
    }

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch students" });
  }
});

export default attendanceRouter;
