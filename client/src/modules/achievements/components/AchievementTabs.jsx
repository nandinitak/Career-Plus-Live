import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BadgeCard from "./BadgeCard";

export default function AchievementTabs({
  badges,
  claimBadge,
  claimedBadges,
  setSelectedBadge,
  setIsShareModalOpen,
}) {
  return (
    <Tabs defaultValue="badges">
      <TabsList>
        <TabsTrigger value="badges">Badges</TabsTrigger>
        <TabsTrigger value="certificates">Certificates</TabsTrigger>
      </TabsList>
      <TabsContent value="badges">
        <div>Session</div>
        <div className="flex space-x-4 p-4">
          {badges.map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              claimBadge={claimBadge}
              claimedBadges={claimedBadges}
              setSelectedBadge={setSelectedBadge}
              setIsShareModalOpen={setIsShareModalOpen}
            />
          ))}
        </div>
        <div>Tasks</div>
        <div className="flex space-x-4 p-4">
          {badges.map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              claimBadge={claimBadge}
              claimedBadges={claimedBadges}
              setSelectedBadge={setSelectedBadge}
              setIsShareModalOpen={setIsShareModalOpen}
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="certificates">
        <p>Your certificates will be displayed here.</p>
      </TabsContent>
    </Tabs>
  );
}
