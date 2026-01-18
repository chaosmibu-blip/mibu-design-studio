import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, PartyPopper, Megaphone } from "lucide-react";

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
  return (
    <PageLayout>
      <div className="page-padding pt-6 section-spacing pb-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">
            嗨，旅行者！
          </h1>
          <p className="text-muted text-base mt-1">
            今天想去哪裡探索？
          </p>
        </div>

        {/* Announcements */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
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
            <Sparkles className="w-5 h-5 text-accent animate-pulse-soft" />
            <h2 className="text-xl font-semibold text-foreground">快閃活動</h2>
          </div>
          {announcements.filter(a => a.type === "快閃").map((announcement) => (
            <Card 
              key={announcement.id} 
              className="rounded-2xl border-l-4 border-l-accent border-border shadow-soft card-hover overflow-hidden bg-gradient-to-r from-accent/10 via-accent/5 to-transparent"
            >
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent animate-pulse-soft" />
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
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
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
