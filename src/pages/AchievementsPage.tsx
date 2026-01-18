import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Trophy, Star } from "lucide-react";
import LevelBadge from "@/components/LevelBadge";
import ExperienceBar from "@/components/ExperienceBar";
import DailyQuests from "@/components/DailyQuests";
import { CumulativeAchievementCard, OneTimeAchievementCard } from "@/components/AchievementCard";
import { useGameProgress, LEVEL_TIERS } from "@/hooks/useGameProgress";
import { useAchievements, CATEGORY_NAMES } from "@/hooks/useAchievements";
import { useDailyQuests } from "@/hooks/useDailyQuests";

const AchievementsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("daily");
  const { 
    currentLevel, 
    currentTier,
    xpToNextLevel,
    xpInCurrentLevel,
    xpNeededForNextLevel,
    progress
  } = useGameProgress();
  const { cumulativeAchievements, oneTimeAchievements, stats } = useAchievements();
  const { oneTimeQuests, oneTimeProgress } = useDailyQuests();

  // 按類別分組成就
  const groupedCumulative = cumulativeAchievements.reduce((acc, achievement) => {
    const cat = achievement.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(achievement);
    return acc;
  }, {} as Record<string, typeof cumulativeAchievements>);

  const groupedOneTime = oneTimeAchievements.reduce((acc, achievement) => {
    const cat = achievement.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(achievement);
    return acc;
  }, {} as Record<string, typeof oneTimeAchievements>);

  return (
    <PageLayout showNav={false}>
      <div className="page-padding pt-6 section-spacing pb-8">
        {/* Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center shadow-soft btn-press"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">成就與任務</h1>
        </div>

        {/* 等級進度卡片 */}
        <Card className="rounded-2xl border-border shadow-medium overflow-hidden animate-slide-up">
          <div className="bg-gradient-to-br from-primary/10 via-card to-accent/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <LevelBadge level={currentLevel} size="lg" />
              <div className="text-right">
                <p className="text-sm text-muted">總經驗值</p>
                <p className="text-xl font-bold text-foreground">{progress.currentXP} XP</p>
              </div>
            </div>
            
            <ExperienceBar 
              current={xpInCurrentLevel}
              max={xpNeededForNextLevel}
              level={currentLevel}
            />
            
            {currentLevel < 99 && (
              <p className="text-center text-sm text-muted mt-3">
                還需 <span className="text-primary font-semibold">{xpToNextLevel} XP</span> 升到 Lv.{currentLevel + 1}
              </p>
            )}
          </div>
        </Card>

        {/* 統計概覽 */}
        <div className="grid grid-cols-3 gap-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <Card className="rounded-xl border-border shadow-soft">
            <CardContent className="p-3 text-center">
              <Trophy className="w-5 h-5 mx-auto text-amber-500 mb-1" />
              <p className="text-lg font-bold text-foreground">{stats.totalUnlocked}</p>
              <p className="text-xs text-muted">已解鎖</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-border shadow-soft">
            <CardContent className="p-3 text-center">
              <Star className="w-5 h-5 mx-auto text-primary mb-1" />
              <p className="text-lg font-bold text-foreground">{currentTier.tier}</p>
              <p className="text-xs text-muted">當前階段</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-border shadow-soft">
            <CardContent className="p-3 text-center">
              <span className="text-xl">🔥</span>
              <p className="text-lg font-bold text-foreground">{progress.dailyLoginStreak}</p>
              <p className="text-xs text-muted">連續登入</p>
            </CardContent>
          </Card>
        </div>

        {/* 標籤頁 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <TabsList className="w-full grid grid-cols-4 h-11 rounded-xl bg-secondary p-1">
            <TabsTrigger value="daily" className="rounded-lg text-xs">每日</TabsTrigger>
            <TabsTrigger value="onetime" className="rounded-lg text-xs">一次性</TabsTrigger>
            <TabsTrigger value="cumulative" className="rounded-lg text-xs">累計</TabsTrigger>
            <TabsTrigger value="levels" className="rounded-lg text-xs">等級</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="mt-4 space-y-4">
            <DailyQuests />
            
            {/* 一次性任務 */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">新手任務</h3>
                <span className="text-sm text-muted">
                  {oneTimeProgress.completed}/{oneTimeProgress.total} 完成
                </span>
              </div>
              {oneTimeQuests.map((quest) => (
                <Card key={quest.id} className={`rounded-xl border-border shadow-soft ${quest.isCompleted ? "bg-primary/5" : ""}`}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${quest.isCompleted ? "bg-primary/20" : "bg-secondary"}`}>
                        {quest.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-sm font-medium ${quest.isCompleted ? "text-muted line-through" : "text-foreground"}`}>
                          {quest.title}
                        </h4>
                        <p className="text-xs text-muted">{quest.description}</p>
                      </div>
                      <span className={`text-xs font-medium ${quest.isCompleted ? "text-primary" : "text-accent"}`}>
                        +{quest.xpReward} XP
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="onetime" className="mt-4 space-y-4">
            {Object.entries(groupedOneTime).map(([category, achievements]) => (
              <div key={category} className="space-y-2">
                <h3 className="font-semibold text-foreground">{CATEGORY_NAMES[category]}</h3>
                {achievements.map((achievement) => (
                  <OneTimeAchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="cumulative" className="mt-4 space-y-4">
            {Object.entries(groupedCumulative).map(([category, achievements]) => (
              <div key={category} className="space-y-2">
                <h3 className="font-semibold text-foreground">{CATEGORY_NAMES[category]}</h3>
                {achievements.map((achievement) => (
                  <CumulativeAchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="levels" className="mt-4 space-y-3">
            <p className="text-sm text-muted">達成等級解鎖專屬獎勵</p>
            {LEVEL_TIERS.map((tier) => {
              const isUnlocked = currentLevel >= tier.minLevel;
              const isCurrent = currentLevel >= tier.minLevel && currentLevel <= tier.maxLevel;
              return (
                <Card 
                  key={tier.tier} 
                  className={`rounded-xl border-border shadow-soft ${isCurrent ? "border-primary bg-primary/5" : ""} ${!isUnlocked ? "opacity-60" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${isUnlocked ? "bg-gradient-to-br from-primary/20 to-accent/20" : "bg-secondary"}`}>
                        {tier.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{tier.name}</h4>
                          {isCurrent && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">目前</span>}
                        </div>
                        <p className="text-xs text-muted">Lv.{tier.minLevel} ~ Lv.{tier.maxLevel}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted">階段 {tier.tier}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AchievementsPage;
