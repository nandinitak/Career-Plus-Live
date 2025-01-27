import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

export default function BadgeCard({
  badge,
  claimBadge,
  claimedBadges,
  setSelectedBadge,
  setIsShareModalOpen,
}) {
  return (
    <motion.div
      className="flex-shrink-0 w-64"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{badge.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={badge.progress} className="mb-2" />
          <p className="text-sm text-right mb-4">
            {badge.progress}% - {(badge.progress / 100) * badge.total}/
            {badge.total}
          </p>
          <div className="flex justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => setSelectedBadge(badge)}
                >
                  View Badge
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{badge.name}</DialogTitle>
                </DialogHeader>
                <img
                  src={badge.image}
                  alt={badge.name}
                  className="w-full h-64 object-contain"
                />
                <p>Progress: {badge.progress}%</p>
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => {
                claimBadge(badge);
                setIsShareModalOpen(true);
              }}
              disabled={claimedBadges.includes(badge.id)}
            >
              {claimedBadges.includes(badge.id) ? "Claimed" : "Claim"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
