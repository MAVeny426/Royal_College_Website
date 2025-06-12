import { connection } from '../main.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const adminDetails = {
  name: process.env.ADMIN_NAME || 'Admin User',
  email: process.env.ADMIN_EMAIL || 'admin@royalcollege.com',
  password: process.env.ADMIN_PASSWORD || 'Secure@Admin_2025',
  role: 'admin'
};

async function createAdminUser() {
  try {
    if (!adminDetails.email || !adminDetails.password || !adminDetails.name) {
      throw new Error('Name, email and password are required for admin user');
    }

    const checkQuery = 'SELECT * FROM users WHERE email = $1';
    const existingUser = await connection.query(checkQuery, [adminDetails.email]);

    if (existingUser.rows.length > 0) {
      console.log('Admin user already exists with email:', adminDetails.email);
      return;
    }

    const hashedPassword = await bcrypt.hash(adminDetails.password, 10);

    const insertQuery = `
      INSERT INTO users (name, email, password, course, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING user_id, name, email, role
    `;

    const values = [
      adminDetails.name,
      adminDetails.email,
      hashedPassword,
      null,
      adminDetails.role
    ];

    const result = await connection.query(insertQuery, values);
    console.log('Admin user created successfully:');
    console.log('User ID:', result.rows[0].user_id);
    console.log('Name:', result.rows[0].name);
    console.log('Email:', result.rows[0].email);
    console.log('Role:', result.rows[0].role);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {
    await connection.end();
  }
}

// createAdminUser();

export default createAdminUser;
