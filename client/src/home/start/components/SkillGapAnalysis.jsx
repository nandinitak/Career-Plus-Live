import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

function SkillGapAnalysis() {
  return <SkillGapAnalysisWidget></SkillGapAnalysisWidget>;
}

export default SkillGapAnalysis;

const SkillGapAnalysisWidget = () => {
  const [selectedRole, setSelectedRole] = useState("Software Engineer");
  const [selectedDomain, setSelectedDomain] = useState("Web Development");

  const roleData = {
    "Software Engineer": [
      { skill: "React", current: 80, required: 90 },
      { skill: "MongoDB", current: 75, required: 85 },
      { skill: "Express", current: 70, required: 80 },
    ],
  };

  const domainData = {
    "Web Development": [
      { skill: "React", current: 55, required: 90 },
      { skill: "MongoDB", current: 65, required: 85 },
      { skill: "Express", current: 65, required: 80 },
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
