"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookmarkPlus,
  ExternalLink,
  Star,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import P5Embed from "./P5Embed";

// Simulated content items
const contentItems = [
  {
    id: 1,
    title: "Introduction to React",
    description:
      "Learn the basics of React, a popular JavaScript library for building user interfaces.",
    thumbnail: "/placeholder.svg?height=80&width=120",
    tags: [
      { name: "JavaScript", icon: "Code" },
      { name: "React", icon: "Component" },
      { name: "Frontend", icon: "Layout" },
    ],
    category: "Web Development",
    author: { name: "Jane Doe", avatar: "/placeholder.svg?height=40&width=40" },
    embedCount: 150,
    license: "MIT",
    embedCode:
      "<iframe src='https://example.com/react-intro' width='100%' height='400'></iframe>",
    version: "1.2.3",
    rating: 4.5,
    totalRatings: 230,
    editorsChoice: true,
    src: `https://qmdnzkeynanpnivehrbz.supabase.co/storage/v1/object/public/sketch/proj.js`,
  },
  {
    id: 2,
    title: "Advanced CSS Techniques",
    description:
      "Explore advanced CSS techniques to create stunning and responsive web designs.",
    thumbnail: "/placeholder.svg?height=80&width=120",
    tags: [
      { name: "CSS", icon: "Paintbrush" },
      { name: "Web Design", icon: "Palette" },
      { name: "Frontend", icon: "Layout" },
    ],
    category: "Web Design",
    author: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    embedCount: 89,
    license: "Creative Commons",
    embedCode:
      "<iframe src='https://example.com/advanced-css' width='100%' height='400'></iframe>",
    version: "2.0.1",
    rating: 4.2,
    totalRatings: 150,
    editorsChoice: false,
    src: `https://qmdnzkeynanpnivehrbz.supabase.co/storage/v1/object/public/sketch/sine.js`,
  },
  {
    id: 3,
    title: "Node.js Fundamentals",
    description:
      "Get started with Node.js and learn how to build scalable server-side applications.",
    thumbnail: "/placeholder.svg?height=80&width=120",
    tags: [
      { name: "JavaScript", icon: "Code" },
      { name: "Node.js", icon: "Server" },
      { name: "Backend", icon: "Database" },
    ],
    category: "Backend Development",
    author: {
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    embedCount: 210,
    license: "Apache 2.0",
    embedCode:
      "<iframe src='https://example.com/nodejs-fundamentals' width='100%' height='400'></iframe>",
    version: "3.1.0",
    rating: 4.8,
    totalRatings: 300,
    editorsChoice: true,
    src: `https://qmdnzkeynanpnivehrbz.supabase.co/storage/v1/object/public/sketch/bst.js`,
  },
  // Add more items as needed
];

const itemsPerPage = 5;

export default function VizSearchEmbed() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      setItems(contentItems);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredAndSortedItems = items
    .filter(
      (item) =>
        (filterBy === "all" || item.category.toLowerCase() === filterBy) &&
        (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.name.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    )
    .sort((a, b) => {
      if (sortBy === "embedCount") return b.embedCount - a.embedCount;
      if (sortBy === "alphabetical") return a.title.localeCompare(b.title);
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // Default to original order ("relevance")
    });

  const pageCount = Math.ceil(filteredAndSortedItems.length / itemsPerPage);
  const paginatedItems = filteredAndSortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleItemSelect = async (item) => {
    setIsPreviewLoading(true);
    setSelectedItem(null);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading delay
    setSelectedItem(item);
    setIsPreviewLoading(false);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="p-4 border-b bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-2">Content Explorer</h1>
        <p className="text-muted-foreground mb-4 flex items-center">
          <Search className="mr-2 h-4 w-4" />
          Search for content, filter by category, and embed in your projects
        </p>
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search content..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="web development">Web Development</SelectItem>
              <SelectItem value="web design">Web Design</SelectItem>
              <SelectItem value="backend development">
                Backend Development
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="embedCount">Embed Count</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <aside className="w-full md:w-1/2 border-r bg-white dark:bg-gray-800">
          <ScrollArea className="h-full">
            <AnimatePresence>
              {isLoading
                ? Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <motion.div
                        key={`skeleton-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-4 border-b"
                      >
                        <div className="flex items-start space-x-4">
                          <Skeleton className="w-30 h-20 rounded" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <div className="flex space-x-2">
                              <Skeleton className="h-6 w-16 rounded-full" />
                              <Skeleton className="h-6 w-16 rounded-full" />
                              <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                : paginatedItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => handleItemSelect(item)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <img
                            src={item.thumbnail}
                            alt=""
                            width={120}
                            height={80}
                            className="object-cover rounded"
                            loading="lazy"
                          />
                          {item.editorsChoice && (
                            <Badge
                              variant="secondary"
                              className="absolute top-0 right-0 m-1"
                            >
                              <Award className="h-3 w-3 mr-1" />
                              Editor Choice
                            </Badge>
                          )}
                        </div>
                        <div className="flex-1">
                          <h2 className="font-semibold">{item.title}</h2>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                          <div className="mt-2 flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={item.author.avatar}
                                alt={item.author.name}
                              />
                              <AvatarFallback>
                                {item.author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                              {item.author.name}
                            </span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <Badge
                                key={tag.name}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag.icon && (
                                  <span
                                    className={`mr-1 ${tag.icon.toLowerCase()}`}
                                  >
                                    {tag.icon}
                                  </span>
                                )}
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
            </AnimatePresence>
          </ScrollArea>
          <div className="p-4 border-t bg-white dark:bg-gray-800 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {pageCount}
            </span>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, pageCount))
              }
              disabled={currentPage === pageCount}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </aside>
        <main className="flex-1 p-4 overflow-auto bg-white dark:bg-gray-800">
          {isPreviewLoading ? (
            <div className="flex items-center justify-center h-full">
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
          ) : selectedItem ? (
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedItem.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedItem.category} • {selectedItem.embedCount} embeds •
                    By {selectedItem.author.name}
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(selectedItem.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {selectedItem.rating.toFixed(1)} (
                      {selectedItem.totalRatings} ratings)
                    </span>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button variant="outline">
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                    Save to Collection
                  </Button>
                  <Button>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Embed
                  </Button>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden mb-4">
                <P5Embed src={selectedItem.src}></P5Embed>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <span className="text-white font-mono text-sm">
                    v{selectedItem.version}
                  </span>
                </div>
              </div>
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="license">License</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <p className="text-muted-foreground mb-4">
                    {selectedItem.description}
                  </p>
                  <Separator className="my-4" />
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag) => (
                      <Badge key={tag.name} variant="secondary">
                        {tag.icon && (
                          <span className={`mr-1 ${tag.icon.toLowerCase()}`}>
                            {tag.icon}
                          </span>
                        )}
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="code">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code>{selectedItem.embedCode}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="license">
                  <p>
                    This content is licensed under the {selectedItem.license}{" "}
                    license.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Select visualization"
                width={200}
                height={200}
                className="mb-4"
              />
              <p className="text-muted-foreground">
                Select a visualization to preview
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
