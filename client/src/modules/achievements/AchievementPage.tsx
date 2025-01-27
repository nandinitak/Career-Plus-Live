"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Badge,
  ChevronDown,
  ChevronUp,
  Clock,
  Flag,
  HelpCircle,
  Layout,
  LinkedinIcon,
  Lock,
  Medal,
  Share,
  Star,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Types
interface Achievement {
  id: string;
  title: string;
  category: string;
  icon: JSX.Element;
  progress: number;
  image: string;
}

interface Certificate {
  id: string;
  title: string;
  subtitle: string;
  mentor: {
    name: string;
    avatar: string;
    initials: string;
  };
  progress: {
    current: number;
    total: number;
  };
}

interface PeerActivity {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  achievement: string;
  timestamp: string;
}

// Mock Data
const achievements: Achievement[] = [
  // Sessions
  {
    id: "s1",
    title: "Workshop Master",
    category: "Sessions",
    icon: <Layout className="h-6 w-6 text-blue-500" />,
    progress: 75,
    image: "https://i.imghippo.com/files/OdU5246Nuo.png",
  },
  {
    id: "s2",
    title: "Seminar Pro",
    category: "Sessions",
    icon: <Layout className="h-6 w-6 text-blue-500" />,
    progress: 60,
    image: "https://i.imghippo.com/files/qs7396piY.png",
  },
  {
    id: "s3",
    title: "Conference Guru",
    category: "Sessions",
    icon: <Layout className="h-6 w-6 text-blue-500" />,
    progress: 85,
    image: "https://i.imghippo.com/files/GiUm7769kJU.png",
  },

  // Tasks
  {
    id: "t1",
    title: "Task Champion",
    category: "Tasks",
    icon: <Flag className="h-6 w-6 text-blue-500" />,
    progress: 60,
    image: "https://i.imghippo.com/files/OdU5246Nuo.png",
  },
  {
    id: "t2",
    title: "Project Leader",
    category: "Tasks",
    icon: <Flag className="h-6 w-6 text-blue-500" />,
    progress: 45,
    image: "https://i.imghippo.com/files/qs7396piY.png",
  },
  {
    id: "t3",
    title: "Deadline Crusher",
    category: "Tasks",
    icon: <Flag className="h-6 w-6 text-blue-500" />,
    progress: 80,
    image: "https://i.imghippo.com/files/GiUm7769kJU.png",
  },

  // Minutes
  {
    id: "m1",
    title: "Time Wizard",
    category: "Minutes",
    icon: <Clock className="h-6 w-6 text-blue-500" />,
    progress: 90,
    image: "https://i.imghippo.com/files/OdU5246Nuo.png",
  },
  {
    id: "m2",
    title: "Focus Master",
    category: "Minutes",
    icon: <Clock className="h-6 w-6 text-blue-500" />,
    progress: 85,
    image: "https://i.imghippo.com/files/qs7396piY.png",
  },
  {
    id: "m3",
    title: "Pomodoro Pro",
    category: "Minutes",
    icon: <Clock className="h-6 w-6 text-blue-500" />,
    progress: 75,
    image: "https://i.imghippo.com/files/GiUm7769kJU.png",
  },

  // Goals
  {
    id: "g1",
    title: "Goal Crusher",
    category: "Goals",
    icon: <Trophy className="h-6 w-6 text-blue-500" />,
    progress: 45,
    image: "https://i.imghippo.com/files/OdU5246Nuo.png",
  },
  {
    id: "g2",
    title: "Achievement Hunter",
    category: "Goals",
    icon: <Trophy className="h-6 w-6 text-blue-500" />,
    progress: 30,
    image: "https://i.imghippo.com/files/qs7396piY.png",
  },
  {
    id: "g3",
    title: "Milestone Master",
    category: "Goals",
    icon: <Trophy className="h-6 w-6 text-blue-500" />,
    progress: 55,
    image: "https://i.imghippo.com/files/GiUm7769kJU.png",
  },
];

const certificates: Certificate[] = [
  {
    id: "1",
    title: "Working with Rishabh Bassi",
    subtitle:
      "You have experience working with a Machine Learning Engineer at Apple 🍎",
    mentor: {
      name: "Rishabh Bassi",
      avatar: "/placeholder.svg",
      initials: "RB",
    },
    progress: {
      current: 31,
      total: 90,
    },
  },
];

const peerActivities: PeerActivity[] = [
  {
    id: "1",
    user: {
      name: "Alex Chen",
      avatar: "/placeholder.svg",
      initials: "AC",
    },
    achievement: "Attentive Achiever",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    user: {
      name: "Sarah Miller",
      avatar: "/placeholder.svg",
      initials: "SM",
    },
    achievement: "Task Master",
    timestamp: "3 hours ago",
  },
];

