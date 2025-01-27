"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Share2,
  Linkedin,
  Facebook,
  Twitter,
  PhoneIcon as WhatsApp,
  HelpCircle,
  Calendar,
  User,
  Award,
  Building,
  CheckCircle,
  ImageIcon,
  FileText,
  XCircle,
} from "lucide-react";
import { useState } from "react";

// Helper Components
const GradientPill = ({
  children,
  large = false,
}: {
  children: React.ReactNode;
  large?: boolean;
}) => (
  <span
    className={`bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4 py-1 rounded-full ${large ? "text-lg font-bold" : "text-sm"}`}
  >
    {children}
  </span>
);

const HelpCard = () => (
  <Card className="mt-4">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <HelpCircle className="h-5 w-5" />
        Help & Information
      </CardTitle>
      <CardDescription>
        Quick guide to using the certificate verification system
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      <p>• View your certificate in the Certificate tab</p>
      <p>• Check detailed information in the Verification tab</p>
      <p>• Download or share your certificate using the provided buttons</p>
      <p>• Add your certificate directly to LinkedIn</p>
    </CardContent>
  </Card>
);

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-[400px] w-full" />
    <div className="flex gap-2">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 w-32" />
    </div>
  </div>
);

export default function VerifyRecord() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("certificate");
  const [isVerified, setIsVerified] = useState(true);

  const handleDownload = async (type: "image" | "pdf") => {
    setIsLoading(true);
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const handleShare = (platform: string) => {
    // Share implementation would go here
    console.log(`Sharing to ${platform}`);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="certificate">Certificate View</TabsTrigger>
            <TabsTrigger value="verification">Verification Details</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <>
                <TabsContent value="certificate">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>Certificate of Participation</CardTitle>
                          {isVerified ? (
                            <GradientPill large>Verified</GradientPill>
                          ) : (
                            <Badge variant="destructive">Not Verified</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PHOTO-2024-11-20-10-16-08.jpg-RTZlTzv6vuEtGtcmw7uuYiFdgo0ejk.jpeg"
                          alt="Certificate"
                          className="w-full rounded-lg shadow-lg mb-6"
                        />
                        <div className="mb-4 space-y-2">
                          <p>
                            <strong>Certification ID:</strong> HTF2024-001
                          </p>
                          <p>
                            <strong>Certifier:</strong> Siddharth Dayalwal
                          </p>
                          <p>
                            <strong>Expiry Date:</strong> 10 Nov, 2025
                          </p>
                        </div>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            <Button
                              onClick={() => handleDownload("image")}
                              className="bg-gradient-to-r from-gray-900 to-gray-700"
                            >
                              <ImageIcon className="mr-2 h-4 w-4" />
                              Download as Image
                            </Button>
                            <Button
                              onClick={() => handleDownload("pdf")}
                              className="bg-gradient-to-r from-gray-900 to-gray-700"
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Download as PDF
                            </Button>
                            <Button
                              onClick={() => handleShare("linkedin")}
                              className="bg-gradient-to-r from-gray-900 to-gray-700"
                            >
                              <Linkedin className="mr-2 h-4 w-4" />
                              Add to LinkedIn
                            </Button>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleShare("facebook")}
                            >
                              <Facebook className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleShare("twitter")}
                            >
                              <Twitter className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleShare("whatsapp")}
                            >
                              <WhatsApp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleShare("other")}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="verification">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>Certificate of Participation</CardTitle>
                          {isVerified ? (
                            <GradientPill large>Verified</GradientPill>
                          ) : (
                            <Badge variant="destructive">Not Verified</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid gap-4">
                          <div className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            <span className="font-medium">Name:</span>
                            <span>Yashaswee Kesharwani</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            <span className="font-medium">
                              Certificate Type:
                            </span>
                            <span>Participant</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <span className="font-medium">Event Date:</span>
                            <span>8-10 Nov, 2024</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5" />
                            <span className="font-medium">Event Type:</span>
                            <span>Virtual Hackathon</span>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">
                            About Organization
                          </h3>
                          <p className="text-sm text-gray-600">
                            Hack This Fall began with a mindset of encouraging
                            beginner hackers to build unique projects regardless
                            of the tech or field; the only focus was to create
                            something meaningful and enjoy building while also
                            solving the shared struggles of our surroundings.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </>
            )}
          </AnimatePresence>
        </Tabs>

        <HelpCard />
      </motion.div>
    </div>
  );
}
