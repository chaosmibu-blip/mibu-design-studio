import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const SelectButton = React.forwardRef<HTMLButtonElement, SelectButtonProps>(
  ({ selected, onClick, children, icon, className }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          "relative px-4 py-3 rounded-xl font-medium transition-all duration-200",
          "active:scale-[0.97] active:brightness-[0.97]",
          selected
            ? "bg-primary text-primary-foreground shadow-medium"
            : "bg-card border border-border text-foreground hover:bg-secondary hover:border-primary/30",
          className
        )}
      >
        <span className="flex items-center gap-2">
          {icon}
          {children}
          {selected && (
            <Check className="w-4 h-4 ml-1 animate-scale-in" />
          )}
        </span>
      </button>
    );
  }
);

SelectButton.displayName = "SelectButton";

export { SelectButton };
