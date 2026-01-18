import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { 
  User, 
  Globe, 
  Bell, 
  Shield, 
  FileText, 
  HelpCircle, 
  LogOut, 
  Trash2, 
  ChevronRight,
  Moon,
  Map,
  Trophy,
  Gift
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import mibuPeek from "@/assets/mibu-peek.jpeg";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settingGroups = [
    {
      title: "帳號",
      items: [
        { 
          icon: User, 
          label: "個人資料", 
          action: () => navigate("/profile"),
          hasArrow: true 
        },
        { 
          icon: Gift, 
          label: "邀請好友賺獎勵", 
          action: () => navigate("/referral"),
          hasArrow: true,
          highlight: true
        },
        { 
          icon: Globe, 
          label: "語言設定", 
          value: "繁體中文",
          hasArrow: true 
        },
      ],
    },
    {
      title: "探索",
      items: [
        { 
          icon: Map, 
          label: "全球地圖", 
          action: () => navigate("/map"),
          hasArrow: true,
          badge: "1 已解鎖"
        },
        { 
          icon: Trophy, 
          label: "成就系統", 
          action: () => navigate("/achievements"),
          hasArrow: true,
          badge: "2/10"
        },
      ],
    },
    {
      title: "偏好設定",
      items: [
        { 
          icon: Bell, 
          label: "推播通知", 
          toggle: true,
          checked: notifications,
          onChange: setNotifications
        },
        { 
          icon: Moon, 
          label: "深色模式", 
          toggle: true,
          checked: darkMode,
          onChange: setDarkMode
        },
      ],
    },
    {
      title: "關於",
      items: [
        { icon: Shield, label: "隱私政策", hasArrow: true },
        { icon: FileText, label: "服務條款", hasArrow: true },
        { icon: HelpCircle, label: "幫助中心", hasArrow: true },
      ],
    },
  ];

  return (
    <PageLayout>
      <div className="page-padding pt-6 section-spacing pb-8">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">設定</h1>
          <img
            src={mibuPeek}
            alt="Mibu"
            className="w-14 h-14 object-contain"
          />
        </div>

        {/* Settings groups */}
        {settingGroups.map((group, groupIndex) => (
          <div 
            key={group.title} 
            className="space-y-2 animate-slide-up" 
            style={{ animationDelay: `${groupIndex * 0.1}s` }}
          >
            <h2 className="text-sm font-medium text-muted px-1">{group.title}</h2>
            <Card className="rounded-2xl border-border overflow-hidden shadow-soft">
              {group.items.map((item, index) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-all duration-200 btn-press ${
                    index !== group.items.length - 1 ? "border-b border-border" : ""
                  } ${item.highlight ? "bg-primary/5" : ""}`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-soft ${
                    item.highlight ? "bg-primary/20" : "bg-secondary"
                  }`}>
                    <item.icon className={`w-5 h-5 ${item.highlight ? "text-primary" : "text-primary"}`} />
                  </div>
                  <span className={`flex-1 text-left font-medium ${
                    item.highlight ? "text-primary" : "text-foreground"
                  }`}>{item.label}</span>
                  {item.badge && (
                    <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                  {item.value && (
                    <span className="text-sm text-muted">{item.value}</span>
                  )}
                  {item.toggle && (
                    <Switch
                      checked={item.checked}
                      onCheckedChange={item.onChange}
                      className="data-[state=checked]:bg-primary"
                    />
                  )}
                  {item.hasArrow && (
                    <ChevronRight className="w-5 h-5 text-muted transition-transform duration-200 group-hover:translate-x-0.5" />
                  )}
                </button>
              ))}
            </Card>
          </div>
        ))}

        {/* Danger zone */}
        <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-sm font-medium text-muted px-1">帳號管理</h2>
          <Card className="rounded-2xl border-border overflow-hidden shadow-soft">
            <button className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-all duration-200 border-b border-border btn-press">
              <div className="w-11 h-11 bg-accent/20 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5 text-accent" />
              </div>
              <span className="flex-1 text-left text-foreground font-medium">登出</span>
            </button>
            <button className="w-full flex items-center gap-4 p-4 hover:bg-destructive/20 transition-all duration-200 btn-press">
              <div className="w-11 h-11 bg-destructive rounded-xl flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-destructive-foreground" />
              </div>
              <span className="flex-1 text-left text-destructive-foreground font-medium">刪除帳號</span>
            </button>
          </Card>
        </div>

        {/* App version */}
        <p className="text-center text-xs text-muted py-4 animate-fade-in">
          Mibu v1.0.0
        </p>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
