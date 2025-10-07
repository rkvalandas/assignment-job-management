const pool = require("./db");

const sampleJobs = [
  {
    job_title: "Full Stack Developer",
    company_name: "Amazon",
    location: "Bangalore",
    job_type: "FullTime",
    salary_min: 800000,
    salary_max: 1200000,
    job_description: `• A user-friendly interface lets you browse stunning photos and videos
• Filter destinations based on interests and travel style, and create personalized`,
    requirements:
      "3+ years of experience in full-stack development\nProficiency in React, Node.js, and PostgreSQL\nStrong problem-solving skills",
    responsibilities:
      "Develop and maintain web applications\nCollaborate with cross-functional teams\nWrite clean, maintainable code",
  },
  {
    job_title: "Node.js Developer",
    company_name: "Tesla",
    location: "Mumbai",
    job_type: "FullTime",
    salary_min: 700000,
    salary_max: 1000000,
    job_description: `• A user-friendly interface lets you browse stunning photos and videos
• Filter destinations based on interests and travel style, and create personalized`,
    requirements:
      "Strong knowledge of Node.js and Express\nExperience with RESTful APIs\nFamiliarity with microservices architecture",
    responsibilities:
      "Build scalable backend services\nOptimize application performance\nMentor junior developers",
  },
  {
    job_title: "UX/UI Designer",
    company_name: "Swiggy",
    location: "Bangalore",
    job_type: "FullTime",
    salary_min: 600000,
    salary_max: 900000,
    job_description: `• A user-friendly interface lets you browse stunning photos and videos
• Filter destinations based on interests and travel style, and create personalized`,
    requirements:
      "Proficiency in Figma and Adobe Creative Suite\n3+ years of UI/UX design experience\nStrong portfolio showcasing design work",
    responsibilities:
      "Create user-centered designs\nConduct user research and testing\nCollaborate with product teams",
  },
  {
    job_title: "Full Stack Developer",
    company_name: "Amazon",
    location: "Hyderabad",
    job_type: "FullTime",
    salary_min: 800000,
    salary_max: 1200000,
    job_description: `• A user-friendly interface lets you browse stunning photos and videos
• Filter destinations based on interests and travel style, and create personalized`,
    requirements:
      "Experience with modern JavaScript frameworks\nKnowledge of cloud platforms (AWS/Azure)\nStrong communication skills",
    responsibilities:
      "Develop features from concept to deployment\nParticipate in code reviews\nEnsure application security",
  },
  {
    job_title: "Node.js Developer",
    company_name: "Tesla",
    location: "Chennai",
    job_type: "FullTime",
    salary_min: 700000,
    salary_max: 1000000,
    job_description: `• A user-friendly interface lets you browse stunning photos and videos
• Filter destinations based on interests and travel style, and create personalized`,
    requirements:
      "Solid understanding of asynchronous programming\nExperience with databases (MongoDB/PostgreSQL)\nKnowledge of containerization (Docker)",
    responsibilities:
      "Design and implement APIs\nTroubleshoot and debug applications\nWrite technical documentation",
  },
  {
    job_title: "UX/UI Designer",
    company_name: "Swiggy",
    location: "Delhi",
    job_type: "Contract",
    salary_min: 500000,
    salary_max: 800000,
    job_description: `• A user-friendly interface lets you browse stunning photos and videos
• Filter destinations based on interests and travel style, and create personalized`,
    requirements:
      "Excellent visual design skills\nUnderstanding of responsive design\nAbility to work in a fast-paced environment",
    responsibilities:
      "Create wireframes and prototypes\nDesign mobile and web interfaces\nMaintain design systems",
  },
  {
    job_title: "Full Stack Developer",
    company_name: "Amazon",
    location: "Pune",
    job_type: "FullTime",
    salary_min: 900000,
    salary_max: 1400000,
    job_description: `• A user-friendly interface lets you browse stunning photos and videos
• Filter destinations based on interests and travel style, and create personalized`,
    requirements:
      "Bachelor's degree in Computer Science\n5+ years of professional experience\nExpertise in modern web technologies",
    responsibilities:
      "Lead technical discussions\nArchitect scalable solutions\nMentor team members",
  },
  {
    job_title: "Node.js Developer",
    company_name: "Tesla",
    location: "Remote",
    job_type: "Contract",
    salary_min: 600000,
    salary_max: 900000,
    job_description: `• A user-friendly interface lets you browse stunning photos and videos
• Filter destinations based on interests and travel style, and create personalized`,
    requirements:
      "Self-motivated and able to work independently\nStrong Node.js and JavaScript skills\nExperience with testing frameworks",
    responsibilities:
      "Build and maintain backend services\nIntegrate third-party services\nEnsure code quality",
  },
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await pool.query("DELETE FROM jobs");

    // Insert sample data
    for (const job of sampleJobs) {
      await pool.query(
        `INSERT INTO jobs 
          (job_title, company_name, location, job_type, salary_min, salary_max, 
           job_description, requirements, responsibilities) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          job.job_title,
          job.company_name,
          job.location,
          job.job_type,
          job.salary_min,
          job.salary_max,
          job.job_description,
          job.requirements,
          job.responsibilities,
        ]
      );
    }

    console.log("✓ Database seeded successfully with sample jobs!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
