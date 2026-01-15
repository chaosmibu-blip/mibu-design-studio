import { Link, useLocation } from "react-router-dom";
import { Home, Sparkles, BookOpen, Settings } from "lucide-react";

interface NavItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const navItems: NavItem[] = [
  { path: "/home", icon: Home, label: "首頁" },
  { path: "/gacha", icon: Sparkles, label: "扭蛋" },
  { path: "/collection", icon: BookOpen, label: "圖鑑" },
  { path: "/settings", icon: Settings, label: "設定" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-card to-background border-t border-border shadow-lg">
      <div className="flex items-center justify-around py-2 pb-safe max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 btn-press ${
                isActive
                  ? "text-primary"
                  : "text-muted hover:text-primary/70"
              }`}
            >
              <Icon
                className={`w-6 h-6 transition-transform duration-200 ${
                  isActive ? "scale-110" : ""
                }`}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;