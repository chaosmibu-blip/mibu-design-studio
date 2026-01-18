import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, PartyPopper, Megaphone, ChevronRight, Flame } from "lucide-react";
import LevelBadge from "@/components/LevelBadge";
import ExperienceBar from "@/components/ExperienceBar";
import DailyQuests from "@/components/DailyQuests";
import { useGameProgress } from "@/hooks/useGameProgress";
import { useNavigate } from "react-router-dom";
import mibuLogo from "@/assets/mibu-logo.jpeg";

const announcements = [
  {
    id: 1,
    title: "新城市上線：京都",
    content: "現在可以收集京都的景點了！快來扭蛋試試運氣吧！",
    date: "2024/01/15",
    type: "公告",
  },
  {
    id: 2,
    title: "雙倍扭蛋活動",
    content: "限時三天，扭蛋獲得雙倍獎勵！",
    date: "2024/01/18",
    type: "快閃",
  },
  {
    id: 3,
    title: "農曆新年活動",
    content: "限定新年造型貓咪即將登場，敬請期待！",
    date: "2024/01/10",
    type: "節慶",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { 
    progress, 
    currentLevel, 
    currentTier,
    progressToNextLevel, 
    xpToNextLevel,
    xpInCurrentLevel,
    xpNeededForNextLevel
  } = useGameProgress();

  return (
    <PageLayout>
      <div className="page-padding pt-6 section-spacing pb-8">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 shadow-soft">
              <img src={mibuLogo} alt="Mibu" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">嗨，旅行者！</h1>
              <p className="text-sm text-muted">今天想去哪裡探索？</p>
            </div>
          </div>
        </div>

        {/* Level & XP Card - 品牌風格 */}
        <Card 
          className="rounded-2xl border-border shadow-medium overflow-hidden animate-slide-up cursor-pointer card-hover"
          onClick={() => navigate("/achievements")}
        >
          <div className="bg-gradient-to-br from-primary/10 via-card to-accent/10 p-5">
            <div className="flex items-center justify-between">
              <LevelBadge level={currentLevel} size="md" />
              
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-xs text-muted">連續登入</p>
                  <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    {progress.dailyLoginStreak} 天
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted" />
              </div>
            </div>
            
            {/* 經驗值進度 */}
            <div className="mt-4">
              <ExperienceBar 
                current={xpInCurrentLevel}
                max={xpNeededForNextLevel}
                level={currentLevel}
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted">
                  {currentTier.name}
                </span>
                {currentLevel < 99 && (
                  <span className="text-xs text-primary font-medium">
                    還需 {xpToNextLevel} XP 升級
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* 每日任務預覽 */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <DailyQuests compact />
        </div>

        {/* Announcements */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">最新公告</h2>
          </div>
          {announcements.filter(a => a.type === "公告").map((announcement) => (
            <Card 
              key={announcement.id} 
              className="rounded-2xl border-border shadow-soft card-hover overflow-hidden"
            >
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-primary" />
                  {announcement.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-5 pb-5">
                <p className="text-base text-muted">{announcement.content}</p>
                <p className="text-sm text-muted/70 mt-3">{announcement.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Flash Events - with special styling */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-semibold text-foreground">快閃活動</h2>
          </div>
          {announcements.filter(a => a.type === "快閃").map((announcement) => (
            <Card 
              key={announcement.id} 
              className="rounded-2xl border-l-4 border-l-accent border-border shadow-soft card-hover overflow-hidden bg-gradient-to-r from-accent/10 via-accent/5 to-transparent"
            >
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  {announcement.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-5 pb-5">
                <p className="text-base text-muted">{announcement.content}</p>
                <p className="text-sm text-accent/70 mt-3 font-medium">{announcement.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Festival Events - with themed styling */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.25s" }}>
          <div className="flex items-center gap-2">
            <PartyPopper className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">節慶活動</h2>
          </div>
          {announcements.filter(a => a.type === "節慶").map((announcement) => (
            <Card 
              key={announcement.id} 
              className="rounded-2xl border-l-4 border-l-primary border-border shadow-soft card-hover overflow-hidden bg-gradient-to-r from-primary/8 via-primary/4 to-transparent"
            >
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="text-lg flex items-center gap-2">
                  <PartyPopper className="w-4 h-4 text-primary" />
                  {announcement.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-5 pb-5">
                <p className="text-base text-muted">{announcement.content}</p>
                <p className="text-sm text-primary/70 mt-3 font-medium">{announcement.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default HomePage;
