interface TripCardProps {
  duration: string;
  category: string;
  title: string;
  description?: string;
  date?: string;
  onMapClick?: () => void;
}

const TripCard = ({ duration, category, title, description, date, onMapClick }: TripCardProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Left border accent */}
      <div className="flex">
        <div className="w-1 bg-primary/40 flex-shrink-0" />
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
