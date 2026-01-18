import { useState } from "react";
import { Copy, Share2, Gift, Users, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useReferral } from "@/hooks/useReferral";

interface ReferralSystemProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReferralSystem = ({ open, onOpenChange }: ReferralSystemProps) => {
  const { referralData, isLoading, copyReferralCode, shareReferralLink, applyReferralCode } = useReferral();
  const [inputCode, setInputCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [applyResult, setApplyResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showApplyInput, setShowApplyInput] = useState(false);

  const handleCopy = async () => {
    const success = await copyReferralCode();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    await shareReferralLink();
  };

  const handleApply = async () => {
    if (!inputCode.trim()) return;
    
    const result = await applyReferralCode(inputCode.trim());
    setApplyResult(result);
    
    if (result.success) {
      setInputCode("");
      setShowApplyInput(false);
      setTimeout(() => setApplyResult(null), 3000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-4 rounded-2xl shadow-elevated">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            邀請好友賺獎勵
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* My referral code */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-5 text-center space-y-3">
            <p className="text-sm text-muted">我的推薦碼</p>
            <div className="text-3xl font-bold text-primary tracking-widest">
              {referralData.myCode}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="flex-1 rounded-xl"
                size="lg"
              >
                {copied ? (
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied ? "已複製" : "複製"}
              </Button>
              <Button
                onClick={handleShare}
                className="flex-1 rounded-xl"
                size="lg"
              >
                <Share2 className="w-4 h-4 mr-2" />
                分享
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <Users className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-2xl font-bold text-foreground">{referralData.invitedCount}</div>
              <p className="text-xs text-muted">成功邀請</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <Gift className="w-5 h-5 text-accent mx-auto mb-1" />
              <div className="text-2xl font-bold text-foreground">+{referralData.totalRewards}</div>
              <p className="text-xs text-muted">累計經驗值</p>
            </div>
          </div>

          {/* Rewards info */}
          <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
            <h4 className="text-sm font-medium text-foreground">獎勵機制</h4>
            <div className="text-xs text-muted space-y-1">
              <p>• 每成功邀請 1 位好友：<span className="text-primary font-medium">+50 經驗值 + 優惠券</span></p>
              <p>• 被邀請人獎勵：<span className="text-primary font-medium">+30 經驗值 + 新手禮包</span></p>
            </div>
          </div>

          {/* Apply referral code section */}
          {!referralData.hasUsedReferral ? (
            <div className="space-y-3">
              {!showApplyInput ? (
                <Button
                  onClick={() => setShowApplyInput(true)}
                  variant="ghost"
                  className="w-full text-muted hover:text-foreground"
                >
                  我有推薦碼，輸入以獲得獎勵
                </Button>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                      placeholder="輸入推薦碼"
                      maxLength={6}
                      className="h-12 rounded-xl bg-secondary border-border text-center text-lg tracking-widest font-medium uppercase"
                    />
                    <Button
                      onClick={() => {
                        setShowApplyInput(false);
                        setInputCode("");
                        setApplyResult(null);
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-xl flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={handleApply}
                    disabled={inputCode.length !== 6 || isLoading}
                    className="w-full rounded-xl"
                    size="lg"
                  >
                    {isLoading ? "驗證中..." : "套用推薦碼"}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-sm text-muted">
              <Check className="w-4 h-4 inline mr-1 text-green-500" />
              已使用推薦碼：{referralData.usedReferralCode}
            </div>
          )}

          {/* Result message */}
          {applyResult && (
            <div className={`text-sm text-center p-3 rounded-xl animate-scale-in ${
              applyResult.success 
                ? "bg-green-500/10 text-green-600" 
                : "bg-red-500/10 text-red-500"
            }`}>
              {applyResult.message}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralSystem;