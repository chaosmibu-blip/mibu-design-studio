import PageLayout from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Map, Utensils, Camera, Star, Users, Calendar, Sparkles } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: "explore" | "collect" | "social" | "special";
  progress: number;
  target: number;
  isUnlocked: boolean;
}

const achievements: Achievement[] = [
  // 探索類
  { 
    id: "first_gacha", 
    name: "初次冒險", 
    description: "完成第一次扭蛋", 
    icon: <Sparkles className="w-6 h-6" />, 
    category: "explore", 
    progress: 1, 
    target: 1, 
    isUnlocked: true 
  },
  { 
    id: "explorer_10", 
    name: "小小探索家", 
    description: "完成 10 次扭蛋", 
    icon: <Map className="w-6 h-6" />, 
    category: "explore", 
    progress: 7, 
    target: 10, 
    isUnlocked: false 
  },
  { 
    id: "explorer_50", 
    name: "資深探索家", 
    description: "完成 50 次扭蛋", 
    icon: <Map className="w-6 h-6" />, 
    category: "explore", 
    progress: 7, 
    target: 50, 
    isUnlocked: false 
  },
  
  // 收集類
  { 
    id: "foodie_10", 
    name: "美食獵人", 
    description: "收集 10 個美食類景點", 
    icon: <Utensils className="w-6 h-6" />, 
    category: "collect", 
    progress: 4, 
    target: 10, 
    isUnlocked: false 
  },
  { 
    id: "foodie_50", 
    name: "饕餮美食家", 
    description: "收集 50 個美食類景點", 
    icon: <Utensils className="w-6 h-6" />, 
    category: "collect", 
    progress: 4, 
    target: 50, 
    isUnlocked: false 
  },
  { 
    id: "photographer", 
    name: "打卡達人", 
    description: "完成 50 次掃碼打卡", 
    icon: <Camera className="w-6 h-6" />, 
    category: "collect", 
    progress: 23, 
    target: 50, 
    isUnlocked: false 
  },
  
  // 社交類
  { 
    id: "consecutive_7", 
    name: "忠實粉絲", 
    description: "連續 7 天登入", 
    icon: <Calendar className="w-6 h-6" />, 
    category: "social", 
    progress: 3, 
    target: 7, 
    isUnlocked: false 
  },
  { 
    id: "share_trip", 
    name: "分享達人", 
    description: "分享行程給 5 位好友", 
    icon: <Users className="w-6 h-6" />, 
    category: "social", 
    progress: 2, 
    target: 5, 
    isUnlocked: false 
  },
  
  // 特殊類
  { 
    id: "taipei_master", 
    name: "台北通", 
    description: "收集台北市全部區域景點", 
    icon: <Star className="w-6 h-6" />, 
    category: "special", 
    progress: 3, 
    target: 12, 
    isUnlocked: false 
  },
  { 
    id: "diamond_card", 
    name: "鑽石收藏家", 
    description: "擁有一張鑽石等級圖鑑卡", 
    icon: <Trophy className="w-6 h-6" />, 
    category: "special", 
    progress: 1, 
    target: 1, 
    isUnlocked: true 
  },
];

const categoryNames: Record<string, string> = {
  explore: "探索成就",
  collect: "收集成就",
  social: "社交成就",
  special: "特殊成就",
};

const AchievementsPage = () => {
  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;

  const groupedAchievements = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  return (
    <PageLayout>
      <div className="px-4 pt-6 pb-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center">
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">我的成就</h1>
          <p className="text-sm text-muted">
            已解鎖 {unlockedCount} / {totalCount} 個成就
          </p>
          <Progress 
            value={(unlockedCount / totalCount) * 100} 
            className="h-2 max-w-xs mx-auto"
          />
        </div>

        {/* Achievement categories */}
        {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => (
          <div key={category} className="space-y-3">
            <h2 className="text-sm font-medium text-muted px-1">{categoryNames[category]}</h2>
            
            <div className="space-y-3">
              {categoryAchievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    achievement.isUnlocked 
                      ? "border-yellow-500/30 bg-yellow-500/5" 
                      : "border-border opacity-70"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      achievement.isUnlocked 
                        ? "bg-yellow-500/20 text-yellow-500" 
                        : "bg-secondary text-muted"
                    }`}>
                      {achievement.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-bold ${
                          achievement.isUnlocked ? "text-foreground" : "text-muted"
                        }`}>
                          {achievement.name}
                        </h3>
                        {achievement.isUnlocked && (
                          <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-600 rounded-full">
                            ✓ 已達成
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted mb-2">{achievement.description}</p>
                      
                      {!achievement.isUnlocked && (
                        <div className="space-y-1">
                          <Progress 
                            value={(achievement.progress / achievement.target) * 100} 
                            className="h-1.5"
                          />
                          <p className="text-xs text-muted">
                            {achievement.progress} / {achievement.target}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default AchievementsPage;
