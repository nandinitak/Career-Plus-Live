import React from "react";
import UserSheet from "./UserSheet";
import UserDropdownMenu from "./UserDropdownMenu";
import UserSearchBar from "./UserSearchBar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Video,
  MessageCircleQuestion,
  NotebookPen,
  BadgeHelp,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";

const BreadcrumbComponent = ({ viewProp }) => (
  <Breadcrumb className="flex items-center space-x-2">
    {viewProp.map(([pageName, pageUrl], index) => (
      <React.Fragment key={index}>
        <BreadcrumbItem>
          {index !== viewProp.length - 1 ? (
            <BreadcrumbLink href={pageUrl} className="text-blue-500 font-mono">
              {pageName}
            </BreadcrumbLink>
          ) : (
            <span className="text-gray-700 font-mono">{pageName}</span>
          )}
        </BreadcrumbItem>
        {index !== viewProp.length - 1 && (
          // <BreadcrumbSeparator className="" />
          <span>/</span>
        )}
      </React.Fragment>
    ))}
  </Breadcrumb>
);

function DashboardHeader({
  view,
  isSearchRequired = false,
  isMentorRequired = false,
  isJobieRequired = false,
  isColabEditorRequired = false,
  isHelpRequired = false,
  isMockRequired = false,
}) {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-2 border-b bg-muted/40 px-4 lg:h-[60px] backdrop-blur-md">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-muted/80 to-transparent h-6"></div>

      <div className="flex flex-row items-center space-x-1 px-3 py-1">
        <BreadcrumbComponent viewProp={view}></BreadcrumbComponent>
      </div>

      <UserSheet />
      {isSearchRequired ? (
        <UserSearchBar />
      ) : (
        <div className="w-full flex-1"></div>
      )}
      {isMentorRequired && (
        <div className="flex items-center space-x-2">
          <Link to="/mentor/connect">
            <Button variant="shine" className="flex items-center space-x-2">
              <Video className="h-5 w-5" />
              <span>Video Call Mentor</span>
            </Button>
          </Link>
        </div>
      )}

      {isHelpRequired && (
        <div className="flex items-center space-x-2">
          <Link to="/help">
            <Button variant="shine" className="flex items-center space-x-2">
              <BadgeHelp className="h-5 w-5" />
              <span>I need Help</span>
            </Button>
          </Link>
        </div>
      )}

      {isJobieRequired && (
        <div className="flex items-center space-x-2">
          <Button variant="shine" className="flex items-center space-x-2">
            <MessageCircleQuestion className="h-5 w-5" />
            <span>Ask Jobie</span>
          </Button>
        </div>
      )}

      {isMockRequired && (
        <div className="flex items-center space-x-2">
          <Link to="http://localhost:5173/">
            <Button variant="shine" className="flex items-center space-x-2">
              <BadgeHelp className="h-5 w-5" />
              <span>Connect to Mock Interview</span>
            </Button>
          </Link>
        </div>
      )}

      {isColabEditorRequired && (
        <div className="flex items-center space-x-2">
          <Link to="/notebook">
            <Button variant="shine" className="flex items-center space-x-2">
              <NotebookPen className="h-5 w-5" />
              <span>Colab Editor</span>
            </Button>
          </Link>
        </div>
      )}
      <div className="flex flex-row items-center space-x-5">
        {/* <LanguageSelect /> */}
        <UserSearchBar />
        {/* <PillButton /> */}
        <UserDropdownMenu />
      </div>
    </header>
  );
}

export default DashboardHeader;
