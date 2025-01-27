import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { UserInputContext } from "../context/UserInputContext";
import { Code, FileText } from "lucide-react"; // Assuming using Lucide icons

const SKILL_CHAR_LIMIT = 50;
const DESCRIPTION_CHAR_LIMIT = 200;

function Skill() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const [skillCount, setSkillCount] = useState(
    userCourseInput?.skill?.length || 0
  );
  const [descriptionCount, setDescriptionCount] = useState(
    userCourseInput?.description?.length || 0
  );

  const handleSkillChange = (skill) => {
    setSkillCount(skill.length);
    setUserCourseInput((prev) => ({
      ...prev,
      skill: skill.slice(0, SKILL_CHAR_LIMIT),
    }));
  };

  const handleDescriptionChange = (description) => {
    setDescriptionCount(description.length);
    setUserCourseInput((prev) => ({
      ...prev,
      description: description.slice(0, DESCRIPTION_CHAR_LIMIT),
    }));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-5 space-y-4">
          <form>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skill" className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-gray-500" />
                  Skill
                  <span className="text-xs text-gray-400 font-mono ml-auto">
                    {skillCount}/{SKILL_CHAR_LIMIT}
                  </span>
                </Label>
                <Input
                  id="skill"
                  placeholder="What are you learning today?"
                  onChange={(e) => handleSkillChange(e.target.value)}
                  value={userCourseInput?.skill}
                  className="w-full"
                  maxLength={SKILL_CHAR_LIMIT}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4 text-gray-500" />
                  Description
                  <span className="text-xs text-gray-400 font-mono ml-auto">
                    {descriptionCount}/{DESCRIPTION_CHAR_LIMIT}
                  </span>
                </Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Describe your skill in detail, more the better"
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  value={userCourseInput?.description}
                  className="w-full h-40"
                  maxLength={DESCRIPTION_CHAR_LIMIT}
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default Skill;
