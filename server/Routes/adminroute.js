import { Router } from "express";
import { connection } from "../main.js";
import { verifyUserToken } from "../Middleware/verifyUserToken.js";

const adminrouter = Router();

adminrouter.post('/addCourse', verifyUserToken, async (req, res) => {
  if (req.loginRole !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  try {
    const { coursename, coursecode, department, durationyears, isActive, batches } = req.body;

    // Check if course already exists
    const courseExistQuery = `
      SELECT * FROM course WHERE course_name = $1 OR course_code = $2
    `;
    const courseExist = await connection.query(courseExistQuery, [coursename, coursecode]);

    if (courseExist.rows.length > 0) {
      // ❌ Course already exists — abort
      return res.status(409).json({
        message: 'Course already exists. You may update instead.',
      });
    }

    // ✅ Insert new course
    const insertCourseQuery = `
      INSERT INTO course (course_name, course_code, department, duration_years, is_active)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING course_id
    `;
    const courseResult = await connection.query(insertCourseQuery, [
      coursename,
      coursecode,
      department,
      durationyears,
      isActive,
    ]);
    const courseId = courseResult.rows[0].course_id;

    // ✅ Insert batches (if any)
    if (batches && batches.length > 0) {
      for (const batch of batches) {
        const insertBatchQuery = `
          INSERT INTO batch (batch_name, course_id, year, start_date, end_date)
          VALUES ($1, $2, $3, $4, $5)
        `;
        await connection.query(insertBatchQuery, [
          batch.batchname,
          courseId,
          batch.startyear,
          batch.startyear ? `${batch.startyear}-01-01` : null,
          batch.endyear ? `${batch.endyear}-12-31` : null,
        ]);
      }
    }

    res.status(201).json({ message: 'Course and batches successfully added' });

  } catch (error) {
    console.error('Error adding course and batches:', error);
    res.status(500).json({ message: 'Error adding course and batches' });
  }
});





// Get all courses (admin only)
adminrouter.get("/getcourse", verifyUserToken, async (req, res) => {
  if (req.loginRole !== "admin") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const result = await connection.query('SELECT * FROM course');
    res.status(200).json({ courses: result.rows });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Error fetching course data" });
  }
});

// Get course IDs and names (no auth)
adminrouter.get("/getcoursenames", async (req, res) => {
  try {
    const result = await connection.query('SELECT course_id, course_name FROM course');
    res.status(200).json({ courses: result.rows });
  } catch (error) {
    console.error("Error fetching course names:", error);
    res.status(500).json({ message: "Error fetching course names" });
  }
});

adminrouter.get("/getBatchesByCourse", async (req, res) => {
  const { courseName } = req.query;

  try {
    // 1. Get course_id from course_name
    const courseResult = await connection.query(
      "SELECT course_id FROM course WHERE course_name = $1",
      [courseName]
    );

    if (courseResult.rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    const courseId = courseResult.rows[0].course_id;

    // 2. Get batches for this course_id
    const batchResult = await connection.query(
      "SELECT batch_id, batch_name, year FROM batch WHERE course_id = $1",
      [courseId]
    );

    res.status(200).json({ batches: batchResult.rows });
  } catch (error) {
    console.error("Error fetching batch details:", error);
    res.status(500).json({ message: "Error fetching batches" });
  }
});

adminrouter.get("/getProfileDetails", async (req, res) => {
  const { name } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM teachers WHERE name = $1",
      [name]
    );
    res.json({ teachers: result.rows });
  } catch (err) {
    console.error("Error fetching teacher details:", err);
    res.status(500).json({ message: "Error fetching teacher details" });
  }
});




// Get teacher names list (admin only)
adminrouter.get("/getTeacherNames", verifyUserToken, async (req, res) => {
  if (req.loginRole !== "admin") {
    console.log("Invalid access");
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const fetchquery = `
      SELECT user_id, name
      FROM "users"
      WHERE role = 'teacher'
    `;

    const result = await connection.query(fetchquery);
    res.status(200).json({ teachers: result.rows });
  } catch (error) {
    console.error("Error fetching teacher names:", error.message);
    res.status(500).json({ message: "Failed to fetch teacher names" });
  }
});

