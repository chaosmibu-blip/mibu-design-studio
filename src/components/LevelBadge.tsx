import { Star } from "lucide-react";

interface LevelBadgeProps {
  level: number;
  name: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

const LevelBadge = ({ level, name, size = "md", showName = true }: LevelBadgeProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const getBadgeColors = (level: number) => {
    if (level >= 8) return "from-amber-400 via-yellow-300 to-amber-500 text-amber-900";
    if (level >= 6) return "from-purple-400 via-purple-500 to-purple-600 text-white";
    if (level >= 4) return "from-blue-400 via-blue-500 to-blue-600 text-white";
    if (level >= 2) return "from-green-400 via-green-500 to-green-600 text-white";
    return "from-gray-300 via-gray-400 to-gray-500 text-white";
  };

  return (
    <div className="flex items-center gap-2">
      <div 
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${getBadgeColors(level)} flex items-center justify-center font-bold shadow-medium relative overflow-hidden`}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent" />
        <span className="relative z-10">Lv.{level}</span>
      </div>
      {showName && (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{name}</span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: Math.min(level, 5) }).map((_, i) => (
              <Star 
                key={i} 
                className={`${iconSizes[size]} fill-amber-400 text-amber-400`} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelBadge;