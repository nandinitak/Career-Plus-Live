"use client";

import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, Clock, Zap, ArrowRight, Footprints } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import DockContext from "@/context/DockContext";

type Action = {
  id: string;
  title: string;
  score: number;
  description: string;
  howTo: string;
  effects: string;
  impact: number;
  priority: number;
  complexity: number;
};

type Filter =
  | "all"
  | "badDay"
  | "greatDay"
  | "productive"
  | "creative"
  | "relaxed";

export default function NextBestSteps() {
  const [isVisible, setIsVisible] = useState(true);
  const [actions, setActions] = useState<Action[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedAction, setExpandedAction] = useState<string | null>(null);

  interface DockContextType {
    dockContext: object;
    setDockContext: (prev: object) => void;
  }

  const { dockContext, setDockContext }: DockContextType =
    useContext(DockContext);
  const handleClose = () => {
    setDockContext((prev: object) => ({
      ...prev,
      title: "orphan",
    }));
    setIsVisible(false);
  };
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setActions([
        {
          id: "1",
          title: "Enroll in Stitching Course under PSDM",
          score: 90,
          description:
            "Join a government-sponsored stitching program to learn sewing skills",
          howTo:
            "Visit the nearest PSDM center in Phagwara, fill out the registration form, and attend classes",
          effects:
            "Helps in gaining professional stitching skills and certification",
          impact: 95,
          priority: 90,
          complexity: 40,
        },
        {
          id: "2",
          title: "Attend Career Session by Gurpreet Kaur",
          score: 80,
          description:
            "Participate in a session to learn about career opportunities in stitching and tailoring",
          howTo: "Register at the PSDM center and attend the scheduled session",
          effects:
            "Provides clear career direction and knowledge about available opportunities",
          impact: 85,
          priority: 80,
          complexity: 30,
        },
        {
          id: "3",
          title: "Apply for a Free Sewing Machine",
          score: 85,
          description:
            "Get a sewing machine under a government scheme to practice at home",
          howTo:
            "Submit the required documents at PSDM and apply for the scheme",
          effects:
            "Enables practice and start of home-based stitching business",
          impact: 90,
          priority: 85,
          complexity: 20,
        },
        {
          id: "4",
          title: "Learn to Make Traditional Punjabi Attire",
          score: 75,
          description:
            "Focus on creating Punjabi suits and phulkari embroidery",
          howTo: "Attend specialized workshops provided by PSDM",
          effects:
            "Preserves cultural heritage and opens up niche business opportunities",
          impact: 80,
          priority: 75,
          complexity: 50,
        },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  const filteredActions = actions.filter((action) => {
    if (filter === "all") return true;
    if (filter === "badDay") return action.score < 50;
    if (filter === "greatDay") return action.score >= 80;
    if (filter === "productive") return action.priority > 70;
    if (filter === "creative") return action.complexity > 60;
    if (filter === "relaxed") return action.complexity < 40;
    return true;
  });

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.8,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-background/60 backdrop-blur-md"
              onClick={() => setIsVisible(false)}
            />
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.8,
              }}
              className="relative w-full max-w-2xl max-h-[80vh] bg-background border border-border rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold tracking-tight flex flex-row items-center">
                    <Footprints size={24} className="mr-3" />
                    <span className="cp-text-gradient">Next Best Steps</span>
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setIsVisible(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={24} />
                  </motion.button>
                </div>
                <FeelingSection filter={filter} setFilter={setFilter} />
                {isLoading ? (
                  <LoadingState />
                ) : (
                  <ActionList
                    actions={filteredActions}
                    expandedAction={expandedAction}
                    setExpandedAction={setExpandedAction}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FeelingSection({
  filter,
  setFilter,
}: {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-lg text-muted-foreground font-semibold mb-2">
        How are you feeling today?
      </h3>
      <div className="flex flex-wrap gap-2">
        <FilterButton
          label="All"
          value="all"
          currentFilter={filter}
          setFilter={setFilter}
        />
        <FilterButton
          label="Productive"
          value="productive"
          currentFilter={filter}
          setFilter={setFilter}
          icon={<Activity size={16} />}
        />
        <FilterButton
          label="Creative"
          value="creative"
          currentFilter={filter}
          setFilter={setFilter}
          icon={<Zap size={16} />}
        />
        <FilterButton
          label="Relaxed"
          value="relaxed"
          currentFilter={filter}
          setFilter={setFilter}
          icon={<Clock size={16} />}
        />
        <FilterButton
          label="Great Day"
          value="greatDay"
          currentFilter={filter}
          setFilter={setFilter}
        />
        <FilterButton
          label="Bad Day"
          value="badDay"
          currentFilter={filter}
          setFilter={setFilter}
        />
      </div>
    </div>
  );
}

function FilterButton({
  label,
  value,
  currentFilter,
  setFilter,
  icon,
}: {
  label: string;
  value: Filter;
  currentFilter: Filter;
  setFilter: (filter: Filter) => void;
  icon?: React.ReactNode;
}) {
  const isActive = currentFilter === value;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={() => setFilter(value)}
      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground"
      }`}
    >
      {icon}
      {label}
    </motion.button>
  );
}

function ActionList({
  actions,
  expandedAction,
  setExpandedAction,
}: {
  actions: Action[];
  expandedAction: string | null;
  setExpandedAction: (id: string | null) => void;
}) {
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
      className="space-y-4 overflow-y-auto flex-grow"
    >
      {actions.map((action, index) => (
        <ActionItem
          key={action.id}
          action={action}
          rank={index + 1}
          isExpanded={expandedAction === action.id}
          onToggleExpand={() =>
            setExpandedAction(expandedAction === action.id ? null : action.id)
          }
        />
      ))}
    </motion.ul>
  );
}

function ActionItem({
  action,
  rank,
  isExpanded,
  onToggleExpand,
}: {
  action: Action;
  rank: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const rankSuffix = (rank: number) => {
    if (rank === 1) return "st";
    if (rank === 2) return "nd";
    if (rank === 3) return "rd";
    return "th";
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
      className="bg-card rounded-lg p-4 shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-mono font-bold text-muted-foreground">
            {rank}
            <sup className="text-xs">{rankSuffix(rank)}</sup>
          </span>
          <h3 className="text-lg font-semibold">{action.title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <ScoreCircle score={action.score} />
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Button size="sm" variant="ghost" onClick={onToggleExpand}>
                <ArrowRight size={16} />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-sm text-muted-foreground space-y-2"
          >
            <p>
              <strong>What:</strong> {action.description}
            </p>
            <p>
              <strong>How:</strong> {action.howTo}
            </p>
            <p>
              <strong>Effects:</strong> {action.effects}
            </p>
            <div className="mt-4 space-y-2">
              <ScoreItem
                label="Impact"
                score={action.impact}
                description="How much this action affects your goals"
              />
              <ScoreItem
                label="Priority"
                score={action.priority}
                description="How urgent this action is"
              />
              <ScoreItem
                label="Complexity"
                score={action.complexity}
                description="How difficult this action is to complete"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function ScoreCircle({ score }: { score: number }) {
  const color =
    score >= 80
      ? "text-green-500"
      : score >= 50
        ? "text-yellow-500"
        : "text-red-500";

  return (
    <Popover>
      <PopoverTrigger>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className={`relative inline-flex rounded-full w-12 h-12 ${color}`}
        >
          <svg className="w-12 h-12" viewBox="0 0 36 36">
            <motion.path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 100 - score }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
            {score}
          </span>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <h4 className="font-semibold mb-2">Action Score</h4>
        <p className="text-sm text-muted-foreground">
          This score represents the overall importance and impact of the action.
        </p>
      </PopoverContent>
    </Popover>
  );
}

function ScoreItem({
  label,
  score,
  description,
}: {
  label: string;
  score: number;
  description: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium">{label}</span>
        <span className="text-sm">{score}</span>
      </div>
      <Progress value={score} className="h-2" />
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-4">
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-muted rounded-lg p-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="w-3/4 h-6 bg-muted-foreground/20 rounded" />
        <div className="w-12 h-12 bg-muted-foreground/20 rounded-full" />
      </div>
    </motion.div>
  );
}