// Delete a teacher by name (admin only)
adminrouter.delete("/deleteTeacher", verifyUserToken, async (req, res) => {
  if (req.loginRole !== "admin") {
    console.log("Unauthorized delete attempt");
    return res.status(403).json({ message: "Unauthorized access" });
  }

  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Teacher name is required" });
  }

  try {
    const checkQuery = `SELECT * FROM "users" WHERE name = $1 AND role = 'teacher'`;
    const userResult = await connection.query(checkQuery, [name]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "No teacher found with the given name" });
    }

    const deleteQuery = `DELETE FROM "users" WHERE name = $1 AND role = 'teacher'`;
    const deleteResult = await connection.query(deleteQuery, [name]);

    if (deleteResult.rowCount > 0) {
      console.log(`Deleted teacher with name: ${name}`);
      res.status(200).json({ message: `Teacher '${name}' deleted successfully` });
    } else {
      res.status(500).json({ message: "Deletion failed unexpectedly" });
    }
  } catch (error) {
    console.error("Error deleting teacher:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all teachers for dropdown (admin only)
adminrouter.get("/allteachers", verifyUserToken, async (req, res) => {
  if (req.loginRole !== "admin") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const fetchquery = `
      SELECT user_id, name
      FROM "users"
      WHERE role = 'teacher'
    `;

    const result = await connection.query(fetchquery);
    res.status(200).json({ teachers: result.rows });
  } catch (error) {
    console.error("Error fetching teacher names:", error.message);
    res.status(500).json({ message: "Failed to fetch teacher names" });
  }
});

// Get teacher details by ID (admin only)
adminrouter.get("/getTeacherDetails/:id", verifyUserToken, async (req, res) => {
  if (req.loginRole !== "admin") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const { id } = req.params;

    const fetchQuery = `SELECT * FROM "users" WHERE user_id = $1 AND role = 'teacher'`;
    const result = await connection.query(fetchQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching teacher details:", error.message);
    res.status(500).json({ message: "Failed to fetch teacher details" });
  }
});

// Update teacher details by ID (admin only)
adminrouter.put("/updateTeacher/:id", verifyUserToken, async (req, res) => {
  if (req.loginRole !== "admin") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const { id } = req.params;
    const { name, email, course, batch, role, year } = req.body;

    const updateQuery = `
      UPDATE "users" 
      SET Name = $1, Email = $2, Course = $3, Batch = $4, Role = $5, Year = $6
      WHERE user_id = $7 AND role = 'teacher'
    `;

    const result = await connection.query(updateQuery, [name, email, course, batch, role, year, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Teacher not found or no changes made" });
    }

    res.status(200).json({ message: "Teacher updated successfully" });
  } catch (error) {
    console.error("Error updating teacher:", error.message);
    res.status(500).json({ message: "Failed to update teacher" });
  }
});

// Update teacher schedule and subjects (admin only)
adminrouter.patch("/updateTeacherSchedule", verifyUserToken, async (req, res) => {
  if (req.loginRole !== "admin") {
    console.log("Invalid access");
    return res.status(403).json({ message: "Unauthorized access" });
  }

  const { name, subjectsTaught, schedule } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Teacher name is required" });
  }

  try {
    const updateQuery = `
      UPDATE "Teachers"
      SET Subjects_Taught = $1, Schedule = $2
      WHERE teacher_name = $3
      RETURNING *;
    `;

    const result = await connection.query(updateQuery, [
      JSON.stringify(subjectsTaught),
      JSON.stringify(schedule),
      name,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher schedule updated successfully" });
  } catch (error) {
    console.error("Error updating teacher schedule:", error.message);
    res.status(500).json({ message: "Failed to update teacher schedule" });
  }
});

//------------------------------------------------------------------------

adminrouter.get("/getTeacherNames", verifyUserToken, async (req, res) => {
  if (req.loginRole !== "admin") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const query = `SELECT user_id, name FROM users WHERE role = 'teacher'`;
    const result = await connection.query(query);
    res.status(200).json({ teachers: result.rows });
  } catch (error) {
    console.error("Error fetching teacher names:", error.message);
    res.status(500).json({ message: "Failed to fetch teacher names" });
  }
});

adminrouter.patch("/updateTeacherSchedule", verifyUserToken, async (req, res) => {
  if (req.loginRole !== "admin") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  const { name, subjectsTaught, schedule } = req.body;

  try {
    const query = `
      UPDATE teachers
      SET subjects_taught = $1,
          schedule = $2
      WHERE teacher_name = $3
    `;
    await connection.query(query, [subjectsTaught, schedule, name]);
    res.status(200).json({ message: "Teacher updated successfully" });
  } catch (err) {
    console.error("Update failed:", err.message);
    res.status(500).json({ message: "Failed to update teacher" });
  }
});



export default adminrouter;
