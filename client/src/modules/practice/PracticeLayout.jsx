import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Dice6,
  Dumbbell,
  Gavel,
  Loader2,
  MessageCircleDashed,
  SquareMousePointer,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { getUserId } from "@/helpers/api";

import DashboardHeader from "@/dashboard/components/DashboardHeader";
import UpgradeCard from "@/dashboard/components/UpgradeCard";
import RoomPage from "./components/RoomPage";
import QuizPage from "./components/QuizPage";
import JudgeHome from "@/modules/judge/screens/Home/JudgeHome";
import cpLogo from "/logo-on-white-gradient.png";
const navItems = [
  {
    label: "CodeColab",
    icon: <SquareMousePointer className="h-4 w-4" />,
    name: "Code Colab",
  },
  { label: "Judge", icon: <Gavel className="h-4 w-4" /> },
  { label: "Quiz", icon: <Dice6 className="h-4 w-4" /> },
];

function PracticeLayout() {
  const [selectedComponent, setSelectedComponent] = useState("CodeColab");
  const [isLoading, setIsLoading] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  getUserId(localStorage.getItem("token"));
  // const userId = localStorage.getItem("_id");
  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [selectedComponent]);

  const componentMap = {
    CodeColab: <RoomPage />,
    Judge: <JudgeHome />,
    Quiz: <QuizPage />,
  };

  const renderComponent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }

    const SelectedComponent = componentMap[selectedComponent] || <RoomPage />;
    return SelectedComponent;
  };

  return (
    <div className="relative min-h-screen w-screen bg-white">
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 font-semibold"
              >
                <img src={cpLogo} alt="Logo" className="h-8" />
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">
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
                      index === 0 ? "rounded-tl-[12px] rounded-tr-[12px]" : "" // Rounded top for first item
                    } ${
                      index === navItems.length - 1
                        ? "rounded-bl-[12px] rounded-br-[12px]" // Rounded bottom for last item
                        : ""
                    }`}
                  >
                    {item.icon}
                    {item.name || item.label}
                  </button>
                ))}
              </nav>
            </div>
            <UpgradeCard></UpgradeCard>
          </div>
        </div>
        <div className="flex flex-col">
          <DashboardHeader
            view={[
              ["dashboard", "/dashboard"],
              ["practice", "/practice"],
            ]}
            icon={<Dumbbell className="h-5 w-5"></Dumbbell>}
          ></DashboardHeader>
          <div className="">{renderComponent()}</div>
        </div>
      </div>{" "}
    </div>
  );
}

export default PracticeLayout;
