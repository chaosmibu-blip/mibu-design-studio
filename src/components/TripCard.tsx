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
  { level: 1, name: "普通", minCount: 0, maxCount: 4, color: "bg-primary", textColor: "text-primary" },
  { level: 2, name: "銅級", minCount: 5, maxCount: 14, color: "bg-amber-600", textColor: "text-amber-600" },
  { level: 3, name: "銀級", minCount: 15, maxCount: 29, color: "bg-gray-400", textColor: "text-gray-400" },
  { level: 4, name: "金級", minCount: 30, maxCount: 49, color: "bg-yellow-500", textColor: "text-yellow-500" },
  { level: 5, name: "鑽石", minCount: 50, maxCount: Infinity, color: "bg-cyan-400", textColor: "text-cyan-400" },
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
  
  // 根據等級決定邊框顏色
  const getBorderStyle = () => {
    if (!showProgress) return "border-border";
    switch (currentLevel.level) {
      case 2: return "border-amber-600/50";
      case 3: return "border-gray-400/50";
      case 4: return "border-yellow-500/50 shadow-yellow-500/20 shadow-md";
      case 5: return "border-cyan-400/50 shadow-cyan-400/30 shadow-lg";
      default: return "border-border";
    }
  };

  return (
    <div className={`bg-card rounded-2xl border overflow-hidden ${getBorderStyle()}`}>
      {/* Left border accent */}
      <div className="flex">
        <div className={`w-1 flex-shrink-0 ${showProgress ? currentLevel.color : "bg-primary/40"}`} />
        <div className="flex-1 p-4">
          {/* Header row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-primary">{date || duration}</span>
              {showProgress && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${currentLevel.color} text-white font-medium`}>
                  Lv.{currentLevel.level} {currentLevel.name}
                </span>
              )}
            </div>
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
                <span className={currentLevel.textColor}>已打卡 {checkInCount} 次</span>
                {nextLevel ? (
                  <span className="text-muted">
                    距離 Lv.{nextLevel.level} {nextLevel.name} 還需 {remaining} 次
                  </span>
                ) : (
                  <span className="text-cyan-400 font-medium">已達最高等級！</span>
                )}
              </div>
              <div className="relative">
                <Progress 
                  value={progress} 
                  className={`h-2 bg-secondary [&>div]:${currentLevel.color}`}
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
