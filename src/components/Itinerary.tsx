import { useState } from "react";
import { Calendar, Clock, MapPin, Plus, ChevronLeft, ChevronRight, Trash2, Edit2, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCollection } from "@/hooks/useCollection";
import { usePurchase } from "@/hooks/usePurchase";
import type { ItineraryItem, DaySchedule } from "@/types";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "美食":
      return "🍜";
    case "住宿":
      return "🏨";
    case "遊程體驗":
      return "🎯";
    default:
      return "📍";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "美食":
      return "bg-amber-500/20 text-amber-600 border-amber-500/30";
    case "住宿":
      return "bg-blue-500/20 text-blue-600 border-blue-500/30";
    case "遊程體驗":
      return "bg-green-500/20 text-green-600 border-green-500/30";
    default:
      return "bg-gray-500/20 text-gray-600 border-gray-500/30";
  }
};

const ITINERARY_STORAGE_KEY = "mibu_itinerary";

const Itinerary = () => {
  const { generateScheduleDates, days } = usePurchase();
  const { items: collectionItems } = useCollection();
  
  // 從 localStorage 載入或根據購買天數產生空行程表
  const [schedules, setSchedules] = useState<DaySchedule[]>(() => {
    const stored = localStorage.getItem(ITINERARY_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // 將日期字串轉回 Date 物件
        return parsed.map((s: { date: string; items: ItineraryItem[] }) => ({
          ...s,
          date: new Date(s.date),
        }));
      } catch {
        // 如果解析失敗，產生新的行程表
      }
    }
    // 根據購買天數產生空行程表
    const dates = generateScheduleDates();
    return dates.map(date => ({ date, items: [] }));
  });

  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<{ title: string; category: string; county: string; description?: string } | null>(null);
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [selectedDuration, setSelectedDuration] = useState("2h");

  // 確保行程表天數與購買天數一致
  const ensureScheduleDays = () => {
    const dates = generateScheduleDates();
    if (dates.length === 0) return schedules;
    
    if (schedules.length !== dates.length) {
      const newSchedules = dates.map((date, index) => {
        // 保留現有的行程資料
        if (index < schedules.length) {
          return { ...schedules[index], date };
        }
        return { date, items: [] };
      });
      return newSchedules;
    }
    return schedules;
  };

  const currentSchedules = ensureScheduleDays();
  const currentSchedule = currentSchedules[currentDayIndex] || { date: new Date(), items: [] };

  // 儲存到 localStorage
  const saveSchedules = (newSchedules: DaySchedule[]) => {
    setSchedules(newSchedules);
    localStorage.setItem(ITINERARY_STORAGE_KEY, JSON.stringify(newSchedules));
  };

  // 轉換收藏項目為選擇清單格式
  const selectableItems = collectionItems.map(item => ({
    title: item.title,
    category: item.category,
    county: item.county,
    description: item.description,
  }));

  const filteredItems = selectableItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.county.includes(searchQuery) ||
    item.category.includes(searchQuery)
  );

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'long', 
      day: 'numeric',
      weekday: 'short'
    };
    return date.toLocaleDateString('zh-TW', options);
  };

  const goToPreviousDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  const goToNextDay = () => {
    if (currentDayIndex < currentSchedules.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  const handleAddFromCollection = () => {
    setSheetOpen(true);
    setSelectedItem(null);
    setSearchQuery("");
  };

  const handleSelectItem = (item: { title: string; category: string; county: string; description?: string }) => {
    setSelectedItem(item);
  };

  const handleConfirmAdd = () => {
    if (!selectedItem) return;
    
    const newItem: ItineraryItem = {
      id: Date.now().toString(),
      title: selectedItem.title,
      category: selectedItem.category,
      startTime: selectedTime,
      duration: selectedDuration,
    };

    const newSchedules = currentSchedules.map((schedule, index) => {
      if (index === currentDayIndex) {
        return {
          ...schedule,
          items: [...schedule.items, newItem].sort((a, b) => a.startTime.localeCompare(b.startTime)),
        };
      }
      return schedule;
    });

    saveSchedules(newSchedules);
    setSheetOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = (itemId: string) => {
    const newSchedules = currentSchedules.map((schedule, index) => {
      if (index === currentDayIndex) {
        return {
          ...schedule,
          items: schedule.items.filter(item => item.id !== itemId),
        };
      }
      return schedule;
    });
    saveSchedules(newSchedules);
  };

  // 如果沒有行程表天數（未購買）
  if (currentSchedules.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="text-4xl mb-4">📅</div>
        <p className="text-muted">尚未購買旅程策劃服務</p>
        <p className="text-sm text-muted mt-1">購買後即可開始規劃行程</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Day selector */}
      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="flex items-center justify-between">
          <Button
            size="icon"
            variant="ghost"
            onClick={goToPreviousDay}
            disabled={currentDayIndex === 0}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center mb-1">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-bold text-foreground">
                Day {currentDayIndex + 1} / {days}
              </span>
            </div>
            <p className="text-sm text-muted">{formatDate(currentSchedule.date)}</p>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={goToNextDay}
            disabled={currentDayIndex === currentSchedules.length - 1}
            className="rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Day pills */}
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          {currentSchedules.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentDayIndex(index)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                index === currentDayIndex
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted hover:bg-secondary/80'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Empty state for day */}
      {currentSchedule.items.length === 0 && (
        <div className="text-center py-8">
          <div className="text-3xl mb-3">📝</div>
          <p className="text-muted">這天還沒有行程</p>
          <p className="text-sm text-muted mt-1">從圖鑑新增地點到行程表</p>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-0">
        {currentSchedule.items.map((item, index) => (
          <div key={item.id} className="flex gap-4">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-primary" />
              {index < currentSchedule.items.length - 1 && (
                <div className="w-0.5 flex-1 bg-border my-1" />
              )}
            </div>

            {/* Card */}
            <div className="flex-1 pb-4">
              <div className="bg-card rounded-2xl p-4 border border-border hover:shadow-md transition-shadow">
                {/* Time */}
                <div className="flex items-center gap-2 text-sm text-muted mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{item.startTime}</span>
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                    {item.duration}
                  </span>
                </div>

                {/* Title and category */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{getCategoryIcon(item.category)}</span>
                      <h3 className="font-medium text-foreground">{item.title}</h3>
                    </div>
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full border ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Edit2 className="w-4 h-4 text-muted" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-muted" />
                    </Button>
                  </div>
                </div>

                {/* Notes */}
                {item.notes && (
                  <p className="mt-2 text-sm text-muted bg-secondary/50 rounded-lg px-3 py-2">
                    💡 {item.notes}
                  </p>
                )}

                {/* Map link */}
                <button 
                  className="mt-3 flex items-center gap-1 text-xs text-primary hover:underline"
                  onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(item.title)}`, "_blank")}
                >
                  <MapPin className="w-3 h-3" />
                  在地圖中查看
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add item button */}
      <Button 
        variant="outline" 
        className="w-full h-12 rounded-2xl border-dashed border-2"
        onClick={handleAddFromCollection}
      >
        <Plus className="w-4 h-4 mr-2" />
        從圖鑑新增行程
      </Button>

      {/* Add from collection sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-left">從圖鑑新增行程</SheetTitle>
          </SheetHeader>

          {!selectedItem ? (
            // 選擇行程列表
            <div className="flex flex-col h-full">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜尋行程..."
                  className="w-full pl-10 pr-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Collection items list */}
              <div className="flex-1 overflow-y-auto space-y-2 pb-4">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectItem(item)}
                      className="w-full p-4 bg-card rounded-xl border border-border text-left hover:bg-secondary/50 transition-colors active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getCategoryIcon(item.category)}</span>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="text-xs text-muted">{item.county} · {item.category}</p>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted">
                    <p>找不到符合的行程</p>
                    <p className="text-sm mt-1">試試其他關鍵字或到扭蛋收集更多行程</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // 設定時間
            <div className="space-y-6">
              {/* Selected item preview */}
              <div className="p-4 bg-secondary rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCategoryIcon(selectedItem.category)}</span>
                  <div>
                    <p className="font-bold text-foreground">{selectedItem.title}</p>
                    <p className="text-sm text-muted">{selectedItem.county} · {selectedItem.category}</p>
                  </div>
                </div>
                {selectedItem.description && (
                  <p className="mt-3 text-sm text-muted">{selectedItem.description}</p>
                )}
              </div>

              {/* Time selection */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">開始時間</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <option key={`${hour}:00`} value={`${hour}:00`}>{hour}:00</option>
                      );
                    })}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">預計時長</label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full p-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="0.5h">30 分鐘</option>
                    <option value="1h">1 小時</option>
                    <option value="1.5h">1.5 小時</option>
                    <option value="2h">2 小時</option>
                    <option value="2.5h">2.5 小時</option>
                    <option value="3h">3 小時</option>
                    <option value="4h">4 小時</option>
                    <option value="半天">半天</option>
                    <option value="一天">一天</option>
                  </select>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedItem(null)}
                >
                  <X className="w-4 h-4 mr-2" />
                  返回選擇
                </Button>
                <Button
                  className="flex-1 bg-primary"
                  onClick={handleConfirmAdd}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  加入行程
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Itinerary;
