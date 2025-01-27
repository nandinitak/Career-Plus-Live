"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Scatter,
  ScatterChart,
  Treemap,
  ComposedChart,
  Area,
} from "recharts";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Rectangle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  AlertCircle,
  BarChart2,
  Briefcase,
  DollarSign,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  TrendingUp,
  Users,
} from "lucide-react";

// Mock data generator function
const generateMockData = (jobRole, industry) => {
  // This function would generate different data based on jobRole and industry
  // For brevity, we'll just modify some values randomly
  const randomModifier = Math.random() * 0.5 + 0.75; // Random number between 0.75 and 1.25

  return {
    jobDemandData: [
      { month: "Jan", demand: Math.floor(1000 * randomModifier) },
      { month: "Feb", demand: Math.floor(1200 * randomModifier) },
      { month: "Mar", demand: Math.floor(1100 * randomModifier) },
      { month: "Apr", demand: Math.floor(1300 * randomModifier) },
      { month: "May", demand: Math.floor(1400 * randomModifier) },
    ],
    salaryData: [
      { range: "0-5L", count: Math.floor(100 * randomModifier) },
      { range: "5L-10L", count: Math.floor(200 * randomModifier) },
      { range: "10L-15L", count: Math.floor(150 * randomModifier) },
      { range: "15L+", count: Math.floor(50 * randomModifier) },
    ],
    skillsData: [
      {
        name: "JavaScript",
        required: Math.floor(80 * randomModifier),
        average: Math.floor(70 * randomModifier),
      },
      {
        name: "React",
        required: Math.floor(70 * randomModifier),
        average: Math.floor(60 * randomModifier),
      },
      {
        name: "Node.js",
        required: Math.floor(60 * randomModifier),
        average: Math.floor(50 * randomModifier),
      },
      {
        name: "Python",
        required: Math.floor(50 * randomModifier),
        average: Math.floor(55 * randomModifier),
      },
      {
        name: "SQL",
        required: Math.floor(65 * randomModifier),
        average: Math.floor(60 * randomModifier),
      },
    ],
    topCompaniesData: [
      { name: "TCS", value: Math.floor(400 * randomModifier) },
      { name: "Infosys", value: Math.floor(300 * randomModifier) },
      { name: "Wipro", value: Math.floor(200 * randomModifier) },
      { name: "Tech Mahindra", value: Math.floor(100 * randomModifier) },
    ],
    jobLocationsData: [
      {
        name: "Bangalore",
        lat: 12.9716,
        lng: 77.5946,
        jobs: Math.floor(500 * randomModifier),
      },
      {
        name: "Mumbai",
        lat: 19.076,
        lng: 72.8777,
        jobs: Math.floor(400 * randomModifier),
      },
      {
        name: "Delhi",
        lat: 28.6139,
        lng: 77.209,
        jobs: Math.floor(300 * randomModifier),
      },
    ],
    experienceLevelData: [
      {
        name: "Entry",
        fullTime: Math.floor(200 * randomModifier),
        partTime: Math.floor(100 * randomModifier),
        contract: Math.floor(50 * randomModifier),
      },
      {
        name: "Mid",
        fullTime: Math.floor(300 * randomModifier),
        partTime: Math.floor(150 * randomModifier),
        contract: Math.floor(100 * randomModifier),
      },
      {
        name: "Senior",
        fullTime: Math.floor(250 * randomModifier),
        partTime: Math.floor(50 * randomModifier),
        contract: Math.floor(150 * randomModifier),
      },
    ],
    industryTrendsData: [
      { name: "IT", value: Math.floor(400 * randomModifier) },
      { name: "Finance", value: Math.floor(300 * randomModifier) },
      { name: "Healthcare", value: Math.floor(200 * randomModifier) },
      { name: "Education", value: Math.floor(100 * randomModifier) },
    ],
    contractTypesData: [
      { name: "Full-time", value: Math.floor(60 * randomModifier) },
      { name: "Part-time", value: Math.floor(20 * randomModifier) },
      { name: "Contract", value: Math.floor(15 * randomModifier) },
      { name: "Freelance", value: Math.floor(5 * randomModifier) },
    ],
    skillPremiumData: [
      {
        skill: "AI/ML",
        premium: Math.floor(20 * randomModifier),
        demand: Math.floor(80 * randomModifier),
      },
      {
        skill: "Cloud",
        premium: Math.floor(15 * randomModifier),
        demand: Math.floor(70 * randomModifier),
      },
      {
        skill: "DevOps",
        premium: Math.floor(18 * randomModifier),
        demand: Math.floor(65 * randomModifier),
      },
      {
        skill: "Blockchain",
        premium: Math.floor(25 * randomModifier),
        demand: Math.floor(40 * randomModifier),
      },
      {
        skill: "Cybersecurity",
        premium: Math.floor(22 * randomModifier),
        demand: Math.floor(60 * randomModifier),
      },
    ],
    growthForecastData: [
      { year: 2023, growth: Math.floor(5 * randomModifier) },
      { year: 2024, growth: Math.floor(7 * randomModifier) },
      { year: 2025, growth: Math.floor(10 * randomModifier) },
      { year: 2026, growth: Math.floor(12 * randomModifier) },
      { year: 2027, growth: Math.floor(15 * randomModifier) },
    ],
  };
};

