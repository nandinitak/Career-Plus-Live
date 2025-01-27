"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Clock,
  DiamondIcon as Indian,
  Globe2,
  ChevronDown,
  ArrowLeft,
  HelpCircle,
  CircleHelp,
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
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
// Types
// interface Event {
//   id: string
//   title: string
//   description: string
//   image: string
//   type: "online" | "offline"
//   topics: string[]
//   date: string
//   time: string
//   duration: string
//   price: number
//   language: string
//   category: string
//   location?: string
//   instructor: string
//   availableSlots: number
//   feedback?: number
//   advanceParticipation?: number
//   forYou?: boolean
// }

// Sample data
const people = [
  {
    id: "1",
    title: "Advanced React Development Workshop",
    description:
      "Master React hooks, state management, and performance optimization in this intensive workshop.",
    image: "/placeholder.svg?height=400&width=800",
    type: "online",
    topics: ["React", "JavaScript", "Web Development"],
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "3 hours",
    price: 1999,
    language: "English",
    category: "Programming",
    instructor: "Sarah Johnson",
    availableSlots: 50,
    feedback: 4,
    advanceParticipation: 10,
    nsqf: 3,
  },
  {
    id: "2",
    title: "Digital Marketing Masterclass",
    description:
      "Learn SEO, social media marketing, and content strategy from industry experts.",
    image: "/placeholder.svg?height=400&width=800",
    type: "offline",
    topics: ["Marketing", "SEO", "Social Media"],
    date: "2024-01-20",
    time: "2:00 PM",
    duration: "4 hours",
    price: 2999,
    language: "Hindi",
    category: "Marketing",
    location: "Mumbai Central",
    instructor: "Raj Mehta",
    availableSlots: 30,
    feedback: 5,
    advanceParticipation: 20,
    nsqf: 5,
  },
];

