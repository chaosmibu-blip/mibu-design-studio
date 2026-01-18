import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  CumulativeAchievement, 
  OneTimeAchievement, 
  AchievementTier,
  TIER_COLORS, 
  TIER_LABELS 
} from "@/hooks/useAchievements";
import { Lock, Check } from "lucide-react";

interface CumulativeAchievementCardProps {
  achievement: CumulativeAchievement;
}

interface OneTimeAchievementCardProps {
  achievement: OneTimeAchievement;
}

const TierBadge = ({ tier, isUnlocked }: { tier: AchievementTier; isUnlocked: boolean }) => {
  return (
    <div 
      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${
        isUnlocked 
          ? `bg-gradient-to-br ${TIER_COLORS[tier]} text-white` 
          : "bg-gray-200 text-gray-400"
      }`}
    >
      {TIER_LABELS[tier]}
    </div>
  );
};

export const CumulativeAchievementCard = ({ achievement }: CumulativeAchievementCardProps) => {
  // 找到當前進度的階段
  const currentStage = achievement.stages.find(s => !s.isUnlocked) || achievement.stages[achievement.stages.length - 1];
  const previousStage = achievement.stages[achievement.stages.indexOf(currentStage) - 1];
  
  const progressBase = previousStage?.target || 0;
  const progressTarget = currentStage.target;
  const progressPercent = Math.min(100, ((achievement.currentProgress - progressBase) / (progressTarget - progressBase)) * 100);
  
  const allCompleted = achievement.stages.every(s => s.isUnlocked);

  return (
    <Card className={`rounded-xl border-border shadow-soft overflow-hidden ${
      allCompleted ? "bg-primary/5 border-primary/30" : ""
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* 圖示 */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
            allCompleted 
              ? "bg-gradient-to-br from-primary/30 to-accent/30" 
              : "bg-secondary"
          }`}>
            {achievement.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            {/* 標題 */}
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-foreground">{achievement.name}</h3>
              <span className="text-xs text-muted whitespace-nowrap">
                {achievement.currentProgress}/{currentStage.target}
              </span>
            </div>
            
            <p className="text-xs text-muted mt-0.5">{achievement.description}</p>
            
            {/* 進度條 */}
            <div className="mt-2">
              <Progress 
                value={progressPercent} 
                className="h-2 bg-secondary"
              />
            </div>
            
            {/* 階段徽章 */}
            <div className="flex items-center gap-1.5 mt-3">
              {achievement.stages.map((stage, i) => (
                <div key={stage.tier} className="flex items-center">
                  <TierBadge tier={stage.tier} isUnlocked={stage.isUnlocked} />
                  {i < achievement.stages.length - 1 && (
                    <div className={`w-4 h-0.5 ${
                      stage.isUnlocked ? "bg-primary/50" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              ))}
              
              {/* 當前階段獎勵 */}
              {!allCompleted && (
                <span className="text-xs text-accent font-medium ml-auto">
                  +{currentStage.xpReward} XP
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const OneTimeAchievementCard = ({ achievement }: OneTimeAchievementCardProps) => {
  return (
    <Card className={`rounded-xl border-border shadow-soft overflow-hidden transition-all duration-200 ${
      achievement.isUnlocked 
        ? "bg-primary/5 border-primary/30" 
        : "opacity-75"
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {/* 圖示 */}
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl relative ${
            achievement.isUnlocked 
              ? "bg-gradient-to-br from-primary/30 to-accent/30" 
              : "bg-secondary grayscale"
          }`}>
            {achievement.isUnlocked ? (
              achievement.icon
            ) : (
              <>
                <span className="opacity-30">{achievement.icon}</span>
                <Lock className="w-4 h-4 absolute text-muted" />
              </>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className={`font-medium ${
                achievement.isUnlocked ? "text-foreground" : "text-muted"
              }`}>
                {achievement.name}
              </h3>
              {achievement.isUnlocked && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </div>
            <p className="text-xs text-muted mt-0.5">{achievement.description}</p>
          </div>
          
          <div className="text-right">
            <span className={`text-sm font-semibold ${
              achievement.isUnlocked ? "text-primary" : "text-muted"
            }`}>
              +{achievement.xpReward} XP
            </span>
            {achievement.unlockedAt && (
              <p className="text-xs text-muted mt-0.5">
                {new Date(achievement.unlockedAt).toLocaleDateString('zh-TW')}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
