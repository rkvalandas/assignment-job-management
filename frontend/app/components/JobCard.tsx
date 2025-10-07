interface JobCardProps {
  job: {
    id: number;
    job_title: string;
    company_name: string;
    location: string;
    job_type: string;
    salary_min?: number;
    salary_max?: number;
    job_description: string;
    created_at: string;
  };
}

const getCompanyLogo = (companyName: string) => {
  const firstChar = companyName.charAt(0).toUpperCase();

  // Generate a consistent color based on company name
  const colors = [
    { from: "from-blue-500", to: "to-blue-600" },
    { from: "from-purple-500", to: "to-purple-600" },
    { from: "from-pink-500", to: "to-pink-600" },
    { from: "from-green-500", to: "to-green-600" },
    { from: "from-orange-500", to: "to-orange-600" },
    { from: "from-red-500", to: "to-red-600" },
    { from: "from-indigo-500", to: "to-indigo-600" },
    { from: "from-teal-500", to: "to-teal-600" },
  ];

  const colorIndex = firstChar.charCodeAt(0) % colors.length;
  const colorScheme = colors[colorIndex];

  return (
    <div className="w-[100px] h-[100px] rounded-2xl bg-white shadow-md flex items-center justify-center border border-gray-100">
      <div
        className={`w-20 h-20 rounded-full bg-gradient-to-br ${colorScheme.from} ${colorScheme.to} flex items-center justify-center`}
      >
        <span className="text-white font-bold text-3xl">{firstChar}</span>
      </div>
    </div>
  );
};

const formatJobType = (type: string) => {
  const typeMap: { [key: string]: string } = {
    FullTime: "Onsite",
    PartTime: "Part-time",
    Contract: "Contract",
    Internship: "Internship",
  };
  return typeMap[type] || type;
};

const formatSalary = (min?: number, max?: number) => {
  if (!min && !max) return null;
  if (min && max) {
    return `${(max / 100000).toFixed(0)}LPA`;
  }
  if (min) return `${(min / 100000).toFixed(0)}LPA`;
  return `${(max! / 100000).toFixed(0)}LPA`;
};

const getTimeAgo = (dateString: string) => {
  const now = new Date();
  const createdDate = new Date(dateString);
  const diffInHours = Math.floor(
    (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 24) {
    return "24h Ago";
  }
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d Ago`;
};

export default function JobCard({ job }: JobCardProps) {
  const salary = formatSalary(job.salary_min, job.salary_max);

  return (
    <div className="max-w-3/5 bg-white rounded-2xl p-8 transition-all hover:shadow-lg border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">{getCompanyLogo(job.company_name)}</div>
        <span className="bg-blue-200 text-gray-900 font-medium px-5 py-2 rounded-lg text-[15px]">
          {getTimeAgo(job.created_at)}
        </span>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        {job.job_title}
      </h3>

      <div className="flex items-center gap-6 mb-6 text-gray-600">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-[15px]">1-3 yr Exp</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span className="text-[15px]">{formatJobType(job.job_type)}</span>
        </div>
        {salary && (
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-[15px]">{salary}</span>
          </div>
        )}
      </div>

      <ul className="space-y-2 mb-6">
        {job.job_description
          .split("\n")
          .slice(0, 2)
          .map(
            (line, index) =>
              line.trim() && (
                <li
                  key={index}
                  className="flex gap-2 items-start text-gray-600"
                >
                  <span className="text-[15px] mt-0.5">•</span>
                  <span className="text-[15px] leading-relaxed">
                    {line.trim()}
                  </span>
                </li>
              )
          )}
      </ul>

      <button className="w-full bg-sky-400 hover:bg-sky-500 text-white font-semibold text-[16px] py-3.5 rounded-xl transition-colors">
        Apply Now
      </button>
    </div>
  );
}
