import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    dbStudentId: {type:String, required:true, unique:true, default: '1101'},
    dbName: {type: String, required: true},
    dbEmail: {type: String, required: true},
    dbPassword: {type: String, required: true},
    dbCourse: {type: String, required: true}
})

const Student = mongoose.model('StudentDB', userSchema);

export default Student