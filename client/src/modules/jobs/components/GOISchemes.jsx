"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  HelpCircle,
  ArrowLeft,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  Check,
  X,
  MessageCircle,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Types
// interface Scheme {
//   id: string;
//   title: string;
//   ministry: string;
//   description: string;
//   tags: string[];
//   forYou?: boolean;
//   schemeIcon: string;
//   ministryIcon: string;
//   eligibility: "Eligible" | "Not Eligible";
//   applicability: "Applicable" | "Not Applicable";
//   details: string;
//   relevancyScore: number;
//   annualIncome: number;
//   experience: number;
// }

// Sample data
const schemes = [
  {
    id: "1",
    title:
      "Junior Research Fellowship (JRF) And Research Associateship (RA) For Foreign Nationals",
    ministry: "Ministry of Education",
    description:
      "The scheme was initiated keeping in view the political and cultural bilateral relations of India with other developing countries: Asia, Africa, Latin America. The scheme has opened new vistas for foreign students and teachers.",
    tags: ["Fellowship", "Foreign", "Research"],
    forYou: true,
    schemeIcon: "/placeholder.svg?height=40&width=40",
    ministryIcon: "/placeholder.svg?height=40&width=40",
    eligibility: "Eligible",
    applicability: "Applicable",
    details:
      "This scheme provides opportunities for foreign nationals to pursue research in Indian institutions. It covers various fields of study and offers financial support for the duration of the fellowship.",
    relevancyScore: 85,
    annualIncome: 500000,
    experience: 2,
  },
  {
    id: "2",
    title: "Scheme For Award Of Financial Assistance For Education",
    ministry: "Ministry Of Labour and Employment",
    description:
      "A scholarship scheme by the Directorate of Social Welfare providing financial assistance for education to eligible candidates.",
    tags: ["Financial Assistance", "Scholarship", "Student"],
    forYou: false,
    schemeIcon: "/placeholder.svg?height=40&width=40",
    ministryIcon: "/placeholder.svg?height=40&width=40",
    eligibility: "Not Eligible",
    applicability: "Not Applicable",
    details:
      "This scheme aims to support students from economically weaker sections by providing financial assistance for their education. It covers various levels of education and has specific eligibility criteria based on family income and academic performance.",
    relevancyScore: 60,
    annualIncome: 300000,
    experience: 0,
  },
  {
    id: "3",
    title: "Punjab Skill Development Mission",
    ministry: "Government of Punjab",
    description:
      "Aims to enhance the skill levels of the workforce in Punjab by providing quality training in various sectors. The mission focuses on creating employment opportunities by bridging the skill gap.",
    tags: ["Skill Development", "Employment", "Training"],
    forYou: true,
    schemeIcon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLfVryf862vhMx87kR4dT9aj4CSMt4MeULEg&s",
    ministryIcon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9WHinjmKivhg3RB-v2GEHuYbYfR01-oRUGQ&s",
    eligibility: "Eligible",
    applicability: "Applicable",
    details:
      "This scheme offers skill development training programs across multiple sectors, aiming to make youth employable. It also collaborates with industry partners for on-the-job training and placements.",
    relevancyScore: 90,
    annualIncome: 300000,
    experience: 0,
  },
  {
    id: "4",
    title: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    ministry: "Ministry of Skill Development and Entrepreneurship",
    description:
      "A flagship program aimed at providing industry-relevant skill training to the youth of India.",
    tags: ["Skill Development", "Training", "Employment"],
    forYou: true,
    schemeIcon: "/placeholder.svg?height=40&width=40",
    ministryIcon: "/placeholder.svg?height=40&width=40",
    eligibility: "Eligible",
    applicability: "Applicable",
    details:
      "This scheme provides short-term training and recognition of prior learning for skill development. It also assists with placement, entrepreneurship, and post-training support.",
    relevancyScore: 92,
    annualIncome: 400000,
    experience: 0,
  },
  {
    id: "5",
    title: "National Scholarship Portal (NSP)",
    ministry: "Ministry of Electronics and Information Technology",
    description:
      "An online platform for students to apply for various scholarships provided by the government of India.",
    tags: ["Scholarship", "Education", "Students"],
    forYou: true,
    schemeIcon: "/placeholder.svg?height=40&width=40",
    ministryIcon: "/placeholder.svg?height=40&width=40",
    eligibility: "Eligible",
    applicability: "Applicable",
    details:
      "This portal integrates different scholarships offered by central and state governments. Students can easily apply for, track, and avail benefits through this one-stop solution.",
    relevancyScore: 88,
    annualIncome: 600000,
    experience: 0,
  },
  {
    id: "6",
    title: "Atal Pension Yojana (APY)",
    ministry: "Ministry of Finance",
    description:
      "A government-backed pension scheme focused on providing social security to workers in the unorganized sector.",
    tags: ["Pension", "Social Security", "Unorganized Sector"],
    forYou: true,
    schemeIcon: "/placeholder.svg?height=40&width=40",
    ministryIcon: "/placeholder.svg?height=40&width=40",
    eligibility: "Eligible",
    applicability: "Applicable",
    details:
      "The scheme offers guaranteed monthly pension benefits after retirement based on the contributions made during the working years.",
    relevancyScore: 85,
    annualIncome: 200000,
    experience: 0,
  },
  {
    id: "7",
    title: "Pradhan Mantri Awas Yojana (PMAY)",
    ministry: "Ministry of Housing and Urban Affairs",
    description:
      "A flagship housing scheme aimed at providing affordable housing for all by 2022.",
    tags: ["Housing", "Urban Development", "Affordable Homes"],
    forYou: true,
    schemeIcon: "/placeholder.svg?height=40&width=40",
    ministryIcon: "/placeholder.svg?height=40&width=40",
    eligibility: "Eligible",
    applicability: "Applicable",
    details:
      "This scheme provides financial assistance for construction or purchase of houses, particularly for economically weaker sections, lower-income groups, and middle-income groups.",
    relevancyScore: 90,
    annualIncome: 600000,
    experience: 0,
  },
  {
    id: "8",
    title: "Startup India",
    ministry: "Ministry of Commerce and Industry",
    description:
      "An initiative aimed at promoting entrepreneurship and innovation by supporting startups with funding, mentorship, and incentives.",
    tags: ["Entrepreneurship", "Startups", "Innovation"],
    forYou: true,
    schemeIcon: "/placeholder.svg?height=40&width=40",
    ministryIcon: "/placeholder.svg?height=40&width=40",
    eligibility: "Eligible",
    applicability: "Applicable",
    details:
      "Provides benefits such as tax exemptions, patent support, and access to funding through a dedicated fund-of-funds managed by SIDBI.",
    relevancyScore: 95,
    annualIncome: 500000,
    experience: 0,
  },
  {
    id: "9",
    title: "National Rural Employment Guarantee Act (NREGA)",
    ministry: "Ministry of Rural Development",
    description:
      "Provides legal assurance of wage employment to rural households in India.",
    tags: ["Employment", "Rural Development", "Social Security"],
    forYou: true,
    schemeIcon: "/placeholder.svg?height=40&width=40",
    ministryIcon: "/placeholder.svg?height=40&width=40",
    eligibility: "Eligible",
    applicability: "Applicable",
    details:
      "Ensures 100 days of wage employment in a financial year to rural households willing to do unskilled manual work.",
    relevancyScore: 93,
    annualIncome: 150000,
    experience: 0,
  },
  {
    id: "10",
    title: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    ministry: "Ministry of Health and Family Welfare",
    description:
      "The world's largest government-funded healthcare program, offering health insurance to economically vulnerable families.",
    tags: ["Healthcare", "Insurance", "Social Welfare"],
    forYou: true,
    schemeIcon: "/placeholder.svg?height=40&width=40",
    ministryIcon: "/placeholder.svg?height=40&width=40",
    eligibility: "Eligible",
    applicability: "Applicable",
    details:
      "Provides cashless health coverage of up to ₹5 lakh per family per year for secondary and tertiary healthcare services.",
    relevancyScore: 98,
    annualIncome: 300000,
    experience: 0,
  },
  
];

