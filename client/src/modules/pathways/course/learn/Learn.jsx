import { getChapterByCourse, getCourseLayout } from "@/helpers/pathwayAPI";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dock, Loader2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { extractCourseId } from "@/helpers/api";
import ChapterContent from "./components/ChapterContent";
import { Skeleton } from "@/components/ui/skeleton";
import cpLogo from "/logo-on-white-gradient.png";
import { Link } from "react-router-dom";
import DashboardHeader from "../../../../dashboard/components/DashboardHeader";
import ChapterHeader from "./components/ChapterHeader";
function Learn() {
  let _id = localStorage.getItem("_id");
  const courseId = extractCourseId(window.location.href);

  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const fetchCourse = async () => {
    try {
      const result = await getCourseLayout(_id, courseId);
      setCourse(result.data.course[0].courseLayout?.layout);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const fetchChapterContent = async (courseId) => {
    try {
      const result = await getChapterByCourse(courseId);
      setChapters(result?.data?.chapters);
    } catch (error) {
      console.error("Error fetching chapter content:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchChapterContent(courseId);
  }, [_id, courseId]);

  useEffect(() => {
    if (course && chapters) {
      setIsLoading(false);
    }
  }, [course, chapters]);

  const renderChapter = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-4">
          <Skeleton className="w-full h-48 rounded-lg mb-4" />
          <Skeleton className="w-full h-6 rounded-md mb-2" />
          <Skeleton className="w-full h-6 rounded-md" />
        </div>
      );
    }

    return (
      <ChapterContent
        chapter={course?.chapters?.[selectedChapterIndex]}
        content={chapters?.[selectedChapterIndex]?.content}
      />
    );
  };

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="relative min-h-screen w-screen bg-white">
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed left-0 top-0 bottom-0 ${
            isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"
          } transform transition-transform duration-300 w-[220px] lg:w-[280px] border-r bg-muted/40 overflow-y-auto`}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
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

            {/* Sidebar Navigation */}
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="w-full h-10 rounded-lg mb-2"
                      />
                    ))
                  : course?.chapters?.map((chapter, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedChapterIndex(index)}
                        className={`flex items-center gap-3 px-3 py-2 transition-all ${
                          selectedChapterIndex === index
                            ? "bg-cp-gradient text-muted"
                            : "bg-muted text-primary hover:text-primary"
                        } ${
                          index === 0
                            ? "rounded-tl-[12px] rounded-tr-[12px]"
                            : ""
                        } ${
                          index === chapters?.length - 1
                            ? "rounded-bl-[12px] rounded-br-[12px]"
                            : ""
                        }`}
                      >
                        <span>{chapter?.chapterName}</span>
                      </button>
                    ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarCollapsed ? "ml-0" : "ml-[220px] lg:ml-[280px]"
          }`}
        >
          <ChapterHeader chapter={course?.skillName} />
          <div className="">{renderChapter()}</div>
        </div>
      </div>
    </div>
  );
}

export default Learn;
