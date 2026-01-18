import { getTierForLevel, LevelTier } from "@/hooks/useGameProgress";

interface LevelBadgeProps {
  level: number;
  size?: "sm" | "md" | "lg" | "xl";
  showName?: boolean;
}

const LevelBadge = ({ level, size = "md", showName = true }: LevelBadgeProps) => {
  const tier = getTierForLevel(level);

  const sizeClasses = {
    sm: "w-10 h-10 text-xs",
    md: "w-14 h-14 text-sm",
    lg: "w-20 h-20 text-lg",
    xl: "w-24 h-24 text-xl",
  };

  const nameSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };


  // 品牌色漸層設計 - 根據階段使用不同顏色
  const getBrandGradient = (tier: LevelTier) => {
    // 使用品牌色為基調，階段越高顏色越豐富
    if (tier.tier <= 2) {
      return "bg-gradient-to-br from-primary/80 to-primary";
    }
    if (tier.tier <= 4) {
      return "bg-gradient-to-br from-primary to-accent";
    }
    if (tier.tier <= 6) {
      return "bg-gradient-to-br from-accent via-primary to-accent";
    }
    if (tier.tier <= 8) {
      return `bg-gradient-to-br ${tier.colorClass}`;
    }
    // 最高階段使用彩虹漸層
    return `bg-gradient-to-br ${tier.colorClass}`;
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {/* 貓耳裝飾 */}
        <div className="absolute -top-1 left-1 w-3 h-3 rounded-tl-full rounded-tr-sm bg-primary/60 rotate-[-20deg]" />
        <div className="absolute -top-1 right-1 w-3 h-3 rounded-tr-full rounded-tl-sm bg-primary/60 rotate-[20deg]" />
        
        {/* 主徽章 */}
        <div 
          className={`${sizeClasses[size]} rounded-full ${getBrandGradient(tier)} flex items-center justify-center font-bold text-primary-foreground shadow-medium relative overflow-hidden`}
        >
          {/* 光澤效果 */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
          
          {/* 等級數字 */}
          <span className="relative z-10 font-bold leading-none">
            Lv.{level}
          </span>
        </div>
      </div>
      
      {showName && (
        <div className="flex flex-col">
          <span className={`font-semibold text-foreground ${nameSizeClasses[size]}`}>
            {tier.name}
          </span>
          <span className="text-xs text-muted">
            第 {tier.tier} 階段
          </span>
        </div>
      )}
    </div>
  );
};

export default LevelBadge;
