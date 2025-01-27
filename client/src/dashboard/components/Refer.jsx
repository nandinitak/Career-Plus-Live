import { Button } from "@/components/ui/button";
import { SquareArrowUpRight } from "lucide-react";
import { toast } from "sonner";
export default function Refer() {
  const handleClick = () => {
    const linkToCopy = "https://www.example.com"; // Replace with your link

    // Copy link to clipboard
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        // Show success toast
        toast.success("Invite Link copied to clipboard!");
      })
      .catch((error) => {
        // Show error toast in case of failure
        toast.error("Failed to copy the link.");
        console.error("Clipboard copy failed: ", error);
      });
  };

  return (
    <Button variant="outline" onClick={handleClick} className="w-full">
      <div className="flex flex-row items-center align-middle">
        <div>
          <SquareArrowUpRight className="w-4 h-4 mr-2 text-blue-500" />
        </div>
        <div className="text-muted-foreground items-center">
          Refer and Invite Friends{" "}
        </div>
      </div>
    </Button>
  );
}
