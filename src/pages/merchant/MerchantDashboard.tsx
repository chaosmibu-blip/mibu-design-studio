import { ChevronRight, BarChart3, Receipt, QrCode, Store, Package, Ticket, User, LogOut, ChevronDown, Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const MerchantDashboard = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  // Mock data
  const verificationCode = "A7X9K2";
  const codeExpiry = "1月19日 08:00";
  const pointBalance = 0;
  const storeName = "示範咖啡廳";

  const menuItems = [
    { icon: BarChart3, label: "數據分析", desc: "查看店家與優惠券統計", path: "/merchant/analytics" },
    { icon: Receipt, label: "交易記錄", desc: "查看所有交易", path: "/merchant/transactions" },
    { icon: QrCode, label: "驗證核銷碼", desc: "輸入顧客核銷碼", path: "/merchant/verify" },
    { icon: Store, label: "店家管理", desc: "管理您的店家資訊", path: "/merchant/stores" },
    { icon: Package, label: "商品管理", desc: "管理商品與服務", path: "/merchant/products" },
    { icon: Ticket, label: "優惠券管理", desc: "建立與管理優惠券", path: "/merchant/coupons" },
    { icon: User, label: "商家資料", desc: "編輯商家基本資訊", path: "/merchant/profile" },
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(verificationCode);
    setCopied(true);
    toast.success("已複製核銷碼");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-5 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">商家後台</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-xl gap-2">
              {storeName}
              <ChevronDown className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-xl"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Verification Code Card */}
        <Card className="rounded-2xl border-border shadow-soft overflow-hidden">
          <div className="bg-primary p-5">
            <p className="text-primary-foreground/80 text-sm mb-2">今日核銷碼</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold tracking-widest text-primary-foreground">
                {verificationCode}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10 rounded-xl"
                onClick={handleCopyCode}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </Button>
            </div>
            <p className="text-primary-foreground/60 text-xs mt-2">
              有效期至: {codeExpiry}
            </p>
          </div>
        </Card>

        {/* Points Balance Card */}
        <Card className="rounded-2xl border-border shadow-soft">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-secondary rounded-xl flex items-center justify-center">
                <Ticket className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">點數餘額</p>
                <p className="text-2xl font-bold text-foreground">{pointBalance} 點</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item) => (
            <Card 
              key={item.path}
              className="rounded-2xl border-border shadow-soft cursor-pointer card-hover"
              onClick={() => navigate(item.path)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
