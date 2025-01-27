"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  DollarSign,
  Star,
  Briefcase,
  Zap,
  Loader2,
  HelpCircle,
  X,
} from "lucide-react";

interface JobSuggestion {
  id: string;
  title: string;
  location: string;
  salaryRange: string;
  highlight: string;
  reasons: string[];
}

const defaultSuggestions: JobSuggestion[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    salaryRange: "$120k - $160k",
    highlight: "Remote",
    reasons: [
      "High growth potential",
      "Cutting-edge tech stack",
      "Flexible hours",
    ],
  },
  {
    id: "2",
    title: "Product Manager",
    location: "New York, NY",
    salaryRange: "$100k - $140k",
    highlight: "Hybrid",
    reasons: [
      "Leadership opportunity",
      "Innovative products",
      "Work-life balance",
    ],
  },
];

const GradientPill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
    {children}
  </span>
);

const JobCard = ({
  job,
  onApply,
}: {
  job: JobSuggestion;
  onApply: (id: string) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.03 }}
    className="flex flex-col justify-between p-4 border rounded-lg bg-card text-card-foreground shadow-sm"
  >
    <div>
      <h3 className="text-lg font-semibold mb-2 text-primary truncate">
        {job.title}
      </h3>
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
        <MapPin className="h-4 w-4 flex-shrink-0" />
        <span className="truncate">{job.location}</span>
      </div>
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
        <DollarSign className="h-4 w-4 flex-shrink-0" />
        <span>{job.salaryRange}</span>
      </div>
      <GradientPill>{job.highlight}</GradientPill>
      <div className="mt-3 space-y-1">
        {job.reasons.map((reason, index) => (
          <GradientPill key={index}>{reason}</GradientPill>
        ))}
      </div>
    </div>
    <Button
      onClick={() => onApply(job.id)}
      className="w-full mt-4 hover:bg-black hover:text-white transition-colors duration-200"
      size="sm"
      variant="outline"
    >
      Apply
    </Button>
  </motion.div>
);

const HelpCard = ({ onClose }: { onClose: () => void }) => (
  <Card className="absolute top-16 right-4 w-64 z-10">
    <CardContent className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">Help</h4>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        This UI displays top job recommendations. Use 'Auto Apply' to apply to
        all jobs or 'Apply' for individual applications. Hover over cards for
        more details.
      </p>
    </CardContent>
  </Card>
);

export default function EnhancedJobRecommendations({
  suggestions = defaultSuggestions,
}: {
  suggestions?: JobSuggestion[];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoApplying, setIsAutoApplying] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleApply = async (jobId: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Applying to job with ID: ${jobId}`);
    setIsLoading(false);
  };

  const handleAutoApply = async () => {
    setIsAutoApplying(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Auto applying to all matching jobs");
    setIsAutoApplying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl px-4 mx-auto relative"
    >
      <Card className="shadow-lg overflow-hidden">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Briefcase className="mr-2 h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">
                Top Job Recommendations
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleAutoApply}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                disabled={isAutoApplying}
                size="sm"
              >
                {isAutoApplying ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="mr-2 h-4 w-4" />
                )}
                Auto Apply
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHelp(true)}
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <AnimatePresence>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(2)].map((_, index) => (
                  <motion.div
                    key={`skeleton-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Skeleton className="h-[250px] w-full rounded-lg" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestions.map((job) => (
                  <JobCard key={job.id} job={job} onApply={handleApply} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <HelpCard onClose={() => setShowHelp(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
