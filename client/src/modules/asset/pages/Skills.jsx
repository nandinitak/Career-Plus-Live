import { useState, useEffect } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookCheck,
  ChevronLeftCircle,
  Dock,
  Flag,
  Link2,
  Loader2,
  Package2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { getUserId } from "@/helpers/api";

import DashboardHeader from "@/dashboard/components/DashboardHeader";
import UpgradeCard from "@/dashboard/components/UpgradeCard";

const SkillDashboard = React.lazy(() => import("./Skills/SkillDashboard"));
const SkillEvaluation = React.lazy(() => import("./Skills/SkillEvaluation"));
const SkillGapAnalysis = React.lazy(() => import("./Skills/SkillGapAnalysis"));
const SkillOntology = React.lazy(() => import("./Skills/SkillOntology"));

import cpLogo from "/logo-on-white-gradient.png";
import SkillAnalysis from "./SkillAnalysis";

const navItems = [
  {
    label: "Inventory",
    icon: <Package2 className="h-4 w-4" />,
  },
  {
    label: "Evaluation",
    icon: <BookCheck className="h-4 w-4" />,
    name: "Diamond Evaluation",
  },
  {
    label: "Gap",
    icon: <Flag className="h-4 w-4" />,
    name: "Skill Gap Analysis",
  },
  {
    label: "Ontology",
    icon: <Link2 className="h-4 w-4" />,
    name: "Skill Ontology",
  },

  {
    label: "Back",
    icon: <ChevronLeftCircle className="h-4 w-4" />,
    name: "Back to Assets",
  },
];

function Skills() {
  const [selectedComponent, setSelectedComponent] = useState("Inventory");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  getUserId(localStorage.getItem("token"));
  const userId = localStorage.getItem("_id");
  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [selectedComponent]);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const componentMap = {
    Inventory: <SkillDashboard />,
    Evaluation: <SkillEvaluation />,
    Gap: <SkillAnalysis />,
    Ontology: <SkillOntology />,
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
      navigate("/asset");
    }

    const SelectedComponent = componentMap[selectedComponent] || <div></div>;
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
              ["asset", "/asset"],
              ["skills", "/skills"],
            ]}
          />
          <div className="">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
