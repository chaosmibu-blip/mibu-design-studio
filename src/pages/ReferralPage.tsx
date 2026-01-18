import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Copy, Share2, Check, Gift, Users, Sparkles, Trophy } from "lucide-react";
import { useReferral } from "@/hooks/useReferral";

const ReferralPage = () => {
  const navigate = useNavigate();
  const { referralData, copyReferralCode, shareReferralLink, applyReferralCode } = useReferral();
  const [inputCode, setInputCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [applyResult, setApplyResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleCopy = async () => {
    const success = await copyReferralCode();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleApplyCode = async () => {
    if (!inputCode.trim()) return;
    const result = await applyReferralCode(inputCode.trim());
    setApplyResult(result);
    if (result.success) {
      setInputCode("");
    }
  };

  // Mock 排行榜數據
  const leaderboard = [
    { rank: 1, name: "旅行達人小明", count: 28, avatar: "😎" },
    { rank: 2, name: "冒險家阿華", count: 22, avatar: "🤠" },
    { rank: 3, name: "探索者小美", count: 18, avatar: "🥳" },
    { rank: 4, name: "玩家小王", count: 15, avatar: "😊" },
    { rank: 5, name: "新手旅人", count: 12, avatar: "🙂" },
  ];

  return (
    <PageLayout showNav={false}>
      <div className="page-padding pt-6 section-spacing pb-8">
        {/* Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center shadow-soft btn-press"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">邀請好友</h1>
        </div>

        {/* 推薦碼卡片 */}
        <Card className="rounded-2xl border-border shadow-medium bg-gradient-to-br from-primary/10 via-card to-accent/10 overflow-hidden animate-slide-up">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-medium">
                <Gift className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-foreground">我的推薦碼</h2>
                <p className="text-sm text-muted mt-1">分享給好友，一起賺獎勵</p>
              </div>
              
              {/* 推薦碼 */}
              <div className="bg-card rounded-xl p-4 border-2 border-dashed border-primary/30">
                <span className="text-3xl font-bold tracking-[0.3em] text-primary">
                  {referralData.myCode}
                </span>
              </div>
              
              {/* 操作按鈕 */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12 rounded-xl gap-2"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      已複製
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      複製
                    </>
                  )}
                </Button>
                <Button
                  className="flex-1 h-12 rounded-xl gap-2"
                  onClick={shareReferralLink}
                >
                  <Share2 className="w-4 h-4" />
                  分享
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 統計數據 */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <Card className="rounded-xl border-border shadow-soft">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">{referralData.invitedCount}</p>
              <p className="text-xs text-muted">成功邀請</p>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-border shadow-soft">
            <CardContent className="p-4 text-center">
              <Sparkles className="w-6 h-6 mx-auto text-accent mb-2" />
              <p className="text-2xl font-bold text-foreground">{referralData.totalRewards}</p>
              <p className="text-xs text-muted">累計獲得 XP</p>
            </CardContent>
          </Card>
        </div>

        {/* 獎勵說明 */}
        <Card className="rounded-2xl border-border shadow-soft animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              獎勵機制
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  👤
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">推薦人獎勵</p>
                  <p className="text-xs text-muted">每成功邀請一位好友</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary">+50 XP</p>
                  <p className="text-xs text-accent">+1 優惠券</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  🎁
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">被推薦人獎勵</p>
                  <p className="text-xs text-muted">使用推薦碼註冊</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary">+30 XP</p>
                  <p className="text-xs text-accent">+新手禮包</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 輸入推薦碼 */}
        {!referralData.hasUsedReferral ? (
          <Card className="rounded-2xl border-border shadow-soft animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-5 space-y-3">
              <h3 className="font-semibold text-foreground">輸入推薦碼</h3>
              <p className="text-sm text-muted">
                有好友推薦你嗎？輸入他的推薦碼獲得獎勵！
              </p>
              <div className="flex gap-2">
                <Input
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  placeholder="請輸入 6 位推薦碼"
                  maxLength={6}
                  className="h-12 rounded-xl bg-secondary border-border text-center text-lg tracking-widest uppercase"
                />
                <Button
                  onClick={handleApplyCode}
                  disabled={inputCode.length !== 6}
                  className="h-12 px-6 rounded-xl"
                >
                  確認
                </Button>
              </div>
              {applyResult && (
                <p className={`text-sm ${applyResult.success ? "text-green-600" : "text-red-500"}`}>
                  {applyResult.message}
                </p>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="rounded-2xl border-border shadow-soft bg-primary/5 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-5 text-center">
              <Check className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="text-sm text-foreground">
                你已使用推薦碼 <span className="font-semibold text-primary">{referralData.usedReferralCode}</span>
              </p>
            </CardContent>
          </Card>
        )}

        {/* 排行榜 */}
        <Card className="rounded-2xl border-border shadow-soft animate-slide-up" style={{ animationDelay: "0.25s" }}>
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              本週邀請排行榜
            </h3>
            
            <div className="space-y-2">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    user.rank <= 3 ? "bg-gradient-to-r from-amber-50 to-transparent" : "bg-secondary/30"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                    user.rank === 1 
                      ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white" 
                      : user.rank === 2 
                        ? "bg-gradient-to-br from-gray-300 to-gray-400 text-white"
                        : user.rank === 3
                          ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white"
                          : "bg-secondary text-muted"
                  }`}>
                    {user.rank}
                  </div>
                  <span className="text-xl">{user.avatar}</span>
                  <span className="flex-1 text-sm font-medium text-foreground truncate">
                    {user.name}
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {user.count} 人
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ReferralPage;
