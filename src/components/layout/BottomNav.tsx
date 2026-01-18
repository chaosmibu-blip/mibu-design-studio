import { Link, useLocation } from "react-router-dom";
import { Home, Dices, Plane, Settings } from "lucide-react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { path: "/home", label: "首頁", icon: Home },
  { path: "/gacha", label: "行程扭蛋", icon: Dices },
  { path: "/planner", label: "旅程策劃", icon: Plane },
  { path: "/settings", label: "設定", icon: Settings },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-card via-card to-card/95 border-t border-border/50 backdrop-blur-md pb-safe shadow-elevated">
      <div className="flex items-center justify-around py-2 max-w-md mx-auto px-safe">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === "/gacha" && location.pathname === "/collection") ||
            (item.path === "/planner" && location.pathname.startsWith("/planner"));
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-5 py-2 rounded-2xl transition-all duration-300 active:scale-95 ${
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted hover:text-primary/70 hover:bg-primary/5"
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                isActive ? "bg-primary/20 scale-110" : ""
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
