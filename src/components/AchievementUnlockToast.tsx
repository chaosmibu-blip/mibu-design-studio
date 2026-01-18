import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

export interface AchievementToastData {
  id: string;
  name: string;
  tier?: string;
  xpReward: number;
}

interface AchievementUnlockToastProps {
  achievement: AchievementToastData | null;
  onComplete: () => void;
}

const AchievementUnlockToast = ({ achievement, onComplete }: AchievementUnlockToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (achievement) {
      // 進入動畫
      setIsVisible(true);
      setIsLeaving(false);

      // 3秒後開始離開動畫
      const leaveTimer = setTimeout(() => {
        setIsLeaving(true);
      }, 3000);

      // 3.3秒後完全隱藏
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 3300);

      return () => {
        clearTimeout(leaveTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [achievement, onComplete]);

  if (!isVisible || !achievement) return null;

  return (
    <div
      className={`fixed bottom-24 left-4 right-4 z-50 pointer-events-none transition-all duration-300 ease-out ${
        isLeaving 
          ? "opacity-0 translate-y-4" 
          : "opacity-100 translate-y-0"
      }`}
      style={{
        animation: !isLeaving ? "slide-up 0.3s ease-out" : undefined,
      }}
    >
      <div className="max-w-sm mx-auto bg-card border border-border rounded-2xl shadow-elevated p-4">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6 text-primary" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted font-medium">成就解鎖</p>
            <p className="text-foreground font-bold truncate">
              {achievement.name}
              {achievement.tier && (
                <span className="text-muted font-normal ml-1">（{achievement.tier}）</span>
              )}
            </p>
          </div>

          {/* XP Reward */}
          <div className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-bold text-sm">
            +{achievement.xpReward} XP
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementUnlockToast;
