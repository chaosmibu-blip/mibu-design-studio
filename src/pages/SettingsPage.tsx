import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
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
  Moon
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import mibuPeek from "@/assets/mibu-peek.jpeg";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settingGroups = [
    {
      title: "帳號",
      items: [
        { 
          icon: User, 
          label: "個人資料", 
          action: () => window.location.href = "/profile",
          hasArrow: true 
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
      <div className="px-4 pt-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">設定</h1>
          <img
            src={mibuPeek}
            alt="Mibu"
            className="w-12 h-12 object-contain"
          />
        </div>

        {/* Settings groups */}
        {settingGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            <h2 className="text-sm font-medium text-muted px-1">{group.title}</h2>
            <Card className="rounded-2xl border-border overflow-hidden">
              {group.items.map((item, index) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors btn-press ${
                    index !== group.items.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="flex-1 text-left text-foreground">{item.label}</span>
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
                    <ChevronRight className="w-5 h-5 text-muted" />
                  )}
                </button>
              ))}
            </Card>
          </div>
        ))}

        {/* Danger zone */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-muted px-1">帳號管理</h2>
          <Card className="rounded-2xl border-border overflow-hidden">
            <button className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors border-b border-border btn-press">
              <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5 text-accent" />
              </div>
              <span className="flex-1 text-left text-foreground">登出</span>
            </button>
            <button className="w-full flex items-center gap-4 p-4 hover:bg-destructive/10 transition-colors btn-press">
              <div className="w-10 h-10 bg-destructive rounded-xl flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-destructive-foreground" />
              </div>
              <span className="flex-1 text-left text-destructive-foreground">刪除帳號</span>
            </button>
          </Card>
        </div>

        {/* App version */}
        <p className="text-center text-xs text-muted py-4">
          Mibu v1.0.0
        </p>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;