"use client";

import { getHours } from "date-fns";
import { useNodesState, useEdgesState } from "reactflow";
import ReactFlow from "reactflow";
import { Background, Controls } from "reactflow";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PolarAngleAxis, Radar, RadarChart } from "recharts";
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Area, AreaChart } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Clock,
  Code,
  UserIcon,
  TargetIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  MoveUpRight,
  SquareArrowOutUpRight,
  BookUser,
  BriefcaseBusiness,
  UserRoundCheck,
  LockIcon,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SparklesText from "@/components/ui/sparkles-text";
import { Skeleton } from "@mui/material";
import { Separator } from "@/components/ui/separator";

import { TrendingUp } from "lucide-react";
import { PolarGrid, RadialBar, RadialBarChart } from "recharts";
import ApexCharts from "react-apexcharts";
import { Bar, BarChart, LabelList } from "recharts";
// Mock data (unchanged from previous example)
import strings from "../i18n";

const competencyData = [
  { time: "January", accuracy: 75, timeSpent: 120, score: 80 },
  { time: "February", accuracy: 82, timeSpent: 115, score: 85 },
  { time: "March", accuracy: 68, timeSpent: 130, score: 75 },
  { time: "April", accuracy: 90, timeSpent: 105, score: 93 },
  { time: "May", accuracy: 76, timeSpent: 125, score: 78 },
  { time: "June", accuracy: 88, timeSpent: 100, score: 89 },
  { time: "July", accuracy: 95, timeSpent: 85, score: 97 },
  { time: "August", accuracy: 81, timeSpent: 110, score: 84 },
  { time: "September", accuracy: 92, timeSpent: 95, score: 94 },
  { time: "October", accuracy: 98, timeSpent: 80, score: 99 },
  { time: "November", accuracy: 83, timeSpent: 115, score: 87 },
  { time: "December", accuracy: 96, timeSpent: 90, score: 98 },
];

const recentNotifications = [
  {
    id: 1,
    message: "Fantastic work on your React project!",
    mentor: "Rajesh Sharma",
    avatar: "https://i.pravatar.cc/150?u=rajeshsharma",
  },
  {
    id: 2,
    message: "Our mentoring session is scheduled for tomorrow",
    mentor: "Priya Mehta",
    avatar: "https://i.pravatar.cc/150?u=priyamehta",
  },
  {
    id: 3,
    message: "Reviewed your Node.js code. Let's discuss improvements.",
    mentor: "Amit Verma",
    avatar: "https://i.pravatar.cc/150?u=amitverma",
  },
];

const recentAchievements = [
  {
    id: 1,
    title: "Algorithm Master",
    description: "Solved 100 algorithm challenges",
    icon: "🏆",
  },
  {
    id: 2,
    title: "Bug Squasher",
    description: "Fixed 50 critical bugs",
    icon: "🐛",
  },
  {
    id: 3,
    title: "Code Reviewer",
    description: "Reviewed 25 pull requests",
    icon: "👀",
  },
];

const goal = {
  statement: "Become a Skilled Silayi-Bunai Entrepreneur in 6 Months",
  description:
    "Master traditional and modern tailoring techniques, build a portfolio of customized designs, and establish a local clientele by leveraging prashikshan programs and samudayik events.",
  timeframe: "By Q2 2024",
  progress: 45,
  milestones: [
    {
      title: "Complete DDUGKY-sponsored tailoring certification",
      completed: true,
    },
    {
      title: "Design and create 10 custom outfits for local clients",
      completed: true,
    },
    {
      title: "Participate in 2 local melas or exhibitions",
      completed: false,
    },
    {
      title: "Secure at least 5 regular clients",
      completed: false,
    },
    {
      title: "Master advanced embroidery (kadhai) and stitching techniques",
      completed: false,
    },
  ],
};

