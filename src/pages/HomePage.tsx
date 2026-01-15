import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const announcements = [
  {
    id: 1,
    title: "🎉 新城市上線：京都",
    content: "現在可以收集京都的景點了！快來扭蛋試試運氣吧！",
    date: "2024/01/15",
    type: "公告",
  },
  {
    id: 2,
    title: "⚡ 雙倍扭蛋活動",
    content: "限時三天，扭蛋獲得雙倍獎勵！",
    date: "2024/01/18",
    type: "快閃",
  },
  {
    id: 3,
    title: "🎊 農曆新年活動",
    content: "限定新年造型貓咪即將登場，敬請期待！",
    date: "2024/01/10",
    type: "節慶",
  },
];

const HomePage = () => {
  return (
    <PageLayout>
      <div className="px-4 pt-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            嗨，旅行者！
          </h1>
          <p className="text-muted text-sm mt-1">
            今天想去哪裡探索？
          </p>
        </div>

        {/* Announcements */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">最新公告</h2>
          {announcements.filter(a => a.type === "公告").map((announcement) => (
            <Card key={announcement.id} className="rounded-2xl border-border shadow-sm card-hover">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{announcement.title}</CardTitle>
                  <span className="text-xs px-2 py-1 bg-secondary text-primary rounded-full">
                    {announcement.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted">{announcement.content}</p>
                <p className="text-xs text-muted/70 mt-2">{announcement.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Flash Events */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">快閃活動</h2>
          {announcements.filter(a => a.type === "快閃").map((announcement) => (
            <Card key={announcement.id} className="rounded-2xl border-border shadow-sm card-hover bg-accent/10">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{announcement.title}</CardTitle>
                  <span className="text-xs px-2 py-1 bg-accent text-accent-foreground rounded-full">
                    {announcement.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted">{announcement.content}</p>
                <p className="text-xs text-muted/70 mt-2">{announcement.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Festival Events */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">節慶活動</h2>
          {announcements.filter(a => a.type === "節慶").map((announcement) => (
            <Card key={announcement.id} className="rounded-2xl border-border shadow-sm card-hover">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{announcement.title}</CardTitle>
                  <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                    {announcement.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted">{announcement.content}</p>
                <p className="text-xs text-muted/70 mt-2">{announcement.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default HomePage;
