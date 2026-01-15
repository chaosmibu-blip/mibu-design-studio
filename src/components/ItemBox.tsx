import { useState } from "react";
import { Gift, Ticket, Star, AlertTriangle, Package, Plus } from "lucide-react";

interface Item {
  id: string;
  type: 'coupon' | 'gift_voucher' | 'special';
  name: string;
  description: string;
  quantity: number;
  expiresAt: Date;
  merchantName?: string;
}

// Mock data for demo
const mockItems: Item[] = [
  {
    id: "1",
    type: "coupon",
    name: "9折優惠券",
    description: "全館商品適用",
    quantity: 1,
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
    merchantName: "肴饌手作坊",
  },
  {
    id: "2",
    type: "gift_voucher",
    name: "免費甜點兌換",
    description: "消費滿500即可兌換",
    quantity: 2,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    merchantName: "水雲山莊",
  },
  {
    id: "3",
    type: "special",
    name: "VIP體驗券",
    description: "專屬VIP導覽服務",
    quantity: 1,
    expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
    merchantName: "赫蒂法莊園",
  },
  {
    id: "4",
    type: "coupon",
    name: "買一送一",
    description: "指定飲品適用",
    quantity: 3,
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
    merchantName: "阿宗麵線",
  },
  {
    id: "5",
    type: "gift_voucher",
    name: "住宿升等券",
    description: "免費升等一級房型",
    quantity: 1,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    merchantName: "日月潭雲品酒店",
  },
];

const ItemBox = () => {
  const [items] = useState<Item[]>(mockItems);
  const maxSlots = 30;
  const usedSlots = items.reduce((acc, item) => acc + item.quantity, 0);

  const getItemIcon = (type: Item['type']) => {
    switch (type) {
      case 'coupon':
        return <Ticket className="w-6 h-6" />;
      case 'gift_voucher':
        return <Gift className="w-6 h-6" />;
      case 'special':
        return <Star className="w-6 h-6" />;
    }
  };

  const getItemColor = (type: Item['type']) => {
    switch (type) {
      case 'coupon':
        return 'bg-amber-500/20 text-amber-600';
      case 'gift_voucher':
        return 'bg-pink-500/20 text-pink-600';
      case 'special':
        return 'bg-purple-500/20 text-purple-600';
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

  const formatExpiryText = (expiresAt: Date) => {
    const days = getDaysUntilExpiry(expiresAt);
    if (days <= 0) return "已過期";
    if (days === 1) return "剩餘 1 天";
    return `剩餘 ${days} 天`;
  };

  const emptySlots = maxSlots - usedSlots;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Capacity indicator */}
      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">道具箱容量</span>
          </div>
          <span className="text-sm text-muted">
            <span className="text-primary font-bold">{usedSlots}</span> / {maxSlots}
          </span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(usedSlots / maxSlots) * 100}%` }}
          />
        </div>
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => {
          const expiringSoon = isExpiringSoon(item.expiresAt);
          return (
            <div
              key={item.id}
              className={`bg-card rounded-2xl p-4 border transition-all hover:shadow-md ${
                expiringSoon ? 'border-destructive/50 bg-destructive/5' : 'border-border'
              }`}
            >
              {/* Icon and type */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${getItemColor(item.type)}`}>
                {getItemIcon(item.type)}
              </div>
              
              {/* Name and quantity */}
              <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-1">
                {item.name}
              </h3>
              <p className="text-xs text-muted mb-2 line-clamp-1">
                {item.merchantName}
              </p>
              
              {/* Quantity badge */}
              {item.quantity > 1 && (
                <span className="inline-block px-2 py-0.5 bg-secondary rounded-full text-xs text-foreground mb-2">
                  x{item.quantity}
                </span>
              )}
              
              {/* Expiry warning */}
              <div className={`flex items-center gap-1 text-xs ${
                expiringSoon ? 'text-destructive font-medium' : 'text-muted'
              }`}>
                {expiringSoon && <AlertTriangle className="w-3 h-3" />}
                <span>{formatExpiryText(item.expiresAt)}</span>
              </div>
            </div>
          );
        })}
        
        {/* Empty slots indicator */}
        {emptySlots > 0 && (
          <div className="bg-card/50 rounded-2xl p-4 border border-dashed border-border flex flex-col items-center justify-center text-muted min-h-[140px]">
            <Plus className="w-8 h-8 mb-2 opacity-50" />
            <span className="text-xs">空位 x{emptySlots}</span>
          </div>
        )}
      </div>

      {/* Expand capacity button */}
      <button className="w-full py-3 bg-secondary hover:bg-secondary/80 rounded-xl text-sm text-foreground flex items-center justify-center gap-2 transition-colors">
        <Plus className="w-4 h-4" />
        擴充道具箱容量
      </button>
    </div>
  );
};

export default ItemBox;
