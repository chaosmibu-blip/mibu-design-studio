import { Link, useLocation } from "react-router-dom";
import { Home, Gift, Settings } from "lucide-react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { path: "/home", label: "首頁", icon: Home },
  { path: "/gacha", label: "扭蛋", icon: Gift },
  { path: "/settings", label: "設定", icon: Settings },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-card to-card/95 border-t border-border/50 backdrop-blur-sm">
      <div className="flex items-center justify-around py-2 pb-safe max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === "/gacha" && location.pathname === "/collection");
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-6 py-2 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-primary/15 text-primary scale-105"
                  : "text-muted-foreground hover:text-primary/70 hover:bg-primary/5"
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                isActive ? "bg-primary/20" : ""
              }`}>
                <Icon className={`w-5 h-5 transition-all duration-300 ${
                  isActive ? "stroke-[2.5px]" : "stroke-[1.5px]"
                }`} />
              </div>
              <span className={`text-[10px] font-medium transition-all duration-300 ${
                isActive ? "font-semibold" : ""
              }`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
