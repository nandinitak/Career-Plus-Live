import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function PeerActivityCard({ activity }) {
  return (
    <motion.div className="p-4 rounded-lg border hover:ring-2 hover:ring-primary">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={activity.avatar} alt={activity.name} />
          <AvatarFallback>{activity.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">
            {activity.name} {activity.action}
          </p>
          <p className="text-sm text-muted-foreground">{activity.details}</p>
        </div>
      </div>
    </motion.div>
  );
}