const communityNotifications = [
  {
    id: 1,
    message: "New coding challenge posted in the forum",
    link: "/forum/challenges",
  },
  {
    id: 2,
    message: 'Upcoming webinar on "Mastering React Hooks"',
    link: "/events/webinars",
  },
  {
    id: 3,
    message: "Community code review session this Friday",
    link: "/events/code-review",
  },
];

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "HTML/CSS" },
    type: "input",
  },
  { id: "2", position: { x: 200, y: 0 }, data: { label: "JavaScript" } },
  { id: "3", position: { x: 400, y: 0 }, data: { label: "React" } },
  { id: "4", position: { x: 600, y: 0 }, data: { label: "Node.js" } },
  { id: "5", position: { x: 800, y: 0 }, data: { label: "Express.js" } },
  { id: "6", position: { x: 1000, y: 0 }, data: { label: "Databases" } },
  { id: "7", position: { x: 200, y: 150 }, data: { label: "TypeScript" } },
  { id: "8", position: { x: 400, y: 150 }, data: { label: "Next.js" } },
  { id: "9", position: { x: 600, y: 150 }, data: { label: "GraphQL" } },
  { id: "10", position: { x: 800, y: 150 }, data: { label: "Docker" } },
  { id: "11", position: { x: 1000, y: 150 }, data: { label: "CI/CD" } },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    markerEnd: { type: "arrowclosed", id: "arrow" }, // Use a string or another JavaScript compatible value
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    markerEnd: { type: "arrowclosed", id: "arrow" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    markerEnd: { type: "arrowclosed", id: "arrow" },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: true,
    markerEnd: { type: "arrowclosed", id: "arrow" },
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    animated: true,
    markerEnd: { type: "arrowclosed", id: "arrow" },
  },
  {
    id: "e2-7",
    source: "2",
    target: "7",
    animated: true,
    markerEnd: { type: "arrowclosed", id: "arrow" },
  },
  {
    id: "e3-8",
    source: "3",
    target: "8",
    animated: true,
    markerEnd: { type: "arrowclosed", id: "arrow" },
  },
  {
    id: "e4-9",
    source: "4",
    target: "9",
    animated: true,
    markerEnd: { type: "arrowclosed", id: "arrow" },
  },
  {
    id: "e5-10",
    source: "5",
    target: "10",
    animated: true,
    markerEnd: { type: "arrowclosed", id: "arrow" },
  },
  {
    id: "e6-11",
    source: "6",
    target: "11",
    animated: true,
    markerEnd: { type: "arrowclosed", id: "arrow" },
  },
];

const chartConfig = {
  accuracy: {
    label: "Accuracy",
    color: "hsl(var(--chart-1))",
  },
  timeSpent: {
    label: "Time Spent",
    color: "hsl(var(--chart-2))",
  },
  score: {
    label: "Score",
    color: "hsl(var(--chart-3))",
  },
};

const CareerRoadmap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <Card className="bg-white flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Career Roadmap</CardTitle>
        <TargetIcon className="w-8 h-8 text-blue-500" />
      </CardHeader>
      <CardContent className="h-[300px]">
        <Separator className="mt-1 mb-2" />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          defs={
            <defs>
              <marker
                id="arrow"
                markerWidth="10"
                markerHeight="10"
                refX="10"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L0,6 L9,3 z" fill="#000" />
              </marker>
            </defs>
          }
        >
          <Background />
          <Controls />
        </ReactFlow>
      </CardContent>
    </Card>
  );
};

const ScoreCard = ({ title, score }) => {
  const [state, setState] = React.useState({
    series: [score],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.5,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.7,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px",
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: "#111",
              fontSize: "36px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Score"],
    },
  });

  return (
    <Card className="bg-white flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bol">{title}</CardTitle>
        <TargetIcon className="w-8 h-8 text-blue-500" />
      </CardHeader>
      <CardContent>
        <Separator className="mt-1 mb-2" />
        <ApexCharts
          options={state.options}
          series={state.series}
          type="radialBar"
          height={200}
        />
      </CardContent>
    </Card>
  );
};

