import { useState, useCallback } from "react";

interface ReferralData {
  myCode: string;
  invitedCount: number;
  totalRewards: number;
  hasUsedReferral: boolean;
  usedReferralCode?: string;
}

// Generate a random 6-character alphanumeric code
const generateReferralCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Mock initial data
const initialData: ReferralData = {
  myCode: generateReferralCode(),
  invitedCount: 2,
  totalRewards: 100,
  hasUsedReferral: false,
};

export const useReferral = () => {
  const [referralData, setReferralData] = useState<ReferralData>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const copyReferralCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(referralData.myCode);
      return true;
    } catch {
      return false;
    }
  }, [referralData.myCode]);

  const shareReferralLink = useCallback(async () => {
    const shareData = {
      title: 'Mibu 旅遊扭蛋',
      text: `用我的推薦碼 ${referralData.myCode} 加入 Mibu，一起探索旅遊新玩法！`,
      url: `https://mibu.app/invite/${referralData.myCode}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return true;
      } catch {
        return false;
      }
    } else {
      // Fallback to copy link
      await navigator.clipboard.writeText(shareData.url);
      return true;
    }
  }, [referralData.myCode]);

  const applyReferralCode = useCallback(async (code: string) => {
    if (referralData.hasUsedReferral) {
      return { success: false, message: "您已經使用過推薦碼了" };
    }

    if (code.toUpperCase() === referralData.myCode) {
      return { success: false, message: "不能使用自己的推薦碼" };
    }

    if (code.length !== 6) {
      return { success: false, message: "推薦碼格式不正確" };
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setReferralData(prev => ({
      ...prev,
      hasUsedReferral: true,
      usedReferralCode: code.toUpperCase(),
    }));
    
    setIsLoading(false);
    
    return { 
      success: true, 
      message: "推薦碼套用成功！您獲得 30 經驗值和新手禮包！" 
    };
  }, [referralData.hasUsedReferral, referralData.myCode]);

  return {
    referralData,
    isLoading,
    copyReferralCode,
    shareReferralLink,
    applyReferralCode,
  };
};