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

// Featured Work Item Component
const FeaturedWorkItem = ({
  item,
  isLoading,
}: {
  item: any;
  isLoading?: boolean;
}) => {
  const [isLiked, setIsLiked] = React.useState(false);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-lg">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          src={item.img}
          alt={item.title}
          className="h-[200px] w-full object-cover"
        />
        <div className="absolute right-2 top-2 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/80 backdrop-blur-sm"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={cn("h-4 w-4", isLiked && "fill-red-500 text-red-500")}
            />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/80 backdrop-blur-sm"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-gradient-to-r bg-black hover:bg-gray-400 text-white"
          >
            {item.category}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Coins className="h-3 w-3" />
            {item.tokens} tokens
          </Badge>
        </div>
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
    </motion.div>
  );
};

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
export default function Page() {
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

  const featuredWork = [
    {
      id: 1,
      title: "Motorcycle Welding",
      description:
        "Specialized welding techniques for motorcycle frame fabrication and repair.",
      category: "Manufacturing",
      img: "https://i.imghippo.com/files/oELs3777S.png",
      tokens: 500,
      eligibility: "Basic technical knowledge in welding",
      location: "Punjab",
      language: "Punjabi, English",
    },
    {
      id: 2,
      title: "Motorcycle Repair & Maintenance",
      description:
        "Comprehensive training in repairing and maintaining motorcycles, focusing on engine and mechanical systems.",
      category: "Automobile Services",
      img: "https://i.imghippo.com/files/aKV6771CM.png",
      tokens: 400,
      eligibility: "Basic understanding of mechanical systems",
      location: "Punjab",
      language: "Punjabi, Hindi",
    },
    {
      id: 3,
      title: "Heavy Vehicle Driving",
      description:
        "Training for safe and efficient driving of heavy vehicles, including trucks and buses.",
      category: "Transport & Logistics",
      img: "https://i.imghippo.com/files/dAwM6068Mg.png",
      tokens: 600,
      eligibility: "Valid driver’s license, age 21+",
      location: "Punjab",
      language: "Punjabi, Hindi",
    },
    {
      id: 4,
      title: "Drone Pilot Training",
      description:
        "Learn to operate drones for surveillance, delivery, and aerial photography.",
      category: "Aviation & Technology",
      img: "https://i.imghippo.com/files/NcvG9897nmM.png",
      tokens: 700,
      eligibility: "Age 18-40, basic tech knowledge",
      location: "Punjab",
      language: "Punjabi, English",
    },
    {
      id: 5,
      title: "Automobile Diagnostics",
      description:
        "Hands-on training in diagnosing and troubleshooting automobile electronic systems.",
      category: "Automobile Services",
      img: "https://i.imghippo.com/files/kSTh6844N.png",
      tokens: 550,
      eligibility: "Basic knowledge in automobile mechanics",
      location: "Punjab",
      language: "Punjabi, Hindi",
    },
    {
      id: 6,
      title: "Solar Panel Installation",
      description:
        "Training on installing, maintaining, and repairing solar energy systems.",
      category: "Renewable Energy",
      img: "https://i.imghippo.com/files/VtBf4166iM.png",
      tokens: 650,
      eligibility: "Basic electrical knowledge",
      location: "Punjab",
      language: "Punjabi, English",
    },
    {
      id: 7,
      title: "CNC Machine Operation",
      description:
        "Skill development in operating and programming CNC machines for precision manufacturing.",
      category: "Manufacturing",
      img: "https://i.imghippo.com/files/PFI1316gsI.png",
      tokens: 800,
      eligibility: "Basic technical knowledge in machining",
      location: "Punjab",
      language: "Punjabi, English",
    },
    {
      id: 8,
      title: "Hospitality Management",
      description:
        "Training in hospitality management for careers in hotels, restaurants, and tourism.",
      category: "Hospitality",
      img: "https://i.imghippo.com/files/kUoX9616HVo.png",
      tokens: 700,
      eligibility: "Minimum 12th pass",
      location: "Punjab",
      language: "Punjabi, English",
    },
    {
      id: 9,
      title: "Medical Coding and Billing",
      description:
        "Learn to manage medical records and insurance billing using specialized coding systems.",
      category: "Healthcare",
      img: "https://i.imghippo.com/files/Vbby9367A.png",
      tokens: 600,
      eligibility: "Basic understanding of medical terminology",
      location: "Punjab",
      language: "Punjabi, English",
    },
    {
      id: 10,
      title: "E-Commerce Website Development",
      description:
        "Train to build and manage online stores, including payment gateway integration.",
      category: "Web Development",
      img: "https://i.imghippo.com/files/Nx4758Lbw.png",
      tokens: 800,
      eligibility: "Basic understanding of web technologies",
      location: "Punjab",
      language: "Punjabi, English",
    },
    {
      id: 11,
      title: "Graphic Design for Social Media",
      description:
        "Learn to create eye-catching graphics and visuals for social media marketing campaigns.",
      category: "Design & Multimedia",
      img: "https://i.imghippo.com/files/FDq7480.png",
      tokens: 500,
      eligibility: "Creative background, 12th pass",
      location: "Punjab",
      language: "Punjabi, English",
    },
    {
      id: 12,
      title: "Fashion Design & Textile Arts",
      description:
        "Learn the art of fashion design, garment creation, and textile pattern making.",
      category: "Fashion Design",
      img: "https://i.imghippo.com/files/XoC3316rp.png",
      tokens: 750,
      eligibility: "Creative background, age 18-30",
      location: "Punjab",
      language: "Punjabi",
    },
    {
      id: 13,
      title: "Beauty Therapy & Skincare",
      description:
        "Training in beauty therapy, skincare, and makeup techniques for professional careers.",
      category: "Beauty & Wellness",
      img: "https://i.imghippo.com/files/xu1326QH.png",
      tokens: 400,
      eligibility: "Female, age 18-30",
      location: "Punjab",
      language: "Punjabi, Hindi",
    },
    {
      id: 14,
      title: "Web & Mobile App Development",
      description:
        "Comprehensive training in developing responsive websites and mobile apps.",
      category: "Software Engineering",
      img: "https://i.imghippo.com/files/JuV4693tw.png",
      tokens: 850,
      eligibility: "12th pass with a background in mathematics",
      location: "Punjab",
      language: "Punjabi, Hindi, English",
    },
    {
      id: 15,
      title: "Event Management",
      description:
        "Training in organizing and managing events like weddings, corporate functions, and concerts.",
      category: "Event Management",
      img: "https://i.imghippo.com/files/Vf1665TAs.png",
      tokens: 600,
      eligibility: "All ages, with a focus on organizational skills",
      location: "Punjab",
      language: "Punjabi, Hindi",
    },
    {
      id: 16,
      title: "Agricultural Technology and Drone Use",
      description:
        "Training in advanced agricultural technology and the use of drones for crop monitoring.",
      category: "Agriculture",
      img: "https://i.imghippo.com/files/znL3946jc.png",
      tokens: 700,
      eligibility: "Open to farmers and tech enthusiasts",
      location: "Punjab",
      language: "Punjabi, English",
    },
    {
      id: 17,
      title: "Interior Design Fundamentals",
      description:
        "Learn to design and decorate spaces effectively, focusing on residential interiors.",
      category: "Design & Multimedia",
      img: "https://i.imghippo.com/files/uZKZ6739cU.png",
      tokens: 500,
      eligibility: "Creative background",
      location: "Punjab",
      language: "Punjabi",
    },
    {
      id: 18,
      title: "Digital Marketing & SEO",
      description:
        "Training in digital marketing techniques and SEO strategies for online businesses.",
      category: "Marketing",
      img: "https://i.imghippo.com/files/aUT2043Edo.png",
      tokens: 650,
      eligibility: "Basic understanding of marketing concepts",
      location: "Punjab",
      language: "Punjabi, English",
    },
    {
      id: 19,
      title: "Plumbing and Pipefitting",
      description:
        "Hands-on training in plumbing and pipefitting for residential and commercial systems.",
      category: "Construction & Infrastructure",
      img: "https://i.imghippo.com/files/AKDL1175nQ.png",
      tokens: 500,
      eligibility: "Basic technical knowledge",
      location: "Punjab",
      language: "Punjabi",
    },
    {
      id: 20,
      title: "Housekeeping & Facility Management",
      description:
        "Training in housekeeping and facility management skills for hotels, offices, and institutions.",
      category: "Hospitality",
      img: "https://i.imghippo.com/files/tAz4409PZ.png",
      tokens: 400,
      eligibility: "Minimum 10th pass",
      location: "Punjab",
      language: "Punjabi, English",
    },
  ];

  React.useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredWork = React.useMemo(() => {
    return featuredWork
      .filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "tokens") return b.tokens - a.tokens;
        return 0; // Default to no sorting
      });
  }, [featuredWork, searchQuery, sortBy]);

  const paginatedWork = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredWork.slice(startIndex, endIndex);
  }, [filteredWork, currentPage]);

  const totalPages = Math.ceil(filteredWork.length / itemsPerPage);

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

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className=" absolute top-2 left-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search works..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="tokens">Highest Tokens</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <AnimatePresence>
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {isLoading
                ? Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <FeaturedWorkItem
                        key={`skeleton-${i}`}
                        item={{}}
                        isLoading
                      />
                    ))
                : paginatedWork.map((item) => (
                    <FeaturedWorkItem key={item.id} item={item} />
                  ))}
            </motion.div>
          </AnimatePresence>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </section>
      </main>
    </div>
  );
}
