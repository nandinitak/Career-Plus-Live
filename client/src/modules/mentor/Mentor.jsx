import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Bot,
  CircleUser,
  Command,
  Hand,
  HeartHandshake,
  Layers2,
  LineChart,
  Loader2,
  Menu,
  MessageCircleDashed,
  MessagesSquare,
  Paperclip,
  Radio,
  Route,
  Search,
  Zap,
  Eye,
  ScanSearch,
  Telescope,
  ScanText,
  BriefcaseBusiness,
  ChevronLeftCircle,
  Dumbbell,
  Dock,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserId } from "@/helpers/api";
import DashboardHeader from "@/dashboard/components/DashboardHeader";

import { useNavigate } from "react-router-dom";
import MentorSessions from "./components/MentorSessions";
import MentorTasks from "./components/MentorTasks";
import MyMentor from "./components/MyMentor";
import MyReferrals from "./components/MyReferrals";
import MentorConnect from "./components/MentorConnect";
import { name } from "@stream-io/video-react-sdk";
import UpgradeCard from "../../dashboard/components/UpgradeCard";
import cpLogo from "/logo-on-white-gradient.png";
const navItems = [
  {
    label: "MyMentor",
    icon: <Command className="h-4 w-4" />,
    name: "My Mentor",
  },

  {
    label: "MentorConnect",
    icon: <BriefcaseBusiness className="h-4 w-4" />,
    name: "Mentor Connect",
  },
  {
    label: "MentorSessions",
    icon: <Route className="h-4 w-4" />,
    name: "Sessions",
  },
  {
    label: "MentorTasks",
    icon: <Dumbbell className="h-4 w-4" />,
    name: "Tasks",
  },
  {
    label: "MyReferrals",
    icon: <Bot className="h-4 w-4" />,
    name: "Referrals",
  },
  {
    label: "Back",
    icon: <ChevronLeftCircle className="h-4 w-4" />,
    name: "Back to Dashboard",
  },
];

function Mentor() {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState("MyMentor");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  getUserId(localStorage.getItem("token"));
  const userId = localStorage.getItem("_id");
  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [selectedComponent]);

  const componentMap = {
    MyMentor: <MyMentor />,
    MentorConnect: <MentorConnect />,
    MentorSessions: <MentorSessions />,
    MentorTasks: <MentorTasks />,
    MyReferrals: <MyReferrals />,
  };

  const renderComponent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }

    if (selectedComponent === "Back") {
      navigate("/dashboard");
    }
    const SelectedComponent = componentMap[selectedComponent] || <MyMentor />;
    return SelectedComponent;
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
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
                        ? "bg-cp-gradient text-muted hover:text-muted"
                        : "bg-muted text-primary hover:text-primary"
                    } ${
                      index === 0 ? "rounded-tl-[12px] rounded-tr-[12px]" : ""
                    } ${
                      index === navItems.length - 1
                        ? "rounded-bl-[12px] rounded-br-[12px]"
                        : ""
                    }`}
                  >
                    {item.icon}
                    {item.name || item.label}
                  </button>
                ))}
              </nav>
            </div>
            <UpgradeCard />
          </div>
        </div>
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarCollapsed ? "ml-0" : "ml-[220px] lg:ml-[280px]"
          }`}
        >
          <DashboardHeader
            view={[
              ["dashboard", "/dashboard"],
              ["mentor", "/mentor"],
            ]}
            isMentorRequired
          />
          <div className="p-4 lg:p-2">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Mentor;
