import React, { useContext, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {
  CircleUserRound,
  Footprints,
  Languages,
  AudioLines,
  Hand,
  MessageSquareMore,
  Bell,
} from "lucide-react";
import { FloatingDock } from "@/components/ui/floating-dock";

function Dock() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  let inactivityTimer = null;

  // Handle visibility based on scrolling
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious();
      setVisible(true); // Show on any scroll activity

      // Clear existing timer
      clearTimeout(inactivityTimer);

      // Start inactivity timer
      inactivityTimer = setTimeout(() => {
        setVisible(false); // Hide after 2 seconds of inactivity
      }, 5000);

      // Show on scrolling down, hide on scrolling up
      if (direction > 0.04) {
        setVisible(true);
      } else if (direction < -0.02) {
        setVisible(false);
      }
    }
  });

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => clearTimeout(inactivityTimer);
  }, []);

  const links = [
    {
      title: "profile",
      icon: (
        <CircleUserRound className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/profile",
    },
    {
      title: "nSteps",
      icon: (
        <Footprints className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Language",
      icon: (
        <Languages className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Kaushal",
      icon: (
        <AudioLines className="h-full w-full text-neutral-800 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Mentor",
      icon: (
        <Hand className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Chat",
      icon: (
        <MessageSquareMore className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Nudges",
      icon: (
        <Bell className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ y: visible ? 0 : 100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 left-[39vw] transform -translate-x-1/2 flex justify-center items-center z-50"
    >
      <FloatingDock mobileClassName="translate-y-20" items={links} />
    </motion.div>
  );
}

export default Dock;
