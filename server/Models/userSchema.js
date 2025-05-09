import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    dbUserId: {type:String, required:true, unique:true},
    dbName: {type: String, required: true},
    dbEmail: {type: String, required: true},
    dbPassword: {type: String, required: true},
    dbCourse: {type: String, required: true},
    dbRole: {type: String, required: true},
    dbTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "TeacherDB", default: null }
})

const User = mongoose.model('UserDB', userSchema);

export default User