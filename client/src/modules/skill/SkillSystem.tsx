"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ChevronLeft,
  Plus,
  HelpCircle,
  Briefcase,
  Brain,
  Cog,
  BadgeCheck,
  Edit3,
  Info,
  Globe,
  Laptop,
  Palette,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts";

// Types
type Skill = {
  id: string;
  name: string;
  description: string;
  category: "global" | "technical" | "design" | "soft";
  level: number;
  icon: string;
};

type SkillLevel = {
  name: string;
  description: string;
  color: string;
};

// Skill data
const skillData: Skill[] = [
  {
    id: "react",
    name: "React",
    description: "A JavaScript library for building user interfaces",
    category: "technical",
    level: 0,
    icon: "/placeholder.svg?height=40&width=40&text=React",
  },
  {
    id: "nodejs",
    name: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
    category: "technical",
    level: 0,
    icon: "/placeholder.svg?height=40&width=40&text=Node.js",
  },
  {
    id: "python",
    name: "Python",
    description:
      "An interpreted, high-level and general-purpose programming language",
    category: "technical",
    level: 0,
    icon: "/placeholder.svg?height=40&width=40&text=Python",
  },
  {
    id: "communication",
    name: "Communication",
    description: "Ability to convey information effectively",
    category: "soft",
    level: 0,
    icon: "/placeholder.svg?height=40&width=40&text=Comm",
  },
  {
    id: "teamwork",
    name: "Teamwork",
    description: "Ability to work collaboratively with others",
    category: "soft",
    level: 0,
    icon: "/placeholder.svg?height=40&width=40&text=Team",
  },
  {
    id: "ux-design",
    name: "UX Design",
    description: "Designing user experiences for digital products",
    category: "design",
    level: 0,
    icon: "/placeholder.svg?height=40&width=40&text=UX",
  },
  {
    id: "ui-design",
    name: "UI Design",
    description: "Creating visual elements of user interfaces",
    category: "design",
    level: 0,
    icon: "/placeholder.svg?height=40&width=40&text=UI",
  },
];

const SKILL_LEVELS: SkillLevel[] = [
  {
    name: "Novice",
    description: "Basic understanding, needs guidance",
    color: "#FFA07A",
  },
  {
    name: "Advanced Beginner",
    description: "Can perform basic tasks with guidance",
    color: "#98FB98",
  },
  {
    name: "Competent",
    description: "Can work independently on most tasks",
    color: "#87CEFA",
  },
  {
    name: "Proficient",
    description: "Deep understanding and efficient execution",
    color: "#DDA0DD",
  },
  {
    name: "Expert",
    description: "Comprehensive and authoritative knowledge",
    color: "#F0E68C",
  },
  {
    name: "Master",
    description: "Can teach and innovate in the field",
    color: "#FF69B4",
  },
  {
    name: "Thought Leader",
    description: "Recognized authority and influencer",
    color: "#20B2AA",
  },
  {
    name: "Visionary",
    description: "Shapes the future of the field",
    color: "#FF7F50",
  },
  {
    name: "Legendary",
    description: "Leaves a lasting legacy in the field",
    color: "#9370DB",
  },
];

