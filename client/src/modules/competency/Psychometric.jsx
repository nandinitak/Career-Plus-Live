"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  HelpCircle,
  Clock,
  ListChecks,
  KeyIcon as Strategy,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const Psychometric = () => {
  const [loading, setLoading] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [rating, setRating] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAudioToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="flex-grow max-w-md w-full max-h-[calc(100vh-2rem)] overflow-auto shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Test Window</CardTitle>
          <CardDescription>Rate the content below</CardDescription>
        </CardHeader>
        <Separator className="my-2" />
        <CardContent className="space-y-4">
          <TestDetails />
          <Separator className="my-4" />
          <MediaDisplay
            loading={loading}
            isPlaying={isPlaying}
            onAudioToggle={handleAudioToggle}
          />
          <Separator className="my-4" />
          <RatingBar loading={loading} rating={rating} setRating={setRating} />
        </CardContent>
        <Separator className="my-2" />
        <CardFooter className="flex justify-between items-center">
          <Button variant="outline" onClick={() => setShowHelp(!showHelp)}>
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </Button>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="bg-black text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
              Important
            </span>
          </motion.div>
        </CardFooter>
      </Card>
      <NavigationButtons />
      <AnimatePresence>
        {showHelp && <HelpCard setShowHelp={setShowHelp} />}
      </AnimatePresence>
      <audio
        ref={audioRef}
        src="/path-to-audio.mp3"
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

const TestDetails = () => {
  const details = [
    { icon: Clock, title: "Time Left", value: "15:00" },
    { icon: ListChecks, title: "Questions", value: "5/20" },
    { icon: Strategy, title: "Strategy", value: "Timed" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {details.map((detail, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <detail.icon className="h-6 w-6 mb-2" />
          <h3 className="text-sm font-semibold">{detail.title}</h3>
          <p className="text-xs text-muted-foreground">{detail.value}</p>
        </div>
      ))}
    </div>
  );
};

const MediaDisplay = ({ loading, isPlaying, onAudioToggle }) => {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden">
      {loading ? (
        <Skeleton className="w-full h-full" />
      ) : (
        <>
          <motion.img
            src="/placeholder.svg"
            alt="Test content"
            className={cn("w-full h-full object-cover", isPlaying && "blur-sm")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2"
            onClick={onAudioToggle}
          >
            {isPlaying ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
        </>
      )}
    </div>
  );
};

const RatingBar = ({ loading, rating, setRating }) => {
  const labels = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree",
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Rate the content:</h3>
      {loading ? (
        <div className="flex items-center justify-center h-12">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          <Slider
            value={[rating]}
            onValueChange={(value) => setRating(value[0])}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            {labels.map((label, index) => (
              <span
                key={index}
                className={cn(index + 1 === rating && "font-bold text-primary")}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const NavigationButtons = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between p-4 bg-background border-t">
      <Button variant="outline">Previous</Button>
      <Button>Next</Button>
    </div>
  );
};

const HelpCard = ({ setShowHelp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Help</CardTitle>
          <CardDescription>UI Summary</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-2">
          <p>This Test Window displays test details at the top.</p>
          <p>
            The content is shown in the center, with an audio button for
            text-to-speech.
          </p>
          <p>Use the slider to rate the content on a 5-point scale.</p>
          <p>
            Navigate between questions using the buttons at the bottom of the
            screen.
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={() => setShowHelp(false)}>Close</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Psychometric;
