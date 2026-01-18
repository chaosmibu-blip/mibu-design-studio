import { useEffect, useState } from "react";
import { Check, Star } from "lucide-react";

interface QuestReward {
  questId: string;
  questTitle: string;
  xpReward: number;
  isOneTime?: boolean;
}

interface QuestRewardToastProps {
  reward: QuestReward | null;
  onComplete: () => void;
}

const QuestRewardToast = ({ reward, onComplete }: QuestRewardToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (reward) {
      setIsVisible(true);
      setIsLeaving(false);

      // 2.5秒後開始離開動畫
      const leaveTimer = setTimeout(() => {
        setIsLeaving(true);
      }, 2500);

      // 2.8秒後完全隱藏
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 2800);

      return () => {
        clearTimeout(leaveTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [reward, onComplete]);

  if (!isVisible || !reward) return null;

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
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            reward.isOneTime ? "bg-accent/20" : "bg-primary/10"
          }`}>
            {reward.isOneTime ? (
              <Star className="w-5 h-5 text-accent" />
            ) : (
              <Check className="w-5 h-5 text-primary" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted font-medium">
              {reward.isOneTime ? "成就完成" : "每日任務完成"}
            </p>
            <p className="text-foreground font-semibold truncate">
              {reward.questTitle}
            </p>
          </div>

          {/* XP Reward */}
          <div className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-bold text-sm">
            +{reward.xpReward} XP
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestRewardToast;
