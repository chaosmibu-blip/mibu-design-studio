import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Camera, Check } from "lucide-react";
import mibuHoodie from "@/assets/mibu-hoodie.jpeg";

const interestTags = [
  "美食", "景點", "購物", "文化", "自然", "藝術", 
  "歷史", "冒險", "放鬆", "攝影", "夜生活", "建築"
];

const ProfilePage = () => {
  const [nickname, setNickname] = useState("旅行者");
  const [birthday, setBirthday] = useState("1990-01-01");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["美食", "景點", "攝影"]);

  const toggleInterest = (tag: string) => {
    setSelectedInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = () => {
    // Just show feedback in demo
    alert("個人資料已儲存！");
  };

  return (
    <PageLayout showNav={false}>
      <div className="px-4 pt-6 space-y-6 pb-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm btn-press"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">編輯個人資料</h1>
        </div>

        {/* Avatar section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-secondary border-4 border-card shadow-lg overflow-hidden">
              <img
                src={mibuHoodie}
                alt="頭像"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-9 h-9 bg-primary rounded-full flex items-center justify-center shadow-md btn-press">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
          <p className="text-sm text-muted">點擊更換頭像</p>
        </div>

        {/* Form fields */}
        <Card className="rounded-2xl border-border">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">暱稱</label>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="輸入您的暱稱"
                className="h-12 rounded-xl bg-secondary border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">生日</label>
              <Input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="h-12 rounded-xl bg-secondary border-border focus:border-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Interest tags */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-foreground">旅行興趣</h2>
          <div className="flex flex-wrap gap-2">
            {interestTags.map((tag) => {
              const isSelected = selectedInterests.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleInterest(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all btn-press ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card text-foreground border border-border hover:border-primary"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                  {tag}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted">
            已選擇 {selectedInterests.length} 個興趣
          </p>
        </div>

        {/* Save button */}
        <Button
          onClick={handleSave}
          className="w-full h-14 text-base font-medium rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md btn-press"
        >
          儲存變更
        </Button>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;