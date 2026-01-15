import { useState } from "react";
import { Calendar, Clock, MapPin, Plus, ChevronLeft, ChevronRight, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ItineraryItem {
  id: string;
  title: string;
  category: string;
  startTime: string;
  duration: string;
  notes?: string;
}

interface DaySchedule {
  date: Date;
  items: ItineraryItem[];
}

// Mock data
const mockSchedules: DaySchedule[] = [
  {
    date: new Date(2024, 2, 15),
    items: [
      { id: "1", title: "九份老街", category: "遊程體驗", startTime: "09:00", duration: "3h", notes: "記得帶傘" },
      { id: "2", title: "阿妹茶樓", category: "美食", startTime: "12:00", duration: "1.5h" },
      { id: "3", title: "十分瀑布", category: "遊程體驗", startTime: "14:30", duration: "2h" },
      { id: "4", title: "十分老街放天燈", category: "遊程體驗", startTime: "17:00", duration: "1.5h", notes: "寫下願望" },
    ],
  },
  {
    date: new Date(2024, 2, 16),
    items: [
      { id: "5", title: "野柳地質公園", category: "遊程體驗", startTime: "09:30", duration: "2h" },
      { id: "6", title: "金山老街", category: "美食", startTime: "12:00", duration: "2h", notes: "必吃鴨肉" },
      { id: "7", title: "朱銘美術館", category: "遊程體驗", startTime: "15:00", duration: "2.5h" },
    ],
  },
  {
    date: new Date(2024, 2, 17),
    items: [
      { id: "8", title: "淡水老街", category: "遊程體驗", startTime: "10:00", duration: "3h" },
      { id: "9", title: "漁人碼頭夕陽", category: "遊程體驗", startTime: "17:00", duration: "1.5h" },
    ],
  },
];

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

const Itinerary = () => {
  const [schedules] = useState<DaySchedule[]>(mockSchedules);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const currentSchedule = schedules[currentDayIndex];

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
    if (currentDayIndex < schedules.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

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
                Day {currentDayIndex + 1}
              </span>
            </div>
            <p className="text-sm text-muted">{formatDate(currentSchedule.date)}</p>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={goToNextDay}
            disabled={currentDayIndex === schedules.length - 1}
            className="rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Day pills */}
        <div className="flex justify-center gap-2 mt-4">
          {schedules.map((_, index) => (
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
                    <Button size="icon" variant="ghost" className="h-8 w-8">
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
      >
        <Plus className="w-4 h-4 mr-2" />
        新增行程
      </Button>
    </div>
  );
};

export default Itinerary;
