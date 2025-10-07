const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware - Configure CORS for Vercel deployment
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // In production, set this to your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// GET all jobs with filters
app.get("/api/jobs", async (req, res) => {
  try {
    const { jobTitle, location, jobType, minSalary, maxSalary } = req.query;

    let query = "SELECT * FROM jobs WHERE 1=1";
    const params = [];
    let paramCount = 1;

    if (jobTitle) {
      query += ` AND LOWER(job_title) LIKE LOWER($${paramCount})`;
      params.push(`%${jobTitle}%`);
      paramCount++;
    }

    if (location) {
      query += ` AND LOWER(location) LIKE LOWER($${paramCount})`;
      params.push(`%${location}%`);
      paramCount++;
    }

    if (jobType) {
      query += ` AND job_type = $${paramCount}`;
      params.push(jobType);
      paramCount++;
    }

    if (minSalary) {
      query += ` AND salary_max >= $${paramCount}`;
      params.push(parseInt(minSalary));
      paramCount++;
    }

    if (maxSalary) {
      query += ` AND salary_min <= $${paramCount}`;
      params.push(parseInt(maxSalary));
      paramCount++;
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET single job by ID
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST create new job
app.post("/api/jobs", async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      location,
      jobType,
      salaryMin,
      salaryMax,
      jobDescription,
      requirements,
      responsibilities,
      applicationDeadline,
    } = req.body;

    // Validation
    if (!jobTitle || !companyName || !location || !jobType || !jobDescription) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await pool.query(
      `INSERT INTO jobs 
        (job_title, company_name, location, job_type, salary_min, salary_max, 
         job_description, requirements, responsibilities, application_deadline) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [
        jobTitle,
        companyName,
        location,
        jobType,
        salaryMin,
        salaryMax,
        jobDescription,
        requirements,
        responsibilities,
        applicationDeadline,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT update job
app.put("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      jobTitle,
      companyName,
      location,
      jobType,
      salaryMin,
      salaryMax,
      jobDescription,
      requirements,
      responsibilities,
      applicationDeadline,
    } = req.body;

    const result = await pool.query(
      `UPDATE jobs 
       SET job_title = $1, company_name = $2, location = $3, job_type = $4, 
           salary_min = $5, salary_max = $6, job_description = $7, 
           requirements = $8, responsibilities = $9, application_deadline = $10,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $11 
       RETURNING *`,
      [
        jobTitle,
        companyName,
        location,
        jobType,
        salaryMin,
        salaryMax,
        jobDescription,
        requirements,
        responsibilities,
        applicationDeadline,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE job
app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM jobs WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job deleted successfully", job: result.rows[0] });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
