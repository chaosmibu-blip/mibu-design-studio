import { Progress } from "@/components/ui/progress";

interface TripCardProps {
  duration: string;
  category: string;
  title: string;
  description?: string;
  date?: string;
  onMapClick?: () => void;
  // 圖鑑等級系統
  checkInCount?: number;
  showProgress?: boolean;
}

// 等級配置
const levelConfig = [
  { level: 1, name: "普通", minCount: 0, maxCount: 4 },
  { level: 2, name: "銅級", minCount: 5, maxCount: 14 },
  { level: 3, name: "銀級", minCount: 15, maxCount: 29 },
  { level: 4, name: "金級", minCount: 30, maxCount: 49 },
  { level: 5, name: "鑽石", minCount: 50, maxCount: Infinity },
];

const getLevelInfo = (count: number) => {
  const currentLevel = levelConfig.find(l => count >= l.minCount && count <= l.maxCount) || levelConfig[0];
  const nextLevel = levelConfig.find(l => l.level === currentLevel.level + 1);
  
  let progress = 100;
  let remaining = 0;
  
  if (nextLevel) {
    const levelProgress = count - currentLevel.minCount;
    const levelRange = nextLevel.minCount - currentLevel.minCount;
    progress = Math.min((levelProgress / levelRange) * 100, 100);
    remaining = nextLevel.minCount - count;
  }
  
  return { currentLevel, nextLevel, progress, remaining };
};

const TripCard = ({ 
  duration, 
  category, 
  title, 
  description, 
  date, 
  onMapClick,
  checkInCount = 0,
  showProgress = false
}: TripCardProps) => {
  const { currentLevel, nextLevel, progress, remaining } = getLevelInfo(checkInCount);
  
  // 根據等級決定邊框樣式 - 純用視覺呈現
  const getBorderStyle = () => {
    if (!showProgress) return "border-border";
    switch (currentLevel.level) {
      case 1: return "border-border";
      case 2: return "border-2 border-amber-600/60";
      case 3: return "border-2 border-gray-400/70 ring-1 ring-gray-400/30";
      case 4: return "border-2 border-yellow-500/80 shadow-lg shadow-yellow-500/30";
      case 5: return "border-2 border-cyan-400/80 shadow-xl shadow-cyan-400/40 ring-2 ring-cyan-400/20";
      default: return "border-border";
    }
  };

  // 根據等級決定左側條紋顏色
  const getAccentColor = () => {
    if (!showProgress) return "bg-primary/40";
    switch (currentLevel.level) {
      case 1: return "bg-primary/40";
      case 2: return "bg-amber-600";
      case 3: return "bg-gray-400";
      case 4: return "bg-yellow-500";
      case 5: return "bg-gradient-to-b from-cyan-400 to-blue-500";
      default: return "bg-primary/40";
    }
  };

  // 進度條顏色
  const getProgressColor = () => {
    switch (currentLevel.level) {
      case 1: return "bg-primary";
      case 2: return "bg-amber-600";
      case 3: return "bg-gray-400";
      case 4: return "bg-yellow-500";
      case 5: return "bg-cyan-400";
      default: return "bg-primary";
    }
  };

  return (
    <div className={`bg-card rounded-2xl overflow-hidden transition-all ${getBorderStyle()}`}>
      {/* Left border accent */}
      <div className="flex">
        <div className={`w-1.5 flex-shrink-0 ${getAccentColor()}`} />
        <div className="flex-1 p-4">
          {/* Header row */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-primary">{date || duration}</span>
            <span className="text-xs px-3 py-1 border border-border rounded-full text-muted">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>

          {/* Description */}
          {description && (
            <p className="text-sm text-muted leading-relaxed mb-4">
              {description}
            </p>
          )}

          {/* Level progress bar */}
          {showProgress && (
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">已打卡 {checkInCount} 次</span>
                {nextLevel ? (
                  <span className="text-muted">
                    升級還需 {remaining} 次
                  </span>
                ) : (
                  <span className="text-cyan-500 font-medium">✨ 最高等級</span>
                )}
              </div>
              <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Map button */}
          {onMapClick && (
            <button
              onClick={onMapClick}
              className="w-full py-3 bg-background rounded-xl text-sm text-primary flex items-center justify-center gap-2 border border-border/50"
            >
              <span>📍</span>
              在 Google 地圖中查看
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripCard;
