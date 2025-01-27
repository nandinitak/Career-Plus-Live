export function getSkillImage(skill_key) {
  const skillImages = {
    react: "/images/skills/React.png",
    // Add more skills and their corresponding images here
  };

  // Return the image path if it exists, otherwise use a default image
  return skillImages[skill_key] || "/images/skills/Default.png";
}
