import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bot,
  Command,
  Hand,
  HeartHandshake,
  Loader2,
  Paperclip,
  Route,
  Eye,
  ScanText,
  BriefcaseBusiness,
  ChevronLeftCircle,
  Dumbbell,
  Medal,
  Dock,
  MessageSquareQuote,
  WalletCards,
  ShieldCheck,
  PencilRuler,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import Scenario from "./interview/components/scenario/Scenario";
// import Interview from "@./interview/InterviewPage";
import Resume from "@/modules/resume/Resume";
import { getUserId } from "@/helpers/api";
import { DashboardPage } from "./DashboardPage";
import InterviewPage from "@/modules/interview/InterviewPage";
``;
import { useNavigate } from "react-router-dom";

// import DemoPage from "./interview/components/session/page";
import Gemini from "@/modules/gemini/Gemini";
import DashboardHeader from "./components/DashboardHeader";
import UpgradeCard from "./components/UpgradeCard";
import Community from "@/modules/community/Community";
import Insights from "@/modules/insights/Insights";
import JobsPageLayout from "@/modules/jobs/JobPageLayout";
import Practice from "@/modules/practice/Practice";
import Mentor from "@/modules/mentor/Mentor";
import AchievementPage from "@/modules/achievements/AchievementPage";
import ContributeLayout from "@/modules/contribute/Layout";
import Asset from "@/modules/asset/Asset";
import cpLogo from "/logo-on-white-gradient.png";
import Certify from "../modules/certify/Certify";
import Refer from "./components/Refer";
import PathwayPage from "../modules/pathways/PathwayPage";

const navItems = [
  { label: "Dashboard", icon: <Command className="h-4 w-4" /> },
  { label: "Opportunities", icon: <BriefcaseBusiness className="h-4 w-4" /> },
  { label: "Asset", icon: <WalletCards className="h-4 w-4" /> },
  { label: "Pathway", icon: <Route className="h-4 w-4" /> },
  {
    label: "WorkBench",
    icon: <PencilRuler className="h-4 w-4" />,
    name: "Work Bench",
  },
  { label: "Practice", icon: <Dumbbell className="h-4 w-4" /> },
  { label: "Coach", icon: <Bot className="h-4 w-4" />, name: "Kaushal Ai" },
  { label: "Insights", icon: <Eye className="h-4 w-4" /> },
  {
    label: "Interview",
    icon: <MessageSquareQuote className="h-4 w-4" />,
    name: "Soft Skills",
  },
  { label: "Resume", icon: <Paperclip className="h-4 w-4" /> },
  { label: "Mentor", icon: <Hand className="h-4 w-4" /> },
  { label: "Contribute", icon: <ScanText className="h-4 w-4" /> },
  { label: "Certify", icon: <ShieldCheck className="h-4 w-4" /> },
  { label: "Achievements", icon: <Medal className="h-4 w-4" /> },
  { label: "Community", icon: <HeartHandshake className="h-4 w-4" /> },
  {
    label: "Back",
    icon: <ChevronLeftCircle className="h-4 w-4" />,
    name: "Back to Home",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  getUserId(localStorage.getItem("token"));
  const userId = localStorage.getItem("_id");
  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [selectedComponent]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const componentMap = {
    Dashboard: <DashboardPage />,
    Opportunities: <JobsPageLayout />,
    Asset: <Asset />,
    Pathway: <PathwayPage />,
    // WorkBench: <WorkbenchPageLayout />,
    Practice: <Practice />,
    Coach: <Gemini />,
    Insights: <Insights />,
    Interview: <InterviewPage />,
    Resume: <Resume />,
    Mentor: <Mentor />,
    Contribute: <ContributeLayout />,
    Certify: <Certify />,
    Community: <Community />,
    Achievements: <AchievementPage />,
  };

  const renderComponent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }

    if (selectedComponent === "Opportunities") {
      navigate("/jobs");
    }

    if (selectedComponent === "Pathway") {
      navigate("/pathways");
    }

    if (selectedComponent === "Asset") {
      navigate("/asset");
    }
    if (selectedComponent === "Practice") {
      navigate("/practice");
    }

    if (selectedComponent === "Community") {
      navigate("/community");
    }
    if (selectedComponent === "Interview") {
      navigate("/mock");
    }

    if (selectedComponent === "Contribute") {
      navigate("/contribute");
    }

    if (selectedComponent === "Resume") {
      navigate("/resume");
    }

    if (selectedComponent === "Mentor") {
      navigate("/mentor");
    }

    if (selectedComponent === "Certify") {
      navigate("/certify");
    }

    if (selectedComponent === "Back") {
      navigate("/");
    }
    const SelectedComponent = componentMap[selectedComponent] || (
      <DashboardPage />
    );
    return SelectedComponent;
  };

  return (
    <div className="relative min-h-screen w-screen bg-white">
      <div className="flex">
        <div
          className={`fixed left-0 top-0 bottom-0 ${
            isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"
          } transform transition-transform duration-300 w-[220px] lg:w-[280px] border-r bg-muted/40 overflow-y-auto`}
        >
          <div className="flex flex-col h-full">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 font-semibold"
              >
                <img src={cpLogo} alt="Logo" className="h-8" />
              </Link>
              <Button
                variant="outline"
                size="icon"
                className="ml-auto h-8 w-8"
                onClick={toggleSidebar}
              >
                <Dock className="h-4 w-4" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {navItems.map((item, index) => (
                  <button
                    key={item.label}
                    onClick={() => setSelectedComponent(item.label)}
                    className={`flex items-center gap-3 px-3 py-2 transition-all ${
                      selectedComponent === item.label
                        ? "bg-cp-gradient text-muted"
                        : "bg-muted text-primary hover:text-primary"
                    } ${
                      index === 0 ? "rounded-tl-[12px] rounded-tr-[12px]" : ""
                    } ${
                      index === navItems.length - 1
                        ? "rounded-bl-[12px] rounded-br-[12px]"
                        : ""
                    }`}
                  >
                    <div className="flex flex-row justify-end">
                      <div className="flex flex-row align-middle items-center">
                        <div className="mr-2">{item.icon}</div>
                        {item.name || item.label}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
            <div className="items-center px-4 w-full mx-auto">
              <Refer />
            </div>

            {/* <UpgradeCard /> */}
          </div>
        </div>
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarCollapsed ? "ml-0" : "ml-[220px] lg:ml-[280px]"
          }`}
        >
          <DashboardHeader view={[["dashboard", "/dashboard"]]} />
          <div className="">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
