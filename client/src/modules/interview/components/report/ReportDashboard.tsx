"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  Search,
  SortAsc,
  SortDesc,
  Eye,
  Download,
  MessageSquare,
  Send,
  AlertTriangle,
  Book,
  Video,
  Globe,
  Trophy,
  Target,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { toast, Toaster } from "sonner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

interface ReportInterface {
  id: number;
  title: string;
  date: string;
  accuracy: number;
  timeTaken: number;
  score: number;
}

const SkeletonLoader = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const GradientPill: React.FC<{ text: string; value: string | number }> = ({
  text,
  value,
}) => (
  <motion.div
    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    {text}: <span className="ml-1 font-bold">{value}</span>
  </motion.div>
);

const AISummary: React.FC<{ reports: ReportInterface[] }> = ({ reports }) => {
  const summaryPoints = [
    {
      text: "Average accuracy",
      value: "88%",
      icon: <Target className="w-5 h-5 mr-2" />,
    },
    {
      text: "Improvement trend",
      value: "Consistent",
      icon: <Trophy className="w-5 h-5 mr-2" />,
    },
    {
      text: "Strongest area",
      value: "Technical knowledge",
      icon: <Zap className="w-5 h-5 mr-2" />,
    },
    {
      text: "Area for improvement",
      value: "Communication",
      icon: <MessageSquare className="w-5 h-5 mr-2" />,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Summary</CardTitle>
        <CardDescription>
          Quick overview of your interview performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summaryPoints.map((point, index) => (
            <div key={index} className="flex items-center">
              {point.icon}
              <GradientPill text={point.text} value={point.value} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ReportTable: React.FC<{
  reports: ReportInterface[];
  onAction: (
    action: "view" | "download" | "discuss" | "send",
    report: ReportInterface
  ) => void;
}> = ({ reports, onAction }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Accuracy</TableHead>
          <TableHead>Time Taken</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell>{report.title}</TableCell>
            <TableCell>{report.date}</TableCell>
            <TableCell>{report.accuracy}%</TableCell>
            <TableCell>{report.timeTaken} min</TableCell>
            <TableCell>{report.score}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAction("view", report)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAction("download", report)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAction("discuss", report)}
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAction("send", report)}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const PerformanceChart: React.FC<{ reports: ReportInterface[] }> = ({
  reports,
}) => {
  const chartData = reports.map((report) => ({
    date: report.date,
    accuracy: report.accuracy,
    timeTaken: report.timeTaken,
    score: report.score,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="accuracy"
          stroke="#8884d8"
          name="Accuracy"
        />
        <Line
          type="monotone"
          dataKey="timeTaken"
          stroke="#82ca9d"
          name="Time Taken"
        />
        <Line type="monotone" dataKey="score" stroke="#ffc658" name="Score" />
      </LineChart>
    </ResponsiveContainer>
  );
};

const CompetencyChart: React.FC<{ reports: ReportInterface[] }> = ({
  reports,
}) => {
  const competencyData = [
    {
      subject: "Technical Knowledge",
      diagnostic: 70,
      allReports: 85,
      fullMark: 100,
    },
    {
      subject: "Problem Solving",
      diagnostic: 65,
      allReports: 80,
      fullMark: 100,
    },
    { subject: "Communication", diagnostic: 60, allReports: 75, fullMark: 100 },
    { subject: "Teamwork", diagnostic: 75, allReports: 85, fullMark: 100 },
    { subject: "Leadership", diagnostic: 55, allReports: 70, fullMark: 100 },
    { subject: "Adaptability", diagnostic: 70, allReports: 80, fullMark: 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={competencyData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="Competency Diagnostic"
          dataKey="diagnostic"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name="All Interview Reports"
          dataKey="allReports"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

const ActionableSteps: React.FC = () => {
  const steps = [
    {
      title: "Read 'Cracking the Coding Interview'",
      icon: <Book className="w-5 h-5" />,
      type: "Book",
    },
    {
      title: "Watch 'Data Structures & Algorithms' course on NPTEL",
      icon: <Video className="w-5 h-5" />,
      type: "Online Course",
    },
    {
      title: "Practice problems on GeeksforGeeks",
      icon: <Globe className="w-5 h-5" />,
      type: "Website",
    },
    {
      title: "Attend mock interviews on InterviewBit",
      icon: <MessageSquare className="w-5 h-5" />,
      type: "Practice",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actionable Steps to Improve</CardTitle>
        <CardDescription>
          Resources to enhance your interview skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {steps.map((step, index) => (
            <motion.li
              key={index}
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex-shrink-0">{step.icon}</div>
              <div>
                <p className="font-medium">{step.title}</p>
                <p className="text-sm text-gray-500">{step.type}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
}> = ({ title, value, icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

export default function InterviewReportDashboard() {
  const [reports, setReports] = useState<ReportInterface[]>([]);
  const [filteredReports, setFilteredReports] = useState<ReportInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockReports: ReportInterface[] = [
        {
          id: 1,
          title: "TCS Digital Interview",
          date: "2024-03-15",
          accuracy: 85,
          timeTaken: 45,
          score: 78,
        },
        {
          id: 2,
          title: "Infosys InfyTQ Assessment",
          date: "2024-03-10",
          accuracy: 92,
          timeTaken: 50,
          score: 88,
        },
        {
          id: 3,
          title: "Wipro NLTH Interview",
          date: "2024-03-05",
          accuracy: 88,
          timeTaken: 55,
          score: 82,
        },
      ];
      setReports(mockReports);
      setFilteredReports(mockReports);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Failed to fetch reports. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterReports(term);
  };

  const filterReports = (term: string) => {
    const filtered = reports.filter((report) =>
      report.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredReports(filtered);
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    const sorted = [...filteredReports].sort((a, b) => {
      return newOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setFilteredReports(sorted);
  };

  const handleReportAction = (
    action: "view" | "download" | "discuss" | "send",
    report: ReportInterface
  ) => {
    switch (action) {
      case "view":
        toast.success(`Viewing report: ${report.title}`);
        break;
      case "download":
        toast.success(`Downloading report: ${report.title}`);
        break;
      case "discuss":
        toast.success(`Opening discussion for report: ${report.title}`);
        break;
      case "send":
        toast.success(`Sending report to mentor: ${report.title}`);
        break;
    }
  };

  return (
    <div className="p-2 space-y-8">
      <Toaster />
      <h1 className="text-4xl font-bold mb-6 cp-text-gradient">Interview Report Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Interviews"
          value={reports.length}
          icon={<Eye className="h-6 w-6" />}
        />
        <StatCard
          title="Average Score"
          value={`${Math.round(reports.reduce((acc, report) => acc + report.score, 0) / reports.length)}%`}
          icon={<AlertTriangle className="h-6 w-6" />}
        />
        <StatCard
          title="Average Time"
          value={`${Math.round(reports.reduce((acc, report) => acc + report.timeTaken, 0) / reports.length)} min`}
          icon={<Loader2 className="h-6 w-6" />}
        />
      </div>

      <AISummary reports={reports} />

      <Separator className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Report List</CardTitle>
          <CardDescription>
            Search, filter, and sort your interview reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={handleSearch}
              className="flex-grow"
            />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="highScore">High Score</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSort}>
              {sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>
          </div>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <ReportTable
              reports={filteredReports}
              onAction={handleReportAction}
            />
          )}
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart reports={reports} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Competency Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <CompetencyChart reports={reports} />
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <ActionableSteps />
    </div>
  );
}
