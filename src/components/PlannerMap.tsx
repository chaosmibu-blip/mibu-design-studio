import { useState } from "react";
import { MapPin, Users, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import InviteTeamMember from "./InviteTeamMember";

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  location: { lat: number; lng: number };
  isOnline: boolean;
  lastUpdate: Date;
}

// Mock data
const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "我",
    avatar: "😊",
    location: { lat: 25.0330, lng: 121.5654 },
    isOnline: true,
    lastUpdate: new Date(),
  },
  {
    id: "2",
    name: "小明",
    avatar: "😎",
    location: { lat: 25.0340, lng: 121.5680 },
    isOnline: true,
    lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: "3",
    name: "小華",
    avatar: "🥳",
    location: { lat: 25.0320, lng: 121.5620 },
    isOnline: false,
    lastUpdate: new Date(Date.now() - 30 * 60 * 1000),
  },
];

const PlannerMap = () => {
  const [teamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [showInvite, setShowInvite] = useState(false);

  const formatLastUpdate = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "剛剛更新";
    if (minutes < 60) return `${minutes} 分鐘前`;
    const hours = Math.floor(minutes / 60);
    return `${hours} 小時前`;
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Map placeholder */}
      <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl h-64 border border-border overflow-hidden">
        {/* Fake map background */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="border border-primary/20" />
            ))}
          </div>
        </div>
        
        {/* Team member markers */}
        <div className="absolute inset-0 flex items-center justify-center">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="absolute flex flex-col items-center animate-bounce-slow"
              style={{
                left: `${30 + index * 20}%`,
                top: `${40 + (index % 2) * 15}%`,
              }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg ${
                member.isOnline ? 'bg-primary' : 'bg-muted'
              }`}>
                {member.avatar}
              </div>
              <span className="text-xs font-medium mt-1 bg-background/80 px-2 py-0.5 rounded-full">
                {member.name}
              </span>
              {member.isOnline && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
              )}
            </div>
          ))}
        </div>

        {/* Map controls */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-2">
          <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
            <Navigation className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Team members list */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">團員位置</span>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="rounded-full"
            onClick={() => setShowInvite(true)}
          >
            邀請團員
          </Button>
        </div>
        
        <div className="divide-y divide-border">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center gap-3 p-4">
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  member.isOnline ? 'bg-primary/20' : 'bg-muted'
                }`}>
                  {member.avatar}
                </div>
                {member.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{member.name}</p>
                <div className="flex items-center gap-1 text-xs text-muted">
                  <MapPin className="w-3 h-3" />
                  <span>{formatLastUpdate(member.lastUpdate)}</span>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="text-primary">
                定位
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Invite modal */}
      {showInvite && (
        <InviteTeamMember onClose={() => setShowInvite(false)} />
      )}
    </div>
  );
};

export default PlannerMap;
