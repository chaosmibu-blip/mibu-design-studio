import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const MerchantVerifyCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [verificationResult, setVerificationResult] = useState<"success" | "error" | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (code.length < 6) {
      toast.error("請輸入完整的核銷碼");
      return;
    }

    setIsVerifying(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock verification - codes starting with "A" are valid
    if (code.toUpperCase().startsWith("A")) {
      setVerificationResult("success");
      toast.success("核銷成功！");
    } else {
      setVerificationResult("error");
      toast.error("核銷碼無效");
    }
    
    setIsVerifying(false);
  };

  const handleReset = () => {
    setCode("");
    setVerificationResult(null);
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
          <h1 className="text-xl font-bold text-foreground">驗證核銷碼</h1>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Instructions */}
        <Card className="rounded-2xl border-border shadow-soft">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground text-center">
              請輸入顧客出示的核銷碼進行驗證
            </p>
          </CardContent>
        </Card>

        {/* Code Input */}
        <Card className="rounded-2xl border-border shadow-soft">
          <CardContent className="p-5 space-y-4">
            <Input
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setVerificationResult(null);
              }}
              placeholder="輸入核銷碼"
              className="text-center text-2xl tracking-widest h-16 rounded-2xl border-border font-mono"
              maxLength={10}
            />

            {verificationResult === null ? (
              <Button 
                className="w-full h-14 rounded-2xl btn-press"
                onClick={handleVerify}
                disabled={isVerifying || code.length < 6}
              >
                {isVerifying ? "驗證中..." : "確認核銷"}
              </Button>
            ) : (
              <Button 
                variant="outline"
                className="w-full h-14 rounded-2xl"
                onClick={handleReset}
              >
                驗證其他核銷碼
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Result */}
        {verificationResult && (
          <Card className={`rounded-2xl border-2 shadow-soft ${
            verificationResult === "success" 
              ? "border-primary bg-primary/5" 
              : "border-destructive bg-destructive/5"
          }`}>
            <CardContent className="p-6 text-center">
              {verificationResult === "success" ? (
                <>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">核銷成功</h3>
                  <p className="text-sm text-muted-foreground">優惠券已成功核銷</p>
                  <div className="mt-4 p-4 bg-secondary rounded-xl">
                    <p className="text-sm text-muted-foreground">優惠券名稱</p>
                    <p className="font-semibold text-foreground">咖啡買一送一</p>
                    <p className="text-sm text-muted-foreground mt-2">顧客</p>
                    <p className="font-semibold text-foreground">王小明</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-8 h-8 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold text-destructive mb-2">核銷失敗</h3>
                  <p className="text-sm text-muted-foreground">核銷碼無效或已使用</p>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Recent Verifications */}
        <Card className="rounded-2xl border-border shadow-soft">
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground mb-4">近期核銷</h3>
            <div className="space-y-3">
              {[
                { code: "A7X9K2", coupon: "咖啡買一送一", time: "10分鐘前" },
                { code: "B3M8N1", coupon: "甜點9折券", time: "1小時前" },
                { code: "C5P2Q7", coupon: "飲品第二杯半價", time: "2小時前" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-mono text-sm text-foreground">{item.code}</p>
                    <p className="text-xs text-muted-foreground">{item.coupon}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MerchantVerifyCode;
