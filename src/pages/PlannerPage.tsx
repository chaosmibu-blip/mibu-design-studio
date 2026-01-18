import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Map, MessageCircle, ChevronDown, Check, Calendar, ClipboardList } from "lucide-react";
import PlannerMap from "@/components/PlannerMap";
import ChatRoom from "@/components/ChatRoom";
import Itinerary from "@/components/Itinerary";
import { usePurchase } from "@/hooks/usePurchase";
import { useQuestTracking } from "@/contexts/QuestTrackingContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Location data structure
const locationData = {
  countries: [
    {
      name: "台灣",
      cities: [
        {
          name: "台北市",
          districts: ["大安區", "信義區", "中山區", "松山區", "內湖區", "士林區"],
        },
        {
          name: "新北市",
          districts: ["板橋區", "新莊區", "中和區", "永和區", "三重區", "淡水區"],
        },
        {
          name: "台中市",
          districts: ["西屯區", "南屯區", "北屯區", "西區", "中區", "東區"],
        },
      ],
    },
  ],
};

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
  const [activeTab, setActiveTab] = useState<"map" | "chat">("map");
  const [sheetOpen, setSheetOpen] = useState(false);
  const { trackDailyQuest, trackOneTimeQuest, isDailyQuestCompleted, isOneTimeQuestCompleted } = useQuestTracking();

  // 追蹤查看行程任務
  useEffect(() => {
    if (!isDailyQuestCompleted("view_planner")) {
      trackDailyQuest("view_planner");
    }
  }, [trackDailyQuest, isDailyQuestCompleted]);
  
  // Location selection state
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<number>(3);
  const [selectedStartDate, setSelectedStartDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Get available options based on selection
  const availableCities = locationData.countries.find(c => c.name === selectedCountry)?.cities || [];
  const availableDistricts = availableCities.find(c => c.name === selectedCity)?.districts || [];

  const handleConfirmPurchase = () => {
    setDays(selectedDays);
    setStartDate(selectedStartDate);
    confirmPurchase();
    setSheetOpen(false);

    // 追蹤首購任務
    if (!isOneTimeQuestCompleted("first_purchase")) {
      trackOneTimeQuest("first_purchase");
    }
  };

  return (
    <PageLayout>
      <div className="flex flex-col min-h-full">
        {/* Top Navigation with Itinerary in center */}
        <div className="bg-background border-b border-border">
          <div className="flex items-center">
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

            {/* Center - Itinerary Sheet Trigger */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button
                  className="flex-1 py-4 text-sm font-medium transition-all relative flex items-center justify-center gap-1.5 text-primary"
                >
                  <ClipboardList className="w-4 h-4" />
                  {isPurchased ? "我的行程表" : "建立行程"}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
                <SheetHeader className="pb-4">
                  <SheetTitle className="text-xl">
                    {isPurchased ? "我的行程表" : "建立新行程"}
                  </SheetTitle>
                </SheetHeader>

                {isPurchased ? (
                  // Show itinerary if purchased
                  <div className="overflow-y-auto h-[calc(85vh-80px)] -mx-6 px-6">
                    <Itinerary />
                  </div>
                ) : (
                  // Show purchase flow if not purchased
                  <div className="space-y-5 overflow-y-auto h-[calc(85vh-80px)]">
                    {/* Country selection */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">選擇國家</label>
                      <div className="flex gap-2 flex-wrap">
                        {locationData.countries.map((country) => (
                          <button
                            key={country.name}
                            onClick={() => {
                              setSelectedCountry(country.name);
                              setSelectedCity("");
                              setSelectedDistrict("");
                            }}
                            className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
                              selectedCountry === country.name
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-card border border-border text-foreground hover:bg-secondary'
                            }`}
                          >
                            {country.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* City selection */}
                    {selectedCountry && (
                      <div className="space-y-2 animate-fade-in">
                        <label className="text-sm font-medium text-foreground">選擇城市</label>
                        <div className="flex gap-2 flex-wrap">
                          {availableCities.map((city) => (
                            <button
                              key={city.name}
                              onClick={() => {
                                setSelectedCity(city.name);
                                setSelectedDistrict("");
                              }}
                              className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
                                selectedCity === city.name
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-card border border-border text-foreground hover:bg-secondary'
                              }`}
                            >
                              {city.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* District selection */}
                    {selectedCity && (
                      <div className="space-y-2 animate-fade-in">
                        <label className="text-sm font-medium text-foreground">選擇區域</label>
                        <div className="flex gap-2 flex-wrap">
                          {availableDistricts.map((district) => (
                            <button
                              key={district}
                              onClick={() => setSelectedDistrict(district)}
                              className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
                                selectedDistrict === district
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-card border border-border text-foreground hover:bg-secondary'
                              }`}
                            >
                              {district}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Days selection */}
                    {selectedDistrict && (
                      <div className="space-y-2 animate-fade-in">
                        <label className="text-sm font-medium text-foreground">選擇天數</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((d) => (
                            <button
                              key={d}
                              onClick={() => setSelectedDays(d)}
                              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                                selectedDays === d
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-card border border-border text-foreground hover:bg-secondary'
                              }`}
                            >
                              {d} 天
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Date picker */}
                    {selectedDistrict && (
                      <div className="space-y-2 animate-fade-in">
                        <label className="text-sm font-medium text-foreground">旅程開始日期</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                          <input
                            type="date"
                            value={selectedStartDate}
                            onChange={(e) => setSelectedStartDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    )}

                    {/* Pricing and confirm */}
                    {selectedDistrict && (
                      <div className="space-y-4 pt-2 animate-fade-in">
                        <div className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
                          <div className="text-center mb-3">
                            <p className="text-sm text-muted mb-1">服務費用</p>
                            <span className="text-3xl font-bold text-foreground">
                              NT$ {calculatePrice(selectedDays)}
                            </span>
                            <p className="text-sm text-muted mt-1">
                              NT$ 299 × {selectedDays} 天
                            </p>
                          </div>
                          
                          <div className="text-sm space-y-1.5 text-left">
                            {["專業策劃師一對一服務", "無限次團員邀請", `${selectedDays} 天行程表規劃工具`, "緊急聯絡支援"].map((item, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="text-foreground">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button
                          onClick={handleConfirmPurchase}
                          className="w-full h-14 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90"
                        >
                          確認購買
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </SheetContent>
            </Sheet>

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
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 px-4 pt-6 pb-4 overflow-y-auto">
          {activeTab === "map" && <PlannerMap />}
          {activeTab === "chat" && <ChatRoom />}
        </div>
      </div>
    </PageLayout>
  );
};

export default PlannerPage;