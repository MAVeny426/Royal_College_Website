import { connection } from "../main.js";

const createStudentTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS student (
      user_id INTEGER PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
      student_code TEXT UNIQUE,
      guardian_name TEXT,
      address TEXT,
      dob DATE,
      gender VARCHAR(10),
      blood_group VARCHAR(5),
      admission_date DATE,
      documents JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  try {
    await connection.query(query);
    console.log('Student table created successfully.');
  } catch (err) {
    console.error('Error creating Student table:', err.message);
  }
};

export default createStudentTable;
