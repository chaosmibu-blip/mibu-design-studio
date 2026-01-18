// 圖鑑項目
export interface CollectionItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  county: string;
  duration?: string;
  checkInCount: number;
  firstCollectedAt: string;
  lastCollectedAt: string;
  isFavorite?: boolean;
  isBlacklisted?: boolean;
}

// 縣市類別資料結構
export interface CategoryData {
  name: string;
  items: CollectionItem[];
}

export interface CountyData {
  name: string;
  shortName: string;
  totalLocations: number;
  categories: CategoryData[];
}

// 旅程購買資訊
export interface TripPurchase {
  isPurchased: boolean;
  days: number;
  startDate: string; // ISO date string
  purchasedAt?: string;
}

// 行程表項目
export interface ItineraryItem {
  id: string;
  title: string;
  category: string;
  startTime: string;
  duration: string;
  notes?: string;
}

// 每日行程
export interface DaySchedule {
  date: Date;
  items: ItineraryItem[];
}

// 道具箱項目
export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  quantity: number;
  expiresAt?: string;
}

// 遊戲進度
export interface GameProgress {
  currentXP: number;
  totalXP: number;
  dailyLoginStreak: number;
  lastLoginDate: string;
}

// 等級資訊
export interface LevelInfo {
  level: number;
  name: string;
  minXP: number;
  reward: string;
}

// 推薦碼資料
export interface ReferralData {
  myCode: string;
  invitedCount: number;
  totalRewards: number;
  hasUsedReferral: boolean;
  usedReferralCode?: string;
}
