import { useState, useEffect, useCallback } from "react";
import { Gift, Ticket, Star, AlertTriangle, Check, Trash2, Timer, CheckCircle } from "lucide-react";
import { useQuestTracking } from "@/contexts/QuestTrackingContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface Item {
  id: string;
  type: 'coupon' | 'gift_voucher' | 'special';
  name: string;
  description: string;
  expiresAt: Date;
  merchantName?: string;
  // 核銷相關欄位
  isRedeemed?: boolean;
  redeemedAt?: Date;
  autoDeleteAt?: Date;
}

// Mock data for demo - each item is one slot
const mockItems: Item[] = [
  {
    id: "1",
    type: "coupon",
    name: "9折優惠券",
    description: "全館商品適用",
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    merchantName: "肴饌手作坊",
  },
  {
    id: "2",
    type: "gift_voucher",
    name: "免費甜點兌換",
    description: "消費滿500即可兌換",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    merchantName: "水雲山莊",
  },
  {
    id: "3",
    type: "special",
    name: "VIP體驗券",
    description: "專屬VIP導覽服務",
    expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    merchantName: "赫蒂法莊園",
  },
  {
    id: "4",
    type: "coupon",
    name: "買一送一",
    description: "指定飲品適用",
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    merchantName: "阿宗麵線",
  },
  {
    id: "5",
    type: "gift_voucher",
    name: "住宿升等券",
    description: "免費升等一級房型",
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    merchantName: "日月潭雲品酒店",
  },
];

const GRID_COLS = 6;
const GRID_ROWS = 5;
const TOTAL_SLOTS = GRID_COLS * GRID_ROWS;
const AUTO_DELETE_MINUTES = 10;

// 模擬每日核銷碼（實際應從後端取得）
const generateDailyCode = (merchantName: string): string => {
  const today = new Date().toDateString();
  const seed = merchantName + today;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString().slice(0, 6).padStart(6, '0');
};

