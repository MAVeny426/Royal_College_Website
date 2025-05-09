import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    dbTeacherId: { type: String, required: true, unique: true },
    dbName: { type: String, required: true },
    dbEmail: { type: String, required: true, unique: true },
    dbPassword: 
    dbDepartment: { type: String, required: true },
    dbRole: {type: String, required: true}
});

const Teacher = mongoose.model("TeacherDB", teacherSchema);

export default Teacher;