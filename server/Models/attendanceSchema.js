import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  dbName: { type: String, required: true },
  dbcourse: { type: String, required: true },
  dbdate: { type: String, required: true },
  dbtime: { type: String, required: true },
  dbattendance: { type: String, enum: ["present", "absent"], required: true },
});

const Attendance = mongoose.model("AttendanceDB", attendanceSchema);

export default Attendance;
