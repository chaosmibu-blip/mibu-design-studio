import { Progress } from "@/components/ui/progress";

interface ExperienceBarProps {
  currentXP: number;
  nextLevelXP: number | null;
  progress: number;
  size?: "sm" | "md" | "lg";
}

const ExperienceBar = ({ currentXP, nextLevelXP, progress, size = "md" }: ExperienceBarProps) => {
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
      <div className="relative">
        <Progress 
          value={progress} 
          className={`${heightClasses[size]} bg-secondary`}
        />
        {/* Animated shine effect on progress */}
        {progress > 0 && progress < 100 && (
          <div 
            className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"
            style={{ left: `${Math.max(0, progress - 10)}%` }}
          />
        )}
      </div>
      <div className={`flex justify-between ${textClasses[size]} text-muted`}>
        <span className="font-medium text-primary">{currentXP} XP</span>
        {nextLevelXP !== null ? (
          <span>還需 {nextLevelXP - currentXP} XP 升級</span>
        ) : (
          <span className="text-amber-500 font-medium">已滿級 ✨</span>
        )}
      </div>
    </div>
  );
};

export default ExperienceBar;