import { connection } from "../main.js";
import { Router } from "express";
import { verifyUserToken } from "../Middleware/verifyUserToken.js";

const teachrouter = Router();

// teachrouter.post("/addTeacher", verifyUserToken, async (req, res) => {
//   if (req.loginRole === "admin") {
//     try {
//       const generateTeacherId = async () => {
//         const result = await connection.query(`SELECT COUNT(*) FROM "Teachers"`);
//         const count = parseInt(result.rows[0].count) + 1;
//         return `TR${1000 + count}`;
//       };

//       const {
//         user_id,
//         qualification,
//         department,
//         experience_years,
//         subjects_taught,
//         schedule,
//       } = req.body;

//       const teacher_id = await generateTeacherId();

//       const insertQuery = `
//         INSERT INTO "Teachers" 
//           (user_id, teacher_id, qualification, department, experience_years, subjects_taught, schedule)
//         VALUES
//           ($1, $2, $3, $4, $5, $6, $7)
//       `;

//       await connection.query(insertQuery, [
//         user_id,
//         teacher_id,
//         qualification,
//         department,
//         experience_years,
//         JSON.stringify(subjects_taught),
//         JSON.stringify(schedule),
//       ]);

//       res.status(201).json({ message: "Teacher added successfully", teacher_id });
//       console.log("Teacher added");
//     } catch (error) {
//       console.error("Error adding teacher:", error.message);
//       res.status(500).json({ error: "Failed to add teacher" });
//     }
//   } else {
//     res.status(403).json("Unauthorized access");
//     console.log("Invalid access");
//   }
// });

teachrouter.post("/addteacher", verifyUserToken, async (req, res) => {
  if (req.loginRole !== "admin") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const {
      name,
      email,
      course,
      role,
      year,
      batch,
      qualification,
      department,
      experience_years,
      subjects_taught,
      schedule,
    } = req.body;

    const dummyPassword = "Temp@123";

    // Insert into users table
    const userInsertResult = await connection.query(
      `INSERT INTO "users" (Name, Email, Password, Course, Role, Year, Batch)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id`,
      [name, email, dummyPassword, course, role, year, batch]
    );

    const user_id = userInsertResult.rows[0].user_id;

    // If role is teacher, insert into Teachers table
    if (role === "teacher") {
      const result = await connection.query(`SELECT COUNT(*) FROM "Teachers"`);
      const count = parseInt(result.rows[0].count) + 1;
      const teacher_id = `TR${1000 + count}`;

      await connection.query(
        `INSERT INTO "Teachers" 
         (user_id, teacher_id, teacher_name, qualification, department, experience_years, subjects_taught, schedule)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          user_id,
          teacher_id,
          name,
          qualification,
          department,
          experience_years,
          JSON.stringify(subjects_taught || []),
          JSON.stringify(schedule || []),
        ]
      );
      
    }

    res.status(201).json({ message: "User added successfully", user_id });
  } catch (error) {
    console.error("Error adding user and/or teacher:", error.message);
    res.status(500).json({ message: "Error adding user/teacher" });
  }
});


teachrouter.patch("/updateTeacher", verifyUserToken, async (req, res) => {
  
    if (req.loginRole === "teacher") {
    console.log("Req.Role, Req.Id: ", req.loginRole, req.loginId);
    
    try {
      const userIdResult = await connection.query(
        `SELECT user_id FROM "users" WHERE email = $1`,
        [req.loginId]
      );
      const user_id = userIdResult.rows[0]?.user_id;
      console.log("DB Data: ",user_id);
      

      if (!user_id) {
        return res.status(404).json({ error: "User not found" });
      }

      const {
        qualification,
        department,
        experience_years,
        subjects_taught,
        schedule,
      } = req.body;

      const updateQuery = `
        UPDATE "Teachers"
        SET
          qualification = $1,
          department = $2,
          experience_years = $3,
          subjects_taught = $4,
          schedule = $5
        WHERE user_id = $6
      `;

      await connection.query(updateQuery, [
        qualification,
        department,
        experience_years,
        JSON.stringify(subjects_taught),
        JSON.stringify(schedule),
        user_id,
      ]);

      res.status(200).json({ message: "Teacher profile updated successfully" });
    } catch (error) {
      console.error("Update error:", error.message);
      res.status(500).json({ error: "Failed to update teacher data" });
    }
  } else {
    res.status(403).json("Unauthorized access");
    console.log("Invalid access");
  }
});

teachrouter.get("/getTeacherDetails", verifyUserToken, async (req, res) => {
  if (req.loginRole === "teacher") {
    try {
      const userIdResult = await connection.query(
        `SELECT user_id FROM "users" WHERE email = $1`,
        [req.loginId]
      );
      const user_id = userIdResult.rows[0]?.user_id;

      if (!user_id) {
        return res.status(404).json({ error: "User not found" });
      }

      const fetchQuery = `SELECT * FROM "Teachers" WHERE user_id = $1`;
      const result = await connection.query(fetchQuery, [user_id]);

      res.status(200).json({ teachers: result.rows });
    } catch (error) {
      console.error("Error fetching teacher details:", error.message);
      res.status(500).json({ error: "Failed to fetch teacher details" });
    }
  } else {
    res.status(403).json({ message: "Unauthorized access" });
  }
});

// teachrouter.get("/getTeacherNames", verifyUserToken, async (req, res) => {
//   try {
//     const result = await connection.query(`SELECT teacher_id, qualification FROM teachers`);
//     // or fetch name from users joining teachers if needed
//     res.status(200).json({ teachers: result.rows });
//   } catch (error) {
//     console.error("Error fetching teacher names:", error.message);
//     res.status(500).json({ error: "Failed to fetch teacher names" });
//   }
// });

// teachrouter.get("/getProfileDetails", async (req, res) => {
 
//   try {
//     const name = req.query.name;
//     const fetchquery = `SELECT * FROM "Teachers" WHERE teacher_name = $1`;

//     const fetchresult = await connection.query(fetchquery, [name]);

//     res.status(200).json({ teachers: fetchresult.rows });
//   } catch (error) {
//     console.error("Error fetching teacher details:", error.message);
//     res.status(500).json({ error: "Failed to fetch teacher details" });
//   }
// });

//-----------------------------------------------------------

teachrouter.get("/getProfileDetails", verifyUserToken, async (req, res) => {
  const { name } = req.query;

  try {
    const query = `SELECT * FROM "Teachers" WHERE Teacher_name = $1`;
    const result = await connection.query(query, [name]);
    // res.json({ teachers: result.rows });
    res.status(200).json({ teachers: result.rows });

    // console.log(result);
  } catch (error) {
    console.error("Error fetching teacher profile:", error.message);
    res.status(500).json({ message: "Failed to fetch teacher details" });
  }
});



export default teachrouter;