// Components
const EventCard = ({ event }) => {
  const [selectedDate, setSelectedDate] = useState();
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex gap-6 p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow"
    >
      <div className="relative w-72 h-48 rounded-lg overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="secondary"
                className="rounded-sm bg-black text-white"
              >
                {event.type === "online" ? "Online" : "Offline"}
              </Badge>
              {event.topics.map((topic) => (
                <Badge key={topic} variant="outline" className="rounded-full">
                  {topic}
                </Badge>
              ))}
            </div>
            <h3 className="text-xl font-semibold">{event.title}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="font-semibold">₹{event.price}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {event.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>
              {event.time} ({event.duration})
            </span>
          </div>
          {event.type === "offline" && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Globe2 className="w-4 h-4" />
            <span>{event.language}</span>
          </div>
          <div className="flex items-center gap-1">
            <Indian className="w-4 h-4" />
            <span>{event.instructor}</span>
          </div>
          <div className="flex items-center gap-1">
            <Indian className="w-4 h-4" />
            <span>{event.nsqf}</span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/event/${event.id}`)}
          >
            <div className="flex flex-row justify-between align-middle items-center">
              <div className="mr-2">
                <CircleHelp className="w-4 h-4" />
              </div>
              <div>Learn More</div>
            </div>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Filters = ({
  selectedLanguages,
  setSelectedLanguages,
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  selectedTypes,
  setSelectedTypes,
  onReset,
}) => {
  const languages = ["English", "Hindi", "Marathi", "Gujarati"];
  const categories = [
    "Programming",
    "Marketing",
    "Design",
    "Business",
    "Personal Development",
  ];
  const types = ["online", "offline"];

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="languages">
        <AccordionTrigger>Languages</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {languages.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={language}
                  checked={selectedLanguages.includes(language)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedLanguages([...selectedLanguages, language]);
                    } else {
                      setSelectedLanguages(
                        selectedLanguages.filter((l) => l !== language)
                      );
                    }
                  }}
                />
                <label htmlFor={language} className="text-sm">
                  {language}
                </label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="categories">
        <AccordionTrigger>Categories</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== category)
                      );
                    }
                  }}
                />
                <label htmlFor={category} className="text-sm">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="type">
        <AccordionTrigger>Type</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {types.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedTypes([...selectedTypes, type]);
                    } else {
                      setSelectedTypes(selectedTypes.filter((t) => t !== type));
                    }
                  }}
                />
                <label htmlFor={type} className="text-sm capitalize">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="price">
        <AccordionTrigger>Price Range</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <Slider
              min={0}
              max={10000}
              step={500}
              value={[priceRange]}
              onValueChange={(value) => setPriceRange(value[0])}
            />
            <p className="text-sm">Up to ₹{priceRange.toLocaleString()}</p>
          </div>
        </AccordionContent>
      </AccordionItem>

      <Button onClick={onReset} variant="outline" className="w-full mt-4">
        Reset Filters
      </Button>
    </Accordion>
  );
};

const HelpCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border shadow-sm mb-4"
    >
      <div className="flex items-start gap-4">
        <HelpCircle className="w-5 h-5 text-gray-500" />
        <div className="space-y-1">
          <h3 className="font-medium">How to use the Event Finder</h3>
          <p className="text-sm text-muted-foreground">
            Search for people using keywords, filter by language, category, or
            price range. Use the "For You" tab to see personalized
            recommendations. Click "Learn More" for event details or "Book Slot"
            to reserve your place.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Main Component
export default function SearchPeople() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("relevance");
  const [showHelp, setShowHelp] = useState(false);
  const peoplePerPage = 5;

  const resetFilters = () => {
    setSelectedLanguages([]);
    setPriceRange(10000);
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSortBy("relevance");
  };

  // Filter people
  const filteredAndSortedPeople = people
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLanguage =
        selectedLanguages.length === 0 ||
        selectedLanguages.includes(event.language);
      const matchesPrice = event.price <= priceRange;
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(event.category);
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(event.type);
      const matchesTab =
        activeTab === "all" || (activeTab === "for-you" && event.forYou);

      return (
        matchesSearch &&
        matchesLanguage &&
        matchesPrice &&
        matchesCategory &&
        matchesType &&
        matchesTab
      );
    })
    .sort((a, b) => {
      if (sortBy === "feedback" && a.feedback && b.feedback) {
        return b.feedback - a.feedback;
      } else if (
        sortBy === "advanceParticipation" &&
        a.advanceParticipation &&
        b.advanceParticipation
      ) {
        return b.advanceParticipation - a.advanceParticipation;
      } else {
        return 0; // Default to no sorting
      }
    });

  const indexOfLastEvent = currentPage * peoplePerPage;
  const indexOfFirstEvent = indexOfLastEvent - peoplePerPage;
  const currentPeople = filteredAndSortedPeople.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="border-b p-4 sticky top-0 bg-background z-10">
          <div className="flex items-center mb-4">
            <h1 className="text-4xl font-bold cp-text-gradient">
              Search People
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
                  <DialogTitle>How to use Search People</DialogTitle>
                </DialogHeader>
                <HelpCard />
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search People..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {showHelp && <HelpCard />}

          <div className="mb-6">
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All People</TabsTrigger>
                  <TabsTrigger value="for-you">For You</TabsTrigger>
                </TabsList>

                <div className="text-sm text-muted-foreground">
                  Found{" "}
                  <span className="font-mono font-bold">
                    {filteredAndSortedPeople.length}
                  </span>{" "}
                  People
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="advanceParticipation">
                      Advance Participation
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Tabs>
          </div>

          {/* Mobile Filters Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden mb-4">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
                <Filters
                  selectedLanguages={selectedLanguages}
                  setSelectedLanguages={setSelectedLanguages}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  selectedTypes={selectedTypes}
                  setSelectedTypes={setSelectedTypes}
                  onReset={resetFilters}
                />
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {currentPeople.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </motion.div>
            </AnimatePresence>
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
              Showing {indexOfFirstEvent + 1}-
              {Math.min(indexOfLastEvent, filteredAndSortedPeople.length)} of{" "}
              {filteredAndSortedPeople.length} Results
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(filteredAndSortedPeople.length / peoplePerPage)
                  )
                )
              }
              disabled={
                currentPage ===
                Math.ceil(filteredAndSortedPeople.length / peoplePerPage)
              }
            >
              Next
            </Button>
          </div>
        </footer>
      </div>
      <aside className="w-64 border-l p-6 hidden md:block">
        <Filters
          selectedLanguages={selectedLanguages}
          setSelectedLanguages={setSelectedLanguages}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          onReset={resetFilters}
        />
      </aside>
    </div>
  );
}
