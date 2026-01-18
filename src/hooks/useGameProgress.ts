import { useState, useCallback, useMemo } from "react";

export interface LevelTier {
  tier: number;
  name: string;
  minLevel: number;
  maxLevel: number;
  colorClass: string;
  icon: string;
}

export interface LevelInfo {
  level: number;
  tierName: string;
  tier: LevelTier;
  xpForCurrentLevel: number;
  xpForNextLevel: number;
}

// 10 階段設計，每個階段有主題色和貓咪圖示
export const LEVEL_TIERS: LevelTier[] = [
  { tier: 1, name: "旅行萌新", minLevel: 1, maxLevel: 10, colorClass: "from-gray-400 to-gray-500", icon: "Sprout" },
  { tier: 2, name: "好奇探索者", minLevel: 11, maxLevel: 20, colorClass: "from-emerald-400 to-emerald-600", icon: "Compass" },
  { tier: 3, name: "積極冒險家", minLevel: 21, maxLevel: 30, colorClass: "from-blue-400 to-blue-600", icon: "Map" },
  { tier: 4, name: "旅途達人", minLevel: 31, maxLevel: 40, colorClass: "from-purple-400 to-purple-600", icon: "Backpack" },
  { tier: 5, name: "資深玩家", minLevel: 41, maxLevel: 50, colorClass: "from-amber-400 to-amber-600", icon: "Trophy" },
  { tier: 6, name: "旅遊專家", minLevel: 51, maxLevel: 60, colorClass: "from-orange-400 to-orange-600", icon: "Globe" },
  { tier: 7, name: "探索大師", minLevel: 61, maxLevel: 70, colorClass: "from-red-400 to-red-600", icon: "Mountain" },
  { tier: 8, name: "傳奇旅者", minLevel: 71, maxLevel: 80, colorClass: "from-pink-400 via-purple-500 to-indigo-500", icon: "Crown" },
  { tier: 9, name: "世界行者", minLevel: 81, maxLevel: 90, colorClass: "from-cyan-400 via-blue-500 to-purple-500", icon: "Plane" },
  { tier: 10, name: "旅行之神", minLevel: 91, maxLevel: 99, colorClass: "from-yellow-300 via-amber-400 to-orange-500", icon: "Sparkles" },
];

// 經驗值曲線公式: XP = Math.floor(40 * (level ^ 1.4) + 10)
export const calculateXPForLevel = (level: number): number => {
  if (level <= 1) return 0;
  return Math.floor(40 * Math.pow(level, 1.4) + 10);
};

// 計算累計經驗值
export const calculateTotalXPForLevel = (level: number): number => {
  let total = 0;
  for (let i = 2; i <= level; i++) {
    total += calculateXPForLevel(i);
  }
  return total;
};

// 根據經驗值計算等級
export const calculateLevelFromXP = (totalXP: number): number => {
  let level = 1;
  let xpNeeded = 0;
  
  while (level < 99) {
    xpNeeded += calculateXPForLevel(level + 1);
    if (totalXP < xpNeeded) break;
    level++;
  }
  
  return Math.min(level, 99);
};

// 獲取等級所屬階段
export const getTierForLevel = (level: number): LevelTier => {
  for (const tier of LEVEL_TIERS) {
    if (level >= tier.minLevel && level <= tier.maxLevel) {
      return tier;
    }
  }
  return LEVEL_TIERS[LEVEL_TIERS.length - 1];
};

// 經驗值獲取行為
export interface XPAction {
  type: string;
  label: string;
  xp: number;
}

export const XP_ACTIONS: XPAction[] = [
  // 每日任務
  { type: "daily_login", label: "每日簽到", xp: 15 },
  { type: "gacha", label: "完成扭蛋", xp: 10 },
  { type: "view_collection", label: "瀏覽圖鑑", xp: 5 },
  { type: "view_planner", label: "查看行程", xp: 5 },
  { type: "view_map", label: "探索地圖", xp: 5 },
  { type: "daily_complete", label: "每日全勤", xp: 30 },
  // 一次性任務
  { type: "first_gacha", label: "初次探索", xp: 50 },
  { type: "first_profile", label: "建立檔案", xp: 30 },
  { type: "first_avatar", label: "頭像達人", xp: 15 },
  { type: "first_preferences", label: "選擇偏好", xp: 20 },
  { type: "first_purchase", label: "首購達成", xp: 150 },
  { type: "first_referral", label: "推薦先鋒", xp: 100 },
  { type: "first_item_use", label: "道具新手", xp: 20 },
  { type: "first_itinerary", label: "規劃達人", xp: 30 },
  // 成就獎勵
  { type: "achievement", label: "解鎖成就", xp: 30 },
  { type: "referral", label: "推薦好友成功", xp: 50 },
  { type: "referred", label: "被推薦註冊", xp: 30 },
  { type: "purchase", label: "購買行程", xp: 100 },
  // 連續登入獎勵
  { type: "streak_7", label: "連續7天登入", xp: 50 },
  { type: "streak_30", label: "連續30天登入", xp: 150 },
  { type: "streak_100", label: "連續100天登入", xp: 400 },
];

