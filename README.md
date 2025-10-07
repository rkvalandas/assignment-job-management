# Job Management Admin Interface

A full-stack job management application with an admin interface for creating and managing job postings.

## Features

- **Job Listing Page** with filtering by:

  - Job Title (search)
  - Location
  - Job Type (Full-time, Part-time, Contract, Internship)
  - Salary Range (slider)

- **Job Creation Modal** with form validation for:
  - Job Title
  - Company Name
  - Location
  - Job Type
  - Salary Range
  - Job Description
  - Requirements
  - Responsibilities
  - Application Deadline

## Tech Stack

### Frontend

- **Next.js 15** - React framework
- **Mantine UI** - Component library
- **TypeScript** - Type safety
- **Tabler Icons** - Icon library

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **CORS** - Cross-origin resource sharing

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Setup Instructions

### 1. Database Setup

First, install PostgreSQL if you haven't already:

- **macOS**: `brew install postgresql@14`
- **Ubuntu**: `sudo apt-get install postgresql`
- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/)

Start PostgreSQL service:

```bash
# macOS
brew services start postgresql@14

# Ubuntu
sudo service postgresql start

# Windows - PostgreSQL should start automatically
```

Create the database:

```bash
# Access PostgreSQL
psql postgres

# Inside psql, run:
CREATE DATABASE job_management;
\q
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Update .env file with your PostgreSQL credentials
# Edit the file and set your password:
# DB_PASSWORD=your_postgres_password

# Start the server (this will auto-create tables)
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Seed Sample Data (Optional)

To add sample job postings:

```bash
cd backend
node seed.js
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Use the filters to search for jobs:
   - Search by job title or role
   - Select preferred location
   - Filter by job type
   - Adjust salary range using the slider
3. Click "Create Jobs" button to open the job creation modal
4. Fill in the form and click "Publish" to create a new job posting

## API Endpoints

### GET /api/jobs

Get all jobs with optional filters

- Query params: `jobTitle`, `location`, `jobType`, `minSalary`, `maxSalary`

### GET /api/jobs/:id

Get a specific job by ID

### POST /api/jobs

Create a new job posting

- Body: Job details (title, company, location, type, salary, description, etc.)

### PUT /api/jobs/:id

Update an existing job

### DELETE /api/jobs/:id

Delete a job posting

## Project Structure

```
assignment/
├── backend/
│   ├── db.js              # Database connection and schema
│   ├── server.js          # Express server and API routes
│   ├── seed.js            # Sample data seeding script
│   ├── .env               # Environment variables
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── components/
    │   │   ├── Header.tsx         # Navigation header
    │   │   ├── JobCard.tsx        # Job listing card
    │   │   └── CreateJobModal.tsx # Job creation form
    │   ├── page.tsx               # Main page with filters
    │   ├── layout.tsx             # Root layout with Mantine
    │   └── globals.css            # Global styles
    └── package.json
```

## Design Features

- Clean, modern UI matching the provided design mockups
- Responsive layout for desktop and mobile
- Smooth animations and transitions
- Color-coded company logos
- Time-based job posting badges
- Gradient buttons and hover effects

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running: `brew services list` (macOS)
- Check your credentials in `.env` file
- Verify database exists: `psql -l`

### Port Already in Use

- Backend (5000): Change `PORT` in `backend/.env`
- Frontend (3000): Run `npm run dev -- -p 3001`

### Module Not Found Errors

- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

## License

MIT
