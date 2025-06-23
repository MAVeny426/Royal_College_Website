import { connection } from "../main.js";

const createAssignmentTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS assignment (
      assignment_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      file_url TEXT NOT NULL,
      submission_date DATE NOT NULL,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await connection.query(query);
    console.log("Assignment table created successfully.");
  } catch (err) {
    console.error("Error creating Assignment table:", err.message);
  }
};

export default createAssignmentTable;
