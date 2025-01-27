import { useState, useEffect, useContext } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { getUserId } from "@/helpers/api";
import { useNavigate } from "react-router-dom";

import SettingsProfilePage from "./page";
import SettingsAccountPage from "./account/page";
import SettingsAppearancePage from "./appearance/page";
import SettingsNotificationsPage from "./notifications/page";
import cpLogo from "/logo-on-white-gradient.png";

import DashboardHeader from "../../dashboard/components/DashboardHeader";
import UpgradeCard from "../../dashboard/components/UpgradeCard";
import Refer from "../../dashboard/components/Refer";

const navItems = [
  { label: "Profile", icon: <Command className="h-4 w-4" /> },
  { label: "Account", icon: <BriefcaseBusiness className="h-4 w-4" /> },
  { label: "Appearance", icon: <WalletCards className="h-4 w-4" /> },
  { label: "Notifications", icon: <Eye className="h-4 w-4" /> },
];

function SettingLayout() {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState("Profile");
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
    Profile: <SettingsProfilePage />,
    Account: <SettingsAccountPage />,
    Appearance: <SettingsAppearancePage />,
    Notifications: <SettingsNotificationsPage />,
  };

  const renderComponent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }

    const SelectedComponent = componentMap[selectedComponent] || (
      <SettingsProfilePage />
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
              ["setting", "/setting"],
            ]}
          />
          <div className="p-4">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
}

export default SettingLayout;
