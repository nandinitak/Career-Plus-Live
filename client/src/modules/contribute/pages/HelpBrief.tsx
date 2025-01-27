"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Heart,
  ImageIcon,
  Layout,
  MoreHorizontal,
  PlayCircle,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trophy,
  Users,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// Hero Section Component
const HeroSection = () => (
  <div className="relative bg-gray-200 p-4 text-black rounded-lg">
    <h1 className="text-3xl font-bold mb-4 mt-4 align-middle text-center">
      Welcome to Contribution Chain
    </h1>
    <Card className="max-w-4xl mx-auto bg-background text-foreground">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <FileText className="w-8 h-8" />
          <div>
            <h3 className="font-semibold">Post a help brief</h3>
            <p className="text-sm text-muted-foreground">
              Get tailored offers for your needs.
            </p>
          </div>
        </div>
        <Button>Get started</Button>
      </CardContent>
    </Card>
  </div>
);

// Categories Section Component
const CategoriesSection = ({
  categories,
}: {
  categories: { icon: React.ReactNode; name: string }[];
}) => (
  <div className="mb-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-semibold">Explore popular categories</h2>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          Show All
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card className="hover:bg-accent cursor-pointer transition-colors">
            <CardContent className="flex items-center gap-3 p-4">
              {category.icon}
              <span className="font-medium">{category.name}</span>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
);

// Projects Carousel Component
const ProjectsCarousel = ({ projects }: { projects: any[] }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Recommended Projects</h2>
    <Carousel className="w-full">
      <CarouselContent>
        {projects.map((project) => (
          <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="relative">
                <div className="relative h-48 bg-muted">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute inset-0 w-full h-full hover:bg-black/50"
                  >
                    <PlayCircle className="w-12 h-12" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src={project.avatar}
                      alt={project.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{project.name}</p>
                      {project.topRated && (
                        <Badge variant="secondary" className="text-xs">
                          Top Rated
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm mb-3">{project.title}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-medium">{project.rating}</span>
                    <span className="text-muted-foreground">
                      ({project.reviews})
                    </span>
                  </div>
                  <p className="font-semibold">From ₹{project.price}</p>
                </CardContent>
              </Card>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);

// Help Summary Card Component
const HelpSummaryCard = () => (
  <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-primary" />
        Help Statistics
      </CardTitle>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Total Help Tokens Earned</span>
        <Badge variant="secondary" className="gap-1">
          <Coins className="h-3 w-3" />
          12,345
        </Badge>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Active Contributors</span>
        <span className="font-semibold">789</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Projects Completed</span>
        <span className="font-semibold">456</span>
      </div>
    </CardContent>
  </Card>
);

// Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => (
  <div className="flex justify-center items-center space-x-2 mt-8">
    <Button
      variant="outline"
      size="sm"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <ChevronLeft className="h-4 w-4" />
      Previous
    </Button>
    <span className="text-sm font-medium">
      Page {currentPage} of {totalPages}
    </span>
    <Button
      variant="outline"
      size="sm"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
);

// Main Component
export default function HelpBrief() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("recent");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;

  const categories = [
    {
      icon: <Users className="w-6 h-6" />,
      name: "User Generated Content",
    },
    { icon: <Layout className="w-6 h-6" />, name: "Logo Design" },
    { icon: <Layout className="w-6 h-6" />, name: "Website Development" },
    { icon: <Users className="w-6 h-6" />, name: "Social Media Marketing" },
  ];

  const projects = [
    {
      id: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Steve",
      title: "I will create ugc tiktok and social media video ads",
      rating: 5.0,
      reviews: 259,
      price: 8417,
      topRated: true,
    },
    {
      id: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Bruce Vigna",
      title: "I will produce and act in your user generated content",
      rating: 5.0,
      reviews: 260,
      price: 4430,
      topRated: true,
    },
    {
      id: 3,
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Daniel Johnson",
      title: "I will create amazing ugc tiktok or reels video",
      rating: 5.0,
      reviews: 868,
      price: 8417,
      topRated: true,
    },
  ];

  React.useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-16">
        <CategoriesSection categories={categories} />
        <ProjectsCarousel projects={projects} />
        <section>
          <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-3xl font-bold">
                <Sparkles className="h-8 w-8 text-primary" />
                Featured Help Work
              </h2>
              <p className="mt-2 text-muted-foreground">
                Get inspired by amazing contributions from our community
              </p>
            </div>
            <HelpSummaryCard />
          </div>
        </section>
      </main>
    </div>
  );
}
