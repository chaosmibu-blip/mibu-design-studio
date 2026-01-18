import { useState, useEffect, useCallback } from "react";
import type { CollectionItem, CountyData, CategoryData } from "@/types";

const STORAGE_KEY = "mibu_collection";

// 台灣縣市短名對照
const countyShortNames: Record<string, string> = {
  "宜蘭縣": "宜",
  "台北市": "台",
  "新北市": "新",
  "桃園市": "桃",
  "新竹縣": "竹",
  "新竹市": "竹",
  "苗栗縣": "苗",
  "台中市": "中",
  "彰化縣": "彰",
  "南投縣": "投",
  "雲林縣": "雲",
  "嘉義市": "嘉",
  "嘉義縣": "嘉",
  "台南市": "南",
  "高雄市": "高",
  "屏東縣": "屏",
  "台東縣": "東",
  "花蓮縣": "花",
  "澎湖縣": "澎",
  "金門縣": "金",
  "連江縣": "連",
};

export const useCollection = () => {
  const [items, setItems] = useState<CollectionItem[]>([]);

  // 從 localStorage 載入
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
  }, []);

  // 儲存到 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // 新增或更新收藏（自動收藏邏輯）
  const addToCollection = useCallback((newItem: {
    title: string;
    description?: string;
    category: string;
    county: string;
    duration?: string;
  }) => {
    const now = new Date().toISOString();
    
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.title === newItem.title && item.county === newItem.county
      );

      if (existingIndex >= 0) {
        // 已存在，增加打卡次數
        return prev.map((item, index) => 
          index === existingIndex 
            ? { 
                ...item, 
                checkInCount: item.checkInCount + 1,
                lastCollectedAt: now,
              }
            : item
        );
      } else {
        // 新項目
        const newCollectionItem: CollectionItem = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          ...newItem,
          checkInCount: 1,
          firstCollectedAt: now,
          lastCollectedAt: now,
        };
        return [...prev, newCollectionItem];
      }
    });
  }, []);

  // 批次新增（扭蛋結果）
  const addMultipleToCollection = useCallback((newItems: Array<{
    title: string;
    description?: string;
    category: string;
    county: string;
    duration?: string;
  }>) => {
    newItems.forEach(item => addToCollection(item));
  }, [addToCollection]);

  // 切換我的最愛（互斥：加入時自動移除黑名單）
  const toggleFavorite = useCallback((itemId: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newFavorite = !item.isFavorite;
        return {
          ...item,
          isFavorite: newFavorite,
          isBlacklisted: newFavorite ? false : item.isBlacklisted, // 互斥
        };
      }
      return item;
    }));
  }, []);

  // 切換黑名單（互斥：加入時自動移除我的最愛）
  const toggleBlacklist = useCallback((itemId: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newBlacklisted = !item.isBlacklisted;
        return {
          ...item,
          isBlacklisted: newBlacklisted,
          isFavorite: newBlacklisted ? false : item.isFavorite, // 互斥
        };
      }
      return item;
    }));
  }, []);

  // 取得所有最愛項目
  const getFavorites = useCallback(() => {
    return items.filter(item => item.isFavorite);
  }, [items]);

  // 取得所有黑名單項目
  const getBlacklisted = useCallback(() => {
    return items.filter(item => item.isBlacklisted);
  }, [items]);

  // 轉換為按縣市分類的資料結構（給 CollectionContent 使用）
  const getGroupedByCounty = useCallback((): CountyData[] => {
    const countyMap = new Map<string, Map<string, CollectionItem[]>>();

    items.forEach(item => {
      if (!countyMap.has(item.county)) {
        countyMap.set(item.county, new Map());
      }
      const categoryMap = countyMap.get(item.county)!;
      if (!categoryMap.has(item.category)) {
        categoryMap.set(item.category, []);
      }
      categoryMap.get(item.category)!.push(item);
    });

    const result: CountyData[] = [];
    countyMap.forEach((categoryMap, countyName) => {
      const categories: CategoryData[] = [];
      let totalItems = 0;

      categoryMap.forEach((categoryItems, categoryName) => {
        categories.push({
          name: categoryName,
          items: categoryItems.sort((a, b) => 
            new Date(b.lastCollectedAt).getTime() - new Date(a.lastCollectedAt).getTime()
          ),
        });
        totalItems += categoryItems.length;
      });

      result.push({
        name: countyName,
        shortName: countyShortNames[countyName] || countyName.charAt(0),
        totalLocations: totalItems,
        categories: categories.sort((a, b) => a.name.localeCompare(b.name)),
      });
    });

    return result.sort((a, b) => b.totalLocations - a.totalLocations);
  }, [items]);

  // 取得總收藏數
  const getTotalCount = useCallback(() => items.length, [items]);

  // 取得總打卡次數
  const getTotalCheckIns = useCallback(() => 
    items.reduce((sum, item) => sum + item.checkInCount, 0), 
    [items]
  );

  // 清除所有收藏（用於重置）
  const clearCollection = useCallback(() => {
    setItems([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    items,
    addToCollection,
    addMultipleToCollection,
    toggleFavorite,
    toggleBlacklist,
    getFavorites,
    getBlacklisted,
    getGroupedByCounty,
    getTotalCount,
    getTotalCheckIns,
    clearCollection,
  };
};

export default useCollection;
