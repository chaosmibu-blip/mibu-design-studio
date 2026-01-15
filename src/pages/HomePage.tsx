import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, ChevronRight, MapPin } from "lucide-react";
import mibuOveralls from "@/assets/mibu-overalls.jpeg";

const announcements = [
  {
    id: 1,
    title: "🎉 新城市上線：京都",
    content: "現在可以收集京都的景點了！快來扭蛋試試運氣吧！",
    date: "2024/01/15",
  },
  {
    id: 2,
    title: "🎊 農曆新年活動",
    content: "限定新年造型貓咪即將登場，敬請期待！",
    date: "2024/01/10",
  },
];

const quickActions = [
  { icon: "🎰", label: "開始扭蛋", path: "/gacha" },
  { icon: "📚", label: "我的圖鑑", path: "/collection" },
  { icon: "🗺️", label: "探索地圖", path: "/collection" },
];

const HomePage = () => {
  return (
    <PageLayout>
      <div className="px-4 pt-6 space-y-6">
        {/* Header with greeting */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              嗨，旅行者！
            </h1>
            <p className="text-muted text-sm flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4" />
              今天想去哪裡探索？
            </p>
          </div>
          <button className="relative w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm btn-press">
            <Bell className="w-5 h-5 text-primary" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-[10px] text-accent-foreground rounded-full flex items-center justify-center font-medium">
              2
            </span>
          </button>
        </div>

        {/* Mascot decoration */}
        <div className="flex justify-center -my-2">
          <img
            src={mibuOveralls}
            alt="Mibu"
            className="w-32 h-32 object-contain drop-shadow-md animate-bounce-soft"
          />
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => window.location.href = action.path}
              className="flex flex-col items-center gap-2 p-4 bg-card rounded-2xl border border-border shadow-sm card-hover btn-press"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-sm font-medium text-foreground">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Announcements */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">最新公告</h2>
            <button className="text-sm text-primary flex items-center gap-1">
              查看全部 <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {announcements.map((announcement) => (
            <Card key={announcement.id} className="rounded-2xl border-border shadow-sm card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{announcement.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted">{announcement.content}</p>
                <p className="text-xs text-muted/70 mt-2">{announcement.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Collection progress */}
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              📊 收集進度
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted">總收集數</span>
              <span className="text-sm font-medium text-foreground">42 / 150</span>
            </div>
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: "28%" }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default HomePage;