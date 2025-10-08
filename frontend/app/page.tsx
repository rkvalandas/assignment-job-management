"use client";

import { useState, useEffect } from "react";
import {
  IconSearch,
  IconMapPin,
  IconUser,
  IconChevronDown,
} from "@tabler/icons-react";
import Header from "./components/Header";
import JobCard from "./components/JobCard";
import CreateJobModal from "./components/CreateJobModal";

interface Job {
  id: number;
  job_title: string;
  company_name: string;
  location: string;
  job_type: string;
  salary_min?: number;
  salary_max?: number;
  job_description: string;
  requirements?: string;
  responsibilities?: string;
  application_deadline?: string;
  created_at: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpened, setCreateModalOpened] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [jobTypeFilter, setJobTypeFilter] = useState<string | null>(null);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([
    50000, 8000000,
  ]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("jobTitle", searchQuery);
      if (locationFilter) params.append("location", locationFilter);
      if (jobTypeFilter) params.append("jobType", jobTypeFilter);
      params.append("minSalary", salaryRange[0].toString());
      params.append("maxSalary", salaryRange[1].toString());

      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/jobs?" + params.toString()
      );
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, locationFilter, jobTypeFilter, salaryRange]);

  const handleCreateJob = async (values: {
    jobTitle: string;
    companyName: string;
    location: string;
    jobType: string;
    salaryMin: string;
    salaryMax: string;
    jobDescription: string;
    requirements: string;
    responsibilities: string;
    applicationDeadline: string;
  }) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobTitle: values.jobTitle,
            companyName: values.companyName,
            location: values.location,
            jobType: values.jobType,
            salaryMin: values.salaryMin ? parseInt(values.salaryMin) : null,
            salaryMax: values.salaryMax ? parseInt(values.salaryMax) : null,
            jobDescription: values.jobDescription,
            requirements: values.requirements,
            responsibilities: values.responsibilities,
            applicationDeadline: values.applicationDeadline,
          }),
        }
      );

      if (response.ok) {
        setCreateModalOpened(false);
        fetchJobs();
      }
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <>
      <Header onCreateJob={() => setCreateModalOpened(true)} />

      <div className="mx-auto py-4 bg-gray-50">
        {/* Filters Section */}
        <div className="bg-white p-6 shadow-sm border border-gray-200 mb-8">
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="col-span-3 relative border border-gray-300 rounded-lg">
              <IconSearch
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search By Job Title, Role"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-0 text-[15px] text-gray-700 placeholder:text-gray-500"
              />
            </div>

            {/* Location Select */}
            <div className="col-span-3 relative border border-gray-300 rounded-lg">
              <IconMapPin
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"
              />
              <select
                value={locationFilter || ""}
                onChange={(e) => setLocationFilter(e.target.value || null)}
                className="w-full pl-12 pr-10 py-3 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-0 appearance-none text-[15px] text-gray-700 cursor-pointer"
              >
                <option value="">Preferred Location</option>
                <option value="All Locations">All Locations</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Pune">Pune</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Remote">Remote</option>
              </select>
              <IconChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>

            {/* Job Type Select */}
            <div className="col-span-2 relative border border-gray-300 rounded-lg">
              <IconUser
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"
              />
              <select
                value={jobTypeFilter || ""}
                onChange={(e) => setJobTypeFilter(e.target.value || null)}
                className="w-full pl-12 pr-10 py-3 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-0 appearance-none text-[15px] text-gray-700 cursor-pointer"
              >
                <option value="">Job type</option>
                <option value="FullTime">Full-time</option>
                <option value="PartTime">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              <IconChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>

            {/* Salary Range Slider */}
            <div className="col-span-4 relative">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[15px] font-medium text-gray-900">
                  Salary Per Month
                </span>
                <span className="text-[15px] font-semibold text-gray-900">
                  ₹{(salaryRange[0] / 100000).toFixed(0)}k - ₹
                  {(salaryRange[1] / 100000).toFixed(0)}k
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min={50000}
                  max={8000000}
                  step={50000}
                  value={salaryRange[1]}
                  onChange={(e) =>
                    setSalaryRange([salaryRange[0], parseInt(e.target.value)])
                  }
                  className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, #000 0%, #000 ${
                      ((salaryRange[1] - 50000) / (8000000 - 50000)) * 100
                    }%, #e5e7eb ${
                      ((salaryRange[1] - 50000) / (8000000 - 50000)) * 100
                    }%, #e5e7eb 100%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          .slider-thumb::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #000;
            cursor: pointer;
            border: 3px solid #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          .slider-thumb::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #000;
            cursor: pointer;
            border: 3px solid #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
        `}</style>

        {/* Jobs Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-lg text-gray-500">
              No jobs found matching your criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-8">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>

      <CreateJobModal
        opened={createModalOpened}
        onClose={() => setCreateModalOpened(false)}
        onSubmit={handleCreateJob}
      />
    </>
  );
}
