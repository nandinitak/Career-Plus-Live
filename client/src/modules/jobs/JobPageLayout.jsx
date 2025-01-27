import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  CircleHelp,
  Dock,
  GraduationCap,
  LineChart,
  Loader2,
  PanelsTopLeft,
  Pin,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { getUserId } from "@/helpers/api";

import DashboardHeader from "@/dashboard/components/DashboardHeader";
import UpgradeCard from "@/dashboard/components/UpgradeCard";

import SearchJobs from "./components/SearchJobs";
import SavedJobs from "./components/JobSaved";
import JobTracker from "./components/JobTrackerDashboard";
import MarketAnalytics from "./components/MarketAnalytics";

import TestPageLayout from "./Diagnostic/TestPageLayout";
import GOISchemes from "./components/GOISchemes";
import cpLogo from "/logo-on-white-gradient.png";
import Training from "./components/Training";
const navItems = [
  { label: "Search", icon: <Search className="h-4 w-4" /> },
  { label: "Competency", icon: <CircleHelp className="h-4 w-4" /> },
  { label: "Schemes", icon: <BriefcaseBusiness className="h-4 w-4" /> },
  {
    label: "Training",
    icon: <GraduationCap className="h-4 w-4" />,
    name: "Training",
  },
  { label: "Saved", icon: <Pin className="h-4 w-4" /> },
  { label: "Application", icon: <PanelsTopLeft className="h-4 w-4" /> },
  { label: "Analytics", icon: <LineChart className="h-4 w-4" /> },
];

function JobsPageLayout() {
  const [selectedComponent, setSelectedComponent] = useState("Search");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  getUserId(localStorage.getItem("token"));
  const userId = localStorage.getItem("_id");
  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [selectedComponent]);

  const componentMap = {
    Search: <SearchJobs></SearchJobs>,
    Competency: <TestPageLayout />,
    Schemes: <GOISchemes />,
    Training: <Training />,
    Saved: <SavedJobs></SavedJobs>,
    Application: <JobTracker></JobTracker>,
    Analytics: <MarketAnalytics></MarketAnalytics>,
  };

  const renderComponent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }

    const SelectedComponent = componentMap[selectedComponent] || <SearchJobs />;
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
              ["opportunities", "/jobs"],
            ]}
          />
          <div className="p-4 lg:p-2">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
}

export default JobsPageLayout;
