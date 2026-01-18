import { ChevronRight, BarChart3, Store, Package, Ticket, User, LogOut, ChevronDown, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MerchantDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data
  const storeName = "示範咖啡廳";

  const menuItems = [
    { icon: BarChart3, label: "數據分析", desc: "查看店家與優惠券統計", path: "/merchant/analytics" },
    { icon: Store, label: "店家管理", desc: "管理您的店家資訊", path: "/merchant/stores" },
    { icon: Package, label: "商品管理", desc: "管理商品與服務", path: "/merchant/products" },
    { icon: Ticket, label: "優惠券管理", desc: "建立與管理優惠券", path: "/merchant/coupons" },
    { icon: User, label: "商家資料", desc: "編輯商家基本資訊", path: "/merchant/profile" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  const handleAddStore = () => {
    // TODO: 新增店家流程
    navigate("/merchant/stores");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-5 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">商家後台</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl gap-2">
              {storeName}
              <ChevronDown className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-xl h-9 w-9"
              onClick={handleAddStore}
            >
              <Plus className="w-4 h-4" />
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