const ItemBox = () => {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [redeemDialogOpen, setRedeemDialogOpen] = useState(false);
  const [redeemCode, setRedeemCode] = useState("");
  const [redeemError, setRedeemError] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const { trackOneTimeQuest, isOneTimeQuestCompleted } = useQuestTracking();

  // Count unique items (each item = 1 slot)
  const usedSlots = items.length;

  // 自動刪除已核銷的道具
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setItems(prev => prev.filter(item => {
        if (item.autoDeleteAt && new Date(item.autoDeleteAt) <= now) {
          return false;
        }
        return true;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 計算剩餘刪除時間
  const getRemainingDeleteTime = useCallback((autoDeleteAt: Date): string => {
    const now = new Date();
    const diff = new Date(autoDeleteAt).getTime() - now.getTime();
    if (diff <= 0) return "即將刪除";
    
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const getItemIcon = (type: Item['type']) => {
    switch (type) {
      case 'coupon':
        return <Ticket className="w-5 h-5" />;
      case 'gift_voucher':
        return <Gift className="w-5 h-5" />;
      case 'special':
        return <Star className="w-5 h-5" />;
    }
  };

  const getItemColor = (type: Item['type'], isRedeemed?: boolean) => {
    if (isRedeemed) {
      return 'bg-muted/30 text-muted border-border';
    }
    switch (type) {
      case 'coupon':
        return 'bg-amber-500/20 text-amber-600 border-amber-500/30';
      case 'gift_voucher':
        return 'bg-pink-500/20 text-pink-600 border-pink-500/30';
      case 'special':
        return 'bg-purple-500/20 text-purple-600 border-purple-500/30';
    }
  };

  const getDaysUntilExpiry = (expiresAt: Date) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const isExpiringSoon = (expiresAt: Date) => {
    return getDaysUntilExpiry(expiresAt) <= 3;
  };

  const formatExpiryDate = (expiresAt: Date) => {
    return expiresAt.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleStartRedeem = () => {
    setDialogOpen(false);
    setRedeemCode("");
    setRedeemError(false);
    setRedeemSuccess(false);
    setRedeemDialogOpen(true);
  };

  const handleRedeemSubmit = () => {
    if (!selectedItem) return;
    
    const correctCode = generateDailyCode(selectedItem.merchantName || selectedItem.name);
    
    if (redeemCode === correctCode) {
      setRedeemSuccess(true);
      setRedeemError(false);
      
      // 追蹤首次使用道具
      if (!isOneTimeQuestCompleted("first_item_use")) {
        trackOneTimeQuest("first_item_use");
      }
      
      // 標記為已核銷，設定自動刪除時間
      const now = new Date();
      const autoDeleteAt = new Date(now.getTime() + AUTO_DELETE_MINUTES * 60 * 1000);
      
      setItems(prev => prev.map(item => 
        item.id === selectedItem.id 
          ? { ...item, isRedeemed: true, redeemedAt: now, autoDeleteAt }
          : item
      ));
      
      // 2秒後關閉對話框
      setTimeout(() => {
        setRedeemDialogOpen(false);
        setSelectedItem(null);
      }, 2000);
    } else {
      setRedeemError(true);
      setRedeemCode("");
    }
  };

  const handleDelete = () => {
    if (!selectedItem) return;
    setItems(prev => prev.filter(item => item.id !== selectedItem.id));
    setDialogOpen(false);
  };

  // Render grid - each item takes one slot
  const renderGrid = () => {
    const slots = [];

    for (let i = 0; i < TOTAL_SLOTS; i++) {
      const currentItem = items[i] || null;

      if (currentItem) {
        const expiringSoon = isExpiringSoon(currentItem.expiresAt);
        const daysLeft = getDaysUntilExpiry(currentItem.expiresAt);
        const isRedeemed = currentItem.isRedeemed;
        
        const expiryBorderClass = isRedeemed 
          ? 'border-2 border-primary/50'
          : daysLeft <= 1 
            ? 'border-2 border-red-500' 
            : daysLeft <= 3 
              ? 'border-2 border-orange-400' 
              : '';
        
        slots.push(
          <button
            key={i}
            onClick={() => handleItemClick(currentItem)}
            className={`aspect-square rounded-xl border flex items-center justify-center relative transition-all duration-200 hover:scale-105 hover:shadow-medium active:scale-95 ${getItemColor(currentItem.type, isRedeemed)} ${expiryBorderClass}`}
          >
            {isRedeemed ? (
              <CheckCircle className="w-5 h-5 text-primary" />
            ) : (
              getItemIcon(currentItem.type)
            )}
            {/* Expiry countdown badge */}
            {!isRedeemed && expiringSoon && (
              <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${
                daysLeft <= 1 ? 'text-red-500 bg-red-500/10' : 'text-orange-500 bg-orange-500/10'
              }`}>
                剩{daysLeft}天
              </div>
            )}
            {/* Redeemed badge */}
            {isRedeemed && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap text-primary bg-primary/10">
                已核銷
              </div>
            )}
          </button>
        );
      } else {
        // Empty slot
        slots.push(
          <div
            key={i}
            className="aspect-square rounded-xl border border-dashed border-border/30 bg-secondary/20"
          />
        );
      }
    }

    return slots;
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Capacity indicator */}
      <div className="flex items-center justify-between text-sm bg-card rounded-xl p-4 shadow-soft">
        <span className="text-muted">道具箱容量</span>
        <span className="text-foreground font-medium">
          <span className="text-primary font-bold text-lg">{usedSlots}</span> / {TOTAL_SLOTS}
        </span>
      </div>

      {/* Game-style grid */}
      <div 
        className="grid gap-2.5 bg-card rounded-2xl p-4 border border-border shadow-soft"
        style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)` }}
      >
        {renderGrid()}
      </div>

      {/* Item detail dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm mx-4 rounded-2xl shadow-elevated animate-scale-in">
          {selectedItem && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-soft ${getItemColor(selectedItem.type, selectedItem.isRedeemed)}`}>
                    {selectedItem.isRedeemed ? (
                      <CheckCircle className="w-6 h-6 text-primary" />
                    ) : (
                      getItemIcon(selectedItem.type)
                    )}
                  </div>
                  <div>
                    <DialogTitle className="text-left text-lg">{selectedItem.name}</DialogTitle>
                    <p className="text-sm text-muted mt-0.5">{selectedItem.merchantName}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-3 bg-secondary/50 rounded-xl p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">說明</span>
                    <span className="text-foreground font-medium">{selectedItem.description}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">有效期限</span>
                    <span className={isExpiringSoon(selectedItem.expiresAt) ? "text-red-500 font-medium" : "text-foreground"}>
                      {formatExpiryDate(selectedItem.expiresAt)}
                      {isExpiringSoon(selectedItem.expiresAt) && ` (剩${getDaysUntilExpiry(selectedItem.expiresAt)}天)`}
                    </span>
                  </div>
                  {selectedItem.isRedeemed && selectedItem.autoDeleteAt && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">自動移除</span>
                      <span className="text-primary font-medium flex items-center gap-1">
                        <Timer className="w-3.5 h-3.5" />
                        {getRemainingDeleteTime(selectedItem.autoDeleteAt)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2">
                  {selectedItem.isRedeemed ? (
                    <div className="flex-1 h-12 rounded-xl bg-primary/10 text-primary font-medium flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      核銷完成
                    </div>
                  ) : (
                    <Button
                      onClick={handleStartRedeem}
                      className="flex-1"
                      size="lg"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      核銷使用
                    </Button>
                  )}
                  <Button
                    onClick={handleDelete}
                    variant="outline"
                    size="lg"
                    className="border-red-300 text-red-500 hover:bg-red-50 px-4"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Redeem code input dialog */}
      <Dialog open={redeemDialogOpen} onOpenChange={setRedeemDialogOpen}>
        <DialogContent className="max-w-sm mx-4 rounded-2xl shadow-elevated animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">
              {redeemSuccess ? "核銷成功" : "輸入核銷碼"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-6">
            {redeemSuccess ? (
              <div className="text-center space-y-4 animate-scale-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium">{selectedItem?.name}</p>
                  <p className="text-sm text-muted mt-1">
                    將於 {AUTO_DELETE_MINUTES} 分鐘後自動移除
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-muted mb-1">請輸入商家提供的 6 位數核銷碼</p>
                  <p className="text-xs text-muted/70">核銷碼每日自動更新</p>
                </div>

                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={redeemCode}
                    onChange={(value) => {
                      setRedeemCode(value);
                      setRedeemError(false);
                    }}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className={redeemError ? "border-red-500" : ""} />
                      <InputOTPSlot index={1} className={redeemError ? "border-red-500" : ""} />
                      <InputOTPSlot index={2} className={redeemError ? "border-red-500" : ""} />
                      <InputOTPSlot index={3} className={redeemError ? "border-red-500" : ""} />
                      <InputOTPSlot index={4} className={redeemError ? "border-red-500" : ""} />
                      <InputOTPSlot index={5} className={redeemError ? "border-red-500" : ""} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {redeemError && (
                  <p className="text-center text-sm text-red-500 animate-fade-in">
                    核銷碼錯誤，請重新輸入
                  </p>
                )}

                <Button
                  onClick={handleRedeemSubmit}
                  disabled={redeemCode.length !== 6}
                  className="w-full"
                  size="lg"
                >
                  確認核銷
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItemBox;
