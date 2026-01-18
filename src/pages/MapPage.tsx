import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Lock, Check, Globe, ArrowLeft, ChevronRight, Flame, Sparkles } from "lucide-react";

interface CountryStatus {
  code: string;
  name: string;
  isUnlocked: boolean;
  fundingProgress?: number;
  targetAmount?: number;
  currentAmount?: number;
  status: "unlocked" | "funding" | "coming_soon" | "locked";
}

const countriesData: CountryStatus[] = [
  { code: "TW", name: "台灣", isUnlocked: true, status: "unlocked" },
  { code: "JP", name: "日本", isUnlocked: false, fundingProgress: 42, targetAmount: 100000, currentAmount: 42000, status: "funding" },
  { code: "KR", name: "韓國", isUnlocked: false, fundingProgress: 18, targetAmount: 80000, currentAmount: 14400, status: "funding" },
  { code: "TH", name: "泰國", isUnlocked: false, status: "coming_soon" },
  { code: "VN", name: "越南", isUnlocked: false, status: "coming_soon" },
  { code: "SG", name: "新加坡", isUnlocked: false, status: "locked" },
  { code: "MY", name: "馬來西亞", isUnlocked: false, status: "locked" },
  { code: "ID", name: "印尼", isUnlocked: false, status: "locked" },
  { code: "PH", name: "菲律賓", isUnlocked: false, status: "locked" },
  { code: "HK", name: "香港", isUnlocked: false, status: "locked" },
];

const flagEmojis: Record<string, string> = {
  TW: "🇹🇼", JP: "🇯🇵", KR: "🇰🇷", TH: "🇹🇭", VN: "🇻🇳",
  SG: "🇸🇬", MY: "🇲🇾", ID: "🇮🇩", PH: "🇵🇭", HK: "🇭🇰",
};

const MapPage = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryStatus | null>(null);

  const getStatusBadge = (country: CountryStatus) => {
    switch (country.status) {
      case "unlocked":
        return (
          <span className="flex items-center gap-1 text-xs px-2.5 py-1 bg-green-500/20 text-green-600 rounded-full font-medium">
            <Check className="w-3 h-3" />
            已解鎖
          </span>
        );
      case "funding":
        return (
          <span className="flex items-center gap-1 text-xs px-2.5 py-1 bg-amber-500/20 text-amber-600 rounded-full font-medium animate-pulse-soft">
            <Flame className="w-3 h-3" /> 募資中 {country.fundingProgress}%
          </span>
        );
      case "coming_soon":
        return (
          <span className="flex items-center gap-1 text-xs px-2.5 py-1 bg-blue-500/20 text-blue-600 rounded-full font-medium">
            即將開放
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-xs px-2.5 py-1 bg-muted/50 text-muted rounded-full">
            <Lock className="w-3 h-3" />
            敬請期待
          </span>
        );
    }
  };

  return (
    <PageLayout showNav={false}>
      <div className="page-padding pt-6 pb-4 section-spacing">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-2 animate-fade-in">
          <button
            onClick={() => window.history.back()}
            className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center shadow-soft btn-press"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">全球探索地圖</h1>
        </div>

        {/* Stats header */}
        <div className="text-center space-y-2 animate-slide-up">
          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center shadow-soft">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <p className="text-sm text-muted">
            支持我們解鎖更多國家的景點資料
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">1</p>
            <p className="text-xs text-muted">已解鎖國家</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-600">2</p>
            <p className="text-xs text-muted">募資進行中</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-muted">7</p>
            <p className="text-xs text-muted">即將開放</p>
          </div>
        </div>

        {/* Country list */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted">亞洲地區</h2>
          
          {countriesData.map((country, index) => (
            <Card
              key={country.code}
              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer interactive-lift animate-slide-up ${
                country.isUnlocked 
                  ? "border-green-500/30 bg-green-500/5" 
                  : country.status === "funding"
                    ? "border-amber-500/30 bg-amber-500/5"
                    : "border-border"
              }`}
              style={{ animationDelay: `${(index + 2) * 0.05}s` }}
              onClick={() => setSelectedCountry(country)}
            >
              <div className="flex items-center gap-4">
                {/* Country flag/icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-soft ${
                  country.isUnlocked ? "bg-green-500/20" : "bg-secondary"
                }`}>
                  {flagEmojis[country.code]}
                </div>

                {/* Country info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-foreground">{country.name}</h3>
                    {getStatusBadge(country)}
                  </div>
                  
                  {/* Funding progress */}
                  {country.status === "funding" && (
                    <div className="space-y-2">
                      <Progress value={country.fundingProgress} className="h-2.5" />
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted">
                          已募集 NT${country.currentAmount?.toLocaleString()} / NT${country.targetAmount?.toLocaleString()}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs rounded-full border-amber-500 text-amber-600 hover:bg-amber-50"
                        >
                          支持解鎖 <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {country.isUnlocked && (
                    <p className="text-xs text-green-600 font-medium">可以開始扭蛋探索！</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Support CTA */}
        <Card className="p-6 rounded-2xl border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 text-center space-y-3 shadow-soft animate-slide-up">
          <h3 className="font-bold text-foreground text-lg flex items-center justify-center gap-2"><Sparkles className="w-5 h-5 text-primary" /> 支持我們的理念</h3>
          <p className="text-sm text-muted">
            景點資料的收集與篩選需要大量人力成本，<br />
            您的支持將幫助我們解鎖更多國家！
          </p>
          <Button size="lg" className="w-full rounded-xl">
            了解更多贊助方案
          </Button>
        </Card>
      </div>
    </PageLayout>
  );
};

export default MapPage;