interface GameProgress {
  currentXP: number;
  totalXP: number;
  dailyLoginStreak: number;
  lastLoginDate: string;
}

// Mock initial data - 模擬用戶已有一些經驗值
const initialProgress: GameProgress = {
  currentXP: 580,
  totalXP: 580,
  dailyLoginStreak: 5,
  lastLoginDate: new Date().toISOString().split('T')[0],
};

export const useGameProgress = () => {
  const [progress, setProgress] = useState<GameProgress>(initialProgress);

  const currentLevel = useMemo(() => {
    return calculateLevelFromXP(progress.currentXP);
  }, [progress.currentXP]);

  const currentTier = useMemo(() => {
    return getTierForLevel(currentLevel);
  }, [currentLevel]);

  const xpInCurrentLevel = useMemo(() => {
    const xpForCurrentLevel = calculateTotalXPForLevel(currentLevel);
    return progress.currentXP - xpForCurrentLevel;
  }, [progress.currentXP, currentLevel]);

  const xpNeededForNextLevel = useMemo(() => {
    if (currentLevel >= 99) return 0;
    return calculateXPForLevel(currentLevel + 1);
  }, [currentLevel]);

  const progressToNextLevel = useMemo(() => {
    if (currentLevel >= 99) return 100;
    return Math.min(100, (xpInCurrentLevel / xpNeededForNextLevel) * 100);
  }, [xpInCurrentLevel, xpNeededForNextLevel, currentLevel]);

  const xpToNextLevel = useMemo(() => {
    if (currentLevel >= 99) return 0;
    return xpNeededForNextLevel - xpInCurrentLevel;
  }, [xpNeededForNextLevel, xpInCurrentLevel, currentLevel]);

  const levelInfo = useMemo((): LevelInfo => ({
    level: currentLevel,
    tierName: currentTier.name,
    tier: currentTier,
    xpForCurrentLevel: xpInCurrentLevel,
    xpForNextLevel: xpNeededForNextLevel,
  }), [currentLevel, currentTier, xpInCurrentLevel, xpNeededForNextLevel]);

  const addXP = useCallback((amount: number, actionType?: string) => {
    setProgress(prev => ({
      ...prev,
      currentXP: prev.currentXP + amount,
      totalXP: prev.totalXP + amount,
    }));
    
    return amount;
  }, []);

  const claimDailyLogin = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastLoginDate === today) {
      return { success: false, message: "今天已經簽到過了" };
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const isConsecutive = progress.lastLoginDate === yesterday;
    const newStreak = isConsecutive ? progress.dailyLoginStreak + 1 : 1;

    // 連續登入獎勵
    let bonusXP = 15; // 基礎簽到
    let bonusMessage = "";
    
    if (newStreak === 7) {
      bonusXP += 50;
      bonusMessage = " + 連續7天獎勵 +50 XP！";
    } else if (newStreak === 30) {
      bonusXP += 150;
      bonusMessage = " + 連續30天獎勵 +150 XP！";
    } else if (newStreak === 100) {
      bonusXP += 400;
      bonusMessage = " + 連續100天獎勵 +400 XP！";
    }

    setProgress(prev => ({
      ...prev,
      currentXP: prev.currentXP + bonusXP,
      totalXP: prev.totalXP + bonusXP,
      dailyLoginStreak: newStreak,
      lastLoginDate: today,
    }));

    return { 
      success: true, 
      message: `簽到成功！+${bonusXP} 經驗值，連續 ${newStreak} 天！${bonusMessage}` 
    };
  }, [progress]);

  return {
    progress,
    currentLevel,
    currentTier,
    levelInfo,
    progressToNextLevel,
    xpToNextLevel,
    xpInCurrentLevel,
    xpNeededForNextLevel,
    addXP,
    claimDailyLogin,
    LEVEL_TIERS,
  };
};
