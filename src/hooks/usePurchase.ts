import { useState, useEffect, useCallback } from "react";
import type { TripPurchase } from "@/types";

const STORAGE_KEY = "mibu_trip_purchase";

const getDefaultPurchase = (): TripPurchase => ({
  isPurchased: false,
  days: 3,
  startDate: new Date().toISOString().split('T')[0],
});

export const usePurchase = () => {
  const [purchase, setPurchase] = useState<TripPurchase>(getDefaultPurchase);

  // 從 localStorage 載入
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPurchase(JSON.parse(stored));
      } catch {
        setPurchase(getDefaultPurchase());
      }
    }
  }, []);

  // 儲存到 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(purchase));
  }, [purchase]);

  // 更新天數
  const setDays = useCallback((days: number) => {
    setPurchase(prev => ({ ...prev, days }));
  }, []);

  // 更新開始日期
  const setStartDate = useCallback((startDate: string) => {
    setPurchase(prev => ({ ...prev, startDate }));
  }, []);

  // 確認購買
  const confirmPurchase = useCallback(() => {
    setPurchase(prev => ({
      ...prev,
      isPurchased: true,
      purchasedAt: new Date().toISOString(),
    }));
  }, []);

  // 重置購買狀態（用於重新購買或測試）
  const resetPurchase = useCallback(() => {
    setPurchase(getDefaultPurchase());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // 計算價格
  const calculatePrice = useCallback((days: number) => {
    return days * 299;
  }, []);

  // 產生行程日期陣列
  const generateScheduleDates = useCallback((): Date[] => {
    if (!purchase.isPurchased) return [];
    
    const dates: Date[] = [];
    const startDate = new Date(purchase.startDate);
    
    for (let i = 0; i < purchase.days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  }, [purchase.isPurchased, purchase.startDate, purchase.days]);

  return {
    ...purchase,
    setDays,
    setStartDate,
    confirmPurchase,
    resetPurchase,
    calculatePrice,
    generateScheduleDates,
  };
};

export default usePurchase;
