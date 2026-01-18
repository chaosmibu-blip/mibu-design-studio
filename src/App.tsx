import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QuestTrackingProvider, useQuestTracking } from "@/contexts/QuestTrackingContext";
import QuestRewardToast from "@/components/QuestRewardToast";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import GachaPage from "./pages/GachaPage";
import CollectionPage from "./pages/CollectionPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import MapPage from "./pages/MapPage";
import AchievementsPage from "./pages/AchievementsPage";
import PlannerPage from "./pages/PlannerPage";
import ReferralPage from "./pages/ReferralPage";

const queryClient = new QueryClient();

// 登入追蹤組件
const LoginTracker = () => {
  const location = useLocation();
  const { trackDailyQuest, isDailyQuestCompleted } = useQuestTracking();

  useEffect(() => {
    // 當進入 /home 時追蹤每日登入
    if (location.pathname === "/home" && !isDailyQuestCompleted("daily_login")) {
      trackDailyQuest("daily_login");
    }
  }, [location.pathname, trackDailyQuest, isDailyQuestCompleted]);

  return null;
};

// 獎勵通知組件
const RewardToastWrapper = () => {
  const { currentReward, clearReward } = useQuestTracking();
  return <QuestRewardToast reward={currentReward} onComplete={clearReward} />;
};

const AppContent = () => (
  <>
    <LoginTracker />
    <RewardToastWrapper />
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/gacha" element={<GachaPage />} />
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/planner" element={<PlannerPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/achievements" element={<AchievementsPage />} />
      <Route path="/referral" element={<ReferralPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <QuestTrackingProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </QuestTrackingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
