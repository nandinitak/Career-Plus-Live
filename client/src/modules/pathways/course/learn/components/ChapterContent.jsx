"use client";

import { useState } from "react";
import YouTube from "react-youtube";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Play,
  Code,
  Info,
  HelpCircle,
  ChevronRight,
  Zap,
  Book,
  Lightbulb,
} from "lucide-react";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 0,
  },
};

// Gradient Pill component

// Learn More Dialog content
const LearnMoreContent = () => (
  <div className="grid gap-6 py-4 md:grid-cols-2">
    {[
      {
        icon: Zap,
        title: "Too Lengthy?",
        description:
          "I'll summarise and present you a concise version and an example.",
        link: "/graph-flow",
      },
      {
        icon: Book,
        title: "Too Confusing?",
        description: "I'll create diagrams with examples to explain visually.",
        link: "/course/3c6fbfa7-1406-4199-8161-adbdfbd058cb/learn/graph-flow",
      },
      {
        icon: Lightbulb,
        title: "Couldn't get the feel?",
        description:
          "I'll help you visualize concepts with interactive flows with head and hand.",
      },
      {
        icon: Lightbulb,
        title: "Too Texty?",
        description: "I'll help you visualize this with a beautiful image.",
      },
      {
        icon: Lightbulb,
        title: "Too Boring?",
        description: "I'll help you understand this with an engaging voice.",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="p-6 border rounded-lg shadow-sm bg-white max-w-"
      >
        <div className="flex items-center border-b pb-2 mb-3">
          <item.icon className="mr-3 h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">{item.title}</h3>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">{item.description}</p>
          <div className="mt-4">
            <button
              className="flex items-center px-4 py-2 text-sm font-medium border rounded-lg text-primary border-primary hover:bg-primary hover:text-white transition"
              onClick={() => (window.location.href = item.link)}
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const GradientPill = ({ children }) => (
  <span className="inline-block px-2 py-1 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
    {children}
  </span>
);

const HelpCard = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm"
      >
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <HelpCircle className="mr-2 text-blue-500" />
          UI Summary
        </h3>
        <p className="text-sm text-gray-600">
          This enhanced UI includes a chapter overview, video content, and
          detailed explanations with code snippets. Use the{" "}
          <GradientPill>Learn More</GradientPill> button to explore additional
          resources.
        </p>
      </motion.div>
    )}
  </AnimatePresence>
);

function ChapterContent({ chapter, content }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  // Simulate loading
  setTimeout(() => setIsLoading(false), 2000);

  return (
    <div className="p-4 relative">
      {/* Chapter Header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-gray-800 mb-2 border-b-2 border-gray-200 pb-2 flex items-center"
      >
        <Info className="text-blue-500 mr-2" /> {chapter?.chapterName}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-gray-600 leading-relaxed text-lg"
      >
        {chapter?.about}
      </motion.p>

      {/* YouTube Video */}
      <div className="flex justify-center my-6">
        {isLoading ? (
          <Skeleton className="w-[640px] h-[390px] rounded-lg" />
        ) : (
          <YouTube videoId={content?.videoId} opts={opts} />
        )}
      </div>

      <ContentCards content={content} />

      {/* Help Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4"
        onClick={() => setShowHelp(!showHelp)}
      >
        <HelpCircle className="h-4 w-4" />
      </Button>

      {/* Help Card */}
      <HelpCard isVisible={showHelp} />
    </div>
  );
}
const ContentCards = ({ content }) => (
  <div className="space-y-6 max-w-screen-2xl mx-auto">
    {content?.content?.map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.2 }}
        whileHover={{ scale: 1.01 }}
      >
        <Card className="bg-white shadow-sm rounded-lg">
          {/* Card Header */}
          <CardHeader>
            <div className="flex items-center">
              <Play className="text-green-500 mr-2" />
              <CardTitle className="text-xl font-semibold text-slate-950">
                {item?.title}
              </CardTitle>
            </div>
          </CardHeader>

          {/* Card Content */}
          <CardContent>
            <CardDescription className="text-gray-700 mb-4 whitespace-pre-wrap">
              {item?.description}
            </CardDescription>
            {item?.code && (
              <div className="bg-gray-900 text-white rounded-lg p-4 overflow-x-auto">
                <div className="flex items-center mb-2">
                  <Code className="text-yellow-500 mr-2" />
                  <span className="text-sm font-medium">Code Example</span>
                </div>
                <code>{item?.code}</code>
              </div>
            )}
          </CardContent>

          {/* Card Footer */}
          <CardFooter className="flex justify-between items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-screen-xl">
                <DialogHeader>
                  <DialogTitle>
                    <div>
                      <div>Explore Further</div>
                      <div className="mt-2 text-sm">{item.title}</div>
                    </div>
                  </DialogTitle>

                  <DialogDescription>
                    Discover additional resources to enhance your learning
                    experience.
                  </DialogDescription>
                </DialogHeader>
                <LearnMoreContent />
              </DialogContent>
            </Dialog>

            {/* Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`completed-${index}`}
                className="h-5 w-5 accent-green-500 cursor-pointer"
              />
              <label
                htmlFor={`completed-${index}`}
                className="ml-2 text-sm text-gray-600"
              >
                Mark as Done
              </label>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    ))}
  </div>
);

export default ChapterContent;
