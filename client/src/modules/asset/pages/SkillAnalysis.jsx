"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Brain,
  BrainCircuit,
  ChevronUp,
  GraduationCap,
  User,
  Database,
  Star,
  Users,
  TrendingUp,
  HelpCircle,
  Download,
  FileText,
  MapPin,
  PieChart,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
} from "recharts";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Helper Components
const HelpButton = ({ content }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <HelpCircle className="h-5 w-5 text-blue-500" />
          <span className="sr-only">Help</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" className="w-80">
        <div className="space-y-2">
          <video className="w-full rounded-lg" controls>
            <source src="/placeholder-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-sm">{content}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const GradientPill = ({ children }) => (
  <span className="inline-block px-3 py-1 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
    {children}
  </span>
);

// Skill Gap Analysis Component
const SkillGapAnalysis = () => {
  const [selectedRole, setSelectedRole] = useState("Software Engineer");
  const [selectedDomain, setSelectedDomain] = useState("Web Development");

  const roleData = {
    "Software Engineer": [
      { skill: "JavaScript", current: 80, required: 90 },
      { skill: "React", current: 75, required: 85 },
      { skill: "Node.js", current: 70, required: 80 },
      { skill: "SQL", current: 65, required: 75 },
      { skill: "DevOps", current: 60, required: 70 },
    ],
    "Data Scientist": [
      { skill: "Python", current: 85, required: 90 },
      { skill: "Machine Learning", current: 80, required: 90 },
      { skill: "Data Visualization", current: 75, required: 85 },
      { skill: "Statistics", current: 70, required: 80 },
      { skill: "Big Data", current: 65, required: 75 },
    ],
  };

  const domainData = {
    "Web Development": [
      { skill: "Frontend", current: 80, required: 90 },
      { skill: "Backend", current: 75, required: 85 },
      { skill: "Database", current: 70, required: 80 },
      { skill: "API Design", current: 65, required: 75 },
      { skill: "Security", current: 60, required: 70 },
    ],
    "Machine Learning": [
      { skill: "Algorithms", current: 85, required: 90 },
      { skill: "Neural Networks", current: 80, required: 90 },
      { skill: "NLP", current: 75, required: 85 },
      { skill: "Computer Vision", current: 70, required: 80 },
      { skill: "Reinforcement Learning", current: 65, required: 75 },
    ],
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">
            Skill Gap Analysis
          </CardTitle>
          <HelpButton content="This chart shows the gap between your current skill levels and the required levels for your selected role and domain." />
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <Select onValueChange={setSelectedRole} defaultValue={selectedRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Software Engineer">
                  Software Engineer
                </SelectItem>
                <SelectItem value="Data Scientist">Data Scientist</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={setSelectedDomain}
              defaultValue={selectedDomain}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Machine Learning">
                  Machine Learning
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Tabs defaultValue="role">
            <TabsList>
              <TabsTrigger value="role">By Role</TabsTrigger>
              <TabsTrigger value="domain">By Domain</TabsTrigger>
            </TabsList>
            <TabsContent value="role">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roleData[selectedRole]} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="skill" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="current"
                      name="Current Level"
                      fill="#8884d8"
                    />
                    <Bar
                      dataKey="required"
                      name="Required Level"
                      fill="#82ca9d"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="domain">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={domainData[selectedDomain]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Current Level"
                      dataKey="current"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Required Level"
                      dataKey="required"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// AI Skill Inference Component
const AISkillInference = () => {
  const inferences = [
    {
      title: "Learning Potential",
      score: "High",
      source: "LinkedIn Learning History",
    },
    { title: "Experience Relevance", score: "85%", source: "Resume Analysis" },
    {
      title: "Leadership Readiness",
      score: "Advanced",
      source: "360 Feedback Reports",
    },
    {
      title: "Problem-Solving Skills",
      score: "Exceptional",
      source: "Coding Challenge Results",
    },
    {
      title: "Communication Skills",
      score: "Above Average",
      source: "Interview Assessments",
    },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <BrainCircuit className="h-6 w-6 text-purple-500" />
            AI Skill Inference
          </CardTitle>
          <HelpButton content="This section uses AI to infer your skills based on various data sources and assessments." />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inferences.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.title}</span>
                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    {item.score}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Database className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Source: {item.source}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// AI Skill Match Component
const AISkillMatch = () => {
  const matchScore = 85;
  const highlightedAreas = [
    { skill: "Technical Expertise", score: 95 },
    { skill: "Problem Solving", score: 90 },
    { skill: "Team Collaboration", score: 88 },
    { skill: "Continuous Learning", score: 92 },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Brain className="h-6 w-6 text-green-500" />
            AI Skills Match
          </CardTitle>
          <HelpButton content="This component shows how well your skills match with the ideal profile for your role." />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Ideal Profile Match</span>
                <span className="font-bold text-2xl text-green-500">
                  {matchScore}%
                </span>
              </div>
              <Progress
                value={matchScore}
                className="h-2 bg-green-100"
                indicatorClassName="bg-green-500"
              />
            </div>
            <div>
              <h4 className="font-medium mb-2">Highlighted Areas</h4>
              <div className="grid gap-3">
                {highlightedAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-2 bg-gradient-to-r from-green-50 to-blue-50 rounded"
                  >
                    <span>{area.skill}</span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700"
                    >
                      {area.score}%
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <ChevronUp className="h-4 w-4" />
              <span>Top 5% of candidates</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Complex Skill Meter Component
const ComplexSkillMeter = () => {
  const overallScore = 78;
  const skillCategories = [
    { name: "Technical Skills", score: 85, color: "#4CAF50" },
    { name: "Soft Skills", score: 75, color: "#2196F3" },
    { name: "Domain Knowledge", score: 80, color: "#FFC107" },
    { name: "Problem Solving", score: 90, color: "#9C27B0" },
    { name: "Leadership", score: 70, color: "#FF5722" },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="col-span-2"
    >
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">
            Comprehensive Skill Assessment
          </CardTitle>
          <HelpButton content="This meter provides a detailed breakdown of your skills across various categories." />
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative w-48 h-48"
            >
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-muted-foreground stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                ></circle>
                <circle
                  className="text-primary stroke-current"
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray={`${overallScore * 2.51327} ${251.327 - overallScore * 2.51327}`}
                  strokeDashoffset="62.83"
                ></circle>
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold">
                {overallScore}%
              </div>
            </motion.div>
          </div>
          <div className="grid gap-4">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between text-sm font-medium">
                  <span>{category.name}</span>
                  <span>{category.score}%</span>
                </div>
                <Progress
                  value={category.score}
                  className="h-2"
                  indicatorClassName="transition-all"
                  style={{ backgroundColor: category.color }}
                />
              </motion.div>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Skill Meter Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The overall score is calculated based on a weighted average of
                individual skill categories. Each category contributes
                differently to your professional profile, with technical skills
                and problem-solving having higher weightage. Focus on improving
                areas with lower scores to enhance your overall skill
                proficiency.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Skill Benchmarking Component
const SkillBenchmarking = () => {
  const data = [
    { subject: "Leadership", A: 120, B: 110, C: 90, fullMark: 150 },
    { subject: "Technical", A: 98, B: 130, C: 95, fullMark: 150 },
    { subject: "Communication", A: 86, B: 130, C: 100, fullMark: 150 },
    { subject: "Problem Solving", A: 99, B: 100, C: 85, fullMark: 150 },
    { subject: "Teamwork", A: 85, B: 90, C: 100, fullMark: 150 },
    { subject: "Innovation", A: 65, B: 85, C: 90, fullMark: 150 },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">
            Skill Benchmarking
          </CardTitle>
          <HelpButton content="This chart compares your skills against industry benchmarks and your team's average." />
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                  name="You"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Industry Benchmark"
                  dataKey="B"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Team Average"
                  dataKey="C"
                  stroke="#ffc658"
                  fill="#ffc658"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Self Evaluation Metrics Component
const SelfEvaluationMetrics = () => {
  const evaluationData = [
    { category: "Technical Proficiency", score: 4.2 },
    { category: "Communication", score: 3.8 },
    { category: "Problem Solving", score: 4.5 },
    { category: "Teamwork", score: 4.0 },
    { category: "Leadership", score: 3.5 },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <User className="h-6 w-6 text-blue-500" />
            Self Evaluation Metrics
          </CardTitle>
          <HelpButton content="This chart shows your self-assessed scores across various skill categories." />
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evaluationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 5]} />
                <YAxis dataKey="category" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8">
                  {evaluationData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.score > 4
                          ? "#4CAF50"
                          : entry.score > 3
                            ? "#FFC107"
                            : "#FF5722"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Based on your self-assessment, you excel in Problem Solving and
              Technical Proficiency. Consider focusing on improving your
              Leadership skills for future growth opportunities.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Mentor Evaluation Component
const MentorEvaluation = () => {
  const mentorData = [
    { month: "Jan", technical: 3.5, soft: 3.2, overall: 3.4 },
    { month: "Feb", technical: 3.7, soft: 3.4, overall: 3.6 },
    { month: "Mar", technical: 3.9, soft: 3.6, overall: 3.8 },
    { month: "Apr", technical: 4.1, soft: 3.8, overall: 4.0 },
    { month: "May", technical: 4.3, soft: 4.0, overall: 4.2 },
    { month: "Jun", technical: 4.5, soft: 4.2, overall: 4.4 },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="col-span-2"
    >
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Users className="h-6 w-6 text-indigo-500" />
            Mentor Evaluation Ratings
          </CardTitle>
          <HelpButton content="This chart shows your skill progression based on mentor evaluations over time." />
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart">
            <TabsList>
              <TabsTrigger value="chart">Progress Chart</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="chart">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={mentorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="technical"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="soft" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="overall" stroke="#ffc658" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="analysis">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Overall Trend:</span>
                  <Badge variant="outline" className="flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Positive Growth
                  </Badge>
                </div>
                <Progress value={88} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Your mentor evaluations show consistent improvement across
                  both technical and soft skills. The rate of improvement in
                  technical skills is slightly higher, indicating your focus on
                  technical growth. Continue to balance your development in both
                  areas for optimal career progression.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Key Strength</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>Technical Skill Growth</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Area for Improvement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Soft Skills Development</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Top 5% Skills by Location Component
const TopSkillsByLocation = () => {
  const locationData = [
    { location: "Bangalore", skill: "Machine Learning", percentile: 98 },
    { location: "Mumbai", skill: "Data Visualization", percentile: 97 },
    { location: "Delhi", skill: "Cloud Architecture", percentile: 96 },
    { location: "Hyderabad", skill: "Blockchain Development", percentile: 95 },
    { location: "Pune", skill: "Robotics", percentile: 94 },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <MapPin className="h-6 w-6 text-red-500" />
            Top 5% Skills by Location
          </CardTitle>
          <HelpButton content="This chart shows your top skills compared to professionals in different locations across India." />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {locationData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-2 bg-gradient-to-r from-red-50 to-orange-50 rounded"
              >
                <div className="flex items-center gap-2">
                  <GradientPill>{item.location}</GradientPill>
                  <span className="font-medium">{item.skill}</span>
                </div>
                <Badge variant="secondary" className="bg-red-100 text-red-700">
                  Top {100 - item.percentile}%
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// New Component: Skill Distribution
const SkillDistribution = () => {
  const data = [
    { name: "Technical Skills", value: 400 },
    { name: "Soft Skills", value: 300 },
    { name: "Domain Knowledge", value: 200 },
    { name: "Leadership", value: 100 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <PieChart className="h-6 w-6 text-blue-500" />
            Skill Distribution
          </CardTitle>
          <HelpButton content="This chart shows the distribution of your skills across different categories." />
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// New Component: Skill Growth Trajectory
const SkillGrowthTrajectory = () => {
  const data = [
    { name: "Jan", technical: 65, soft: 70, domain: 60 },
    { name: "Feb", technical: 68, soft: 72, domain: 62 },
    { name: "Mar", technical: 75, soft: 74, domain: 65 },
    { name: "Apr", technical: 80, soft: 76, domain: 68 },
    { name: "May", technical: 82, soft: 78, domain: 72 },
    { name: "Jun", technical: 85, soft: 80, domain: 75 },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-background rounded-md p-4 shadow-sm"
    >
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Activity className="h-6 w-6 text-green-500" />
            Skill Growth Trajectory
          </CardTitle>
          <HelpButton content="This chart shows your skill growth trajectory over time across different skill categories." />
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="technical"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="soft"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="domain"
                  stackId="1"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Main Component
export default function SkillAnalysis() {
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto p-8 space-y-4"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Skills Gap Analysis</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowHelp(!showHelp)}
            className="h-8 w-8 hover:bg-muted transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Help</span>
          </Button>
        </div>
        <Badge variant="secondary" className="text-lg">
          Role: Technical Lead
        </Badge>
      </div>

      {/* Welcome Message */}
      <Card className="mb-6 shadow-lg">
        <CardContent className="pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Hey, Yashaswee
            </h2>
            <div className="flex gap-6 items-start">
              <div className="space-y-2 flex-1">
                <p className="text-lg text-muted-foreground">
                  Welcome to your Advanced Skills Analysis Dashboard. This
                  intelligent platform analyzes your technical abilities, soft
                  skills, and professional growth trajectory. Use the insights
                  provided to identify areas for improvement and track your
                  progress towards your career goals in the Indian tech
                  industry.
                </p>
              </div>
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Dashboard Overview"
                className="rounded-lg shadow-lg hidden md:block"
              />
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skill Gap</CardTitle>
              <GraduationCap className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent className="flex items-center">
              <img
                src="/placeholder.svg?height=80&width=80"
                alt="Skill Gap Illustration"
                className="mr-4"
              />
              <div>
                <div className="text-2xl font-bold">15%</div>
                <p className="text-xs text-muted-foreground">
                  Improvement needed
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                AI Match Score
              </CardTitle>
              <Brain className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent className="flex items-center">
              <img
                src="/placeholder.svg?height=80&width=80"
                alt="AI Match Score Illustration"
                className="mr-4"
              />
              <div>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">
                  Ideal profile match
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Growth Trend
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent className="flex items-center">
              <img
                src="/placeholder.svg?height=80&width=80"
                alt="Growth Trend Illustration"
                className="mr-4"
              />
              <div>
                <div className="text-2xl font-bold">+12%</div>
                <p className="text-xs text-muted-foreground">
                  Month-over-month improvement
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Help Card */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6 shadow-lg">
              <CardHeader>
                <CardTitle>Dashboard Help</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This dashboard provides a comprehensive view of your skills
                  and professional growth in the Indian tech industry. Use the
                  "View Detailed Report" button to see in-depth analyses of your
                  skills. The summary cards at the top give you a quick overview
                  of your current status. Each chart and graph comes with a help
                  button that explains its purpose and how to interpret the
                  data.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <Button
          className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
          onClick={() => setShowDetailedReport(!showDetailedReport)}
        >
          <FileText className="h-4 w-4" />
          {showDetailedReport ? "Hide Detailed Report" : "View Detailed Report"}
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Main Grid */}
      <AnimatePresence>
        {showDetailedReport && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {isLoading ? (
              // Skeleton loading state
              <>
                {[...Array(9)].map((_, i) => (
                  <Card key={i} className="shadow-lg">
                    <CardHeader>
                      <Skeleton className="h-4 w-[250px]" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-[200px] w-full" />
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              // Actual content
              <>
                <SkillGapAnalysis />
                <SkillBenchmarking />
                <AISkillInference />
                <AISkillMatch />
                <ComplexSkillMeter />
                <SelfEvaluationMetrics />
                <MentorEvaluation />
                <TopSkillsByLocation />
                <SkillDistribution />
                <SkillGrowthTrajectory />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