export default function Component() {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] =
    useState<Skill["category"]>("technical");
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddSkill = (skill: Skill) => {
    setSkills((prevSkills) => {
      const existingSkillIndex = prevSkills.findIndex((s) => s.id === skill.id);
      if (existingSkillIndex !== -1) {
        const updatedSkills = [...prevSkills];
        updatedSkills[existingSkillIndex] = { ...skill, level: skill.level };
        return updatedSkills;
      } else {
        return [...prevSkills, skill];
      }
    });
    setIsAddingSkill(false);
  };

  const handleRemoveSkill = (skillId: string) => {
    setSkills((prevSkills) =>
      prevSkills.filter((skill) => skill.id !== skillId)
    );
  };

  const handleUpdateSkillLevel = (skillId: string, newLevel: number) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === skillId ? { ...skill, level: newLevel } : skill
      )
    );
  };

  const filteredSkills = skillData.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      skill.category === selectedCategory
  );

  const topSkills = skills
    .filter((skill) => skill.category === selectedCategory)
    .sort((a, b) => b.level - a.level)
    .slice(0, 5);

  const skillQueue = skills
    .filter((skill) => skill.category === selectedCategory)
    .sort((a, b) => b.level - a.level)
    .slice(5);

  const chartData = topSkills.map((skill) => ({
    name: skill.name,
    value: skill.level + 1,
    color: SKILL_LEVELS[skill.level].color,
  }));

  const bubbleChartData = skills
    .filter((skill) => skill.category === "soft")
    .map((skill) => ({
      name: skill.name,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: (skill.level + 1) * 10,
      color: SKILL_LEVELS[skill.level].color,
    }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-12 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-background p-4 sm:p-8">
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=48&width=48"
                  alt="Profile"
                  className="rounded-full"
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">
                  MY SKILLS & CERTIFICATIONS
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage and track your professional development
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddingSkill(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Skills
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsHelpOpen(true)}
                    >
                      <HelpCircle className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Get help with the skill system</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left sidebar */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 space-y-4"
          >
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-blue-500" />
                      <span className="font-medium text-blue-700">
                        Essential Human Skills
                      </span>
                    </div>
                    <p className="text-sm text-blue-600 mt-2">
                      Soft and behavioural skills are the foundation of our
                      culture
                    </p>
                  </div>
                  <Separator className="my-4" />
                  <Button
                    variant={
                      selectedCategory === "soft" ? "secondary" : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory("soft")}
                  >
                    <Brain className="h-5 w-5 mr-2" />
                    Soft Skills
                  </Button>
                  <Button
                    variant={
                      selectedCategory === "technical" ? "secondary" : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory("technical")}
                  >
                    <Laptop className="h-5 w-5 mr-2" />
                    Dev & Tech Specialisation
                  </Button>
                  <Button
                    variant={
                      selectedCategory === "design" ? "secondary" : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory("design")}
                  >
                    <Palette className="h-5 w-5 mr-2" />
                    Design & Product Specialisation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main content */}
          <motion.div variants={itemVariants} className="md:col-span-9">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {selectedCategory === "soft" && (
                        <span className="inline-flex items-center">
                          <Brain className="h-5 w-5 mr-2" />
                          Soft Skills
                        </span>
                      )}
                      {selectedCategory === "technical" && (
                        <span className="inline-flex items-center">
                          <Laptop className="h-5 w-5 mr-2" />
                          Technical Skills
                        </span>
                      )}
                      {selectedCategory === "design" && (
                        <span className="inline-flex items-center">
                          <Palette className="h-5 w-5 mr-2" />
                          Design Skills
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {selectedCategory === "soft"
                        ? "Essential human skills that form the foundation of our culture"
                        : selectedCategory === "technical"
                          ? "Technical expertise and specialized knowledge"
                          : "Design and product development skills"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <Separator className="mb-4" />
              <CardContent>
                <div className="flex justify-center mb-6">
                  {selectedCategory === "soft" ? (
                    <ResponsiveContainer width="100%" height={400}>
                      <ScatterChart
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <XAxis
                          type="number"
                          dataKey="x"
                          name="stature"
                          unit="cm"
                        />
                        <YAxis
                          type="number"
                          dataKey="y"
                          name="weight"
                          unit="kg"
                        />
                        <ZAxis
                          type="number"
                          dataKey="z"
                          range={[50, 1000]}
                          name="score"
                          unit="km"
                        />
                        <Scatter
                          name="Soft Skills"
                          data={bubbleChartData}
                          fill="#8884d8"
                        >
                          {bubbleChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Scatter>
                        <RechartsTooltip cursor={{ strokeDasharray: "3 3" }} />
                      </ScatterChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Top Skills</h3>
                  <div className="space-y-2">
                    {topSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between p-2 bg-secondary rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-6 h-6"
                          />
                          <span>{skill.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select
                            value={skill.level.toString()}
                            onValueChange={(value) =>
                              handleUpdateSkillLevel(skill.id, parseInt(value))
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Select Level" />
                            </SelectTrigger>
                            <SelectContent>
                              {SKILL_LEVELS.map((level, index) => (
                                <SelectItem
                                  key={level.name}
                                  value={index.toString()}
                                >
                                  {level.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveSkill(skill.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {skillQueue.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Skill Queue</h3>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-2">
                        {skillQueue.map((skill) => (
                          <div
                            key={skill.id}
                            className="flex items-center justify-between p-2 bg-secondary rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={skill.icon}
                                alt={skill.name}
                                className="w-6 h-6"
                              />
                              <span>{skill.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Select
                                value={skill.level.toString()}
                                onValueChange={(value) =>
                                  handleUpdateSkillLevel(
                                    skill.id,
                                    parseInt(value)
                                  )
                                }
                              >
                                <SelectTrigger className="w-[120px]">
                                  <SelectValue placeholder="Select Level" />
                                </SelectTrigger>
                                <SelectContent>
                                  {SKILL_LEVELS.map((level, index) => (
                                    <SelectItem
                                      key={level.name}
                                      value={index.toString()}
                                    >
                                      {level.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveSkill(skill.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Help Dialog */}
        <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>How to Use the Skill System</DialogTitle>
              <DialogDescription>
                Track and visualize your professional development journey
              </DialogDescription>
            </DialogHeader>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5">
                <h3 className="font-medium mb-2">Quick Guide</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs">1</span>
                    </div>
                    <span>Choose a skill category from the left sidebar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs">2</span>
                    </div>
                    <span>Add skills and set your proficiency level</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs">3</span>
                    </div>
                    <span>Track your progress in the interactive charts</span>
                  </li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Skill Dialog */}
        <Dialog open={isAddingSkill} onOpenChange={setIsAddingSkill}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a New Skill</DialogTitle>
              <DialogDescription>
                Search and add a new skill to your profile
              </DialogDescription>
            </DialogHeader>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {filteredSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-4 rounded-lg border bg-gradient-to-br from-background to-primary/5"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{skill.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {skill.description}
                          </p>
                        </div>
                        <Select
                          onValueChange={(value) =>
                            handleAddSkill({ ...skill, level: parseInt(value) })
                          }
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Level" />
                          </SelectTrigger>
                          <SelectContent>
                            {SKILL_LEVELS.map((level, index) => (
                              <SelectItem
                                key={level.name}
                                value={index.toString()}
                              >
                                {level.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
