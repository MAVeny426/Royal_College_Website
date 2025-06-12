import { connection } from "../main.js";

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL,
      email VARCHAR NOT NULL,
      password VARCHAR NOT NULL,
      course VARCHAR,
      role VARCHAR NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      year INTEGER,
      batch TEXT
    )`;

  try {
    await connection.query(query);
    console.log('User table created successfully.');
  } catch (err) {
    console.error('Error creating User table:', err.message);
  }
};

export default createUserTable;
