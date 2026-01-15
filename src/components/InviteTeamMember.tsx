import { useState } from "react";
import { X, Copy, Share2, Link, Users, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface InviteTeamMemberProps {
  onClose: () => void;
}

const InviteTeamMember = ({ onClose }: InviteTeamMemberProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const inviteCode = "abc123";
  const inviteLink = `mibu.app/join/${inviteCode}`;
  const currentMembers = 3;
  const maxMembers = 8;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${inviteLink}`);
      setCopied(true);
      toast({
        title: "已複製連結",
        description: "邀請連結已複製到剪貼簿",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "複製失敗",
        description: "請手動複製連結",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "加入我的 Mibu 旅程！",
          text: "一起來規劃這次的旅行吧！",
          url: `https://${inviteLink}`,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center animate-fade-in">
      <div className="bg-background rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md p-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">邀請團員加入</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Invite link */}
        <div className="mb-6">
          <p className="text-sm text-muted mb-3">分享此連結邀請朋友：</p>
          <div className="flex items-center gap-2 p-3 bg-secondary rounded-xl">
            <Link className="w-4 h-4 text-muted flex-shrink-0" />
            <span className="flex-1 text-sm text-foreground font-mono truncate">
              {inviteLink}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mb-6">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="flex-1 h-12 rounded-xl"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2 text-green-500" />
                已複製
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                複製連結
              </>
            )}
          </Button>
          <Button
            onClick={handleShare}
            className="flex-1 h-12 rounded-xl bg-primary"
          >
            <Share2 className="w-4 h-4 mr-2" />
            分享
          </Button>
        </div>

        {/* Info */}
        <div className="space-y-3 p-4 bg-secondary/50 rounded-xl">
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-muted" />
            <span className="text-muted">連結 24 小時內有效</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Users className="w-4 h-4 text-muted" />
            <span className="text-muted">
              目前團員：<span className="text-foreground font-medium">{currentMembers}/{maxMembers} 人</span>
            </span>
          </div>
        </div>

        {/* Social share buttons */}
        <div className="mt-6">
          <p className="text-sm text-muted mb-3">或透過以下方式分享：</p>
          <div className="flex gap-3">
            <button className="flex-1 h-12 bg-[#06C755] hover:bg-[#06C755]/90 text-white rounded-xl font-medium transition-colors">
              LINE
            </button>
            <button className="flex-1 h-12 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white rounded-xl font-medium transition-colors">
              Facebook
            </button>
            <button className="flex-1 h-12 bg-foreground hover:bg-foreground/90 text-background rounded-xl font-medium transition-colors">
              更多
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteTeamMember;
