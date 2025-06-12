// import createUserTable from './userModels.js';
// import createCourseTable from './courseModel.js';
// import createBatchTable from './batchModels.js';
// import createTeacherTable from './teacherModels.js';
// import createStudentTable from './studentModels.js';

// const init = async () => {
//   await createUserTable();      // users table first (no FK dependencies)
//   await createCourseTable();
//   await createBatchTable();
//   await createTeacherTable();
//   await createStudentTable();

//   console.log('All tables created ✅');
//   process.exit();
// };

// init();

// Models/initDB.js

import createUserTable from './userModels.js';
import createCourseTable from './courseModel.js';
import createBatchTable from './batchModels.js';
import createTeacherTable from './teacherModels.js';
import createStudentTable from './studentModels.js';
import createAdminUser from '../Middleware/createAdmin.js';

const init = async () => {
  try {
    console.log('\n Creating tables...');
    await createUserTable();       // Must be first
    await createCourseTable();
    await createBatchTable();
    await createTeacherTable();
    await createStudentTable();
    console.log(' All tables created successfully.');

    console.log('\n Creating admin user...');
    await createAdminUser();

    console.log('\n Database initialized successfully!');
  } catch (err) {
    console.error(' Error during DB initialization:', err.message);
  } finally {
    process.exit();  // optional
  }
};

init();

