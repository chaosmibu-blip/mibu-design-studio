import { Link, useLocation } from "react-router-dom";

interface NavItem {
  path: string;
  label: string;
  activeIcon: string;
  inactiveIcon: string;
}

const navItems: NavItem[] = [
  { path: "/home", label: "首頁", activeIcon: "🏠", inactiveIcon: "🏠" },
  { path: "/gacha", label: "扭蛋", activeIcon: "🎁", inactiveIcon: "🎁" },
  { path: "/settings", label: "設定", activeIcon: "⚙️", inactiveIcon: "⚙️" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around py-3 pb-safe max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === "/gacha" && location.pathname === "/collection");

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-6 py-1 transition-all duration-200 ${
                isActive
                  ? "text-primary"
                  : "text-muted hover:text-primary/70"
              }`}
            >
              <span className="text-2xl">{isActive ? item.activeIcon : item.inactiveIcon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
