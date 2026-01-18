import * as React from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const TabBar = React.forwardRef<HTMLDivElement, TabBarProps>(
  ({ tabs, activeTab, onTabChange, className }, ref) => {
    const activeIndex = tabs.findIndex(t => t.id === activeTab);
    const tabWidth = 100 / tabs.length;

    return (
      <div 
        ref={ref}
        className={cn("bg-background border-b border-border relative", className)}
      >
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex-1 py-4 text-sm font-medium transition-all duration-200 relative",
                "flex items-center justify-center gap-2",
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted hover:text-primary/70"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Sliding indicator */}
        <div 
          className="absolute bottom-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${tabWidth * 0.3}%`,
            left: `${activeIndex * tabWidth + tabWidth * 0.35}%`,
          }}
        />
      </div>
    );
  }
);

TabBar.displayName = "TabBar";

export { TabBar };
