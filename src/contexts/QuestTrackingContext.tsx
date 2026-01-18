import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

interface QuestReward {
  questId: string;
  questTitle: string;
  xpReward: number;
  isOneTime?: boolean;
}

interface QuestTrackingContextType {
  // 完成每日任務
  trackDailyQuest: (questId: string) => void;
  // 完成一次性任務
  trackOneTimeQuest: (questId: string) => void;
  // 檢查每日任務是否已完成
  isDailyQuestCompleted: (questId: string) => boolean;
  // 檢查一次性任務是否已完成
  isOneTimeQuestCompleted: (questId: string) => boolean;
  // 當前顯示的獎勵通知
  currentReward: QuestReward | null;
  // 清除獎勵通知
  clearReward: () => void;
  // 今日完成的每日任務
  completedDailyQuests: string[];
  // 已完成的一次性任務
  completedOneTimeQuests: string[];
}

const QuestTrackingContext = createContext<QuestTrackingContextType | null>(null);

// 任務資料
const DAILY_QUESTS: Record<string, { title: string; xpReward: number }> = {
  daily_login: { title: "每日簽到", xpReward: 15 },
  daily_gacha: { title: "每日扭蛋", xpReward: 10 },
  view_collection: { title: "瀏覽圖鑑", xpReward: 5 },
  view_planner: { title: "查看行程", xpReward: 5 },
  view_map: { title: "探索地圖", xpReward: 5 },
};

const ONE_TIME_QUESTS: Record<string, { title: string; xpReward: number }> = {
  first_gacha: { title: "初次探索", xpReward: 50 },
  first_profile: { title: "建立檔案", xpReward: 30 },
  first_avatar: { title: "頭像達人", xpReward: 15 },
  first_preferences: { title: "選擇偏好", xpReward: 20 },
  first_purchase: { title: "首購達成", xpReward: 150 },
  first_referral: { title: "推薦先鋒", xpReward: 100 },
  first_item_use: { title: "道具新手", xpReward: 20 },
  first_itinerary: { title: "規劃達人", xpReward: 30 },
};

// 取得今日日期 key
const getTodayKey = () => new Date().toISOString().split("T")[0];

// localStorage keys
const DAILY_QUESTS_KEY = "mibu_daily_quests";
const ONE_TIME_QUESTS_KEY = "mibu_one_time_quests";

export const QuestTrackingProvider = ({ children }: { children: ReactNode }) => {
  const [completedDailyQuests, setCompletedDailyQuests] = useState<string[]>([]);
  const [completedOneTimeQuests, setCompletedOneTimeQuests] = useState<string[]>([]);
  const [currentReward, setCurrentReward] = useState<QuestReward | null>(null);
  const [rewardQueue, setRewardQueue] = useState<QuestReward[]>([]);

  // 載入已完成的任務
  useEffect(() => {
    const todayKey = getTodayKey();
    
    // 載入今日每日任務
    const savedDaily = localStorage.getItem(`${DAILY_QUESTS_KEY}_${todayKey}`);
    if (savedDaily) {
      setCompletedDailyQuests(JSON.parse(savedDaily));
    }

    // 載入一次性任務
    const savedOneTime = localStorage.getItem(ONE_TIME_QUESTS_KEY);
    if (savedOneTime) {
      setCompletedOneTimeQuests(JSON.parse(savedOneTime));
    }
  }, []);

  // 處理獎勵佇列
  useEffect(() => {
    if (!currentReward && rewardQueue.length > 0) {
      setCurrentReward(rewardQueue[0]);
      setRewardQueue((prev) => prev.slice(1));
    }
  }, [currentReward, rewardQueue]);

  const showReward = useCallback((reward: QuestReward) => {
    setRewardQueue((prev) => [...prev, reward]);
  }, []);

  const clearReward = useCallback(() => {
    setCurrentReward(null);
  }, []);

  const trackDailyQuest = useCallback((questId: string) => {
    const todayKey = getTodayKey();
    
    setCompletedDailyQuests((prev) => {
      if (prev.includes(questId)) return prev;
      
      const updated = [...prev, questId];
      localStorage.setItem(`${DAILY_QUESTS_KEY}_${todayKey}`, JSON.stringify(updated));
      
      // 顯示獎勵通知
      const quest = DAILY_QUESTS[questId];
      if (quest) {
        showReward({
          questId,
          questTitle: quest.title,
          xpReward: quest.xpReward,
        });
      }
      
      return updated;
    });
  }, [showReward]);

  const trackOneTimeQuest = useCallback((questId: string) => {
    setCompletedOneTimeQuests((prev) => {
      if (prev.includes(questId)) return prev;
      
      const updated = [...prev, questId];
      localStorage.setItem(ONE_TIME_QUESTS_KEY, JSON.stringify(updated));
      
      // 顯示獎勵通知
      const quest = ONE_TIME_QUESTS[questId];
      if (quest) {
        showReward({
          questId,
          questTitle: quest.title,
          xpReward: quest.xpReward,
          isOneTime: true,
        });
      }
      
      return updated;
    });
  }, [showReward]);

  const isDailyQuestCompleted = useCallback((questId: string) => {
    return completedDailyQuests.includes(questId);
  }, [completedDailyQuests]);

  const isOneTimeQuestCompleted = useCallback((questId: string) => {
    return completedOneTimeQuests.includes(questId);
  }, [completedOneTimeQuests]);

  return (
    <QuestTrackingContext.Provider
      value={{
        trackDailyQuest,
        trackOneTimeQuest,
        isDailyQuestCompleted,
        isOneTimeQuestCompleted,
        currentReward,
        clearReward,
        completedDailyQuests,
        completedOneTimeQuests,
      }}
    >
      {children}
    </QuestTrackingContext.Provider>
  );
};

export const useQuestTracking = () => {
  const context = useContext(QuestTrackingContext);
  if (!context) {
    throw new Error("useQuestTracking must be used within a QuestTrackingProvider");
  }
  return context;
};
