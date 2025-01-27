"use client";
import { Button } from "@/components/ui/button";
import {
  Badge,
  Book,
  Bot,
  ChevronLeft,
  ChevronRight,
  GoalIcon,
  LandPlot,
  Settings,
  SettingsIcon,
  SquareMousePointer,
  Star,
  StickyNote,
  SwatchBook,
  ThumbsUp,
} from "lucide-react";

import React, { useContext, useEffect, useState } from "react";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import Goal from "./components/Goal";
import UploadResume from "./components/UploadResume";
import Preferences from "./components/Preferences";
import RateYourself from "./components/RateYourself";
import Overview from "./components/Overview";

import { Spinner } from "@/components/ui/spinner";
import { OBInputContext } from "@/context/OBInputContext";
import CompetencyRate from "./components/CompetencyRate";
import SkillGapAnalysis from "./components/SkillGapAnalysis";

function Flow() {
  const navigate = useNavigate();
  const { OBInput, setOBInput } = useContext(OBInputContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [OBInput]);

  const StepperOptions = [
    {
      id: 1,
      name: "Resume",
      icon: <StickyNote />,
    },
    {
      id: 2,
      name: "Goal",
      icon: <GoalIcon />,
    },
    {
      id: 3,
      name: "Preferences",
      icon: <SettingsIcon />,
    },
    {
      id: 4,
      name: "Competencies",
      icon: <Star />,
    },
    {
      id: 5,
      name: "Soft Skills",
      icon: <Star />,
    },
    {
      id: 6,
      name: "Skill Gap Analysis",
      icon: <Star />,
    },
    {
      id: 7,
      name: "Overview",
      icon: <LandPlot />,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnBoarding = async () => {
    try {
      setLoading(true);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = () => {
    if (
      activeIndex == 0 &&
      (OBInput?.file == undefined || OBInput?.file?.length == 0)
    ) {
      return false;
    }

    if (
      activeIndex == 1 &&
      (OBInput?.goal?.length == 0 || OBInput?.goal == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 1 &&
      (OBInput?.time?.length == 0 || OBInput?.time == undefined)
    ) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="flex flex-col items-center min-h-screen">
        <h2 className="text-lg md:text-4xl font-bold gradient-text mb-10 mt-8"></h2>
        <div>
          <div className="flex items-center">
            {StepperOptions.map((item, index) => (
              <div key={index} className="inline-flex items-center">
                <div className="flex flex-col items-center w-[50px] md:w-[100px] ">
                  {/* Icon */}
                  <div
                    className={`bg-gray-200 p-3 rounded-full text-white h-12 w-12 flex items-center justify-center ${
                      activeIndex >= index ? "bg-slate-950" : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                  {/* Stage Name */}
                  <div
                    className={`mt-2 text-center text-sm text-gray-300 ${
                      activeIndex >= index ? "text-slate-950" : ""
                    }`}
                  >
                    {item.name}
                  </div>
                </div>

                {/* Line connecting the steps, only show if not the last step */}
                {index !== StepperOptions.length - 1 && (
                  <div className="flex-1 h-1 mb-6 w-[30px] md:w-[100px] lg:w-[170px] rounded-full align-middle">
                    <div
                      className={`h-1 w-full rounded-full ${
                        activeIndex - 1 >= index
                          ? "bg-gradient-to-r from-gray-500 to-slate-950"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="px-5 md:px-20 lg:px-44 mt-20 relative w-full">
          {activeIndex == 0 ? (
            <UploadResume />
          ) : activeIndex == 1 ? (
            <Goal />
          ) : activeIndex == 2 ? (
            <Preferences />
          ) : activeIndex == 3 ? (
            <CompetencyRate />
          ) : activeIndex == 4 ? (
            <RateYourself />
          ) : activeIndex == 5 ? (
            <SkillGapAnalysis />
          ) : activeIndex == 6 ? (
            <Overview />
          ) : null}
          <div className="fixed bottom-10 left-10">
            <Button
              disabled={activeIndex === 0}
              variant="outline"
              onClick={() => setActiveIndex(activeIndex - 1)}
            >
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-5 h-5" /> <span>Previous</span>
              </div>
            </Button>
          </div>
          <div className="fixed bottom-10 right-10">
            {activeIndex < 6 && (
              <Button
                onClick={() => setActiveIndex(activeIndex + 1)}
                disabled={checkStatus()}
              >
                <div className="flex items-center gap-2 ">
                  <span>Next Step</span>
                  <ChevronRight className="w-5 h-5" />{" "}
                </div>
              </Button>
            )}
            {activeIndex === 6 && (
              <Button
                onClick={() => handleOnBoarding()}
                disabled={checkStatus()}
                className="flex items-center space-x-2"
              >
                <span>That's Perfect!</span>
                <div className="flex items-center justify-center w-5 h-5">
                  <ThumbsUp className="w-4 h-4" />
                </div>
              </Button>
            )}
          </div>
        </div>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center">
              <Spinner className="w-10 h-10 text-primary animate-spin" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Flow;
