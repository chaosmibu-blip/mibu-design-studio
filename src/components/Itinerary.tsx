import { useState } from "react";
import { Calendar, Clock, MapPin, Plus, ChevronLeft, ChevronRight, Trash2, Edit2, Search, X, Utensils, Hotel, Target } from "lucide-react";
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
import Icon from "@/components/ui/icon";

const getCategoryIconName = (category: string) => {
  switch (category) {
    case "美食": return "Utensils";
    case "住宿": return "Hotel";
    case "遊程體驗": return "Target";
    default: return "MapPin";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "美食": return "bg-amber-500/20 text-amber-600 border-amber-500/30";
    case "住宿": return "bg-blue-500/20 text-blue-600 border-blue-500/30";
    case "遊程體驗": return "bg-green-500/20 text-green-600 border-green-500/30";
    default: return "bg-gray-500/20 text-gray-600 border-gray-500/30";
  }
};

const ITINERARY_STORAGE_KEY = "mibu_itinerary";

const Itinerary = () => {
  const { generateScheduleDates, days } = usePurchase();
  const { items: collectionItems } = useCollection();
  
  const [schedules, setSchedules] = useState<DaySchedule[]>(() => {
    const stored = localStorage.getItem(ITINERARY_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((s: { date: string; items: ItineraryItem[] }) => ({
          ...s, date: new Date(s.date),
        }));
      } catch { /* generate new */ }
    }
    const dates = generateScheduleDates();
    return dates.map(date => ({ date, items: [] }));
  });

  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<{ title: string; category: string; county: string; description?: string } | null>(null);
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [selectedDuration, setSelectedDuration] = useState("2h");

  const ensureScheduleDays = () => {
    const dates = generateScheduleDates();
    if (dates.length === 0) return schedules;
    if (schedules.length !== dates.length) {
      return dates.map((date, index) => index < schedules.length ? { ...schedules[index], date } : { date, items: [] });
    }
    return schedules;
  };

  const currentSchedules = ensureScheduleDays();
  const currentSchedule = currentSchedules[currentDayIndex] || { date: new Date(), items: [] };

  const saveSchedules = (newSchedules: DaySchedule[]) => {
    setSchedules(newSchedules);
    localStorage.setItem(ITINERARY_STORAGE_KEY, JSON.stringify(newSchedules));
  };

  const selectableItems = collectionItems.map(item => ({
    title: item.title, category: item.category, county: item.county, description: item.description,
  }));

  const filteredItems = selectableItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.county.includes(searchQuery) || item.category.includes(searchQuery)
  );

  const formatDate = (date: Date) => date.toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'short' });

  const handleConfirmAdd = () => {
    if (!selectedItem) return;
    const newItem: ItineraryItem = {
      id: Date.now().toString(), title: selectedItem.title, category: selectedItem.category,
      startTime: selectedTime, duration: selectedDuration,
    };
    const newSchedules = currentSchedules.map((schedule, index) => 
      index === currentDayIndex 
        ? { ...schedule, items: [...schedule.items, newItem].sort((a, b) => a.startTime.localeCompare(b.startTime)) }
        : schedule
    );
    saveSchedules(newSchedules);
    setSheetOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = (itemId: string) => {
    const newSchedules = currentSchedules.map((schedule, index) => 
      index === currentDayIndex ? { ...schedule, items: schedule.items.filter(item => item.id !== itemId) } : schedule
    );
    saveSchedules(newSchedules);
  };

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
    <div className="section-spacing animate-fade-in">
      {/* Day selector */}
      <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
        <div className="flex items-center justify-between">
          <Button size="icon" variant="ghost" onClick={() => currentDayIndex > 0 && setCurrentDayIndex(currentDayIndex - 1)} disabled={currentDayIndex === 0} className="rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center mb-1">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-bold text-foreground">Day {currentDayIndex + 1} / {days}</span>
            </div>
            <p className="text-sm text-muted">{formatDate(currentSchedule.date)}</p>
          </div>
          <Button size="icon" variant="ghost" onClick={() => currentDayIndex < currentSchedules.length - 1 && setCurrentDayIndex(currentDayIndex + 1)} disabled={currentDayIndex === currentSchedules.length - 1} className="rounded-full">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          {currentSchedules.map((_, index) => (
            <button key={index} onClick={() => setCurrentDayIndex(index)}
              className={`w-9 h-9 rounded-full text-sm font-medium transition-all duration-200 ${
                index === currentDayIndex ? 'bg-primary text-primary-foreground shadow-medium scale-110' : 'bg-secondary text-muted hover:bg-secondary/80'
              }`}
            >{index + 1}</button>
          ))}
        </div>
      </div>

      {currentSchedule.items.length === 0 && (
        <div className="text-center py-8">
          <div className="text-3xl mb-3">📝</div>
          <p className="text-muted">這天還沒有行程</p>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-0">
        {currentSchedule.items.map((item, index) => (
          <div key={item.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-primary shadow-soft" />
              {index < currentSchedule.items.length - 1 && <div className="w-0.5 flex-1 bg-border my-1" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="bg-card rounded-2xl p-4 border border-border shadow-soft hover:shadow-medium transition-all duration-200">
                <div className="flex items-center gap-2 text-sm text-muted mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{item.startTime}</span>
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{item.duration}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name={getCategoryIconName(item.category)} className="w-5 h-5 text-primary" />
                      <h3 className="font-medium text-foreground">{item.title}</h3>
                    </div>
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full border ${getCategoryColor(item.category)}`}>{item.category}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8"><Edit2 className="w-4 h-4 text-muted" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleDeleteItem(item.id)}><Trash2 className="w-4 h-4 text-muted" /></Button>
                  </div>
                </div>
                <button className="mt-3 flex items-center gap-1 text-xs text-primary hover:underline"
                  onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(item.title)}`, "_blank")}
                ><MapPin className="w-3 h-3" />在地圖中查看</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full h-12 rounded-2xl border-dashed border-2" onClick={() => { setSheetOpen(true); setSelectedItem(null); setSearchQuery(""); }}>
        <Plus className="w-4 h-4 mr-2" />從圖鑑新增行程
      </Button>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-4" />
          <SheetHeader className="pb-4"><SheetTitle className="text-left">從圖鑑新增行程</SheetTitle></SheetHeader>
          {!selectedItem ? (
            <div className="flex flex-col h-full">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="搜尋行程..."
                  className="w-full pl-10 pr-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 pb-4">
                {filteredItems.length > 0 ? filteredItems.map((item, index) => (
                  <button key={index} onClick={() => setSelectedItem(item)}
                    className="w-full p-4 bg-card rounded-xl border border-border text-left hover:bg-secondary/50 transition-colors active:scale-[0.98] shadow-soft">
                    <div className="flex items-center gap-3">
                      <Icon name={getCategoryIconName(item.category)} className="w-6 h-6 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-xs text-muted">{item.county} · {item.category}</p>
                      </div>
                    </div>
                  </button>
                )) : <div className="text-center py-8 text-muted"><p>找不到符合的行程</p></div>}
              </div>
            </div>
          ) : (
            <div className="section-spacing">
              <div className="p-4 bg-secondary rounded-xl">
                <div className="flex items-center gap-3">
                  <Icon name={getCategoryIconName(selectedItem.category)} className="w-7 h-7 text-primary" />
                  <div><p className="font-bold text-foreground">{selectedItem.title}</p><p className="text-sm text-muted">{selectedItem.county}</p></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">開始時間</label>
                  <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary">
                    {Array.from({ length: 24 }, (_, i) => <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>{i.toString().padStart(2, '0')}:00</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">預計時長</label>
                  <select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full p-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary">
                    {["0.5h", "1h", "1.5h", "2h", "2.5h", "3h", "4h", "半天", "一天"].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setSelectedItem(null)}><X className="w-4 h-4 mr-2" />返回</Button>
                <Button className="flex-1" onClick={handleConfirmAdd}><Plus className="w-4 h-4 mr-2" />加入行程</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Itinerary;
