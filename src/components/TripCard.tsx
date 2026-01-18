import { useState } from "react";
import { MapPin, Plus, X, Heart, Ban } from "lucide-react";

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
  // 我的最愛與黑名單
  id?: string;
  isFavorite?: boolean;
  isBlacklisted?: boolean;
  onToggleFavorite?: (id: string) => void;
  onToggleBlacklist?: (id: string) => void;
  showActions?: boolean;
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
  showProgress = false,
  id,
  isFavorite = false,
  isBlacklisted = false,
  onToggleFavorite,
  onToggleBlacklist,
  showActions = false
}: TripCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { currentLevel, nextLevel, progress, remaining } = getLevelInfo(checkInCount);
  
  // 根據等級決定邊框樣式 - 純用視覺呈現
  const getBorderStyle = () => {
    if (!showProgress) return "border-border shadow-soft";
    switch (currentLevel.level) {
      case 1: return "border-border shadow-soft";
      case 2: return "border-2 border-amber-600/60 shadow-soft";
      case 3: return "border-2 border-gray-400/70 ring-1 ring-gray-400/30 shadow-medium";
      case 4: return "border-2 border-yellow-500/80 shadow-lg shadow-yellow-500/20";
      case 5: return "border-2 border-cyan-400/80 shadow-xl shadow-cyan-400/30 ring-2 ring-cyan-400/20";
      default: return "border-border shadow-soft";
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

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id && onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  const handleToggleBlacklist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id && onToggleBlacklist) {
      onToggleBlacklist(id);
    }
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      {/* 展開式按鈕區域 */}
      {showActions && (
        <div className="absolute top-3 right-3 z-10">
          {/* 愛心按鈕 - 往上彈出 (在卡片外側) */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute -top-11 right-0 w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-all duration-200 ${
              isExpanded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-2 pointer-events-none'
            } ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-card border border-border text-muted hover:text-red-500 hover:border-red-300'
            }`}
          >
            <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
          </button>
          
          {/* 黑名單按鈕 - 往右彈出 (在卡片外側) */}
          <button
            onClick={handleToggleBlacklist}
            className={`absolute top-0 -right-11 w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-all duration-200 ${
              isExpanded 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-2 pointer-events-none'
            } ${
              isBlacklisted 
                ? 'bg-foreground text-background' 
                : 'bg-card border border-border text-muted hover:text-foreground hover:border-foreground/30'
            }`}
          >
            <Ban className="w-4 h-4" />
          </button>
          
          {/* +/× 主按鈕 */}
          <button
            onClick={handleToggleExpand}
            className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all duration-200 ${
              isExpanded 
                ? 'bg-muted text-muted-foreground rotate-0' 
                : 'bg-card border border-border text-muted hover:text-foreground'
            }`}
          >
            {isExpanded ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* 原有的卡片內容 */}
      <div className={`bg-card rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99] ${getBorderStyle()}`}>
        {/* Left border accent */}
        <div className="flex">
          <div className={`w-1.5 flex-shrink-0 ${getAccentColor()}`} />
          <div className="flex-1 p-5">
            {/* Header row */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-primary font-medium">{date || duration}</span>
              <span className={`text-xs px-3 py-1.5 border border-border rounded-full text-muted bg-secondary/50 ${showActions ? 'mr-10' : ''}`}>
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
                <div className="relative h-2.5 bg-secondary rounded-full overflow-hidden">
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
                className="w-full py-3 bg-background rounded-xl text-sm text-primary flex items-center justify-center gap-2 border border-border/50 transition-all duration-200 hover:bg-secondary hover:border-primary/30 active:scale-[0.98]"
              >
                <MapPin className="w-4 h-4" />
                在 Google 地圖中查看
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
