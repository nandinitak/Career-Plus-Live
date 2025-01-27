import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChartIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  LightbulbIcon,
  TargetIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PulsatingButton from "@/components/ui/pulsating-button";

// type SWOTItem = {
//   id: number
//   title: string
//   description: string
//   effect: string
//   impact: 'high' | 'medium' | 'low'
//   status: 'active' | 'monitoring' | 'resolved'
//   meaning: string
//   use: string
// }

// type SWOTData = {
//   strengths: SWOTItem[]
//   weaknesses: SWOTItem[]
//   opportunities: SWOTItem[]
//   threats: SWOTItem[]
// }

// type Goal = {
//   statement: string
//   description: string
//   timeframe: string
//   progress: number
//   milestones: { title: string; completed: boolean }[]
// }

const mockData = {
  strengths: [
    {
      id: 1,
      title: "Strong Silayi-Bunai Skills",
      description:
        "Skilled in both traditional and modern stitching techniques.",
      effect:
        "Enables quick learning and application of new designs and patterns.",
      impact: "high",
      status: "active",
      meaning: "Technical competence in Silayi-Bunai.",
      use: "Create a portfolio of various stitching styles and participate in local melas and exhibitions.",
    },
    {
      id: 2,
      title: "Junoon for Continuous Learning",
      description: "Committed to enhancing stitching and tailoring skills.",
      effect: "Keeps up with nayi fashion trends and customer demands.",
      impact: "high",
      status: "active",
      meaning: "Growth mindset.",
      use: "Utilize community training programs and online resources for skill development.",
    },
    {
      id: 3,
      title: "Effective Samasya-Samadhan Skills",
      description:
        "Ability to break down complex tailoring issues into simple solutions.",
      effect: "Ensures timely delivery and optimized designs.",
      impact: "medium",
      status: "monitoring",
      meaning: "Analytical thinking.",
      use: "Highlight problem-solving abilities during customer interactions and in projects.",
    },
  ],
  weaknesses: [
    {
      id: 1,
      title: "Kam Real-World Experience",
      description:
        "Limited exposure to running or managing a tailoring business.",
      effect: "Lacks practical knowledge in client handling and operations.",
      impact: "high",
      status: "active",
      meaning: "Experience gap.",
      use: "Focus on gaining internships or freelance opportunities in tailoring.",
    },
    {
      id: 2,
      title: "Time Management Sankat",
      description: "Struggles to balance learning with personal commitments.",
      effect: "Delays in completing training or customer orders.",
      impact: "medium",
      status: "active",
      meaning: "Productivity challenge.",
      use: "Create a daily schedule and set clear lakshya to manage time effectively.",
    },
    {
      id: 3,
      title: "Inconsistent Exposure to Naye Frameworks",
      description:
        "Limited experience with trending stitching patterns and techniques.",
      effect: "May take longer to adapt to cutting-edge fashion trends.",
      impact: "medium",
      status: "monitoring",
      meaning: "Technological gap.",
      use: "Dedicate time to practice modern stitching frameworks.",
    },
  ],
  opportunities: [
    {
      id: 1,
      title: "Booming Demand for Customized Silayi-Bunai",
      description: "Growing preference for tailored, unique clothing.",
      effect: "Creates ample job and business opportunities.",
      impact: "high",
      status: "active",
      meaning: "Market demand growth.",
      use: "Offer personalized stitching services and leverage social media for promotion.",
    },
    {
      id: 2,
      title: "Prashikshan Programs under DDUGKY",
      description: "Access to free or subsidized skill development programs.",
      effect: "Enhances employability and technical expertise.",
      impact: "medium",
      status: "monitoring",
      meaning: "Accessible training.",
      use: "Enroll in DDUGKY courses to expand knowledge and gain certifications.",
    },
    {
      id: 3,
      title: "Networking through Samudayik Events",
      description:
        "Opportunity to network and learn through local events and exhibitions.",
      effect: "Boosts career visibility and skill enhancement.",
      impact: "high",
      status: "active",
      meaning: "Community engagement.",
      use: "Participate in community programs, melas, and exhibitions to showcase skills.",
    },
  ],
  threats: [
    {
      id: 1,
      title: "Badhte Competition in Tailoring Market",
      description: "Many experienced tailors competing for clients.",
      effect: "Challenges in standing out and building a clientele.",
      impact: "high",
      status: "active",
      meaning: "Competitive landscape.",
      use: "Differentiate through unique designs and excellent customer service.",
    },
    {
      id: 2,
      title: "Tezi se Badalte Fashion Trends",
      description:
        "Constant changes in fashion trends and customer preferences.",
      effect: "Requires continuous learning to stay relevant.",
      impact: "medium",
      status: "monitoring",
      meaning: "Skills obsolescence.",
      use: "Stay updated with nayi trends and adopt new techniques quickly.",
    },
    {
      id: 3,
      title: "Arthik Asuraksha",
      description: "Potential economic downturns affecting demand.",
      effect: "May result in lower income from tailoring services.",
      impact: "medium",
      status: "monitoring",
      meaning: "Economic uncertainty.",
      use: "Diversify services by offering alterations, repairs, and workshops.",
    },
  ],
};