// Components
const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full shadow-sm rounded-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
            >
              {achievement.category}
            </motion.span>
            <motion.div
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2 }}
            >
              {achievement.icon}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <CardTitle className="text-xl">{achievement.title}</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="relative w-full h-40 overflow-hidden rounded-md border-2 border-gray-200"
          >
            <img
              src={achievement.image}
              alt={achievement.title}
              className="transition-all duration-300 hover:scale-110 object-cover h-full w-full"
            />
          </motion.div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{achievement.progress}%</span>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Progress value={achievement.progress} className="h-2" />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-start space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={certificate.mentor.avatar}
            alt={certificate.mentor.name}
          />
          <AvatarFallback>{certificate.mentor.initials}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-semibold"
          >
            {certificate.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            {certificate.subtitle}
          </motion.p>
        </div>
      </div>

      <Card className="relative overflow-hidden shadow-sm rounded-md">
        <CardContent className="flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Lock className="h-12 w-12 text-muted-foreground" />
          </motion.div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <motion.h4
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg font-semibold"
        >
          {certificate.progress.current} Mentorship Days with{" "}
          {certificate.mentor.name}
        </motion.h4>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-muted-foreground"
        >
          {certificate.progress.current}/{certificate.progress.total} days
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Progress
            value={
              (certificate.progress.current / certificate.progress.total) * 100
            }
            className="h-2"
          />
        </motion.div>

        <div className="flex gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex-1"
          >
            <Button variant="outline" className="w-full">
              <Share className="mr-2 h-4 w-4" />
              Share Certificate
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex-1"
          >
            <Button className="w-full bg-[#0077B5] hover:bg-[#0077B5]/90">
              <LinkedinIcon className="mr-2 h-4 w-4" />
              Add to LinkedIn
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const PeerActivityCard = ({ activity }: { activity: PeerActivity }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-white p-4 shadow-sm"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={activity.user.avatar}
                alt={activity.user.name}
              />
              <AvatarFallback>{activity.user.initials}</AvatarFallback>
            </Avatar>
            <div className="absolute -right-1 -bottom-1 rounded-full bg-[#0077B5] p-1">
              <LinkedinIcon className="h-3 w-3 text-white" />
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <p className="font-medium">
              {activity.user.name} shared a post on LinkedIn
            </p>
            <p className="text-sm text-muted-foreground">
              Completed 500 mentorship minutes
            </p>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <LinkedinIcon className="h-5 w-5 text-[#0077B5]" />
            <span className="text-sm font-medium">Linkedin.com</span>
          </div>

          <div className="mt-2 space-y-4">
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 shrink-0 text-muted-foreground" />
              <p className="text-sm">
                I've reached a milestone - 500 mentorship minutes completed, and
                I'm now an "Attentive Achiever."
              </p>
            </div>

            <div className="flex justify-center rounded-lg bg-sky-100 p-6">
              <div className="relative w-24">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    {[1, 2, 3].map((_, i) => (
                      <Star
                        key={i + 3}
                        className="h-4 w-4 fill-muted text-muted"
                      />
                    ))}
                  </div>
                </div>
                <div className="relative flex aspect-square items-center justify-center rounded-full bg-pink-500 text-white">
                  <span className="text-2xl font-bold">500</span>
                  <div className="absolute -left-4 -top-2">
                    <div className="h-6 w-4 rotate-[-30deg] bg-gradient-to-b from-pink-300 to-pink-500" />
                  </div>
                  <div className="absolute -right-4 -top-2">
                    <div className="h-6 w-4 rotate-[30deg] bg-gradient-to-b from-pink-300 to-pink-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BadgeSection = ({
  category,
  achievements,
}: {
  category: string;
  achievements: Achievement[];
}) => {
  const filteredAchievements = achievements.filter(
    (achievement) => achievement.category === category
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{category}</h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {filteredAchievements.map((achievement) => (
            <CarouselItem
              key={achievement.id}
              className="sm:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <AchievementCard achievement={achievement} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
};

const LoadingState = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

// Main Component
export default function AchievementPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  setTimeout(() => setIsLoading(false), 2000);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight"
          >
            Achievement Hub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground"
          >
            Track your progress and celebrate achievements
          </motion.p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" size="icon">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>About Achievement Hub</DialogTitle>
                    <DialogDescription>
                      Track your progress across different categories, view
                      earned certificates and badges, and see what your peers
                      are achieving. Your achievements are organized into
                      Sessions, Tasks, Minutes, and Goals.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </TooltipTrigger>
            <TooltipContent>
              <p>Need help? Click for more information</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Separator className="my-6" />

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <Tabs defaultValue="certificates" className="space-y-6">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="certificates" className="space-x-2">
                  <Star className="h-4 w-4 text-blue-500" />
                  <span>Certificates</span>
                </TabsTrigger>
                <TabsTrigger value="badges" className="space-x-2">
                  <Badge className="h-4 w-4 text-blue-500" />
                  <span>Badges</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="certificates" className="space-y-6">
                {isLoading ? (
                  <LoadingState />
                ) : (
                  certificates.map((certificate) => (
                    <CertificateCard
                      key={certificate.id}
                      certificate={certificate}
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="badges" className="space-y-8">
                {isLoading ? (
                  <LoadingState />
                ) : (
                  <>
                    <BadgeSection
                      category="Sessions"
                      achievements={achievements}
                    />
                    <Separator className="my-8" />
                    <BadgeSection
                      category="Tasks"
                      achievements={achievements}
                    />
                    <Separator className="my-8" />
                    <BadgeSection
                      category="Minutes"
                      achievements={achievements}
                    />
                    <Separator className="my-8" />
                    <BadgeSection
                      category="Goals"
                      achievements={achievements}
                    />
                  </>
                )}
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </div>

        <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <div className="flex items-center space-x-2">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold tracking-tight"
            >
              Peer Activity
            </motion.h2>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
            >
              Live
            </motion.span>
          </div>
          <AnimatePresence>
            {isLoading ? (
              <LoadingState />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {peerActivities.map((activity) => (
                  <PeerActivityCard key={activity.id} activity={activity} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
