import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { UserInputContext } from "../context/UserInputContext";
import { BookOpen, Ban } from "lucide-react"; // Assuming using Lucide icons

const TOPIC_CHAR_LIMIT = 200;

function Topics() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const [inclusiveCount, setInclusiveCount] = useState(
    userCourseInput?.inclusiveTopic?.length || 0
  );
  const [exclusiveCount, setExclusiveCount] = useState(
    userCourseInput?.exclusiveTopic?.length || 0
  );

  const handleITopicChange = (inclusiveTopic) => {
    setInclusiveCount(inclusiveTopic.length);
    setUserCourseInput((prev) => ({
      ...prev,
      inclusiveTopic: inclusiveTopic.slice(0, TOPIC_CHAR_LIMIT),
    }));
  };

  const handleETopicChange = (exclusiveTopic) => {
    setExclusiveCount(exclusiveTopic.length);
    setUserCourseInput((prev) => ({
      ...prev,
      exclusiveTopic: exclusiveTopic.slice(0, TOPIC_CHAR_LIMIT),
    }));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-5 space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="inclusive-topic"
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4 text-gray-500" />
                Topics to Include
                <span className="text-xs text-gray-400 font-mono ml-auto">
                  {inclusiveCount}/{TOPIC_CHAR_LIMIT}
                </span>
              </Label>
              <Textarea
                id="inclusive-topic"
                placeholder="We'll make sure to give special emphasis on topics mentioned here"
                onChange={(e) => handleITopicChange(e.target.value)}
                value={userCourseInput?.inclusiveTopic}
                rows={4}
                maxLength={TOPIC_CHAR_LIMIT}
                className="w-full resize-none"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label
                htmlFor="exclusive-topic"
                className="flex items-center gap-2"
              >
                <Ban className="h-4 w-4 text-gray-500" />
                Topics to Exclude
                <span className="text-xs text-gray-400 font-mono ml-auto">
                  {exclusiveCount}/{TOPIC_CHAR_LIMIT}
                </span>
              </Label>
              <Textarea
                id="exclusive-topic"
                placeholder="There's no way we'll refer to the topics mentioned here"
                onChange={(e) => handleETopicChange(e.target.value)}
                value={userCourseInput?.exclusiveTopic}
                rows={4}
                maxLength={TOPIC_CHAR_LIMIT}
                className="w-full resize-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default Topics;
