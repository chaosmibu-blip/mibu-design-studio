import { useState, useMemo } from "react";

export type AchievementTier = "bronze" | "silver" | "gold" | "diamond";

export interface AchievementStage {
  tier: AchievementTier;
  target: number;
  xpReward: number;
  isUnlocked: boolean;
}

export interface CumulativeAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "exploration" | "collection" | "social" | "special";
  currentProgress: number;
  stages: AchievementStage[];
}

export interface OneTimeAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "exploration" | "collection" | "social" | "special";
  xpReward: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}

// 累計型成就
const initialCumulativeAchievements: CumulativeAchievement[] = [
  {
    id: "gacha_master",
    name: "扭蛋達人",
    description: "完成扭蛋次數",
    icon: "🎰",
    category: "exploration",
    currentProgress: 23,
    stages: [
      { tier: "bronze", target: 10, xpReward: 30, isUnlocked: true },
      { tier: "silver", target: 50, xpReward: 80, isUnlocked: false },
      { tier: "gold", target: 200, xpReward: 200, isUnlocked: false },
      { tier: "diamond", target: 1000, xpReward: 500, isUnlocked: false },
    ],
  },
  {
    id: "food_hunter",
    name: "美食獵人",
    description: "收集美食景點",
    icon: "🍜",
    category: "collection",
    currentProgress: 15,
    stages: [
      { tier: "bronze", target: 10, xpReward: 30, isUnlocked: true },
      { tier: "silver", target: 50, xpReward: 80, isUnlocked: false },
      { tier: "gold", target: 200, xpReward: 200, isUnlocked: false },
      { tier: "diamond", target: 500, xpReward: 500, isUnlocked: false },
    ],
  },
  {
    id: "loyal_fan",
    name: "忠實粉絲",
    description: "連續登入天數",
    icon: "🔥",
    category: "special",
    currentProgress: 5,
    stages: [
      { tier: "bronze", target: 7, xpReward: 50, isUnlocked: false },
      { tier: "silver", target: 30, xpReward: 150, isUnlocked: false },
      { tier: "gold", target: 100, xpReward: 400, isUnlocked: false },
      { tier: "diamond", target: 365, xpReward: 1000, isUnlocked: false },
    ],
  },
  {
    id: "social_butterfly",
    name: "社交達人",
    description: "邀請好友人數",
    icon: "👥",
    category: "social",
    currentProgress: 2,
    stages: [
      { tier: "bronze", target: 3, xpReward: 50, isUnlocked: false },
      { tier: "silver", target: 10, xpReward: 150, isUnlocked: false },
      { tier: "gold", target: 30, xpReward: 400, isUnlocked: false },
      { tier: "diamond", target: 100, xpReward: 1000, isUnlocked: false },
    ],
  },
  {
    id: "checkin_master",
    name: "打卡大師",
    description: "完成打卡次數",
    icon: "📍",
    category: "collection",
    currentProgress: 8,
    stages: [
      { tier: "bronze", target: 10, xpReward: 30, isUnlocked: false },
      { tier: "silver", target: 50, xpReward: 100, isUnlocked: false },
      { tier: "gold", target: 200, xpReward: 300, isUnlocked: false },
      { tier: "diamond", target: 500, xpReward: 800, isUnlocked: false },
    ],
  },
  {
    id: "trip_explorer",
    name: "行程探險家",
    description: "完成行程次數",
    icon: "✈️",
    category: "exploration",
    currentProgress: 3,
    stages: [
      { tier: "bronze", target: 5, xpReward: 50, isUnlocked: false },
      { tier: "silver", target: 20, xpReward: 150, isUnlocked: false },
      { tier: "gold", target: 50, xpReward: 400, isUnlocked: false },
      { tier: "diamond", target: 100, xpReward: 800, isUnlocked: false },
    ],
  },
  {
    id: "collector",
    name: "收藏家",
    description: "圖鑑收集數量",
    icon: "📚",
    category: "collection",
    currentProgress: 28,
    stages: [
      { tier: "bronze", target: 20, xpReward: 30, isUnlocked: true },
      { tier: "silver", target: 100, xpReward: 100, isUnlocked: false },
      { tier: "gold", target: 300, xpReward: 300, isUnlocked: false },
      { tier: "diamond", target: 500, xpReward: 800, isUnlocked: false },
    ],
  },
];

