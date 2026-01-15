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
      <div className="px-4 pt-6 space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            嗨，旅行者！
          </h1>
          <p className="text-muted text-base mt-1">
            今天想去哪裡探索？
          </p>
        </div>

        {/* Announcements */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">最新公告</h2>
          {announcements.filter(a => a.type === "公告").map((announcement) => (
            <Card key={announcement.id} className="rounded-2xl border-border shadow-sm card-hover">
              <CardHeader className="pb-3 pt-4 px-5">
                <CardTitle className="text-lg">{announcement.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-5 pb-4">
                <p className="text-base text-muted">{announcement.content}</p>
                <p className="text-sm text-muted/70 mt-2">{announcement.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Flash Events */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">快閃活動</h2>
          {announcements.filter(a => a.type === "快閃").map((announcement) => (
            <Card key={announcement.id} className="rounded-2xl border-border shadow-sm card-hover bg-accent/10">
              <CardHeader className="pb-3 pt-4 px-5">
                <CardTitle className="text-lg">{announcement.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-5 pb-4">
                <p className="text-base text-muted">{announcement.content}</p>
                <p className="text-sm text-muted/70 mt-2">{announcement.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Festival Events */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">節慶活動</h2>
          {announcements.filter(a => a.type === "節慶").map((announcement) => (
            <Card key={announcement.id} className="rounded-2xl border-border shadow-sm card-hover">
              <CardHeader className="pb-3 pt-4 px-5">
                <CardTitle className="text-lg">{announcement.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-5 pb-4">
                <p className="text-base text-muted">{announcement.content}</p>
                <p className="text-sm text-muted/70 mt-2">{announcement.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default HomePage;
