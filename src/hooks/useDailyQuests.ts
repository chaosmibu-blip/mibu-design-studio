import { useState, useCallback, useMemo } from "react";

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  isCompleted: boolean;
  icon: string;
}

export interface OneTimeQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  isCompleted: boolean;
  icon: string;
  category: "exploration" | "social" | "collection" | "special";
}

// 每日任務列表（全部對應現有功能）
const initialDailyQuests: DailyQuest[] = [
  { id: "daily_login", title: "每日簽到", description: "登入 APP", xpReward: 15, isCompleted: true, icon: "CalendarCheck" },
  { id: "daily_gacha", title: "每日扭蛋", description: "完成 1 次扭蛋", xpReward: 10, isCompleted: true, icon: "Dices" },
  { id: "view_collection", title: "瀏覽圖鑑", description: "查看圖鑑頁", xpReward: 5, isCompleted: false, icon: "BookOpen" },
  { id: "view_planner", title: "查看行程", description: "查看旅程策劃", xpReward: 5, isCompleted: false, icon: "Map" },
  { id: "view_map", title: "探索地圖", description: "查看世界地圖", xpReward: 5, isCompleted: true, icon: "Globe" },
];

// 每日全勤獎勵
const DAILY_COMPLETE_BONUS = 30;

// 一次性任務列表（全部對應現有功能）
const initialOneTimeQuests: OneTimeQuest[] = [
  { id: "first_gacha", title: "初次探索", description: "完成第一次扭蛋", xpReward: 50, isCompleted: true, icon: "Dices", category: "exploration" },
  { id: "first_profile", title: "建立檔案", description: "設定個人暱稱", xpReward: 30, isCompleted: false, icon: "UserPen", category: "exploration" },
  { id: "first_avatar", title: "頭像達人", description: "更換個人頭像", xpReward: 15, isCompleted: false, icon: "Image", category: "exploration" },
  { id: "first_preferences", title: "選擇偏好", description: "設定旅遊偏好標籤", xpReward: 20, isCompleted: true, icon: "Target", category: "exploration" },
  { id: "first_purchase", title: "首購達成", description: "購買第一個行程", xpReward: 150, isCompleted: false, icon: "ShoppingBag", category: "special" },
  { id: "first_referral", title: "推薦先鋒", description: "成功邀請第一位好友", xpReward: 100, isCompleted: false, icon: "Users", category: "social" },
  { id: "first_item_use", title: "道具新手", description: "使用第一個道具", xpReward: 20, isCompleted: false, icon: "Package", category: "collection" },
  { id: "first_itinerary", title: "規劃達人", description: "建立第一個行程項目", xpReward: 30, isCompleted: false, icon: "ClipboardList", category: "collection" },
];

export const useDailyQuests = () => {
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>(initialDailyQuests);
  const [oneTimeQuests, setOneTimeQuests] = useState<OneTimeQuest[]>(initialOneTimeQuests);

  // 計算每日任務完成進度
  const dailyProgress = useMemo(() => {
    const completed = dailyQuests.filter(q => q.isCompleted).length;
    const total = dailyQuests.length;
    return { completed, total, percentage: (completed / total) * 100 };
  }, [dailyQuests]);

  // 是否達成每日全勤
  const isDailyComplete = useMemo(() => {
    return dailyQuests.every(q => q.isCompleted);
  }, [dailyQuests]);

  // 今日可獲得的總 XP
  const dailyXPTotal = useMemo(() => {
    const baseXP = dailyQuests.reduce((sum, q) => sum + q.xpReward, 0);
    return baseXP + DAILY_COMPLETE_BONUS;
  }, [dailyQuests]);

  // 已獲得的 XP
  const dailyXPEarned = useMemo(() => {
    const earnedXP = dailyQuests.filter(q => q.isCompleted).reduce((sum, q) => sum + q.xpReward, 0);
    return earnedXP + (isDailyComplete ? DAILY_COMPLETE_BONUS : 0);
  }, [dailyQuests, isDailyComplete]);

  // 一次性任務完成進度
  const oneTimeProgress = useMemo(() => {
    const completed = oneTimeQuests.filter(q => q.isCompleted).length;
    const total = oneTimeQuests.length;
    return { completed, total };
  }, [oneTimeQuests]);

  // 完成每日任務
  const completeDailyQuest = useCallback((questId: string) => {
    setDailyQuests(prev => 
      prev.map(q => q.id === questId ? { ...q, isCompleted: true } : q)
    );
  }, []);

  // 完成一次性任務
  const completeOneTimeQuest = useCallback((questId: string) => {
    setOneTimeQuests(prev => 
      prev.map(q => q.id === questId ? { ...q, isCompleted: true } : q)
    );
  }, []);

  // 重置每日任務（每日凌晨）
  const resetDailyQuests = useCallback(() => {
    setDailyQuests(prev => 
      prev.map(q => ({ ...q, isCompleted: false }))
    );
  }, []);

  return {
    dailyQuests,
    oneTimeQuests,
    dailyProgress,
    isDailyComplete,
    dailyXPTotal,
    dailyXPEarned,
    oneTimeProgress,
    completeDailyQuest,
    completeOneTimeQuest,
    resetDailyQuests,
    DAILY_COMPLETE_BONUS,
  };
};
