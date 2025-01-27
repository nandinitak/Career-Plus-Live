import React from "react";
import UserDropdownMenu from "../../../../../dashboard/components/UserDropdownMenu";
import UserSearchBar from "../../../../../dashboard/components/UserSearchBar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Video,
  MessageCircleQuestion,
  NotebookPen,
  BadgeHelp,
} from "lucide-react";

function ChapterHeader({ chapter }) {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-2 border-b bg-muted/40 px-4 lg:h-[60px] backdrop-blur-md">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-muted/80 to-transparent h-6"></div>

      <div className="flex flex-row items-center space-x-1 px-3 py-1">
        {chapter}
      </div>

      <div className="flex flex-row items-center space-x-5">
        {/* <UserSearchBar />
        <UserDropdownMenu /> */}
      </div>
    </header>
  );
}

export default ChapterHeader;