const StrategicGoal = ({ loading }) => {
  return (
    <Card className="bg-white flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Strategic Goal</CardTitle>
        <TargetIcon className="w-8 h-8 text-blue-500" />
      </CardHeader>
      <CardContent>
        <Separator className="mt-1 mb-2" />
        {loading ? (
          <Skeleton className="h-32 w-full" />
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-800">
              {goal?.statement}
            </h3>
            <p className="text-gray-600 mt-2">{goal?.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-medium text-gray-500">
                {goal?.timeframe}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {goal?.progress}% Complete
              </span>
            </div>
            <Progress value={goal?.progress} className="mt-2" />
            <Separator className="my-4" />
            <h4 className="font-semibold text-gray-700 mb-2">Key Milestones</h4>
            <ul className="space-y-2">
              {goal?.milestones.map((milestone, index) => (
                <li key={index} className="flex items-center">
                  <span
                    className={`mr-2 ${
                      milestone.completed ? "text-green-500" : "text-gray-400"
                    }`}
                  >
                    {milestone.completed ? (
                      <CheckCircleIcon className="w-5 h-5" />
                    ) : (
                      <AlertCircleIcon className="w-5 h-5" />
                    )}
                  </span>
                  <span
                    className={`text-sm ${
                      milestone.completed ? "text-gray-700" : "text-gray-500"
                    }`}
                  >
                    {milestone.title}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Detailed Strategic S.W.O.T Goal Analysis
        </Button>
      </CardFooter>
    </Card>
  );
};

const LearningProgress = () => {
  return (
    <Card className="bg-white flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bol">Your Learning Goal</CardTitle>
        <TargetIcon className="w-8 h-8 text-blue-500" />
      </CardHeader>
      <CardContent>
        <Separator className="mt-1 mb-2" />
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {goal?.statement}
        </h3>
        <Tabs defaultValue="competency" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="competency">Competency Diagnostic</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          <TabsContent value="competency">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ChartContainer config={chartConfig}>
                  <AreaChart
                    accessibilityLayer
                    data={competencyData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="time"
                      tickLine={true}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={true}
                      content={<ChartTooltipContent />}
                    />
                    <defs>
                      <linearGradient
                        id="fillAccuracy"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-accuracy)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-accuracy)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="fillTimeSpent"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-timeSpent)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-timeSpent)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="fillScore"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-score)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-score)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      dataKey="accuracy"
                      type="natural"
                      fill="url(#fillAccuracy)"
                      fillOpacity={0.4}
                      stroke="var(--color-accuracy)"
                      stackId="a"
                    />
                    <Area
                      dataKey="timeSpent"
                      type="natural"
                      fill="url(#fillTimeSpent)"
                      fillOpacity={0.4}
                      stroke="var(--color-timeSpent)"
                      stackId="a"
                    />
                    <Area
                      dataKey="score"
                      type="natural"
                      fill="url(#fillScore)"
                      fillOpacity={0.4}
                      stroke="var(--color-score)"
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="achievements">
            <ul className="space-y-4">
              {recentAchievements.map((achievement) => (
                <motion.li
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <p className="font-semibold">{achievement.title}</p>
                    <p className="text-sm text-gray-600">
                      {achievement.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const ResumeWork = () => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Resume Your Work</CardTitle>
        <CardDescription>Pick up where you left off</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 text-blue-700 p-3 rounded-full">
              <Code className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">LeetCode Problem #217</p>
              <p className="text-sm text-gray-600">Contains Duplicate</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Last session: 2023-06-15 14:30 (1h 45m)</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => null}>
          Resume Session
        </Button>
      </CardFooter>
    </Card>
  );
};

const Interventions = () => {
  const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
  ];
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  };
  return (
    <div className="relative">
      {/* Silver background overlay */}
      <div className="absolute inset-0 bg-gray-300 opacity-70 z-10"></div>

      {/* Lock icon */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <LockIcon className="w-16 h-16 text-gray-600" />
      </div>

      {/* Card Content */}
      <Card className="bg-white flex-1 relative z-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            Training and Mentorship
          </CardTitle>
          <TargetIcon className="w-8 h-8 text-blue-500" />
        </CardHeader>
        <CardContent>
          <Separator className="mt-1 mb-2" />
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart data={chartData} innerRadius={30} outerRadius={100}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel nameKey="browser" />}
              />
              <PolarGrid gridType="circle" />
              <RadialBar dataKey="visitors" />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total minutes for the last 3 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const SkillGapAnalysis = () => {
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  };
  return (
    <Card className="bg-white flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bol">Skill Gap Analysis</CardTitle>
        <TargetIcon className="w-8 h-8 text-blue-500" />
      </CardHeader>
      <CardContent>
        <Separator className="mt-1 mb-2" />
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart
            data={chartData}
            margin={{
              top: -40,
              bottom: -10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
            <Radar dataKey="mobile" fill="var(--color-mobile)" />
            <ChartLegend className="mt-8" content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 pt-4 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  );
};

const ProfileLinksCard = () => {
  return (
    <Card className=" bg-white rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bol">Profile Links</CardTitle>
        <SquareArrowOutUpRight className="w-8 h-8 text-blue-500" />
      </CardHeader>
      <CardContent>
        <Separator className="mt-1 mb-2" />
        <div className="space-y-2">
          <div className="flex items-center justify-between space-x-3">
            <div className="flex items-start">
              <UserRoundCheck className="w-4 mr-2" />
              <span>My Profile</span>
            </div>
            <Button variant={"outline"}>
              <MoveUpRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Resume Link */}
          <div className="flex items-center justify-between space-x-3">
            <div className="flex items-start">
              <BookUser className="w-4 mr-2" />
              <span>Resume</span>
            </div>
            <Button variant={"outline"}>
              <MoveUpRight className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex items-center justify-between space-x-3">
            <div className="flex items-start">
              <BriefcaseBusiness className="w-4 mr-2" />
              <span>Portfolio</span>
            </div>
            <Button variant={"outline"}>
              <MoveUpRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DiamondEvaluation = () => {
  const chartData = [
    { month: "Self Evaluation", desktop: 186, mobile: 80 },
    { month: "AI Inference", desktop: 305, mobile: 200 },
    { month: "Mentor", desktop: 237, mobile: 120 },
    { month: "Peer Review", desktop: 73, mobile: 190 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
    label: {
      color: "hsl(var(--background))",
    },
  };
  return (
    <Card className="bg-white flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bol">Skill Evaluation</CardTitle>
        <TargetIcon className="w-8 h-8 text-blue-500" />
      </CardHeader>
      <CardContent>
        <Separator className="mt-1 mb-2" />
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="desktop" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="desktop"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="desktop"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

const SkillPremiumAnalysis = () => {
  const [state, setState] = React.useState({
    series: [
      {
        name: "SAMPLE A",
        data: [
          [16.4, 5.4],
          [21.7, 2],
          [25.4, 3],
          [19, 2],
          [10.9, 1],
          [13.6, 3.2],
          [10.9, 7.4],
          [10.9, 0],
          [10.9, 8.2],
          [16.4, 0],
          [16.4, 1.8],
          [13.6, 0.3],
          [13.6, 0],
          [29.9, 0],
          [27.1, 2.3],
          [16.4, 0],
          [13.6, 3.7],
          [10.9, 5.2],
          [16.4, 6.5],
          [10.9, 0],
          [24.5, 7.1],
          [10.9, 0],
          [8.1, 4.7],
          [19, 0],
          [21.7, 1.8],
          [27.1, 0],
          [24.5, 0],
          [27.1, 0],
          [29.9, 1.5],
          [27.1, 0.8],
          [22.1, 2],
        ],
      },
      {
        name: "SAMPLE B",
        data: [
          [36.4, 13.4],
          [1.7, 11],
          [5.4, 8],
          [9, 17],
          [1.9, 4],
          [3.6, 12.2],
          [1.9, 14.4],
          [1.9, 9],
          [1.9, 13.2],
          [1.4, 7],
          [6.4, 8.8],
          [3.6, 4.3],
          [1.6, 10],
          [9.9, 2],
          [7.1, 15],
          [1.4, 0],
          [3.6, 13.7],
          [1.9, 15.2],
          [6.4, 16.5],
          [0.9, 10],
          [4.5, 17.1],
          [10.9, 10],
          [0.1, 14.7],
          [9, 10],
          [12.7, 11.8],
          [2.1, 10],
          [2.5, 10],
          [27.1, 10],
          [2.9, 11.5],
          [7.1, 10.8],
          [2.1, 12],
        ],
      },
      {
        name: "SAMPLE C",
        data: [
          [21.7, 3],
          [23.6, 3.5],
          [24.6, 3],
          [29.9, 3],
          [21.7, 20],
          [23, 2],
          [10.9, 3],
          [28, 4],
          [27.1, 0.3],
          [16.4, 4],
          [13.6, 0],
          [19, 5],
          [22.4, 3],
          [24.5, 3],
          [32.6, 3],
          [27.1, 4],
          [29.6, 6],
          [31.6, 8],
          [21.6, 5],
          [20.9, 4],
          [22.4, 0],
          [32.6, 10.3],
          [29.7, 20.8],
          [24.5, 0.8],
          [21.4, 0],
          [21.7, 6.9],
          [28.6, 7.7],
          [15.4, 0],
          [18.1, 0],
          [33.4, 0],
          [16.4, 0],
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "scatter",
        zoom: {
          enabled: true,
          type: "xy",
        },
      },
      xaxis: {
        tickAmount: 10,
        labels: {
          formatter: function (val) {
            return parseFloat(val).toFixed(1);
          },
        },
      },
      yaxis: {
        tickAmount: 7,
      },
    },
  });

  return (
    <Card className="bg-white flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bol">
          Skill Premium Analysis
        </CardTitle>
        <TargetIcon className="w-8 h-8 text-blue-500" />
      </CardHeader>
      <CardContent>
        <Separator className="mt-1 mb-2" />
        <ApexCharts
          options={state.options}
          series={state.series}
          type="scatter"
          height={350}
        />
      </CardContent>
    </Card>
  );
};

const HeatMap = () => {
  const [state, setState] = React.useState({
    series: [
      {
        name: "Metric1",
        data: [1, 2, 5],
      },
      {
        name: "Metric2",
        data: [1, 2, 5],
      },
      {
        name: "Metric3",
        data: [1, 2, 5],
      },
      {
        name: "Metric4",
        data: [1, 2, 5],
      },
      {
        name: "Metric5",
        data: [1, 2, 5],
      },
      {
        name: "Metric6",
        data: [1, 2, 5],
      },
      {
        name: "Metric7",
        data: [1, 2, 5],
      },
      {
        name: "Metric8",
        data: [1, 2, 5],
      },
      {
        name: "Metric9",
        data: [1, 2, 5],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "heatmap",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#008FFB"],
      title: {
        text: "HeatMap Chart (Single color)",
      },
    },
  });

  return (
    <Card className="bg-white flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bol">Activity HeatMap</CardTitle>
        <TargetIcon className="w-8 h-8 text-blue-500" />
      </CardHeader>
      <CardContent>
        <Separator className="mt-1 mb-2" />
        <ApexCharts
          options={state.options}
          series={state.series}
          type="heatmap"
          height={350}
        />
      </CardContent>
    </Card>
  );
};

const PersonalityAnalysis = () => {
  const [state, setState] = React.useState({
    series: [
      {
        name: "Series 1",
        data: [80, 50, 30, 40, 100, 20],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "radar",
      },
      title: {
        text: "Basic Radar Chart",
      },
      yaxis: {
        stepSize: 20,
      },
      xaxis: {
        categories: [
          "Agreeableness",
          "Neuroticism",
          "Openness",
          "Conscientiousness",
          "Extraversion",
        ],
      },
    },
  });

  return (
    <Card className="bg-white flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bol">
          Personality Analysis
        </CardTitle>
        <TargetIcon className="w-8 h-8 text-blue-500" />
      </CardHeader>
      <CardContent>
        <Separator className="mt-1 mb-2" />
        <ApexCharts
          options={state.options}
          series={state.series}
          type="radar"
          height={350}
        />
      </CardContent>
    </Card>
  );
};

const GroupSlopeChart = () => {
  const [state, setState] = React.useState({
    series: [
      {
        name: "Soft Skills",
        data: [
          { x: "Self Evaluation", y: 85 },
          { x: "AI Inference", y: 78 },
          { x: "Mentor Evaluation", y: 92 },
          { x: "Peer Review", y: 80 },
          { x: "Competency Diagnostic", y: 88 },
        ],
      },
      {
        name: "Technical Skills",
        data: [
          { x: "Self Evaluation", y: 76 },
          { x: "AI Inference", y: 85 },
          { x: "Mentor Evaluation", y: 90 },
          { x: "Peer Review", y: 82 },
          { x: "Competency Diagnostic", y: 87 },
        ],
      },
      {
        name: "GK and Reasoning Skills",
        data: [
          { x: "Self Evaluation", y: 80 },
          { x: "AI Inference", y: 88 },
          { x: "Mentor Evaluation", y: 84 },
          { x: "Peer Review", y: 78 },
          { x: "Competency Diagnostic", y: 85 },
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        width: 600,
        type: "line",
      },
      plotOptions: {
        line: {
          isSlopeChart: true,
        },
      },
      tooltip: {
        followCursor: true,
        intersect: false,
        shared: true,
      },
      dataLabels: {
        background: {
          enabled: true,
        },
        formatter(val, opts) {
          const seriesName = opts.w.config.series[opts.seriesIndex].name;
          return val !== null ? seriesName : "";
        },
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
        },
      },
      xaxis: {
        position: "bottom",
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
      },
      stroke: {
        width: [2, 3, 4, 2],
        dashArray: [0, 0, 5, 2],
        curve: "smooth",
      },
    },
  });
  return (
    <Card className="bg-white flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bol">
          Skill Category Rank across Evaluation
        </CardTitle>
        <TargetIcon className="w-8 h-8 text-blue-500" />
      </CardHeader>
      <CardContent>
        <Separator className="mt-1 mb-2" />
        <ApexCharts
          options={state.options}
          series={state.series}
          type="line"
          height={400}
        />
      </CardContent>
    </Card>
  );
};

const AreaOfImprovement = () => {
  const [state, setState] = React.useState({
    series: [
      {
        data: [
          {
            x: "REACT",
            y: 1.2,
          },
          {
            x: "EXPRESS",
            y: 0.4,
          },
          {
            x: "NODE.JS",
            y: -1.4,
          },
          {
            x: "SDLC",
            y: 2.7,
          },
          {
            x: "AWS",
            y: -0.3,
          },
          {
            x: "General Science",
            y: 5.1,
          },
        ],
      },
    ],
    options: {
      legend: {
        show: false,
      },
      chart: {
        height: 350,
        type: "treemap",
      },
      title: {
        text: "Treemap with Color scale",
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
        },
        formatter: function (text, op) {
          return [text, op.value];
        },
        offsetY: -4,
      },
      plotOptions: {
        treemap: {
          enableShades: true,
          shadeIntensity: 0.5,
          reverseNegativeShade: true,
          colorScale: {
            ranges: [
              {
                from: -6,
                to: 0,
                color: "#C3449A",
              },
              {
                from: 0.001,
                to: 6,
                color: "#3D58A7",
              },
            ],
          },
        },
      },
    },
  });

  return (
    <Card className="bg-white flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bol">
          Topic wise Area of Improvement
        </CardTitle>
        <TargetIcon className="w-8 h-8 text-blue-500" />
      </CardHeader>
      <CardContent>
        <Separator className="mt-1 mb-2" />
        <ApexCharts
          options={state.options}
          series={state.series}
          type="treemap"
          height={200}
        />
      </CardContent>
    </Card>
  );
};

const GanttChart = () => {
  const [state, setState] = React.useState({
    series: [
      {
        name: "Bob",
        data: [
          {
            x: "Design",
            y: [
              new Date("2019-03-05").getTime(),
              new Date("2019-03-08").getTime(),
            ],
          },
          {
            x: "Code",
            y: [
              new Date("2019-03-02").getTime(),
              new Date("2019-03-05").getTime(),
            ],
          },
          {
            x: "Code",
            y: [
              new Date("2019-03-05").getTime(),
              new Date("2019-03-07").getTime(),
            ],
          },
          {
            x: "Test",
            y: [
              new Date("2019-03-03").getTime(),
              new Date("2019-03-09").getTime(),
            ],
          },
          {
            x: "Test",
            y: [
              new Date("2019-03-08").getTime(),
              new Date("2019-03-11").getTime(),
            ],
          },
          {
            x: "Validation",
            y: [
              new Date("2019-03-11").getTime(),
              new Date("2019-03-16").getTime(),
            ],
          },
          {
            x: "Design",
            y: [
              new Date("2019-03-01").getTime(),
              new Date("2019-03-03").getTime(),
            ],
          },
        ],
      },
      {
        name: "Joe",
        data: [
          {
            x: "Design",
            y: [
              new Date("2019-03-02").getTime(),
              new Date("2019-03-05").getTime(),
            ],
          },
          {
            x: "Test",
            y: [
              new Date("2019-03-06").getTime(),
              new Date("2019-03-16").getTime(),
            ],
            goals: [
              {
                name: "Break",
                value: new Date("2019-03-10").getTime(),
                strokeColor: "#CD2F2A",
              },
            ],
          },
          {
            x: "Code",
            y: [
              new Date("2019-03-03").getTime(),
              new Date("2019-03-07").getTime(),
            ],
          },
          {
            x: "Deployment",
            y: [
              new Date("2019-03-20").getTime(),
              new Date("2019-03-22").getTime(),
            ],
          },
          {
            x: "Design",
            y: [
              new Date("2019-03-10").getTime(),
              new Date("2019-03-16").getTime(),
            ],
          },
        ],
      },
      {
        name: "Dan",
        data: [
          {
            x: "Code",
            y: [
              new Date("2019-03-10").getTime(),
              new Date("2019-03-17").getTime(),
            ],
          },
          {
            x: "Validation",
            y: [
              new Date("2019-03-05").getTime(),
              new Date("2019-03-09").getTime(),
            ],
            goals: [
              {
                name: "Break",
                value: new Date("2019-03-07").getTime(),
                strokeColor: "#CD2F2A",
              },
            ],
          },
        ],
      },
    ],
    options: {
      chart: {
        height: 450,
        type: "rangeBar",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "80%",
        },
      },
      xaxis: {
        type: "datetime",
      },
      stroke: {
        width: 1,
      },
      fill: {
        type: "solid",
        opacity: 0.6,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
    },
  });

  return (
    <Card className="bg-white flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bol">
          Scheduled Milestones
        </CardTitle>
        <TargetIcon className="w-8 h-8 text-blue-500" />
      </CardHeader>
      <CardContent>
        <Separator className="mt-1 mb-2" />
        <ApexCharts
          options={state.options}
          series={state.series}
          type="rangeBar"
          height={450}
        />
      </CardContent>
    </Card>
  );
};

const MentorNotifications = () => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Mentor Notifications</CardTitle>
        <CardDescription>Recent messages from your mentors</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentNotifications.map((notification, index) => (
            <motion.li
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm"
            >
              <Avatar>
                <AvatarImage src={notification.avatar} />
                <AvatarFallback>{notification.mentor[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.mentor}</p>
              </div>
              <Button variant="ghost" size="sm">
                Reply
              </Button>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

// const MentorCard = ({ mentor, isLoading }) => {
//   if (isLoading) {
//     return (
//       <Card className="w-full max-w-sm">
//         <CardHeader className="space-y-2">
//           <Skeleton className="h-6 w-3/4" />
//           <Skeleton className="h-4 w-1/2" />
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <Skeleton className="h-20 w-20 rounded-full mx-auto" />
//           <Skeleton className="h-4 w-3/4 mx-auto" />
//           <Skeleton className="h-10 w-full" />
//         </CardContent>
//         <CardFooter>
//           <Skeleton className="h-10 w-full" />
//         </CardFooter>
//       </Card>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Card className="w-full max-w-sm">
//         <CardHeader className="space-y-2">
//           <CardTitle className="text-2xl font-bold">{mentor.name}</CardTitle>
//           <Badge variant="outline" className="w-fit">
//             {mentor.designation}
//           </Badge>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <Avatar className="h-20 w-20 mx-auto">
//             <AvatarImage src={mentor.photo} alt={mentor.name} />
//             <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
//           </Avatar>
//           <p className="text-sm text-center text-muted-foreground flex items-center justify-center space-x-1">
//             <Clock size={16} />
//             <span>Next session in: {mentor.nextSessionTime}</span>
//           </p>
//           <Button variant="outline" className="w-full">
//             Nudge Mentor
//           </Button>
//         </CardContent>
//         <CardFooter>
//           <Button className="w-full">Join Next Session</Button>
//         </CardFooter>
//       </Card>
//     </motion.div>
//   );
// };

// const TrainingCentreCard = ({ centre, isLoading }) => {
//   if (isLoading) {
//     return (
//       <Card className="w-full max-w-sm">
//         <CardHeader className="space-y-2">
//           <Skeleton className="h-6 w-3/4" />
//           <Skeleton className="h-4 w-1/2" />
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <Skeleton className="h-4 w-full" />
//           <Skeleton className="h-4 w-3/4" />
//           <Skeleton className="h-4 w-1/2" />
//         </CardContent>
//         <CardFooter>
//           <Skeleton className="h-4 w-1/4" />
//         </CardFooter>
//       </Card>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Card className="w-full max-w-sm">
//         <CardHeader className="space-y-2">
//           <CardTitle className="text-2xl font-bold">{centre.name}</CardTitle>
//           <Badge variant="outline" className="w-fit">
//             {centre.sector}
//           </Badge>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <p className="text-sm flex items-center space-x-2">
//             <FileText size={16} className="text-muted-foreground" />
//             <span>PIA ID: {centre.piaId}</span>
//           </p>
//           <p className="text-sm flex items-center space-x-2">
//             <Phone size={16} className="text-muted-foreground" />
//             <span>{centre.contactNumber}</span>
//           </p>
//           <p className="text-sm flex items-center space-x-2">
//             <MapPin size={16} className="text-muted-foreground" />
//             <span>{centre.address}</span>
//           </p>
//         </CardContent>
//         <CardFooter>
//           <Badge variant="secondary" className="w-fit">
//             Attendance: {centre.attendance}%
//           </Badge>
//         </CardFooter>
//       </Card>
//     </motion.div>
//   );
// };

export function DashboardPage() {
  const hey = localStorage.getItem("user@first");
  const currentHour = getHours(new Date());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const getGreeting = (hour) => {
    if (hour < 12) return "Morning";
    if (hour < 18) return "Afternoon";
    if (hour < 21) return "Evening";
    return "Night";
  };
  const greeting = getGreeting(currentHour);

  useEffect(() => {
    // Simulating data loading
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome back!",
        description:
          "Your dashboard is ready. Let's continue your learning journey.",
      });
    }, 2000);
  }, [toast]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-1 flex-col p-4 lg:p-6 space-y-4"
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-baseline">
            <h1 className="text-2xl font-medium md:text-2xl">
              {`${greeting},`}&nbsp;
            </h1>
            <p className="text-4xl font-bold">
              <SparklesText text={hey == undefined ? "Cloudy" : hey} />
            </p>
          </div>
          <p className="text-muted-foreground font-medium">
            Here&apos;s a Snapshot of your Career
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <ScoreCard title="Profile Score" score={78} icon={UserIcon} />
        <ScoreCard title="Placement Readiness" score={67} icon={UserIcon} />
        <PersonalityAnalysis />
        <ProfileLinksCard />
      </div>
      {/* <div className="flex flex-row gap-4">
        <MentorCard mentor={mentorData} isLoading={loading} />
        <TrainingCentreCard centre={centreData} isLoading={loading} />
      </div> */}
      <div className="flex flex-row gap-4">
        <StrategicGoal loading={loading} />
        <LearningProgress />
      </div>
      <div className="flex flex-row gap-4">
        {/* <CareerRoadmap /> */}
        <SkillGapAnalysis />
        <Interventions />
        <DiamondEvaluation />
      </div>
      <div className="flex flex-row gap-4">
        <GanttChart />
        <SkillPremiumAnalysis />
        <HeatMap />
      </div>
      <div className="flex flex-row gap-4">
        <AreaOfImprovement />
        <ResumeWork />
        <CommunityUpdates />
      </div>
      <div className="flex flex-row gap-4">
        <MentorNotifications />
        <GroupSlopeChart />
      </div>
      <div className="flex flex-row gap-4">
        <CareerRoadmap />
      </div>
    </motion.main>
  );
}

const CommunityUpdates = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Updates</CardTitle>
        <CardDescription>Stay connected with your peers</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {communityNotifications.map((notification, index) => (
            <motion.li
              key={notification.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="bg-green-100 text-green-700 p-2 rounded-full">
                <Bell className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => null}>
                <div className="flex flex-row">View</div>
              </Button>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

function DashboardSkeleton() {
  return (
    <div className="container mx-auto p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="h-8 w-64 bg-gray-200 rounded-md animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
          >
            <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-full bg-gray-200 rounded-md animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
