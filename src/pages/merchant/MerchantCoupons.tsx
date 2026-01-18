import { ArrowLeft, Plus, Search, MoreVertical, Ticket, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const MerchantCoupons = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "全部" },
    { id: "active", label: "進行中" },
    { id: "scheduled", label: "即將開始" },
    { id: "ended", label: "已結束" },
  ];

  const coupons = [
    {
      id: 1,
      name: "咖啡買一送一",
      rarity: "SR",
      issued: 100,
      redeemed: 48,
      expiry: "2025/02/28",
      status: "active",
    },
    {
      id: 2,
      name: "甜點9折優惠",
      rarity: "R",
      issued: 200,
      redeemed: 156,
      expiry: "2025/01/31",
      status: "active",
    },
    {
      id: 3,
      name: "飲品第二杯半價",
      rarity: "S",
      issued: 150,
      redeemed: 89,
      expiry: "2025/03/15",
      status: "active",
    },
    {
      id: 4,
      name: "新品嚐鮮免費券",
      rarity: "SSR",
      issued: 50,
      redeemed: 50,
      expiry: "2025/01/15",
      status: "ended",
    },
    {
      id: 5,
      name: "春節限定禮盒優惠",
      rarity: "SP",
      issued: 30,
      redeemed: 0,
      expiry: "2025/02/10",
      status: "scheduled",
    },
  ];

  const rarityStyles: Record<string, string> = {
    R: "bg-secondary text-foreground",
    S: "bg-accent/20 text-accent",
    SR: "bg-primary/20 text-primary",
    SSR: "bg-primary text-primary-foreground",
    SP: "bg-foreground text-background",
  };

  const statusStyles: Record<string, string> = {
    active: "bg-primary/10 text-primary",
    scheduled: "bg-accent/10 text-accent",
    ended: "bg-muted text-muted-foreground",
  };

  const statusLabels: Record<string, string> = {
    active: "進行中",
    scheduled: "即將開始",
    ended: "已結束",
  };

  const filteredCoupons = activeFilter === "all" 
    ? coupons 
    : coupons.filter(c => c.status === activeFilter);

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
          <h1 className="text-xl font-bold text-foreground">優惠券管理</h1>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Add Coupon Button */}
        <Button className="w-full h-14 rounded-2xl btn-press gap-2">
          <Plus className="w-5 h-5" />
          建立優惠券
        </Button>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="搜尋優惠券..." 
            className="pl-11 rounded-2xl h-12 border-border"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              className="rounded-full shrink-0"
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Coupons List */}
        <div className="space-y-3">
          {filteredCoupons.map((coupon) => (
            <Card key={coupon.id} className="rounded-2xl border-border shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-secondary rounded-xl flex items-center justify-center">
                      <Ticket className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{coupon.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${rarityStyles[coupon.rarity]}`}>
                          {coupon.rarity}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusStyles[coupon.status]}`}>
                        {statusLabels[coupon.status]}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <MoreVertical className="w-5 h-5 text-muted-foreground" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{coupon.redeemed}/{coupon.issued}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>至 {coupon.expiry}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(coupon.redeemed / coupon.issued) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    已核銷 {Math.round((coupon.redeemed / coupon.issued) * 100)}%
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchantCoupons;
