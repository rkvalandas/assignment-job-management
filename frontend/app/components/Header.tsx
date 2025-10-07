import Link from "next/link";

interface HeaderProps {
  onCreateJob: () => void;
}

export default function Header({ onCreateJob }: HeaderProps) {
  return (
    <header className="top-0 left-0 right-0 sticky z-[100] pt-3 px-8">
      <div className="max-w-[1000px] mx-auto">
        <div className="bg-white rounded-full shadow-sm border border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo - 3D cube design matching the image */}
            <Link href="/" className="flex items-center">
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                className="transition-transform duration-300 hover:scale-105"
              >
                <defs>
                  <linearGradient
                    id="cube-purple"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#9F7AEA" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                  <linearGradient
                    id="cube-pink"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#F687B3" />
                    <stop offset="100%" stopColor="#ED64A6" />
                  </linearGradient>
                </defs>
                {/* Left purple face */}
                <path
                  d="M8 18 L8 38 L24 46 L24 26 Z"
                  fill="url(#cube-purple)"
                />
                {/* Top pink face */}
                <path d="M8 18 L24 10 L40 18 L24 26 Z" fill="url(#cube-pink)" />
                {/* Right dark face */}
                <path d="M24 26 L24 46 L40 38 L40 18 Z" fill="#2D3748" />
              </svg>
            </Link>

            {/* Navigation - centered */}
            <nav className="flex items-center gap-12">
              <Link
                href="/"
                className="text-gray-900 no-underline text-[16px] font-medium transition-colors duration-200 hover:text-purple-600"
              >
                Home
              </Link>
              <Link
                href="/jobs"
                className="text-gray-600 no-underline text-[16px] font-medium transition-colors duration-200 hover:text-purple-600"
              >
                Find Jobs
              </Link>
              <Link
                href="/talents"
                className="text-gray-600 no-underline text-[16px] font-medium transition-colors duration-200 hover:text-purple-600"
              >
                Find Talents
              </Link>
              <Link
                href="/about"
                className="text-gray-600 no-underline text-[16px] font-medium transition-colors duration-200 hover:text-purple-600"
              >
                About us
              </Link>
              <Link
                href="/testimonials"
                className="text-gray-600 no-underline text-[16px] font-medium transition-colors duration-200 hover:text-purple-600"
              >
                Testimonials
              </Link>
            </nav>

            {/* Create Jobs Button - matching the purple gradient pill shape */}
            <button
              onClick={onCreateJob}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold px-8 py-3 rounded-full text-[16px] hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create Jobs
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