// Components
const HelpCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border shadow-sm"
    >
      <div className="flex items-start gap-4">
        <HelpCircle className="w-5 h-5 text-gray-500" />
        <div className="space-y-1">
          <h3 className="font-medium">How to use the Scheme Finder</h3>
          <p className="text-sm text-muted-foreground">
            {`Search for schemes using keywords, filter by ministry or benefits,
            and use tags to narrow down results. The "For You" tab shows
            personalized recommendations based on your profile.`}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const RelevancyScore = ({ score }) => {
  const circumference = 2 * Math.PI * 18; // 18 is the radius of the circle
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-12 h-12">
      <svg className="w-12 h-12" viewBox="0 0 40 40">
        <circle
          className="text-gray-300"
          strokeWidth="3"
          stroke="currentColor"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
        />
        <circle
          className="text-blue-600"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
        />
      </svg>
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
        {score}
      </span>
    </div>
  );
};

const SchemeCard = ({ scheme, onFavorite }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12 rounded-full">
            <AvatarImage src={scheme.schemeIcon} alt={scheme.title} />
            <AvatarFallback>{scheme.title[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2 mb-1">
              {(scheme.eligibility === "Not Eligible" ||
                scheme.applicability === "Not Applicable") && (
                <Badge variant="destructive" className="rounded-sm">
                  {scheme.eligibility === "Not Eligible"
                    ? "Not Eligible"
                    : "Not Applicable"}
                </Badge>
              )}
            </div>
            <h3 className="text-xl font-semibold tracking-tight">
              {scheme.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Avatar className="w-6 h-6">
                <AvatarImage src={scheme.ministryIcon} alt={scheme.ministry} />
                <AvatarFallback>{scheme.ministry[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {scheme.ministry}
              </span>
            </div>
          </div>
        </div>
        <RelevancyScore score={scheme.relevancyScore} />
      </div>
      <div className="flex gap-2 mb-4">
        {scheme.eligibility === "Eligible" && (
          <Badge variant="default" className="rounded-sm">
            <Check className="w-4 h-4 mr-1" />
            Eligible
          </Badge>
        )}
        {scheme.applicability === "Applicable" && (
          <Badge variant="default" className="rounded-sm">
            <Check className="w-4 h-4 mr-1" />
            Applicable
          </Badge>
        )}
      </div>
      <p className="text-sm mb-4">{scheme.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {scheme.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="rounded-full">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Learn More
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{scheme.title}</DialogTitle>
              <DialogDescription>{scheme.ministry}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-sm">{scheme.details}</p>
            </div>
          </DialogContent>
        </Dialog>
        <Button variant="outline" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          Discuss with Kaushal AI
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onFavorite(scheme.id)}>
          <Heart className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 rounded-lg border space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-20 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

const Filters = ({
  selectedFilters,
  setSelectedFilters,
  annualIncome,
  setAnnualIncome,
  experience,
  setExperience,
  onReset,
}) => {
  const filters = [
    "Education",
    "Employment",
    "Health",
    "Agriculture",
    "Housing",
    "Social Welfare",
    "Rural Development",
    "Urban Development",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        {filters.map((filter) => (
          <div key={filter} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={filter}
              checked={selectedFilters.includes(filter)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedFilters([...selectedFilters, filter]);
                } else {
                  setSelectedFilters(
                    selectedFilters.filter((f) => f !== filter)
                  );
                }
              }}
            />
            <label
              htmlFor={filter}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {filter}
            </label>
          </div>
        ))}
      </div>
      <Separator />
      <div>
        <h3 className="font-semibold mb-4">Annual Income</h3>
        <Slider
          min={0}
          max={1000000}
          step={10000}
          value={[annualIncome]}
          onValueChange={(value) => setAnnualIncome(value[0])}
        />
        <p className="text-sm mt-2">₹{annualIncome.toLocaleString()}</p>
      </div>
      <Separator />
      <div>
        <h3 className="font-semibold mb-4">Experience (Years)</h3>
        <Select
          value={experience.toString()}
          onValueChange={(value) => setExperience(parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select experience" />
          </SelectTrigger>
          <SelectContent>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year} {year === 1 ? "year" : "years"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Separator />
      <Button onClick={onReset} variant="outline" className="w-full">
        Reset Filters
      </Button>
    </div>
  );
};

// Main Component
export default function GOISchemes() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMinistry, setSelectedMinistry] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [annualIncome, setAnnualIncome] = useState(500000);
  const [experience, setExperience] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showHelp, setShowHelp] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [favorites, setFavorites] = useState([]);
  const schemesPerPage = 5;

  const resetFilters = useCallback(() => {
    setSelectedFilters([]);
    setAnnualIncome(500000);
    setExperience(0);
    setSelectedMinistry("all");
    setSortBy("relevance");
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  }, []);

  // Filter and sort schemes
  const filteredAndSortedSchemes = schemes
    .filter((scheme) => {
      const matchesSearch =
        scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMinistry =
        selectedMinistry === "all" || scheme.ministry === selectedMinistry;
      const matchesTab =
        activeTab === "all" || (activeTab === "for-you" && scheme.forYou);
      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.some((filter) => scheme.tags.includes(filter));
      const matchesIncome = scheme.annualIncome <= annualIncome;
      const matchesExperience = scheme.experience <= experience;

      return (
        matchesSearch &&
        matchesMinistry &&
        matchesTab &&
        matchesFilters &&
        matchesIncome &&
        matchesExperience
      );
    })
    .sort((a, b) => {
      if (sortBy === "relevance") {
        return b.relevancyScore - a.relevancyScore;
      } else if (sortBy === "schemeScore") {
        return b.relevancyScore - a.relevancyScore;
      } else if (sortBy === "recent") {
        // Assuming we had a 'createdAt' field, we could sort by that
        return 0;
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  const indexOfLastScheme = currentPage * schemesPerPage;
  const indexOfFirstScheme = indexOfLastScheme - schemesPerPage;
  const currentSchemes = filteredAndSortedSchemes.slice(
    indexOfFirstScheme,
    indexOfLastScheme
  );

  const ministries = Array.from(new Set(schemes.map((s) => s.ministry)));

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r p-6 hidden md:block">
        <Filters
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          annualIncome={annualIncome}
          setAnnualIncome={setAnnualIncome}
          experience={experience}
          setExperience={setExperience}
          onReset={resetFilters}
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="border-b p-4 sticky top-0 bg-background z-10">
          <div className="flex items-center mb-4">
            <h1 className="text-4xl font-bold cp-text-gradient">
              Government Schemes
            </h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onMouseEnter={() => setShowHelp(true)}
                  onMouseLeave={() => setShowHelp(false)}
                >
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>How to use the Scheme Finder</DialogTitle>
                </DialogHeader>
                <HelpCard />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={selectedMinistry}
              onValueChange={setSelectedMinistry}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Ministry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ministries</SelectItem>
                {ministries.map((ministry) => (
                  <SelectItem key={ministry} value={ministry}>
                    {ministry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {showHelp && <HelpCard />}

          <div className="mt-6">
            <Tabs
              defaultValue="all"
              className="space-y-6"
              onValueChange={setActiveTab}
            >
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Schemes</TabsTrigger>
                  <TabsTrigger value="for-you">For You</TabsTrigger>
                </TabsList>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="schemeScore">Scheme Score</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-4" />

              {/* Mobile Filters Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden mb-4">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
                    <Filters
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      annualIncome={annualIncome}
                      setAnnualIncome={setAnnualIncome}
                      experience={experience}
                      setExperience={setExperience}
                      onReset={resetFilters}
                    />
                  </ScrollArea>
                </SheetContent>
              </Sheet>

              <AnimatePresence mode="wait">
                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="text-sm text-muted-foreground mb-4">
                      Showing {currentSchemes.length} of{" "}
                      {filteredAndSortedSchemes.length} schemes
                    </div>

                    <TabsContent value="all" className="space-y-4 mt-0">
                      {currentSchemes.map((scheme) => (
                        <SchemeCard
                          key={scheme.id}
                          scheme={scheme}
                          onFavorite={toggleFavorite}
                        />
                      ))}
                    </TabsContent>

                    <TabsContent value="for-you" className="space-y-4 mt-0">
                      {currentSchemes
                        .filter((s) => s.forYou)
                        .map((scheme) => (
                          <SchemeCard
                            key={scheme.id}
                            scheme={scheme}
                            onFavorite={toggleFavorite}
                          />
                        ))}
                    </TabsContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Tabs>
          </div>
        </main>

        {/* Pagination */}
        <footer className="border-t p-4 sticky bottom-0 bg-background">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Showing {indexOfFirstScheme + 1}-
              {Math.min(indexOfLastScheme, filteredAndSortedSchemes.length)} of{" "}
              {filteredAndSortedSchemes.length} Results
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(filteredAndSortedSchemes.length / schemesPerPage)
                  )
                )
              }
              disabled={
                currentPage ===
                Math.ceil(filteredAndSortedSchemes.length / schemesPerPage)
              }
            >
              Next
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
