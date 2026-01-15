interface WaveDecorationProps {
  position?: "top" | "bottom";
  color?: string;
  className?: string;
}

const WaveDecoration = ({ 
  position = "top", 
  color = "hsl(var(--primary))",
  className = "" 
}: WaveDecorationProps) => {
  const isTop = position === "top";

  return (
    <div 
      className={`absolute left-0 right-0 overflow-hidden pointer-events-none ${
        isTop ? "top-0" : "bottom-0"
      } ${className}`}
      style={{ height: "60px" }}
    >
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full ${isTop ? "" : "rotate-180"}`}
        preserveAspectRatio="none"
      >
        <path
          d="M0 0L48 5C96 10 192 20 288 25C384 30 480 30 576 27.5C672 25 768 20 864 17.5C960 15 1056 15 1152 17.5C1248 20 1344 25 1392 27.5L1440 30V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0V0Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default WaveDecoration;