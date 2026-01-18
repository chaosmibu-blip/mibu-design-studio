import { useDailyQuests } from "@/hooks/useDailyQuests";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Gift, ChevronRight, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface DailyQuestsProps {
  compact?: boolean;
}

const DailyQuests = ({ compact = false }: DailyQuestsProps) => {
  const navigate = useNavigate();
  const { 
    dailyQuests, 
    dailyProgress, 
    isDailyComplete, 
    dailyXPEarned,
    dailyXPTotal,
    DAILY_COMPLETE_BONUS 
  } = useDailyQuests();

  if (compact) {
    return (
      <Card 
        className="rounded-2xl border-border shadow-soft cursor-pointer card-hover"
        onClick={() => navigate("/achievements")}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">每日任務</h3>
                <p className="text-xs text-muted">
                  {dailyProgress.completed}/{dailyProgress.total} 完成
                  {isDailyComplete && " ✨"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-xs text-muted">已獲得</p>
                <p className="text-sm font-semibold text-primary">+{dailyXPEarned} XP</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted" />
            </div>
          </div>
          
          <Progress 
            value={dailyProgress.percentage} 
            className="h-2 mt-3 bg-secondary"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-foreground">每日任務</h2>
        <span className="text-sm text-muted">
          {dailyProgress.completed}/{dailyProgress.total} 完成
        </span>
      </div>

      <div className="space-y-2">
        {dailyQuests.map((quest) => (
          <Card 
            key={quest.id}
            className={`rounded-xl border-border shadow-soft transition-all duration-200 ${
              quest.isCompleted ? "bg-primary/5" : ""
            }`}
          >
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  quest.isCompleted 
                    ? "bg-primary/20" 
                    : "bg-secondary"
                }`}>
                  <Icon name={quest.icon} className={`w-4 h-4 ${quest.isCompleted ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-medium ${
                    quest.isCompleted ? "text-muted line-through" : "text-foreground"
                  }`}>
                    {quest.title}
                  </h3>
                  <p className="text-xs text-muted truncate">
                    {quest.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  {quest.isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  ) : (
                    <span className="text-xs font-medium text-accent">
                      +{quest.xpReward} XP
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* 每日全勤獎勵 */}
        <Card 
          className={`rounded-xl border-2 shadow-soft transition-all duration-200 ${
            isDailyComplete 
              ? "border-primary bg-primary/10" 
              : "border-dashed border-border"
          }`}
        >
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                isDailyComplete 
                  ? "bg-primary/30" 
                  : "bg-secondary"
              }`}>
                <Gift className={`w-5 h-5 ${isDailyComplete ? "text-primary" : "text-muted"}`} />
              </div>
              
              <div className="flex-1">
                <h3 className={`text-sm font-medium ${
                  isDailyComplete ? "text-primary" : "text-foreground"
                }`}>
                  每日全勤
                </h3>
                <p className="text-xs text-muted">
                  完成全部每日任務
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                {isDailyComplete ? (
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-primary">+{DAILY_COMPLETE_BONUS} XP</span>
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                ) : (
                  <span className="text-xs font-medium text-muted">
                    +{DAILY_COMPLETE_BONUS} XP
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 總計 */}
      <div className="flex items-center justify-between px-1 pt-2">
        <span className="text-sm text-muted">今日經驗值</span>
        <span className="text-sm font-semibold text-foreground">
          {dailyXPEarned} / {dailyXPTotal} XP
        </span>
      </div>
    </div>
  );
};

export default DailyQuests;
