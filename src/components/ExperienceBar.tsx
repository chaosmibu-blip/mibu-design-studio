import { Progress } from "@/components/ui/progress";

interface ExperienceBarProps {
  current: number;
  max: number;
  level: number;
  size?: "sm" | "md" | "lg";
}

const ExperienceBar = ({ current, max, level, size = "md" }: ExperienceBarProps) => {
  const progress = max > 0 ? Math.min(100, (current / max) * 100) : 100;
  const isMaxLevel = level >= 99;

  const heightClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-3.5",
  };

  const textClasses = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  };

  return (
    <div className="space-y-1">
      <div className="relative overflow-hidden rounded-full">
        <Progress 
          value={progress} 
          className={`${heightClasses[size]} bg-secondary`}
        />
        {/* Animated shine effect on progress */}
        {progress > 0 && progress < 100 && (
          <div 
            className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
            style={{ left: `${Math.max(0, progress - 10)}%` }}
          />
        )}
      </div>
      <div className={`flex justify-between ${textClasses[size]} text-muted`}>
        <span className="font-medium text-primary">{current} / {max} XP</span>
        {isMaxLevel ? (
          <span className="text-amber-500 font-medium">已滿級 ✨</span>
        ) : (
          <span>Lv.{level} → Lv.{level + 1}</span>
        )}
      </div>
    </div>
  );
};

export default ExperienceBar;