// 一次性成就
const initialOneTimeAchievements: OneTimeAchievement[] = [
  { id: "first_adventure", name: "初次冒險", description: "完成第一次扭蛋", icon: "🎲", category: "exploration", xpReward: 30, isUnlocked: true, unlockedAt: "2024-01-15" },
  { id: "world_first", name: "初見世界", description: "解鎖第一個國家", icon: "🌍", category: "exploration", xpReward: 50, isUnlocked: true, unlockedAt: "2024-01-16" },
  { id: "diamond_hunter", name: "鑽石獵人", description: "獲得第一張鑽石卡", icon: "💎", category: "collection", xpReward: 100, isUnlocked: false },
  { id: "popularity_king", name: "人氣王", description: "邀請 10 位好友", icon: "👑", category: "social", xpReward: 200, isUnlocked: false },
  { id: "first_buy", name: "首購達成", description: "完成第一筆購買", icon: "🛒", category: "special", xpReward: 100, isUnlocked: false },
  { id: "anniversary", name: "周年慶典", description: "註冊滿一年", icon: "🎂", category: "special", xpReward: 500, isUnlocked: false },
  { id: "night_owl", name: "夜貓子", description: "凌晨 2-4 點登入", icon: "🦉", category: "special", xpReward: 30, isUnlocked: false },
  { id: "early_bird", name: "早起鳥", description: "連續 7 天早上 6 點前登入", icon: "🐦", category: "special", xpReward: 80, isUnlocked: false },
  { id: "taiwan_master", name: "台灣通", description: "收集全部台灣縣市", icon: "🇹🇼", category: "collection", xpReward: 300, isUnlocked: false },
  { id: "lucky_draw", name: "歐皇降臨", description: "單次扭蛋獲得鑽石卡", icon: "🍀", category: "special", xpReward: 50, isUnlocked: false },
];

export const TIER_COLORS: Record<AchievementTier, string> = {
  bronze: "from-amber-600 to-amber-700",
  silver: "from-gray-300 to-gray-400",
  gold: "from-yellow-400 to-amber-500",
  diamond: "from-cyan-300 via-blue-400 to-purple-500",
};

export const TIER_LABELS: Record<AchievementTier, string> = {
  bronze: "銅",
  silver: "銀",
  gold: "金",
  diamond: "鑽",
};

export const CATEGORY_NAMES: Record<string, string> = {
  exploration: "探索",
  collection: "收集",
  social: "社交",
  special: "特殊",
};

export const useAchievements = () => {
  const [cumulativeAchievements] = useState<CumulativeAchievement[]>(initialCumulativeAchievements);
  const [oneTimeAchievements] = useState<OneTimeAchievement[]>(initialOneTimeAchievements);

  // 統計已解鎖成就
  const stats = useMemo(() => {
    const oneTimeUnlocked = oneTimeAchievements.filter(a => a.isUnlocked).length;
    const cumulativeUnlocked = cumulativeAchievements.reduce((sum, a) => {
      return sum + a.stages.filter(s => s.isUnlocked).length;
    }, 0);
    const cumulativeTotal = cumulativeAchievements.reduce((sum, a) => sum + a.stages.length, 0);

    return {
      oneTimeUnlocked,
      oneTimeTotal: oneTimeAchievements.length,
      cumulativeUnlocked,
      cumulativeTotal,
      totalUnlocked: oneTimeUnlocked + cumulativeUnlocked,
      totalCount: oneTimeAchievements.length + cumulativeTotal,
    };
  }, [cumulativeAchievements, oneTimeAchievements]);

  // 獲取當前進度階段
  const getCurrentStage = (achievement: CumulativeAchievement): AchievementStage | null => {
    for (const stage of achievement.stages) {
      if (!stage.isUnlocked) {
        return stage;
      }
    }
    return null;
  };

  // 獲取最高解鎖階段
  const getHighestUnlockedStage = (achievement: CumulativeAchievement): AchievementStage | null => {
    const unlockedStages = achievement.stages.filter(s => s.isUnlocked);
    return unlockedStages.length > 0 ? unlockedStages[unlockedStages.length - 1] : null;
  };

  return {
    cumulativeAchievements,
    oneTimeAchievements,
    stats,
    getCurrentStage,
    getHighestUnlockedStage,
    TIER_COLORS,
    TIER_LABELS,
    CATEGORY_NAMES,
  };
};
