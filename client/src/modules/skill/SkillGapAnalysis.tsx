"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Brain,
  BrainCircuit,
  ChevronUp,
  GraduationCap,
  Briefcase,
  User,
  Target,
  Filter,
  Database,
  Star,
  Book,
  Users,
  TrendingUp,
  HelpCircle,
  Download,
  FileText,
  ChevronRight,
  MapPin,
  MessageSquare,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  Tooltip as TooltipComponent,
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
          <HelpCircle className="h-5 w-5" />
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Skill Gap Analysis</CardTitle>
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
              <SelectItem value="Machine Learning">Machine Learning</SelectItem>
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
                  <Bar dataKey="current" name="Current Level" fill="#8884d8" />
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5" />
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
              className="flex flex-col p-3 rounded-lg bg-muted"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{item.title}</span>
                <Badge>{item.score}</Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Database className="h-4 w-4 mr-2" />
                <span>Source: {item.source}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Skills Match
        </CardTitle>
        <HelpButton content="This component shows how well your skills match with the ideal profile for your role." />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Ideal Profile Match</span>
              <span className="font-bold text-2xl">{matchScore}%</span>
            </div>
            <Progress value={matchScore} className="h-2" />
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
                  className="flex items-center justify-between p-2 bg-muted rounded"
                >
                  <span>{area.skill}</span>
                  <Badge variant="secondary">{area.score}%</Badge>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ChevronUp className="h-4 w-4" />
            <span>Top 5% of candidates</span>
          </div>
        </div>
      </CardContent>
    </Card>
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
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Comprehensive Skill Assessment</CardTitle>
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
                className="text-primary  stroke-current"
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
              individual skill categories. Each category contributes differently
              to your professional profile, with technical skills and
              problem-solving having higher weightage. Focus on improving areas
              with lower scores to enhance your overall skill proficiency.
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Skill Benchmarking</CardTitle>
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
                name="Current"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Radar
                name="Target"
                dataKey="B"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
              />
              <Radar
                name="Team Avg"
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
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
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
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
                <LineChart data={mentorData}>
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
                </LineChart>
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
                Your mentor evaluations show consistent improvement across both
                technical and soft skills. The rate of improvement in technical
                skills is slightly higher, indicating your focus on technical
                growth. Continue to balance your development in both areas for
                optimal career progression.
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
  );
};

// Top 5% Skills by Location Component
const TopSkillsByLocation = () => {
  const locationData = [
    { location: "San Francisco", skill: "Machine Learning", percentile: 98 },
    { location: "New York", skill: "Data Visualization", percentile: 97 },
    { location: "London", skill: "Cloud Architecture", percentile: 96 },
    { location: "Berlin", skill: "Blockchain Development", percentile: 95 },
    { location: "Tokyo", skill: "Robotics", percentile: 94 },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Top 5% Skills by Location
        </CardTitle>
        <HelpButton content="This chart shows your top skills compared to professionals in different locations." />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {locationData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-2 bg-muted rounded"
            >
              <div className="flex items-center gap-2">
                <GradientPill>{item.location}</GradientPill>
                <span className="font-medium">{item.skill}</span>
              </div>
              <Badge variant="secondary">Top {100 - item.percentile}%</Badge>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Component
export default function SkillAnalysis() {
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const AISummary = ({ reports }) => {
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-8 space-y-8"
      >
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">
              Advanced Skills Analysis Dashboard
            </h1>
            <HelpButton content="This dashboard provides an in-depth analysis of your skills, benchmarking against industry standards, and personalized AI-driven insights to guide your professional development." />
          </div>
          <Badge variant="secondary" className="text-lg">
            Role: Technical Lead
          </Badge>
        </div>

        {/* Welcome Message */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg"
            >
              Hey, Smita!
            </motion.p>
          </CardContent>
        </Card>

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

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Skill Gap</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15%</div>
                <p className="text-xs text-muted-foreground">
                  Improvement needed
                </p>
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Skill Gap Illustration"
                  className="mt-2"
                />
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  AI Match Score
                </CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">
                  Ideal profile match
                </p>
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="AI Match Score Illustration"
                  className="mt-2"
                />
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Growth Trend
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12%</div>
                <p className="text-xs text-muted-foreground">
                  Month-over-month improvement
                </p>
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Growth Trend Illustration"
                  className="mt-2"
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <Button
            className="flex items-center gap-2"
            onClick={() => setShowDetailedReport(!showDetailedReport)}
          >
            <FileText className="h-4 w-4" />
            {showDetailedReport
              ? "Hide Detailed Report"
              : "View Detailed Report"}
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        {/* Help Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Dashboard Help</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This dashboard provides a comprehensive view of your skills and
              professional growth. Use the "View Detailed Report" button to see
              in-depth analyses of your skills. The summary cards at the top
              give you a quick overview of your current status. Each chart and
              graph comes with a help button that explains its purpose and how
              to interpret the data.
            </p>
          </CardContent>
        </Card>

        {/* Main Grid */}
        <AnimatePresence>
          {showDetailedReport && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {isLoading ? (
                // Skeleton loading state
                <>
                  {[...Array(7)].map((_, i) => (
                    <Card key={i}>
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
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };
}
