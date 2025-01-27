import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Globe,
  Heart,
  MapPin,
  MessageSquare,
  Users,
} from "lucide-react";

export default function MentorBookCard() {
  return (
    <Card className="w-full max-w-4xl">
      <div className="grid md:grid-cols-[300px,1fr] gap-6">
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-6 flex flex-col items-center justify-center text-center relative">
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-2"
            >
              <Heart className="w-5 h-5" />
            </Button>
            <h2 className="text-4xl font-bold mb-4">Book a</h2>
            <div className="border-2 border-black rounded px-4 py-2 mb-4">
              <span className="text-xl">Free Trial</span>
            </div>
            <h2 className="text-4xl font-bold">Today</h2>
          </div>
        </div>

        <div className="p-6 md:p-0 md:pr-6">
          <CardHeader className="p-0">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Vishal Bandhu</h2>
                  <div className="flex items-center gap-4 text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Telangana, India</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>12+ reviews</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      <span>English</span>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="6months" className="hidden md:block">
                  <TabsList>
                    <TabsTrigger value="6months">6 Months</TabsTrigger>
                    <TabsTrigger value="3months">3 Months</TabsTrigger>
                    <TabsTrigger value="1month">1 Month</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="flex items-center justify-between border rounded-lg p-4">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <p className="font-medium">2 Sessions/week</p>
                    <p className="text-muted-foreground">
                      Including Unlimited Chat
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Prefers mentee's who are</p>
                    <p className="text-muted-foreground">
                      Experienced Professionals
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 mt-6">
            <p className="text-muted-foreground">
              Why can I be helpful? 1. 6+ years of experience 2. Graduated from
              Premium Institute 3. Taken 150+ interviews for Data Analytics/S...{" "}
              <Button variant="link" className="px-0">
                Read More
              </Button>
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              <Badge variant="secondary">SQL</Badge>
              <Badge variant="secondary">Data Visualization</Badge>
              <Badge variant="secondary">Data Wrangling</Badge>
              <Badge variant="secondary">Data Mining</Badge>
              <Badge variant="secondary">Decision-Making</Badge>
              <Badge variant="secondary">Problem Solving</Badge>
              <Badge variant="secondary">NLP</Badge>
              <Badge variant="secondary">+13 More</Badge>
            </div>

            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                <span className="font-medium">For:</span>
                <span className="text-muted-foreground">
                  Working Professional
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span className="font-medium">Targeting Domains:</span>
                <span className="text-muted-foreground">
                  Data Scientist / AI/ML
                </span>
                <Button variant="link" className="px-0">
                  More
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-0 mt-6">
            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold">₹10,000</span>
                    <span className="text-muted-foreground">Per Month</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>2x Sessions Per Week</span>
                    <span>•</span>
                    <span>Referrals in Top Companies</span>
                    <Button variant="link" className="px-0 text-sm h-auto">
                      +12 More
                    </Button>
                  </div>
                </div>
                <Button variant="outline">View Profile</Button>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="lg" className="w-full">
                  Book a Free Trial
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Next Available:{" "}
                  <span className="text-blue-500">Sat Nov 23 2024</span>
                </p>
              </div>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