const innerBounds = [
  [31.348442, 75.563943],
  [31.68065, 74.821173],
];
const outerBounds = [
  [31.294541, 75.620225],
  [31.356409, 75.625255],
];

const innerBounds2 = [
  [27.043003, 75.77967],
  [24.633309, 75.70183],
];

const outerBounds2 = [
  [13.92547, 78.663873],
  [12.652296, 78.312883],
];

const redColor = { color: "red" };
const whiteColor = { color: "red" };

function SetBoundsRectangles() {
  const [bounds, setBounds] = useState(outerBounds);
  const map = useMap();

  const jobData = [
    {
      area: "Pathankot",
      bounds: innerBounds,
      jobs: 239,
      mainJobs: ["Software Engineer", "Data Analyst"],
    },
    {
      area: "Area 2",
      bounds: outerBounds,
      jobs: 400,
      mainJobs: ["React Developer", "Project Manager"],
    },
    {
      area: "Area 3",
      bounds: innerBounds2,
      jobs: 350,
      mainJobs: ["Backend Developer", "DevOps Engineer"],
    },
    {
      area: "Area 4",
      bounds: outerBounds2,
      jobs: 300,
      mainJobs: ["Full Stack Developer", "Cloud Engineer"],
    },
  ];

  const innerHandlers = useMemo(
    () => ({
      click() {
        setBounds(innerBounds);
        map.fitBounds(innerBounds);
      },
    }),
    [map]
  );
  const outerHandlers = useMemo(
    () => ({
      click() {
        setBounds(outerBounds);
        map.fitBounds(outerBounds);
      },
    }),
    [map]
  );

  const innerHandlers2 = useMemo(
    () => ({
      click() {
        setBounds(innerBounds2);
        map.fitBounds(innerBounds2);
      },
    }),
    [map]
  );
  const outerHandlers2 = useMemo(
    () => ({
      click() {
        setBounds(outerBounds2);
        map.fitBounds(outerBounds2);
      },
    }),
    [map]
  );

  return (
    <>
      {jobData.map((data, index) => (
        <>
          <Rectangle
            key={`rectangle-${index}`}
            bounds={data.bounds}
            eventHandlers={
              data.bounds === innerBounds
                ? innerHandlers
                : data.bounds === outerBounds
                  ? outerHandlers
                  : data.bounds === innerBounds2
                    ? innerHandlers2
                    : outerHandlers2
            }
            pathOptions={bounds === data.bounds ? redColor : whiteColor}
          />
          <Marker
            key={`marker-${index}`}
            position={[
              (data.bounds[0][0] + data.bounds[1][0]) / 2,
              (data.bounds[0][1] + data.bounds[1][1]) / 2,
            ]}
          >
            <Popup>
              <b>{data.area}</b>
              <br />
              <b>Total Jobs:</b> {data.jobs}
              <br />
              <b>Main Jobs:</b> {data.mainJobs.join(", ")}
            </Popup>
          </Marker>
        </>
      ))}
    </>
  );
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function MarketAnalytics() {
  const [jobRole, setJobRole] = useState("Software Engineer");
  const [industry, setIndustry] = useState("Technology");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(
    generateMockData("Software Engineer", "Technology")
  );
  const [aspirational, setAspirational] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setData(generateMockData(jobRole, industry));
      setIsLoading(false);
    }, 1000);
  }, [jobRole, industry]);

  const renderAnalysis = () => {
    const jobDemand = data.jobDemandData[data.jobDemandData.length - 1].demand;
    const topSalaryRange = data.salaryData.reduce((max, item) =>
      item.count > max.count ? item : max
    ).range;
    const topSkill = data.skillsData.reduce((max, item) =>
      item.required > max.required ? item : max
    ).name;
    const topCompany = data.topCompaniesData[0].name;
    const growthForecast =
      data.growthForecastData[data.growthForecastData.length - 1].growth;

    return (
      <div className=" text-black p-6 rounded-lg shadow-sm mb-6 border-2 ">
        <h2 className="text-2xl font-bold mb-4">Key Insights</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <TrendingUp className="mr-2" /> Job demand is currently at{" "}
            {jobDemand} openings
          </li>
          <li className="flex items-center">
            <DollarSign className="mr-2" /> The most common salary range is{" "}
            {topSalaryRange}
          </li>
          <li className="flex items-center">
            <Briefcase className="mr-2" /> The most in-demand skill is{" "}
            {topSkill}
          </li>
          <li className="flex items-center">
            <Users className="mr-2" /> {topCompany} is the top hiring company
          </li>
          <li className="flex items-center">
            <LineChartIcon className="mr-2" /> The projected growth for 2027 is{" "}
            {growthForecast}%
          </li>
        </ul>
      </div>
    );
  };

  const renderTooltip = (title, content) => {
    return (
      <div className="bg-white p-2 rounded shadow-md">
        <h3 className="font-bold">{title}</h3>
        <p>{content}</p>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 min-h-screen p-2"
    >
      <div className="flex justify-between items-center p-4 rounded-lg border-2">
        <h1 className="text-3xl font-bold text-black">
          Market Analytics Dashboard
        </h1>
        <div className="flex space-x-4">
          <Select onValueChange={setJobRole} defaultValue={jobRole}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select job role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Software Engineer">
                Software Engineer
              </SelectItem>
              <SelectItem value="Data Scientist">Data Scientist</SelectItem>
              <SelectItem value="Product Manager">Product Manager</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setIndustry} defaultValue={industry}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {renderAnalysis()}

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChartIcon className="mr-2" />
              Job Demand Trends for {jobRole} in {industry}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.jobDemandData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  content={({ payload, label }) =>
                    renderTooltip(
                      "Job Demand",
                      `${label}: ${payload?.[0]?.value} openings`
                    )
                  }
                />
                <Legend />
                <Line type="monotone" dataKey="demand" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="mr-2" />
              Salary Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip
                  content={({ payload, label }) =>
                    renderTooltip(
                      "Salary Range",
                      `${label}: ${payload?.[0]?.value} employees`
                    )
                  }
                />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2" />
              Required Skills vs Candidate Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.skillsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ payload, label }) =>
                    renderTooltip(
                      "Skill Comparison",
                      `${label}: Required - ${payload?.[0]?.value}%, Average - ${payload?.[1]?.value}%`
                    )
                  }
                />
                <Legend />
                <Bar dataKey="required" fill="#8884d8" />
                <Bar dataKey="average" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="mr-2" />
              Top Hiring Companies
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.topCompaniesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.topCompaniesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ payload }) =>
                    renderTooltip(
                      "Company Hiring",
                      `${payload?.[0]?.name}: ${payload?.[0]?.value} openings`
                    )
                  }
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex flex-row items-center align-middle">
              <AlertCircle className="mr-2" />
              Job Locations
              <Button
                className=""
                variant="link"
                onClick={() => setAspirational(true)}
              >
                Explore Aspirational Districts
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={4}
              style={{ height: "100%", width: "100%" }}
              bounds={outerBounds}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {aspirational && <SetBoundsRectangles />}
              {data.jobLocationsData.map((location, index) => (
                <Marker key={index} position={[location.lat, location.lng]}>
                  <Popup>
                    {location.name}: {location.jobs} jobs
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2" />
              Experience Level Demand
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.experienceLevelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ payload, label }) =>
                    renderTooltip(
                      "Experience Level",
                      `${label}: Full-time - ${payload?.[0]?.value}, Part-time - ${payload?.[1]?.value}, Contract - ${payload?.[2]?.value}`
                    )
                  }
                />
                <Legend />
                <Bar dataKey="fullTime" stackId="a" fill="#8884d8" />
                <Bar dataKey="partTime" stackId="a" fill="#82ca9d" />
                <Bar dataKey="contract" stackId="a" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="mr-2" />
              Industry Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={data.industryTrendsData}
                dataKey="value"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
              >
                <Tooltip
                  content={({ payload }) =>
                    renderTooltip(
                      "Industry Trend",
                      `${payload?.[0]?.name}: ${payload?.[0]?.value} openings`
                    )
                  }
                />
              </Treemap>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="mr-2" />
              Contract Types
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.contractTypesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {data.contractTypesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ payload }) =>
                    renderTooltip(
                      "Contract Type",
                      `${payload?.[0]?.name}: ${payload?.[0]?.value}%`
                    )
                  }
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" />
              Skill Premium Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid />
                <XAxis type="number" dataKey="demand" name="Demand" unit="%" />
                <YAxis
                  type="number"
                  dataKey="premium"
                  name="Salary Premium"
                  unit="%"
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={({ payload }) =>
                    renderTooltip(
                      "Skill Premium",
                      `${payload?.[0]?.payload.skill}: Demand - ${payload?.[0]?.value}%, Premium - ${payload?.[0]?.payload.premium}%`
                    )
                  }
                />
                <Scatter
                  name="Skills"
                  data={data.skillPremiumData}
                  fill="#8884d8"
                >
                  {data.skillPremiumData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChartIcon className="mr-2" />
              Growth Forecast
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data.growthForecastData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip
                  content={({ payload, label }) =>
                    renderTooltip(
                      "Growth Forecast",
                      `${label}: ${payload?.[0]?.value}% growth`
                    )
                  }
                />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Area
                  type="monotone"
                  dataKey="growth"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
                <Line type="monotone" dataKey="growth" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
