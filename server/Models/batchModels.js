// import { connection } from "../main.js";

// const createBatchTable = async () => {
//   const query = `
//     CREATE TABLE IF NOT EXISTS batch (
//       batch_id SERIAL PRIMARY KEY,
//       batch_name VARCHAR NOT NULL UNIQUE,
//       course_id INT REFERENCES course(course_id),
//       year INT,
//       start_date DATE,
//       end_date DATE
//     )`;

//   try {
//     await connection.query(query);
//     console.log('Batch table created successfully.');
//   } catch (err) {
//     console.error('Error creating Batch table:', err.message);
//   }
// };

// export default createBatchTable;

import { connection } from "../main.js";

const createBatchTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS batch (
      batch_id SERIAL PRIMARY KEY,
      batch_name VARCHAR NOT NULL,
      course_id INT REFERENCES course(course_id),
      year INT,
      start_date DATE,
      end_date DATE,
      UNIQUE (batch_name, course_id)
    )`;

  try {
    await connection.query(query);
    console.log('Batch table created successfully.');
  } catch (err) {
    console.error('Error creating Batch table:', err.message);
  }
};

export default createBatchTable;

