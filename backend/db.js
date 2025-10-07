const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Create tables if they don't exist
const createTables = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS jobs (
      id SERIAL PRIMARY KEY,
      job_title VARCHAR(255) NOT NULL,
      company_name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      job_type VARCHAR(50) NOT NULL CHECK (job_type IN ('FullTime', 'PartTime', 'Contract', 'Internship')),
      salary_min INTEGER,
      salary_max INTEGER,
      job_description TEXT NOT NULL,
      requirements TEXT,
      responsibilities TEXT,
      application_deadline DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("Database tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

createTables();

module.exports = pool;
