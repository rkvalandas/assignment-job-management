# Job Management Application

A full-stack job posting and management platform built with modern web technologies. This application allows users to browse job listings, apply advanced filters, and create new job postings.

## 🚀 Project Overview

This is a comprehensive job management system featuring a clean, modern UI with real-time job search and filtering capabilities. The application is designed with a focus on user experience, performance, and scalability.

### Key Features

- **Job Listings**: Browse all available job postings in a responsive grid layout
- **Advanced Filtering**:
  - Search by job title or role
  - Filter by location (multiple cities + remote)
  - Filter by job type (Full-time, Part-time, Contract, Internship)
  - Interactive salary range slider (₹0.5L - ₹80L per month)
- **Job Creation**: Create new job postings with detailed information
- **Responsive Design**: Fully responsive UI that works on all devices
- **Modern UI/UX**: Clean interface with Tailwind CSS styling
- **Real-time Updates**: Jobs update automatically when filters change

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.5.4 (React 19.1.0)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Tabler Icons React
- **Deployment**: Vercel

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: PostgreSQL (Supabase)
- **Deployment**: Vercel Serverless Functions

## 📦 Project Structure

```
frontend/
├── app/
│   ├── components/
│   │   ├── Header.tsx          # Navigation header with floating design
│   │   ├── JobCard.tsx         # Job listing card component
│   │   └── CreateJobModal.tsx  # Job creation form modal
│   ├── page.tsx                # Main page with filters and job grid
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── public/                     # Static assets
└── .env.local                  # Environment variables

backend/
├── index.js                    # Express server with API routes
├── db.js                       # PostgreSQL connection config
├── seed.js                     # Database seeding script
└── vercel.json                 # Vercel deployment config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Supabase recommended)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/rkvalandas/assignment-job-management.git
cd assignment-job-management
```

2. **Setup Backend**

```bash
cd backend
npm install
```

Create `.env` file in backend directory:

```env
DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=6543
PORT=8000
CLIENT_URL=http://localhost:3000
```

3. **Setup Frontend**

```bash
cd frontend
npm install
```

Create `.env.local` file in frontend directory:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

4. **Initialize Database**

```bash
cd backend
npm run seed
```

5. **Run Development Servers**

Backend:

```bash
cd backend
npm start
```

Frontend (in a new terminal):

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🌐 Deployment

### Frontend (Vercel)

The frontend is deployed on Vercel at: `https://assignment-job-management.vercel.app`

### Backend (Vercel Serverless)

The backend API is deployed at: `https://assignment-job-management-backend.vercel.app`

### Environment Variables (Production)

Set these in your Vercel dashboard:

**Frontend:**

- `NEXT_PUBLIC_BACKEND_URL`: Your backend API URL

**Backend:**

- `DB_USER`: PostgreSQL username
- `DB_HOST`: Database host
- `DB_NAME`: Database name
- `DB_PASSWORD`: Database password
- `DB_PORT`: Database port (usually 6543 for Supabase)
- `CLIENT_URL`: Your frontend URL
- `NODE_ENV`: production

## 📡 API Endpoints

- `GET /api/jobs` - Fetch all jobs with optional filters
  - Query params: `jobTitle`, `location`, `jobType`, `minSalary`, `maxSalary`
- `GET /api/jobs/:id` - Fetch single job by ID
- `POST /api/jobs` - Create new job posting
- `PUT /api/jobs/:id` - Update existing job
- `DELETE /api/jobs/:id` - Delete job posting
- `GET /api/health` - Health check endpoint

## 🎨 Design Features

- **Floating Header**: Centered navigation with gradient button
- **Generalized Company Logos**: Color-coded gradient avatars for companies
- **Interactive Filters**: 12-column grid layout with search, location, job type, and salary range
- **Custom Slider**: Styled range input with dynamic background gradient
- **Responsive Cards**: Job cards with company info, salary, location, and apply button

## 🔒 Security Features

- CORS configuration for allowed origins
- Environment variable protection
- SQL injection prevention with parameterized queries
- Input validation on both frontend and backend

## 👤 Author

**rk Valandasu**

- GitHub: [@rkvalandas](https://github.com/rkvalandas)
