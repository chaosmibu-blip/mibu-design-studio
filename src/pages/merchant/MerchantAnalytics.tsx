import { ArrowLeft, Users, Ticket, Heart, Ban, Calendar, ChevronDown, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const MerchantAnalytics = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: BookOpen, label: "圖鑑收藏數", value: "156", change: "+12" },
    { icon: Heart, label: "我的最愛", value: "48", change: "+5" },
    { icon: Ban, label: "黑名單", value: "3", change: "-1" },
    { icon: Users, label: "新顧客", value: "23", change: "+8" },
  ];

  // 核銷數據一覽
  const redemptionData = [
    { name: "週一", count: 12 },
    { name: "週二", count: 8 },
    { name: "週三", count: 15 },
    { name: "週四", count: 10 },
    { name: "週五", count: 22 },
    { name: "週六", count: 35 },
    { name: "週日", count: 28 },
  ];

  // 優惠券核銷總覽
  const couponSummary = [
    { name: "咖啡買一送一", totalIssued: 100, redeemed: 48, rate: "48%" },
    { name: "甜點9折券", totalIssued: 50, redeemed: 32, rate: "64%" },
    { name: "滿額贈飲料", totalIssued: 80, redeemed: 25, rate: "31%" },
  ];

  // 近期核銷歷史
  const recentRedemptions = [
    { coupon: "咖啡買一送一", user: "王**", time: "10分鐘前" },
    { coupon: "甜點9折券", user: "陳**", time: "1小時前" },
    { coupon: "咖啡買一送一", user: "林**", time: "2小時前" },
    { coupon: "滿額贈飲料", user: "張**", time: "3小時前" },
  ];

  // 優惠券方案歷史
  const couponHistory = [
    { name: "新年特惠券", period: "2025/01/01 - 2025/01/15", redeemed: 120, status: "已結束" },
    { name: "聖誕優惠券", period: "2024/12/20 - 2024/12/31", redeemed: 89, status: "已結束" },
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

        {/* Redemption Chart */}
        <Card className="rounded-2xl border-border shadow-soft">
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground mb-4">核銷數據一覽</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={redemptionData}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))" 
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Coupon Summary Table */}
        <Card className="rounded-2xl border-border shadow-soft">
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground mb-4">優惠券核銷總覽</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-4 text-xs text-muted-foreground pb-2 border-b border-border">
                <span>方案名稱</span>
                <span className="text-center">發行數</span>
                <span className="text-center">已核銷</span>
                <span className="text-right">核銷率</span>
              </div>
              {couponSummary.map((coupon, index) => (
                <div key={index} className="grid grid-cols-4 text-sm py-2">
                  <span className="text-foreground truncate">{coupon.name}</span>
                  <span className="text-center text-muted-foreground">{coupon.totalIssued}</span>
                  <span className="text-center text-foreground font-medium">{coupon.redeemed}</span>
                  <span className="text-right text-primary font-medium">{coupon.rate}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Redemptions */}
        <Card className="rounded-2xl border-border shadow-soft">
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground mb-4">近期核銷歷史</h3>
            <div className="space-y-4">
              {recentRedemptions.map((redemption, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{redemption.coupon}</span>
                      <span className="text-muted-foreground"> - {redemption.user}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{redemption.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coupon History */}
        <Card className="rounded-2xl border-border shadow-soft">
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground mb-4">優惠券方案歷史</h3>
            <div className="space-y-3">
              {couponHistory.map((item, index) => (
                <div key={index} className="p-3 bg-secondary/50 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.period}</p>
                  <p className="text-sm text-primary mt-1">已核銷 {item.redeemed} 張</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MerchantAnalytics;
