import { connection } from "../main.js";

const createLeaveTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS leave_application (
      leave_id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL,
      email VARCHAR NOT NULL,
      student_id VARCHAR NOT NULL,
      reason VARCHAR NOT NULL,
      description TEXT,
      leave_date DATE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  try {
    await connection.query(query);
    console.log('Leave Application table created successfully.');
  } catch (err) {
    console.error('Error creating Leave Application table:', err.message);
  }
};

export default createLeaveTable;
