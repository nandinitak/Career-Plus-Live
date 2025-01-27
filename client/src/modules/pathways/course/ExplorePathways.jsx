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
  SquareArrowLeft,
  RouteIcon,
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
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./Pathways.css";
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
const pathways = [
  {
    id: "1",
    title: "Agriculture Skill Development",
    description:
      "Master modern farming techniques, crop management, and sustainable agricultural practices.",
    image: "https://i.imghippo.com/files/frb6778OE.png",
    type: "offline",
    topics: ["Modern Farming", "Crop Management", "Sustainability"],
    date: "2024-12-10",
    time: "09:00 AM",
    duration: "3 months",
    price: 200,
    language: "Punjabi, Hindi",
    category: "Agriculture",
    instructor: "Dr. Simranjit Kaur",
    availableSlots: 40,
    feedback: 4.7,
    advanceParticipation: 8,
    nsqf: 5,
    review: 4.8,
    host: "Punjab Agricultural University",
    product: "Skill Course",
    certification: "Completion",
    credits: "6",
    qpCode: "AGR/Q2101",
    assessment: "Proctored",
    req_age: "18",
    min_edu: "10th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Efficient Farming Techniques",
      "Understanding Crop Cycles",
      "Sustainable Practices",
    ],
  },
  {
    id: "2",
    title: "Apparel Design and Tailoring",
    description:
      "Learn advanced tailoring skills and design techniques to excel in the apparel industry.",
    image: "https://i.imghippo.com/files/rmDi4211gdI.png",
    type: "offline",
    topics: ["Tailoring", "Apparel Design", "Textile Selection"],
    date: "2024-12-20",
    time: "11:00 AM",
    duration: "2 months",
    price: 50,
    language: "English, Hindi",
    category: "Apparel",
    instructor: "Ms. Meena Gupta",
    availableSlots: 30,
    feedback: 4.5,
    advanceParticipation: 12,
    nsqf: 4,
    review: 4.6,
    host: "National Institute of Fashion Technology",
    product: "Skill Course",
    certification: "Completion",
    credits: "4",
    qpCode: "APP/Q1204",
    assessment: "Proctored",
    req_age: "18",
    min_edu: "10th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Garment Stitching",
      "Textile Selection",
      "Fashion Trends",
    ],
  },
  {
    id: "3",
    title: "Automotive Repair and Maintenance",
    description:
      "Comprehensive training in automotive repair, maintenance, and diagnostics for various vehicle types.",
    image: "https://i.imghippo.com/files/Bp4880enI.png",
    type: "offline",
    topics: ["Vehicle Diagnostics", "Repair Techniques", "Maintenance"],
    date: "2024-12-12",
    time: "10:00 AM",
    duration: "4 months",
    price: 0,
    language: "English, Punjabi",
    category: "Automotive",
    instructor: "Mr. Rajeev Tiwari",
    availableSlots: 25,
    feedback: 4.8,
    advanceParticipation: 5,
    nsqf: 6,
    review: 4.9,
    host: "Automotive Skills Development Council",
    product: "Skill Course",
    certification: "Completion",
    credits: "8",
    qpCode: "AUT/Q3601",
    assessment: "Proctored",
    req_age: "18",
    min_edu: "10th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Vehicle Troubleshooting",
      "Repairing Engine Components",
      "Preventive Maintenance",
    ],
  },
  {
    id: "4",
    title: "Aviation Ground Staff Training",
    description:
      "Develop the skills required to work as a ground staff professional in the aviation industry.",
    image: "https://i.imghippo.com/files/FCJ2601GM.png",
    type: "offline",
    topics: ["Customer Service", "Baggage Handling", "Safety Procedures"],
    date: "2024-12-18",
    time: "10:00 AM",
    duration: "3 months",
    price: 750,
    language: "English, Hindi",
    category: "Aviation & Aerospace",
    instructor: "Capt. Neha Arora",
    availableSlots: 20,
    feedback: 4.9,
    advanceParticipation: 3,
    nsqf: 5,
    review: 4.8,
    host: "Airline Training Academy",
    product: "Skill Course",
    certification: "Completion",
    credits: "6",
    qpCode: "AV/Q0110",
    assessment: "Proctored",
    req_age: "20",
    min_edu: "12th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Effective Customer Interaction",
      "Understanding Aviation Procedures",
      "Baggage and Cargo Handling",
    ],
  },
  {
    id: "5",
    title: "Banking Fundamentals",
    description:
      "Gain in-depth knowledge about core banking operations, financial products, and customer handling.",
    image: "https://i.imghippo.com/files/Ubw2140JUQ.png",
    type: "online",
    topics: ["Banking Operations", "Customer Service", "Financial Products"],
    date: "2024-12-25",
    time: "02:00 PM",
    duration: "2 months",
    price: 800,
    language: "English",
    category: "Banking, Financial services and Insurance (BFSI)",
    instructor: "Mr. Arun Kumar",
    availableSlots: 60,
    feedback: 4.6,
    advanceParticipation: 15,
    nsqf: 5,
    review: 4.7,
    host: "Institute of Banking Studies",
    product: "Skill Course",
    certification: "Completion",
    credits: "5",
    qpCode: "BFS/Q1210",
    assessment: "Non-proctored",
    req_age: "18",
    min_edu: "12th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Understanding Banking Products",
      "Customer Service in Banking",
      "Basics of Loans and Investments",
    ],
  },
  {
    id: "6",
    title: "Beauty and Wellness Essentials",
    description:
      "Learn foundational beauty techniques and wellness practices for a career in the beauty industry.",
    image: "https://i.imghippo.com/files/TWr6851UOg.png",
    type: "offline",
    topics: ["Skin Care", "Hair Styling", "Wellness Practices"],
    date: "2024-12-22",
    time: "11:30 AM",
    duration: "2 months",
    price: 100,
    language: "English, Hindi",
    category: "Beauty & Wellness",
    instructor: "Ms. Priya Kapoor",
    availableSlots: 35,
    feedback: 4.7,
    advanceParticipation: 10,
    nsqf: 4,
    review: 4.8,
    host: "National Beauty Academy",
    product: "Skill Course",
    certification: "Completion",
    credits: "4",
    qpCode: "BW/Q1301",
    assessment: "Proctored",
    req_age: "18",
    min_edu: "10th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Skin Care Routines",
      "Hair Styling Techniques",
      "Basics of Wellness Practices",
    ],
  },
  {
    id: "7",
    title: "Chemical Safety and Handling",
    description:
      "Understand chemical properties, safety protocols, and proper handling techniques for the workplace.",
    image: "https://i.imghippo.com/files/bxl6177ZmI.png",
    type: "online",
    topics: ["Chemical Properties", "Safety Standards", "Handling Protocols"],
    date: "2024-12-27",
    time: "03:00 PM",
    duration: "1 month",
    price: 200,
    language: "English",
    category: "Chemical",
    instructor: "Dr. Arvind Menon",
    availableSlots: 50,
    feedback: 4.6,
    advanceParticipation: 8,
    nsqf: 5,
    review: 4.7,
    host: "Institute of Chemical Sciences",
    product: "Skill Course",
    certification: "Completion",
    credits: "3",
    qpCode: "CHE/Q2105",
    assessment: "Non-proctored",
    req_age: "18",
    min_edu: "12th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Understanding Chemicals",
      "Implementing Safety Standards",
      "Proper Handling Techniques",
    ],
  },
  {
    id: "8",
    title: "Construction Site Management",
    description:
      "Learn site management skills to efficiently oversee construction projects and teams.",
    image: "https://i.imghippo.com/files/JlCC3007Wc.png",
    type: "offline",
    topics: ["Project Planning", "Team Management", "Safety Protocols"],
    date: "2024-12-15",
    time: "09:00 AM",
    duration: "3 months",
    price: 500,
    language: "English, Hindi",
    category: "Construction",
    instructor: "Mr. Anil Sharma",
    availableSlots: 25,
    feedback: 4.8,
    advanceParticipation: 6,
    nsqf: 6,
    review: 4.9,
    host: "National Construction Academy",
    product: "Skill Course",
    certification: "Completion",
    credits: "6",
    qpCode: "CON/Q1203",
    assessment: "Proctored",
    req_age: "18",
    min_edu: "12th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Effective Site Management",
      "Safety Implementation",
      "Efficient Team Coordination",
    ],
  },
  {
    id: "9",
    title: "Food Processing and Preservation",
    description:
      "Gain expertise in modern food processing techniques and preservation methods.",
    image: "https://i.imghippo.com/files/NuS6036ciY.png",
    type: "online",
    topics: ["Food Safety", "Preservation Techniques", "Processing"],
    date: "2024-12-30",
    time: "04:00 PM",
    duration: "2 months",
    price: 400,
    language: "English",
    category: "Food Processing & Preservation",
    instructor: "Ms. Radha Reddy",
    availableSlots: 40,
    feedback: 4.7,
    advanceParticipation: 9,
    nsqf: 5,
    review: 4.8,
    host: "Food Science Institute",
    product: "Skill Course",
    certification: "Completion",
    credits: "5",
    qpCode: "FPP/Q1304",
    assessment: "Non-proctored",
    req_age: "18",
    min_edu: "10th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Safe Food Handling",
      "Modern Preservation Methods",
      "Efficient Food Processing",
    ],
  },
  {
    id: "10",
    title: "Healthcare Support Training",
    description:
      "Prepare for a career in healthcare by learning patient care, safety, and basic medical practices.",
    image: "https://i.imghippo.com/files/NfR3491RrA.png",
    type: "offline",
    topics: ["Patient Care", "Medical Safety", "Healthcare Basics"],
    date: "2024-12-18",
    time: "10:00 AM",
    duration: "3 months",
    price: 900,
    language: "English, Hindi",
    category: "Healthcare",
    instructor: "Dr. Nisha Verma",
    availableSlots: 30,
    feedback: 4.9,
    advanceParticipation: 10,
    nsqf: 6,
    review: 4.9,
    host: "Healthcare Training Institute",
    product: "Skill Course",
    certification: "Completion",
    credits: "6",
    qpCode: "HSC/Q4201",
    assessment: "Proctored",
    req_age: "18",
    min_edu: "12th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Effective Patient Interaction",
      "Understanding Medical Practices",
      "Basic Healthcare Protocols",
    ],
  },
  {
    id: "11",
    title: "Introduction to Web Development",
    description:
      "Learn the basics of web development, including HTML, CSS, and JavaScript, to create your first website.",
    image: "https://i.imghippo.com/files/ASZ3819jvg.png",
    type: "online",
    topics: ["Web Development", "HTML", "CSS", "JavaScript"],
    date: "2024-11-15",
    time: "10:00 AM",
    duration: "2 months",
    price: 999,
    language: "English",
    category: "Technology",
    instructor: "Dr. Ravi Sharma",
    availableSlots: 50,
    feedback: 4.4,
    advanceParticipation: 10,
    nsqf: 4,
    review: 4.5,
    host: "National Institute of Technology",
    product: "Skill Course",
    certification: "Completion",
    credits: "6",
    qpCode: "AAS/Q0113",
    assessment: "Non-proctored",
    req_age: "18",
    min_edu: "12th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Basic HTML Structure",
      "CSS for Styling",
      "JavaScript Introduction",
      "Responsive Design Principles",
    ],
    forYou: "true",
  },
  {
    id: "12",
    title: "Pottery Making Basics",
    description:
      "Learn the traditional craft of pottery making, from shaping clay to finishing techniques.",
    image: "https://i.imghippo.com/files/tZOO7740eIE.png",
    type: "offline",
    topics: ["Craft", "Pottery", "Handmade Products"],
    date: "2024-12-01",
    time: "2:00 PM",
    duration: "3 months",
    price: 800,
    language: "Hindi",
    category: "Craftsmanship",
    instructor: "Mrs. Neelam Desai",
    availableSlots: 30,
    feedback: 4.6,
    advanceParticipation: 5,
    nsqf: 2,
    review: 4.7,
    host: "Local Craft Centre",
    product: "Skill Course",
    certification: "Completion",
    credits: "4",
    qpCode: "AAS/Q0105",
    assessment: "Non-proctored",
    req_age: "18",
    min_edu: "8th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Clay Shaping Techniques",
      "Molding and Firing",
      "Finishing Techniques",
      "Introduction to Pottery Tools",
    ],
  },
  {
    id: "13",
    title: "Introduction to Gardening and Flower Growing",
    description:
      "Explore the fundamentals of gardening and flower growing, including planting, watering, and maintaining plants.",
    image: "https://i.imghippo.com/files/RugN1816bpc.png",
    type: "online",
    topics: ["Gardening", "Flower Growing", "Horticulture"],
    date: "2024-10-20",
    time: "11:00 AM",
    duration: "2 months",
    price: 950,
    language: "English",
    category: "Gardening",
    instructor: "Mr. Suresh Patel",
    availableSlots: 40,
    feedback: 4.5,
    advanceParticipation: 10,
    nsqf: 3,
    review: 4.6,
    host: "Indian Horticultural Society",
    product: "Skill Course",
    certification: "Completion",
    credits: "5",
    qpCode: "AAS/Q0107",
    assessment: "Non-proctored",
    req_age: "16",
    min_edu: "10th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Soil Preparation",
      "Planting Flowers",
      "Watering and Maintenance",
      "Introduction to Organic Gardening",
    ],
  },
  {
    id: "14",
    title: "Basic Car Servicing and Maintenance",
    description:
      "Learn the basics of car maintenance, including oil changes, tire checks, and engine troubleshooting.",
    image: "https://i.imghippo.com/files/iOdD9980xU.png",
    type: "offline",
    topics: ["Car Servicing", "Automobile Maintenance", "Mechanical Skills"],
    date: "2024-09-05",
    time: "4:00 PM",
    duration: "3 months",
    price: 1000,
    language: "Hindi",
    category: "Automobile",
    instructor: "Mr. Vijay Kumar",
    availableSlots: 25,
    feedback: 4.7,
    advanceParticipation: 15,
    nsqf: 4,
    review: 4.8,
    host: "Automobile Training Academy",
    product: "Diploma",
    certification: "Completion",
    credits: "8",
    qpCode: "AAS/Q0109",
    assessment: "Proctored",
    req_age: "18",
    min_edu: "10th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Engine Maintenance Basics",
      "Tire and Brake Checks",
      "Car Troubleshooting",
      "Basic Electrical System Repair",
    ],
  },
  {
    id: "15",
    title: "Introduction to Digital Marketing",
    description:
      "Learn the basics of digital marketing including SEO, SEM, and social media strategies to promote a business online.",
    image: "https://i.imghippo.com/files/flO7974Cc.png",
    type: "online",
    topics: ["Digital Marketing", "SEO", "Social Media Marketing"],
    date: "2024-11-05",
    time: "1:00 PM",
    duration: "2 months",
    price: 999,
    language: "English",
    category: "Business",
    instructor: "Ms. Aarti Shah",
    availableSlots: 50,
    feedback: 4.5,
    advanceParticipation: 5,
    nsqf: 4,
    review: 4.7,
    host: "Digital India Program",
    product: "Skill Course",
    certification: "Completion",
    credits: "6",
    qpCode: "AAS/Q0108",
    assessment: "Non-proctored",
    req_age: "18",
    min_edu: "12th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Introduction to SEO",
      "Social Media Advertising",
      "Search Engine Marketing",
      "Email Marketing Basics",
    ],
  },
  {
    id: "16",
    title: "Basic Woodworking Skills",
    description:
      "Learn how to create simple wooden projects using basic woodworking tools and techniques.",
    image: "https://i.imghippo.com/files/inFL1065MRk.png",
    type: "offline",
    topics: ["Woodworking", "Craftsmanship", "DIY Projects"],
    date: "2024-08-20",
    time: "10:00 AM",
    duration: "2 months",
    price: 950,
    language: "Hindi",
    category: "Craftsmanship",
    instructor: "Mr. Rajesh Kumar",
    availableSlots: 25,
    feedback: 4.6,
    advanceParticipation: 10,
    nsqf: 3,
    review: 4.7,
    host: "Craftsmen's Guild",
    product: "Skill Course",
    certification: "Completion",
    credits: "5",
    qpCode: "AAS/Q0106",
    assessment: "Non-proctored",
    req_age: "16",
    min_edu: "10th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Wood Cutting and Shaping",
      "Basic Carpentry Tools",
      "Creating Small Wooden Projects",
      "Sanding and Finishing Techniques",
    ],
  },
  {
    id: "17",
    title: "Basic Photography Skills",
    description:
      "Learn the basics of photography, including camera settings, lighting, and composition for stunning photos.",
    image: "https://i.imghippo.com/files/tTd8633PvU.png",
    type: "online",
    topics: ["Photography", "Camera Techniques", "Photo Editing"],
    date: "2024-07-15",
    time: "2:00 PM",
    duration: "2 months",
    price: 999,
    language: "English",
    category: "Creative Arts",
    instructor: "Mr. Manoj Verma",
    availableSlots: 40,
    feedback: 4.8,
    advanceParticipation: 10,
    nsqf: 4,
    review: 4.9,
    host: "Creative Photography Institute",
    product: "Skill Course",
    certification: "Completion",
    credits: "6",
    qpCode: "AAS/Q0110",
    assessment: "Non-proctored",
    req_age: "18",
    min_edu: "12th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Understanding Camera Settings",
      "Basic Photography Composition",
      "Lighting Techniques",
      "Editing Photos Using Software",
    ],
  },
  {
    id: "18",
    title: "Apparel Design and Stitching",
    description:
      "Master the fundamentals of designing and stitching apparel for a career in fashion.",
    image: "https://i.imghippo.com/files/OU8250lHM.png",
    type: "offline",
    topics: ["Fashion Design", "Stitching Techniques", "Fabric Selection"],
    date: "2025-01-05",
    time: "10:30 AM",
    duration: "3 months",
    price: 0,
    language: "English, Hindi",
    category: "Apparel",
    instructor: "Ms. Ritu Sharma",
    availableSlots: 40,
    feedback: 4.7,
    advanceParticipation: 12,
    nsqf: 5,
    review: 4.8,
    host: "National Fashion Academy",
    product: "Skill Course",
    certification: "Completion",
    credits: "5",
    qpCode: "APP/Q1403",
    assessment: "Proctored",
    req_age: "18",
    min_edu: "10th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Basic Apparel Design",
      "Stitching Methods",
      "Understanding Fabrics",
    ],
  },
  {
    id: "19",
    title: "Banking and Financial Services Training",
    description:
      "Gain insights into banking operations, financial instruments, and customer service.",
    image: "https://i.imghippo.com/files/MfL6777qSU.png",
    type: "online",
    topics: [
      "Banking Operations",
      "Financial Instruments",
      "Customer Relations",
    ],
    date: "2025-01-10",
    time: "09:00 AM",
    duration: "2 months",
    price: 600,
    language: "English",
    category: "Banking, Financial Services, and Insurance (BFSI)",
    instructor: "Mr. Rajiv Singh",
    availableSlots: 50,
    feedback: 4.6,
    advanceParticipation: 15,
    nsqf: 4,
    review: 4.7,
    host: "National Banking Institute",
    product: "Skill Course",
    certification: "Completion",
    credits: "4",
    qpCode: "BFS/Q2301",
    assessment: "Non-proctored",
    req_age: "18",
    min_edu: "12th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Understanding Banking Systems",
      "Effective Customer Interaction",
      "Financial Product Knowledge",
    ],
  },
  {
    id: "20",
    title: "Automotive Maintenance and Repair",
    description:
      "Learn the skills to diagnose and repair automotive issues with industry-relevant practices.",
    image: "https://i.imghippo.com/files/rc5191wU.png",
    type: "offline",
    topics: ["Engine Diagnostics", "Vehicle Repair", "Maintenance Protocols"],
    date: "2025-01-15",
    time: "02:00 PM",
    duration: "4 months",
    price: 0,
    language: "English, Hindi",
    category: "Automotive",
    instructor: "Mr. Manish Kumar",
    availableSlots: 30,
    feedback: 4.8,
    advanceParticipation: 10,
    nsqf: 6,
    review: 4.9,
    host: "Automotive Training Institute",
    product: "Skill Course",
    certification: "Completion",
    credits: "6",
    qpCode: "AUT/Q3102",
    assessment: "Proctored",
    req_age: "18",
    min_edu: "12th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Engine Troubleshooting",
      "Repair Techniques",
      "Maintenance Standards",
    ],
  },
  {
    id: "21",
    title: "Aviation and Aerospace Fundamentals",
    description:
      "Explore the basics of aviation and aerospace with a focus on safety, operations, and technology.",
    image: "https://i.imghippo.com/files/vC9456BKY.png",
    type: "online",
    topics: ["Aviation Basics", "Safety Protocols", "Aerospace Technology"],
    date: "2025-01-20",
    time: "11:00 AM",
    duration: "3 months",
    price: 300,
    language: "English",
    category: "Aviation & Aerospace",
    instructor: "Ms. Anjali Reddy",
    availableSlots: 45,
    feedback: 4.8,
    advanceParticipation: 20,
    nsqf: 6,
    review: 4.9,
    host: "Aviation Training Academy",
    product: "Skill Course",
    certification: "Completion",
    credits: "7",
    qpCode: "AVI/Q4105",
    assessment: "Non-proctored",
    req_age: "18",
    min_edu: "12th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Understanding Aviation Systems",
      "Safety Procedures",
      "Introduction to Aerospace Engineering",
    ],
  },
  {
    id: "22",
    title: "Green Jobs and Sustainable Practices",
    description:
      "Learn environmentally sustainable practices and skills for green job opportunities.",
    image: "https://i.imghippo.com/files/xI4420Y.png	",
    type: "online",
    topics: ["Sustainability", "Renewable Energy", "Waste Management"],
    date: "2025-01-25",
    time: "10:00 AM",
    duration: "2 months",
    price: 90,
    language: "English",
    category: "Green Jobs",
    instructor: "Dr. Sunil Grover",
    availableSlots: 50,
    feedback: 4.7,
    advanceParticipation: 15,
    nsqf: 5,
    review: 4.8,
    host: "Sustainability Training Center",
    product: "Skill Course",
    certification: "Completion",
    credits: "5",
    qpCode: "GRJ/Q5101",
    assessment: "Non-proctored",
    req_age: "18",
    min_edu: "12th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Understanding Sustainability",
      "Renewable Energy Applications",
      "Waste Management Techniques",
    ],
  },

  {
    id: "23",
    title: "Counseling Skills for Beginners",
    description:
      "Understand the fundamentals of counseling and effective communication techniques.",
    image: "https://i.imghippo.com/files/ZSOx3054UI.png",
    type: "online",
    topics: ["Active Listening", "Empathy", "Building Trust"],
    date: "2025-02-01",
    time: "03:00 PM",
    duration: "1 month",
    price: 80,
    language: "English",
    category: "Counseling Skill",
    instructor: "Dr. Meera Kulkarni",
    availableSlots: 50,
    feedback: 4.6,
    advanceParticipation: 18,
    nsqf: 3,
    review: 4.7,
    host: "Counseling Skills Academy",
    product: "Skill Course",
    certification: "Completion",
    credits: "3",
    qpCode: "CSK/Q1201",
    assessment: "Non-proctored",
    req_age: "18",
    min_edu: "12th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Building Counseling Rapport",
      "Effective Communication",
      "Understanding Client Needs",
    ],
  },
  {
    id: "24",
    title: "Domestic Worker Skills Training",
    description:
      "Learn essential skills for domestic work, including cleaning, cooking, and safety.",
    image: "https://i.imghippo.com/files/LBd9995Wcg.png",
    type: "offline",
    topics: ["Housekeeping", "Basic Cooking", "Home Safety"],
    date: "2025-02-05",
    time: "11:00 AM",
    duration: "2 months",
    price: 50,
    language: "Hindi",
    category: "Domestic Worker",
    instructor: "Ms. Suman Verma",
    availableSlots: 60,
    feedback: 4.4,
    advanceParticipation: 22,
    nsqf: 2,
    review: 4.5,
    host: "Domestic Skills Institute",
    product: "Skill Course",
    certification: "Completion",
    credits: "2",
    qpCode: "DOW/Q1101",
    assessment: "Non-proctored",
    req_age: "16",
    min_edu: "8th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Effective Housekeeping",
      "Cooking Basics",
      "Ensuring Safety in Homes",
    ],
  },
  {
    id: "25",
    title: "Basic Electrical Skills",
    description:
      "Learn basic electrical skills for home and small-scale repairs.",
    image: "https://i.imghippo.com/files/NIQC7926E.png",
    type: "offline",
    topics: ["Electrical Basics", "Wiring", "Safety Protocols"],
    date: "2025-02-10",
    time: "01:00 PM",
    duration: "1 month",
    price: 0,
    language: "English, Hindi",
    category: "Electrical",
    instructor: "Mr. Arvind Rao",
    availableSlots: 40,
    feedback: 4.5,
    advanceParticipation: 15,
    nsqf: 3,
    review: 4.6,
    host: "Electrical Training Academy",
    product: "Skill Course",
    certification: "Completion",
    credits: "3",
    qpCode: "ELE/Q2201",
    assessment: "Proctored",
    req_age: "18",
    min_edu: "10th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Understanding Electrical Circuits",
      "Repairing Common Issues",
      "Safety Precautions",
    ],
  },
  {
    id: "26",
    title: "Food Preservation Basics",
    description:
      "Discover methods of food preservation to enhance shelf life and reduce waste.",
    image: "https://i.imghippo.com/files/gznJ7168NIU.png",
    type: "online",
    topics: ["Freezing", "Canning", "Drying"],
    date: "2025-02-15",
    time: "04:00 PM",
    duration: "1 month",
    price: 90,
    language: "English",
    category: "Food Processing & Preservation",
    instructor: "Dr. Rekha Gupta",
    availableSlots: 30,
    feedback: 4.7,
    advanceParticipation: 20,
    nsqf: 3,
    review: 4.8,
    host: "Food Technology Institute",
    product: "Skill Course",
    certification: "Completion",
    credits: "3",
    qpCode: "FPP/Q3002",
    assessment: "Non-proctored",
    req_age: "18",
    min_edu: "12th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Understanding Preservation Techniques",
      "Applying Preservation Methods",
      "Ensuring Food Safety",
    ],
  },
  {
    id: "27",
    title: "Handloom and Weaving Basics",
    description: "Learn traditional handloom weaving techniques and patterns.",
    image: "https://i.imghippo.com/files/WFBN2934A.png",
    type: "offline",
    topics: ["Weaving Techniques", "Loom Operations", "Pattern Design"],
    date: "2025-02-20",
    time: "10:00 AM",
    duration: "2 months",
    price: 95,
    language: "Hindi",
    category: "Handloom & Handicrafts",
    instructor: "Ms. Kavita Joshi",
    availableSlots: 25,
    feedback: 4.6,
    advanceParticipation: 18,
    nsqf: 4,
    review: 4.7,
    host: "Handloom Academy",
    product: "Skill Course",
    certification: "Completion",
    credits: "4",
    qpCode: "HAN/Q1201",
    assessment: "Proctored",
    req_age: "18",
    min_edu: "10th Pass",
    ind_exp: 0,
    learningOutcomes: [
      "Traditional Weaving Methods",
      "Operating Handlooms",
      "Creating Intricate Patterns",
    ],
  },
  {
    id: "23",

    title: "TailwindCSS",

    description:
      "Understand the fundamentals of TailwindCSS and how to design responsive and modern web interfaces.",

    image: "https://samanthaming.gumlet.io/blogs/building-my-new-site-with-tailwind.jpg.gz?format=auto",

    type: "online",

    topics: ["Responsive Design", "Utility-First CSS", "Modern UI"],

    date: "2025-02-01",

    time: "03:00 PM",

    duration: "1 month",

    price: 0,

    language: "English",

    category: "Web Development",

    instructor: "Dr. Meera Kulkarni",

    availableSlots: 50,

    feedback: 4.6,

    advanceParticipation: 18,

    nsqf: 3,

    review: 4.7,

    host: "Web Design Academy",

    product: "Skill Course",

    certification: "Completion",

    credits: "3",

    qpCode: "CSS/Q1201",

    assessment: "Non-proctored",

    req_age: "18",

    min_edu: "12th Pass",

    ind_exp: 0,

    learningOutcomes: [
      "Mastering Utility-First Design",

      "Building Responsive Interfaces",

      "Optimizing Web Performance",
    ],
    forYou: true,
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
        <LazyLoadImage
          alt={event.title}
          src={event.image}
          className="object-cover w-full h-full img-shine"
        />
        {/* <img
          src={event.image}
          alt={event.title}
          className="object-cover w-full h-full"
        /> */}
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

          <Dialog>
            <DialogTrigger asChild>
              <Button>Book Slot</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book a slot for {event.title}</DialogTitle>
                <DialogDescription>
                  Select a date to book your slot. {event.availableSlots} slots
                  available.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <div className="flex justify-end">
                <Button disabled={!selectedDate}>Confirm Booking</Button>
              </div>
            </DialogContent>
          </Dialog>
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
            Search for pathways using keywords, filter by language, category, or
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
export default function ExplorePathways() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("relevance");
  const [showHelp, setShowHelp] = useState(false);
  const pathwaysPerPage = 5;

  // Simulate loading delay when "For You" is clicked
  const handleTabChange = (tab) => {
    if (tab === "for-you") {
      setLoading(true);
      setTimeout(() => {
        setActiveTab(tab);
        setLoading(false);
      }, 2000); // Adjust the timeout duration (e.g., 2000ms for 2 seconds)
    } else {
      setActiveTab(tab);
    }
  };

  const resetFilters = () => {
    setSelectedLanguages([]);
    setPriceRange(10000);
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSortBy("relevance");
  };

  // Filter pathways (dummy example below)
  const filteredAndSortedPathways = pathways.filter((event) => {
    const matchesTab =
      activeTab === "all" || (activeTab === "for-you" && event.forYou);
    return matchesTab;
  });

  const indexOfLastEvent = currentPage * pathwaysPerPage;
  const indexOfFirstEvent = indexOfLastEvent - pathwaysPerPage;
  const currentPathways = filteredAndSortedPathways.slice(
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
              Search Pathways
            </h1>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <Tabs defaultValue="all" onValueChange={handleTabChange}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Pathways</TabsTrigger>
                  <TabsTrigger value="for-you">For You</TabsTrigger>
                </TabsList>

                <div className="text-sm text-muted-foreground">
                  Found{" "}
                  <span className="font-mono font-bold">
                    {filteredAndSortedPathways.length}
                  </span>{" "}
                  Pathways
                </div>
              </div>
            </Tabs>
          </div>

          {/* Spinner or Content */}
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin animate-bounce"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {currentPathways.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
