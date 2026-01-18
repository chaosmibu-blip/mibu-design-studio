import { ArrowLeft, TrendingUp, Users, Ticket, Store, Calendar, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MerchantAnalytics = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: TrendingUp, label: "本月營收", value: "NT$ 12,500", change: "+15%" },
    { icon: Ticket, label: "優惠券核銷", value: "48 張", change: "+8%" },
    { icon: Users, label: "新顧客", value: "23 人", change: "+12%" },
    { icon: Store, label: "店家評分", value: "4.8", change: "+0.2" },
  ];

  const recentActivity = [
    { type: "coupon", desc: "咖啡買一送一 已核銷", time: "10分鐘前" },
    { type: "review", desc: "收到 5 星評價", time: "1小時前" },
    { type: "coupon", desc: "甜點9折券 已核銷", time: "2小時前" },
    { type: "customer", desc: "新顧客加入會員", time: "3小時前" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-5 py-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-xl"
            onClick={() => navigate("/merchant")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">數據分析</h1>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Date Range Selector */}
        <Button variant="outline" className="w-full justify-between rounded-2xl h-12">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>本月 (2025年1月)</span>
          </div>
          <ChevronDown className="w-4 h-4" />
        </Button>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="rounded-2xl border-border shadow-soft">
              <CardContent className="p-4">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center mb-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className="text-xs text-accent mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="rounded-2xl border-border shadow-soft">
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground mb-4">近期活動</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.desc}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chart Placeholder */}
        <Card className="rounded-2xl border-border shadow-soft">
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground mb-4">每日核銷趨勢</h3>
            <div className="h-40 bg-secondary/50 rounded-xl flex items-center justify-center">
              <p className="text-muted-foreground text-sm">圖表將在此顯示</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MerchantAnalytics;
