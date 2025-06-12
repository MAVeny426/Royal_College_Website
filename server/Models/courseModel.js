import { connection } from "../main.js";

const createCourseTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS course (
      course_id SERIAL PRIMARY KEY,
      course_name VARCHAR(100) NOT NULL,
      course_code VARCHAR(20) UNIQUE NOT NULL,
      department VARCHAR(50) NOT NULL,
      duration_years INT NOT NULL,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  try {
    await connection.query(query);
    console.log('Course table created successfully.');
  } catch (err) {
    console.error('Error creating Course table:', err.message);
  }
};

export default createCourseTable;
