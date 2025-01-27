import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "lucide-react";

export default function ShareBadgeDialog({
  isShareModalOpen,
  setIsShareModalOpen,
  shareToLinkedIn,
  selectedBadge,
}) {
  return (
    <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this badge on LinkedIn!</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-yellow-100 p-8 rounded-lg">
            <img
              src={selectedBadge?.image}
              alt={selectedBadge?.name}
              className="w-32 h-32 mb-4"
            />
            <h3 className="text-xl font-bold">{selectedBadge?.name}</h3>
          </div>
          <div>
            <Textarea
              rows={6}
              defaultValue="Sharing my latest badge on CareerPlus!"
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsShareModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={shareToLinkedIn}>
                <LinkedinIcon className="mr-2" /> Share
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
