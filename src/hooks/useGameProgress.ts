import { useState, useCallback, useMemo } from "react";

export interface LevelInfo {
  level: number;
  name: string;
  minXP: number;
  reward: string;
}

export const LEVEL_CONFIG: LevelInfo[] = [
  { level: 1, name: "新手旅人", minXP: 0, reward: "基礎功能" },
  { level: 2, name: "初階探險家", minXP: 100, reward: "圖鑑容量 +5" },
  { level: 3, name: "中階冒險者", minXP: 300, reward: "專屬徽章" },
  { level: 4, name: "高階旅行家", minXP: 600, reward: "道具箱容量 +5" },
  { level: 5, name: "資深導遊", minXP: 1000, reward: "VIP 推薦" },
  { level: 6, name: "旅遊達人", minXP: 1500, reward: "專屬頭像框" },
  { level: 7, name: "探索大師", minXP: 2200, reward: "抽獎機會" },
  { level: 8, name: "傳奇旅者", minXP: 3000, reward: "全部解鎖" },
];

export interface XPAction {
  type: string;
  label: string;
  xp: number;
}

export const XP_ACTIONS: XPAction[] = [
  { type: "daily_login", label: "每日登入", xp: 10 },
  { type: "gacha", label: "完成扭蛋", xp: 5 },
  { type: "checkin", label: "打卡簽到", xp: 20 },
  { type: "trip_complete", label: "完成行程", xp: 50 },
  { type: "achievement", label: "解鎖成就", xp: 30 },
  { type: "referral", label: "推薦好友成功", xp: 50 },
  { type: "referred", label: "被推薦註冊", xp: 30 },
  { type: "purchase", label: "購買行程", xp: 100 },
];

interface GameProgress {
  currentXP: number;
  totalXP: number;
  dailyLoginStreak: number;
  lastLoginDate: string;
}

// Mock initial data
const initialProgress: GameProgress = {
  currentXP: 245,
  totalXP: 245,
  dailyLoginStreak: 3,
  lastLoginDate: new Date().toISOString().split('T')[0],
};

export const useGameProgress = () => {
  const [progress, setProgress] = useState<GameProgress>(initialProgress);

  const currentLevel = useMemo(() => {
    let level = LEVEL_CONFIG[0];
    for (const config of LEVEL_CONFIG) {
      if (progress.currentXP >= config.minXP) {
        level = config;
      } else {
        break;
      }
    }
    return level;
  }, [progress.currentXP]);

  const nextLevel = useMemo(() => {
    const currentIndex = LEVEL_CONFIG.findIndex(l => l.level === currentLevel.level);
    return currentIndex < LEVEL_CONFIG.length - 1 
      ? LEVEL_CONFIG[currentIndex + 1] 
      : null;
  }, [currentLevel]);

  const progressToNextLevel = useMemo(() => {
    if (!nextLevel) return 100;
    const xpInCurrentLevel = progress.currentXP - currentLevel.minXP;
    const xpNeededForNextLevel = nextLevel.minXP - currentLevel.minXP;
    return Math.min(100, (xpInCurrentLevel / xpNeededForNextLevel) * 100);
  }, [progress.currentXP, currentLevel, nextLevel]);

  const xpToNextLevel = useMemo(() => {
    if (!nextLevel) return 0;
    return nextLevel.minXP - progress.currentXP;
  }, [progress.currentXP, nextLevel]);

  const addXP = useCallback((amount: number, actionType?: string) => {
    setProgress(prev => ({
      ...prev,
      currentXP: prev.currentXP + amount,
      totalXP: prev.totalXP + amount,
    }));
    
    // Could trigger level up notification here
    return amount;
  }, []);

  const claimDailyLogin = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastLoginDate === today) {
      return { success: false, message: "今天已經簽到過了" };
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const isConsecutive = progress.lastLoginDate === yesterday;

    setProgress(prev => ({
      ...prev,
      currentXP: prev.currentXP + 10,
      totalXP: prev.totalXP + 10,
      dailyLoginStreak: isConsecutive ? prev.dailyLoginStreak + 1 : 1,
      lastLoginDate: today,
    }));

    return { 
      success: true, 
      message: `簽到成功！+10 經驗值${isConsecutive ? `，連續 ${progress.dailyLoginStreak + 1} 天！` : ''}` 
    };
  }, [progress]);

  return {
    progress,
    currentLevel,
    nextLevel,
    progressToNextLevel,
    xpToNextLevel,
    addXP,
    claimDailyLogin,
    LEVEL_CONFIG,
  };
};