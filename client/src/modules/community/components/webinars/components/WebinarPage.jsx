"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Heart,
  Share2,
  Users,
  Eye,
  Star,
  MessageCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  ExternalLink,
  MapPin,
  Trophy,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import confetti from "canvas-confetti";

// Modular Components
const GradientPill = ({ children }) => (
  <motion.span
    whileHover={{ scale: 1.05 }}
    className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/10 to-blue-500/20 text-blue-600"
  >
    {children}
  </motion.span>
);

const SquarePill = ({ children }) => (
  <motion.span
    whileHover={{ scale: 1.05 }}
    className="inline-block px-2 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800"
  >
    {children}
  </motion.span>
);

const SessionCard = ({ session, date, startTime, endTime, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex gap-4 p-4 border rounded-lg"
  >
    <div className="flex flex-col items-center bg-blue-50 p-3 rounded-lg min-w-[60px]">
      <span className="text-2xl font-bold">7</span>
      <span className="text-sm">Jan 24</span>
    </div>
    <div className="space-y-2">
      <h3 className="font-semibold">Session : {session}</h3>
      <p className="text-gray-600">{description}</p>
      <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>Start: {startTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>End: {endTime}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const OpportunityCard = ({ title, image, registered, timeLeft }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="relative rounded-lg overflow-hidden border"
  >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4 space-y-2">
      <h3 className="font-semibold">{title}</h3>
      <div className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Users size={16} />
          <span>{registered} Registered</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{timeLeft}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const StarRating = ({ rating, setRating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <motion.button
        key={star}
        whileHover={{ scale: 1.1 }}
        onClick={() => setRating(star)}
        className="focus:outline-none"
      >
        <Star
          className={`w-6 h-6 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      </motion.button>
    ))}
  </div>
);

const ContactCard = ({ name, email, phone }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            {name.charAt(0)}
          </div>
          <div className="space-y-1">
            <h3 className="font-medium">{name}</h3>
            <div className="flex flex-col text-sm text-gray-500">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-1 hover:text-blue-600"
              >
                <Mail size={14} />
                {email}
              </a>
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-1 hover:text-blue-600"
              >
                <Phone size={14} />
                {phone}
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const LoadingState = () => (
  <div className="space-y-4">
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);

const FAQItem = ({ question, answer, user }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
  >
    <div className="flex items-start gap-4">
      <Avatar>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-semibold">{question}</h4>
        <p className="text-gray-600 mt-1">{answer}</p>
        <div className="text-sm text-gray-500 mt-2">
          Asked by {user.name} • {user.date}
        </div>
      </div>
    </div>
  </motion.div>
);

export default function WebinarPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("timeline");
  const [rating, setRating] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleTabChange = (value) => {
    setIsLoading(true);
    setActiveTab(value);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleRegister = () => {
    setIsRegistered(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    const audio = new Audio("/confetti.mp3");
    audio.play();
  };

  const faqs = [
    {
      question: "What software will be used in this workshop?",
      answer:
        "We will be using Onshape for this workshop. It's a cloud-based CAD software that's free for students.",
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "2 days ago",
      },
    },
    {
      question: "Is prior experience with CAD necessary?",
      answer:
        "No, this workshop is designed for beginners. We'll start with the basics and work our way up.",
      user: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "1 day ago",
      },
    },
    {
      question: "Will there be any hands-on projects?",
      answer:
        "Yes, we'll have several hands-on projects throughout the workshop to help you apply what you've learned.",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "12 hours ago",
      },
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-64 bg-[#0A1B3D] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI1MDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik03MjAgMEMzMjIuMSAwIDAgMzIyLjEgMCA3MjBzMzIyLjEgNzIwIDcyMCA3MjAgNzIwLTMyMi4xIDcyMC03MjBTMTExNy45IDAgNzIwIDB6IiBmaWxsPSIjMDA3RkZGIiBmaWxsLW9wYWNpdHk9Ii4xIi8+PC9zdmc+')] bg-cover bg-center" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            CAD IN INDUSTRIAL DESIGN
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-300 text-center"
          >
            AVAIL EXCITING COMBOS NOW AT SHAASTRA.ORG/WORKSHOPS
          </motion.div>
        </div>
      </motion.div>

      <div className=" p-4 md:p-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="w-full justify-between overflow-x-auto">
                <TabsTrigger value="timeline">Stages & Timeline</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="dates">Dates & Deadlines</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="faqs">FAQs & Discussions</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                {isLoading ? (
                  <LoadingState />
                ) : (
                  <AnimatePresence mode="wait">
                    <TabsContent value="timeline" className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <h2 className="text-xl font-semibold">
                          What's the Schedule?
                        </h2>
                        <SessionCard
                          session="1"
                          startTime="07 Jan 24, 09:00 AM IST"
                          endTime="07 Jan 24, 12:00 PM IST"
                          description="This offline session will cover Industrial Design Concepts and Intro to Onshape."
                        />
                        <SessionCard
                          session="2"
                          startTime="07 Jan 24, 01:00 PM IST"
                          endTime="07 Jan 24, 04:00 PM IST"
                          description="This offline session will cover CAD in Onshape."
                        />
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="details" className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <h2 className="text-xl font-semibold">
                          All that you need to know about CAD in Industrial
                          Design
                        </h2>
                        <div className="space-y-4 text-gray-600">
                          <p>
                            This workshop focuses on leveraging Onshape as a
                            tool for industrial design, emphasizing the
                            integration of design principles with CAD
                            techniques.
                          </p>
                          <p>
                            Explore the intersection of industrial design
                            concepts and CAD tools in this workshop.
                            Participants will gain insights into various aspects
                            of industrial design with hands-on exercises using
                            Onshape.
                          </p>
                          <p>
                            Welcome to Shaastra, the annual technical festival
                            of IIT Madras! Shaastra workshops are back on the
                            ground with its stellar lineup of topics. Our
                            trainers are experts in their domains and are
                            specially selected to guide both absolute beginners
                            and experienced participants. Most of them have
                            qualified grueling selection procedures of Research
                            Programmes and elite companies and would be able to
                            give you an overview of the topics from a career
                            perspective as well.
                          </p>
                          <p>
                            Stand out from the crowd in job applications by
                            flaunting your certificate from Shaastra, IIT
                            Madras! Gear up to be a champion in competitions by
                            building strong fundamentals! Learn from the masters
                            of the trade who have proved their mettle!
                          </p>
                          <div className="mt-6">
                            <p>
                              <span className="font-medium">Date:</span> 7th
                              January 2024
                            </p>
                            <p>
                              <span className="font-medium">Platform:</span>{" "}
                              Online and Offline
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="reviews" className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <h2 className="text-xl font-semibold">
                          Feedback & rating
                        </h2>
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Write a feedback"
                            className="min-h-[100px]"
                          />
                          <div className="flex justify-between items-center">
                            <StarRating rating={rating} setRating={setRating} />
                            <Button>Submit</Button>
                          </div>
                        </div>
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="faqs" className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <h2 className="text-xl font-semibold">
                          Frequently Asked Questions/Discussions
                        </h2>
                        <div className="space-y-4">
                          <Input placeholder="Ask a question (be specific)" />
                          <Button>Submit Question</Button>
                        </div>
                        <div className="space-y-4">
                          {faqs.map((faq, index) => (
                            <FAQItem key={index} {...faq} />
                          ))}
                        </div>
                      </motion.div>
                    </TabsContent>
                  </AnimatePresence>
                )}
              </div>
            </Tabs>

            <div className="mt-8 space-y-6">
              <h2 className="text-xl font-semibold">Featured Opportunities</h2>
              <div className="relative">
                <div className="flex gap-4 overflow-hidden">
                  <motion.div
                    className="flex gap-4 justify-between"
                    animate={{ x: -currentSlide * 100 + "%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className=""
                      onClick={() =>
                        setCurrentSlide(Math.max(0, currentSlide - 1))
                      }
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <OpportunityCard
                      title="Stand a chance to win PPIs and cash prizes"
                      image="/placeholder.svg?height=200&width=400"
                      registered="5,840"
                      timeLeft="20 days left"
                    />
                    <OpportunityCard
                      title="Grab a chance to win PPIs and cash prizes"
                      image="/placeholder.svg?height=200&width=400"
                      registered="526"
                      timeLeft="11 hours left"
                    />
                    <OpportunityCard
                      title="EY Techathon 5.0 | Chance to grab cash prizes & PPIs"
                      image="/placeholder.svg?height=200&width=400"
                      registered="4,123"
                      timeLeft="4 days left"
                    />
                  </motion.div>
                  <Button
                    variant="outline"
                    size="icon"
                    className=""
                    onClick={() =>
                      setCurrentSlide(Math.min(2, currentSlide + 1))
                    }
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <h2 className="text-xl font-semibold">Contact the organisers</h2>
              <ContactCard
                name="Farisa MT"
                email="abcdefg@gmail.com"
                phone="+91799400xxxx"
              />
            </div>
          </div>

          <div className="space-y-6 md:sticky md:top-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold">₹ 500</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={handleRegister}
                    disabled={isRegistered}
                  >
                    {isRegistered ? "Registered" : "Register Now"}
                  </Button>
                </motion.div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Team Size</div>
                      <div className="text-sm">Individual Participation</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Eye className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Impressions</div>
                      <div className="text-sm">16,389</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Registration Deadline</div>
                      <div className="text-sm">06 Jan 24, 12:00 AM IST</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Trophy className="w-5 h-5" />
                  <span>Shaastra 2024</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>Chennai, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>Updated On: Jan 6, 2024</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <ExternalLink className="w-5 h-5" />
                  <a href="#" className="text-blue-600 hover:underline">
                    Official website
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Eligibility</CardTitle>
              </CardHeader>
              <CardContent>
                <GradientPill>Everyone can apply</GradientPill>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Refer & Win</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  MacBook, iPhone, Apple Watch, Cash and more!
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    Refer now
                  </Button>
                  <Button variant="outline" size="sm">
                    Know more
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              <SquarePill>CAD</SquarePill>
              <SquarePill>Industrial Design</SquarePill>
              <SquarePill>Onshape</SquarePill>
              <SquarePill>3D Modeling</SquarePill>
              <SquarePill>Product Design</SquarePill>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
