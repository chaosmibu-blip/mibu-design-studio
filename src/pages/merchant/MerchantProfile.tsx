import { ArrowLeft, Camera, Mail, Phone, Building2, FileText, Shield, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const MerchantProfile = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    toast.success("資料已儲存");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-5 py-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-xl"
            onClick={() => navigate("/merchant")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">商家資料</h1>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Avatar Section */}
        <Card className="rounded-2xl border-border shadow-soft">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-medium">
                  <Camera className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">示範咖啡廳</h3>
                <p className="text-sm text-muted-foreground">已認證商家</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card className="rounded-2xl border-border shadow-soft">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-foreground">基本資訊</h3>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">商家名稱</label>
              <Input 
                defaultValue="示範咖啡廳" 
                className="rounded-xl h-12 border-border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">商家簡介</label>
              <Textarea 
                defaultValue="提供精選咖啡與手工甜點，營造舒適的用餐環境。" 
                className="rounded-xl border-border min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                電子郵件
              </label>
              <Input 
                type="email"
                defaultValue="contact@demo-cafe.com" 
                className="rounded-xl h-12 border-border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <Phone className="w-4 h-4" />
                聯絡電話
              </label>
              <Input 
                type="tel"
                defaultValue="02-2720-1234" 
                className="rounded-xl h-12 border-border"
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Documents */}
        <Card className="rounded-2xl border-border shadow-soft">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              商業文件
            </h3>
            
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="text-sm text-foreground">統一編號</p>
                <p className="text-xs text-muted-foreground">12345678</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">已驗證</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm text-foreground">營業登記證</p>
                <p className="text-xs text-muted-foreground">已上傳</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">已驗證</span>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="rounded-2xl border-border shadow-soft">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              帳戶設定
            </h3>
            
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-foreground">推播通知</p>
                  <p className="text-xs text-muted-foreground">接收核銷與訂單通知</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-foreground">電子報</p>
                  <p className="text-xs text-muted-foreground">接收每週營運報告</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button 
          className="w-full h-14 rounded-2xl btn-press"
          onClick={handleSave}
        >
          儲存變更
        </Button>

        {/* Danger Zone */}
        <Card className="rounded-2xl border-destructive/30 shadow-soft">
          <CardContent className="p-5">
            <h3 className="font-semibold text-destructive mb-2">危險區域</h3>
            <p className="text-sm text-muted-foreground mb-4">
              刪除帳戶將永久移除所有資料，此操作無法復原。
            </p>
            <Button variant="destructive" className="rounded-xl">
              刪除商家帳戶
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MerchantProfile;