const mockGoal = {
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

const categoryColors = {
  strengths: "bg-emerald-50 border-emerald-200 text-emerald-700",
  weaknesses: "bg-rose-50 border-rose-200 text-rose-700",
  opportunities: "bg-sky-50 border-sky-200 text-sky-700",
  threats: "bg-amber-50 border-amber-200 text-amber-700",
};

const categoryIcons = {
  strengths: <BarChartIcon className="w-5 h-5" />,
  weaknesses: <AlertTriangleIcon className="w-5 h-5" />,
  opportunities: <LightbulbIcon className="w-5 h-5" />,
  threats: <TrendingUpIcon className="w-5 h-5" />,
};

const impactColors = {
  high: "bg-rose-100 text-rose-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
};

const statusIcons = {
  active: <CheckCircleIcon className="w-4 h-4 text-green-500" />,
  monitoring: <AlertCircleIcon className="w-4 h-4 text-yellow-500" />,
  resolved: <XCircleIcon className="w-4 h-4 text-gray-500" />,
};

export default function SWOTAnalysis() {
  const [data, setData] = useState(null);
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(mockData);
      setGoal(mockGoal);
      setLoading(false);
    }, 2000);
  }, []);

  const toggleItemExpansion = (category, itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [category]: prev[category]?.includes(itemId)
        ? prev[category].filter((id) => id !== itemId)
        : [...(prev[category] || []), itemId],
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-2">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-rows justify-between align-middle items-center">
          <div className="text-4xl font-bold text-center cp-text-gradient">
            Strategic SWOT Analysis
          </div>
          <div>
            {/* <Button onClick={() => {}} variant="shine"></Button> */}
            <PulsatingButton>
              {" "}
              <div className="flex items-center flex-row">
                <div>
                  <TargetIcon className="w-4 h-4 mr-2" />
                </div>
                <div>View Detailed Skill Gap Analysis</div>
              </div>
            </PulsatingButton>
          </div>
        </div>

        <Card className="bg-white shadow-lg ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bol">Strategic Goal</CardTitle>
            <TargetIcon className="w-8 h-8 text-blue-500" />
          </CardHeader>
          <CardContent>
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
                <h4 className="font-semibold text-gray-700 mb-2">
                  Key Milestones
                </h4>
                <ul className="space-y-2">
                  {goal?.milestones.map((milestone, index) => (
                    <li key={index} className="flex items-center">
                      <span
                        className={`mr-2 ${
                          milestone.completed
                            ? "text-green-500"
                            : "text-gray-400"
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
                          milestone.completed
                            ? "text-gray-700"
                            : "text-gray-500"
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
        </Card>

        {/* SWOT Matrix */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {(loading ? Array(4).fill("") : Object.entries(data || {})).map(
            ([category, items], index) => (
              <motion.div key={category || index} variants={itemVariants}>
                <Card
                  className={`overflow-hidden ${
                    loading ? "" : categoryColors[category]
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center">
                      {loading ? (
                        <Skeleton className="h-8 w-32" />
                      ) : (
                        <>
                          {categoryIcons[category]}
                          <span className="ml-2">
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </span>
                        </>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <ul className="space-y-4">
                        {(loading ? Array(3).fill("") : items).map(
                          (item, itemIndex) => (
                            <AnimatePresence key={itemIndex}>
                              <motion.li
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                              >
                                {loading ? (
                                  <Skeleton className="h-24 w-full" />
                                ) : (
                                  <Card className="bg-white">
                                    <CardContent className="p-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-800">
                                          #{item.id} {item.title}
                                        </span>
                                        {statusIcons[item.status]}
                                      </div>
                                      <p className="text-sm text-gray-600 mb-2">
                                        {item.description}
                                      </p>
                                      <div className="flex items-center space-x-2 mb-2">
                                        <Badge
                                          variant="secondary"
                                          className={impactColors[item.impact]}
                                        >
                                          {item.impact} impact
                                        </Badge>
                                        <Badge variant="outline">
                                          {item.status}
                                        </Badge>
                                      </div>
                                      <motion.button
                                        className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none flex items-center"
                                        onClick={() =>
                                          toggleItemExpansion(category, item.id)
                                        }
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        {expandedItems[category]?.includes(
                                          item.id
                                        ) ? (
                                          <>
                                            Less details{" "}
                                            <ChevronUpIcon className="w-4 h-4 ml-1" />
                                          </>
                                        ) : (
                                          <>
                                            More details{" "}
                                            <ChevronDownIcon className="w-4 h-4 ml-1" />
                                          </>
                                        )}
                                      </motion.button>
                                      <AnimatePresence>
                                        {expandedItems[category]?.includes(
                                          item.id
                                        ) && (
                                          <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                              opacity: 1,
                                              height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                          >
                                            <Separator className="my-2" />
                                            <div className="space-y-2 text-sm text-gray-600">
                                              <p>
                                                <strong>Effect:</strong>{" "}
                                                {item.effect}
                                              </p>
                                              <p>
                                                <strong>Meaning:</strong>{" "}
                                                {item.meaning}
                                              </p>
                                              <p>
                                                <strong>Strategic Use:</strong>{" "}
                                                {item.use}
                                              </p>
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </CardContent>
                                  </Card>
                                )}
                              </motion.li>
                            </AnimatePresence>
                          )
                        )}
                      </ul>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </motion.div>
            )
          )}
        </motion.div>

        <footer className="text-center text-gray-500"></footer>
      </div>
    </div>
  );
}
