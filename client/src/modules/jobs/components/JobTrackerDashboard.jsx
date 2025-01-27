import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Calendar,
  Tag,
  Clock,
  Info,
  ArrowUpCircle,
  DollarSign,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

// Types
// type JobApplication = {
//   id: number
//   company: string
//   logo: string
//   position: string
//   dateApplied: string
//   status: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected'
//   preparednessScore: number
//   expectedSalary: number
//   description: string
//   journey: {
//     step: string
//     date: string
//     details: string
//     review?: string
//   }[]
// }

// Constants
const ITEMS_PER_PAGE = 7;

// Utility Functions
const getStatusColor = (status) => {
  switch (status) {
    case "Applied":
      return "bg-blue-100 text-blue-800";
    case "Screening":
      return "bg-yellow-100 text-yellow-800";
    case "Interview":
      return "bg-purple-100 text-purple-800";
    case "Offer":
      return "bg-green-100 text-green-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPreparednessColor = (score) => {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-yellow-500";
  return "text-red-500";
};

// Components
const CircleGraph = ({ value }) => (
  <div className="relative w-12 h-12">
    <svg className="w-full h-full" viewBox="0 0 36 36">
      <path
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#E6E6E6"
        strokeWidth="3"
      />
      <path
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="3"
        strokeDasharray={`${value}, 100`}
        strokeLinecap="round"
      />
      <text
        x="18"
        y="21.35"
        className="text-xs font-semibold"
        textAnchor="middle"
        fill="#4CAF50"
      >
        {value}
      </text>
    </svg>
  </div>
);

const ApplicationRow = ({ application, onViewJourney, onViewInfo }) => (
  <motion.tr
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="hover:bg-gray-50 transition-colors duration-150"
  >
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        {/* <img
          className="h-10 w-10 rounded-full mr-3"
          src={application.logo}
          alt={`${application.company} logo`}
        /> */}
        <span>{application.company}</span>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">{application.position}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      {formatDistanceToNow(new Date(application.dateApplied), {
        addSuffix: true,
      })}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
          application.status
        )}`}
      >
        {application.status}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <CircleGraph value={application.preparednessScore} />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      ₹{application.expectedSalary.toLocaleString()}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <button
        onClick={onViewJourney}
        className="text-indigo-600 hover:text-indigo-900 mr-2 transition-colors duration-150"
      >
        View Journey
      </button>
      <button
        onClick={onViewInfo}
        className="text-gray-600 hover:text-gray-900 mr-2 transition-colors duration-150"
      >
        <Info size={16} />
      </button>
      {application.preparednessScore < 80 && (
        <button
          className="text-green-600 hover:text-green-900 transition-colors duration-150"
          onClick={() => alert(`Upskill for ${application.position}`)}
        >
          <ArrowUpCircle size={16} />
        </button>
      )}
    </td>
  </motion.tr>
);

// Main Component
export default function JobTrackerDashboard() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "dateApplied",
    direction: "desc",
  });
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedJobInfo, setSelectedJobInfo] = useState(null);

  // Mock data generation
  useEffect(() => {
    const indianCompanies = [
      "Tata Consultancy Services",
      "Infosys",
      "Wipro",
      "HCL Technologies",
      "Tech Mahindra",
      "Larsen & Toubro Infotech",
      "Cognizant",
      "Mindtree",
      "Capgemini",
      "IBM India",
      "Accenture",
      "Mphasis",
      "Hexaware Technologies",
      "Persistent Systems",
      "Zensar Technologies",
      "Birlasoft",
      "NIIT Technologies",
      "Oracle India",
      "Dell India",
      "Adobe India",
    ];

    const positions = [
      "Full Stack Web Developer",
      "Frontend Developer",
      "Backend Developer",
      "Software Engineer",
      "Web Application Developer",
      "UI/UX Developer",
      "MERN Stack Developer",
      "React Developer",
      "Node.js Developer",
      "JavaScript Engineer",
      "Angular Developer",
      "Tech Lead - Full Stack",
      "Junior Full Stack Developer",
      "Senior Full Stack Developer",
      "Full Stack Architect",
      "API Developer",
      "Product Engineer",
      "Cloud Developer",
      "DevOps Full Stack Engineer",
      "Software Developer",
    ];

    const mockData = Array.from({ length: 20 }, (_, i) => {
      const companyIndex = i % indianCompanies.length;
      const positionIndex = i % positions.length;
      const appliedDate = new Date(
        2024,
        10,
        Math.max(1, Math.floor(Math.random() * 30))
      ).toISOString();

      const details = [
        "Applied through the Auto-Apply feature on our platform, which optimized the resume and sent the application directly.",
        "Submitted a carefully crafted application using Auto-Apply, highlighting relevant skills for the role.",
        "Applied seamlessly via Auto-Apply, which included keyword optimization and automated cover letter generation.",
        "Auto-Apply handled the application, ensuring it was submitted with a tailored resume and cover letter.",
        "Applied efficiently using the Auto-Apply feature, sending the application at a strategic time.",
      ];

      const reviews = [
        "Impressed with the technical skills showcased during the interview.",
        "The candidate demonstrated a strong understanding of backend and frontend development.",
        "Clear and concise answers were given during the technical discussion.",
        "The interviewers appreciated the candidate’s approach to solving complex problems.",
        "The applicant showed excellent communication skills and teamwork understanding.",
      ];

      const journey = [
        {
          step: "Application Submitted",
          date: appliedDate,
          details: details[Math.floor(Math.random() * details.length)],
        },
        {
          step: "Phone Screening",
          date: new Date(
            new Date(appliedDate).getTime() + 5 * 24 * 60 * 60 * 1000
          ).toISOString(),
          details: "Short introduction call with the HR team.",
          review:
            "Initial call went smoothly; HR was satisfied with the background.",
        },
        {
          step: "Technical Interview",
          date: new Date(
            new Date(appliedDate).getTime() + 10 * 24 * 60 * 60 * 1000
          ).toISOString(),
          details:
            "Technical assessment covering data structures, algorithms, and system design.",
          review: reviews[Math.floor(Math.random() * reviews.length)],
        },
      ];

      return {
        id: i + 1,
        company: indianCompanies[companyIndex],
        position: positions[positionIndex],
        dateApplied: appliedDate,
        status: ["Applied", "Screening", "Interview", "Offer", "Rejected"][
          Math.floor(Math.random() * 5)
        ],
        preparednessScore: Math.floor(Math.random() * 101),
        expectedSalary: Math.floor(Math.random() * 50000) + 50000,
        description: `This is a Full Stack Web Developer role at ${indianCompanies[companyIndex]}. Responsibilities include developing front-end architecture, designing user interactions on web pages, and managing server-side logic and databases.`,
        journey,
      };
    });
    setApplications(mockData);
    setFilteredApplications(mockData);
  }, []);

  useEffect(() => {
    let result = applications;

    if (searchTerm) {
      result = result.filter(
        (app) =>
          app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((app) => app.status === statusFilter);
    }

    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredApplications(result);
    setCurrentPage(1);
  }, [applications, searchTerm, statusFilter, sortConfig]);

  const pageCount = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setSelectedApplication(null);
        setSelectedJobInfo(null);
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex-grow">
        <div className="">
          <div className="overflow-hidden">
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-8 flex items-center cp-text-gradient">
                Track Naukri Applications
              </h1>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search companies or positions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-48 pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white transition duration-150 ease-in-out"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Applied">Applied</option>
                    <option value="Screening">Screening</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          className="flex items-center"
                          onClick={() => handleSort("company")}
                        >
                          <Briefcase className="mr-1" size={16} />
                          Company
                          {sortConfig.key === "company" &&
                            (sortConfig.direction === "asc" ? (
                              <ChevronUp className="ml-1" size={16} />
                            ) : (
                              <ChevronDown className="ml-1" size={16} />
                            ))}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          className="flex items-center"
                          onClick={() => handleSort("position")}
                        >
                          <Tag className="mr-1" size={16} />
                          Position
                          {sortConfig.key === "position" &&
                            (sortConfig.direction === "asc" ? (
                              <ChevronUp className="ml-1" size={16} />
                            ) : (
                              <ChevronDown className="ml-1" size={16} />
                            ))}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          className="flex items-center"
                          onClick={() => handleSort("dateApplied")}
                        >
                          <Calendar className="mr-1" size={16} />
                          Date Applied
                          {sortConfig.key === "dateApplied" &&
                            (sortConfig.direction === "asc" ? (
                              <ChevronUp className="ml-1" size={16} />
                            ) : (
                              <ChevronDown className="ml-1" size={16} />
                            ))}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          className="flex items-center"
                          onClick={() => handleSort("status")}
                        >
                          <Clock className="mr-1" size={16} />
                          Status
                          {sortConfig.key === "status" &&
                            (sortConfig.direction === "asc" ? (
                              <ChevronUp className="ml-1" size={16} />
                            ) : (
                              <ChevronDown className="ml-1" size={16} />
                            ))}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          className="flex items-center"
                          onClick={() => handleSort("preparednessScore")}
                        >
                          Preparedness
                          {sortConfig.key === "preparednessScore" &&
                            (sortConfig.direction === "asc" ? (
                              <ChevronUp className="ml-1" size={16} />
                            ) : (
                              <ChevronDown className="ml-1" size={16} />
                            ))}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          className="flex items-center"
                          onClick={() => handleSort("expectedSalary")}
                        >
                          <DollarSign className="mr-1" size={16} />
                          Expected Salary
                          {sortConfig.key === "expectedSalary" &&
                            (sortConfig.direction === "asc" ? (
                              <ChevronUp className="ml-1" size={16} />
                            ) : (
                              <ChevronDown className="ml-1" size={16} />
                            ))}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                      {paginatedApplications.map((application) => (
                        <ApplicationRow
                          key={application.id}
                          application={application}
                          onViewJourney={() =>
                            setSelectedApplication(application)
                          }
                          onViewInfo={() => setSelectedJobInfo(application)}
                        />
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-center px-5 md:px-20 lg:px-44 mt-15 relative w-full">
              <div className="text-sm text-gray-700">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredApplications.length
                )}{" "}
                of {filteredApplications.length} entries
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-md bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition duration-150 ease-in-out"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.min(pageCount, page + 1))
                  }
                  disabled={currentPage === pageCount}
                  className="px-4 py-2 border rounded-md bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition duration-150 ease-in-out"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, #ffffff, #f3f4f6)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
            }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
              <Briefcase className="mr-4" size={24} />
              {selectedApplication.company} - {selectedApplication.position}
            </h2>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Application Journey
            </h3>
            <div className="space-y-6">
              {selectedApplication.journey.map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex flex-col items-center mr-6">
                    <div className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-500 text-white font-bold">
                      {index + 1}
                    </div>
                    {index < selectedApplication.journey.length - 1 && (
                      <div className="h-full border-l-2 border-blue-300 my-2 ml-5"></div>
                    )}
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                    <h4 className="font-bold text-lg text-gray-800 mb-2">
                      {step.step}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {format(new Date(step.date), "PPP")}
                    </p>
                    <p className="text-gray-700">{step.details}</p>
                    {step.review && (
                      <p className="mt-2 italic text-sm text-gray-600">
                        &quot;{step.review}&quot;
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedApplication(null)}
              className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {selectedJobInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, #ffffff, #f3f4f6)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
            }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {selectedJobInfo.company} - {selectedJobInfo.position}
            </h2>
            <p className="mb-6 text-gray-700">{selectedJobInfo.description}</p>
            <button
              onClick={() => setSelectedJobInfo(null)}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
