import { useState } from "react";
import { Gift, Ticket, Star, AlertTriangle, Check, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Item {
  id: string;
  type: 'coupon' | 'gift_voucher' | 'special';
  name: string;
  description: string;
  expiresAt: Date;
  merchantName?: string;
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

const ItemBox = () => {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Count unique items (each item = 1 slot)
  const usedSlots = items.length;

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

  const getItemColor = (type: Item['type']) => {
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

  const handleRedeem = () => {
    if (!selectedItem) return;
    // Remove the item after redeeming
    setItems(prev => prev.filter(item => item.id !== selectedItem.id));
    setDialogOpen(false);
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
        const expiryBorderClass = daysLeft <= 1 
          ? 'border-2 border-red-500' 
          : daysLeft <= 3 
            ? 'border-2 border-orange-400' 
            : '';
        const expiryTextClass = daysLeft <= 1 
          ? 'text-red-500 bg-red-500/10' 
          : 'text-orange-500 bg-orange-500/10';
        
        slots.push(
          <button
            key={i}
            onClick={() => handleItemClick(currentItem)}
            className={`aspect-square rounded-xl border flex items-center justify-center relative transition-all duration-200 hover:scale-105 hover:shadow-medium active:scale-95 ${getItemColor(currentItem.type)} ${expiryBorderClass}`}
          >
            {getItemIcon(currentItem.type)}
            {/* Expiry countdown badge */}
            {expiringSoon && (
              <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${expiryTextClass}`}>
                剩{daysLeft}天
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
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-soft ${getItemColor(selectedItem.type)}`}>
                    {getItemIcon(selectedItem.type)}
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
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleRedeem}
                    className="flex-1"
                    size="lg"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    核銷使用
                  </Button>
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
    </div>
  );
};

export default ItemBox;
