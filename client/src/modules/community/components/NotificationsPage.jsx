"use client";

import { Bell, MoreHorizontal, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, Suspense } from "react";

// Notification Item Component
const NotificationItem = ({
  avatar,
  name,
  action,
  content,
  time,
  isNew = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
        {isNew && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-blue-500" />
        )}
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <p className="text-sm">
            <span className="font-medium">{name}</span>
            <span className="text-muted-foreground"> {action}</span>
          </p>
          <div className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700">
            {content}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{time}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Loading Skeleton Component
const NotificationSkeleton = () => {
  return (
    <div className="flex items-start gap-4 p-4">
      <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
};

// Help Card Component
const HelpCard = () => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Understanding Your Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Stay updated with your network activity:
          </p>
          <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
            <li>Posts from your network</li>
            <li>Mentions and replies</li>
            <li>Job recommendations</li>
            <li>Profile views and searches</li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Main Component
export default function NotificationsPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const notifications = [
    {
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Sarah Chen",
      action: "posted:",
      content: "Excited to share a new milestone! 🎉",
      time: "20m",
      isNew: true,
    },
    {
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Alex Kumar",
      action: "posted:",
      content: "Looking for mock interviews?",
      time: "46m",
      isNew: true,
    },
    {
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Dr. James Wilson",
      action: "contributed:",
      content: "Network outages discussion",
      time: "46m",
      isNew: false,
    },
    {
      avatar: "/placeholder.svg?height=40&width=40",
      name: "System",
      action: "notification:",
      content: "You appeared in 8 searches this week",
      time: "1h",
      isNew: false,
    },
  ];

  return (
    <div className=" p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="posts">My posts</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
        </TabsList>
      </Tabs>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-50 p-4 rounded-lg"
      >
        <div className="flex items-center gap-2 text-blue-700">
          <Search className="h-4 w-4" />
          <span className="text-sm font-medium">New notifications</span>
        </div>
      </motion.div>

      <div className="space-y-2">
        <Suspense fallback={<NotificationSkeleton />}>
          {loading ? (
            <>
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
            </>
          ) : (
            notifications.map((notification, index) => (
              <NotificationItem key={index} {...notification} />
            ))
          )}
        </Suspense>
      </div>

      <Separator className="my-6" />

      <HelpCard />
    </div>
  );
}
