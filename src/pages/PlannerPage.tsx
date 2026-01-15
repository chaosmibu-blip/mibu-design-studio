import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Map, MessageCircle, CalendarDays, Lock, Check, Sparkles, Calendar } from "lucide-react";
import PlannerMap from "@/components/PlannerMap";
import ChatRoom from "@/components/ChatRoom";
import Itinerary from "@/components/Itinerary";
import { usePurchase } from "@/hooks/usePurchase";

const PlannerPage = () => {
  const { 
    isPurchased, 
    days, 
    startDate, 
    setDays, 
    setStartDate, 
    confirmPurchase, 
    calculatePrice 
  } = usePurchase();
  const [activeTab, setActiveTab] = useState<"map" | "chat" | "itinerary">("map");

  // Not purchased - show intro page
  if (!isPurchased) {
    return (
      <PageLayout>
        <div className="flex flex-col min-h-full px-4 py-6">
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            {/* Icon */}
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-primary" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-2">
              旅程策劃服務
            </h1>
            <p className="text-muted mb-8 max-w-sm">
              專業策劃師為您規劃完美行程，提供線上諮詢、線下協助及旅遊整合服務
            </p>

            {/* Features */}
            <div className="w-full max-w-sm space-y-4 mb-8">
              {[
                { icon: "🗺️", title: "即時位置共享", desc: "隨時掌握團員位置" },
                { icon: "💬", title: "專屬聊天室", desc: "與策劃師和團員即時溝通" },
                { icon: "📋", title: "行程規劃", desc: "完整的每日行程安排" },
                { icon: "🆘", title: "緊急協助", desc: "24小時線下安全支援" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border text-left"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <p className="font-medium text-foreground">{feature.title}</p>
                    <p className="text-sm text-muted">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Days selector */}
            <div className="w-full max-w-sm mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block text-left">選擇天數</label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, 5].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDays(d)}
                    className={`flex-1 min-w-[56px] py-3 rounded-xl font-medium transition-all ${
                      days === d
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border text-foreground hover:bg-secondary'
                    }`}
                  >
                    {d} 天
                  </button>
                ))}
              </div>
            </div>

            {/* Date picker */}
            <div className="w-full max-w-sm mb-6">
              <label className="text-sm font-medium text-foreground mb-2 block text-left">旅程開始日期</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="w-full max-w-sm p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/20 mb-6">
              <p className="text-sm text-muted mb-2">服務費用</p>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-4xl font-bold text-foreground">NT$ {calculatePrice(days)}</span>
              </div>
              <p className="text-sm text-muted mb-4">
                NT$ 299 × {days} 天
              </p>
              <ul className="space-y-2 text-sm text-left">
                {["專業策劃師一對一服務", "無限次團員邀請", `${days} 天行程表規劃工具`, "緊急聯絡支援"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Purchase button */}
            <Button
              onClick={confirmPurchase}
              className="w-full max-w-sm h-14 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90"
            >
              <Lock className="w-5 h-5 mr-2" />
              確認購買
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Purchased - show planner tabs
  return (
    <PageLayout>
      <div className="flex flex-col min-h-full">
        {/* Top Navigation Tabs */}
        <div className="bg-background border-b border-border">
          <div className="flex">
            <button
              onClick={() => setActiveTab("map")}
              className={`flex-1 py-4 text-sm font-medium transition-all relative flex items-center justify-center gap-2 ${
                activeTab === "map" ? "text-primary" : "text-muted"
              }`}
            >
              <Map className="w-4 h-4" />
              地圖
              {activeTab === "map" && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-4 text-sm font-medium transition-all relative flex items-center justify-center gap-2 ${
                activeTab === "chat" ? "text-primary" : "text-muted"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              聊天
              {activeTab === "chat" && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("itinerary")}
              className={`flex-1 py-4 text-sm font-medium transition-all relative flex items-center justify-center gap-2 ${
                activeTab === "itinerary" ? "text-primary" : "text-muted"
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              行程表
              {activeTab === "itinerary" && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 px-4 pt-6 pb-4 overflow-y-auto">
          {activeTab === "map" && <PlannerMap />}
          {activeTab === "chat" && <ChatRoom />}
          {activeTab === "itinerary" && <Itinerary />}
        </div>
      </div>
    </PageLayout>
  );
};

export default PlannerPage;
