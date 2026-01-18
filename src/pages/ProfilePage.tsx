import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Camera, Check, Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import mibuHoodie from "@/assets/mibu-hoodie.jpeg";

const interestTags = [
  "美食", "景點", "購物", "文化", "自然", "藝術", 
  "歷史", "冒險", "放鬆", "攝影", "夜生活", "建築"
];

const ProfilePage = () => {
  const [nickname, setNickname] = useState("旅行者");
  const [realName, setRealName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("1990-01-01");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["美食", "景點", "攝影"]);
  
  // Custom input fields
  const [taboos, setTaboos] = useState<string[]>([]);
  const [newTaboo, setNewTaboo] = useState("");
  const [medicalHistory, setMedicalHistory] = useState<string[]>([]);
  const [newMedical, setNewMedical] = useState("");
  
  // Emergency contact
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  const toggleInterest = (tag: string) => {
    setSelectedInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const addTaboo = () => {
    if (newTaboo.trim() && !taboos.includes(newTaboo.trim())) {
      setTaboos(prev => [...prev, newTaboo.trim()]);
      setNewTaboo("");
    }
  };

  const removeTaboo = (taboo: string) => {
    setTaboos(prev => prev.filter(t => t !== taboo));
  };

  const addMedical = () => {
    if (newMedical.trim() && !medicalHistory.includes(newMedical.trim())) {
      setMedicalHistory(prev => [...prev, newMedical.trim()]);
      setNewMedical("");
    }
  };

  const removeMedical = (item: string) => {
    setMedicalHistory(prev => prev.filter(m => m !== item));
  };

  const handleSave = () => {
    // Just show feedback in demo
    alert("個人資料已儲存！");
  };

  return (
    <PageLayout showNav={false}>
      <div className="page-padding pt-6 section-spacing pb-8">
        {/* Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <button
            onClick={() => window.history.back()}
            className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center shadow-soft btn-press"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">編輯個人資料</h1>
        </div>

        {/* Avatar section */}
        <div className="flex flex-col items-center gap-4 animate-slide-up">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-secondary border-4 border-card shadow-medium overflow-hidden">
              <img
                src={mibuHoodie}
                alt="頭像"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-medium btn-press">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
          <p className="text-sm text-muted">點擊更換頭像</p>
        </div>

        {/* Basic info */}
        <Card className="rounded-2xl border-border shadow-soft animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-5 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">暱稱</label>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="輸入您的暱稱"
                className="h-12 rounded-xl bg-secondary border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">姓名</label>
              <Input
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                placeholder="輸入您的真實姓名"
                className="h-12 rounded-xl bg-secondary border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">性別</label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="h-12 rounded-xl bg-secondary border-border">
                  <SelectValue placeholder="請選擇性別" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border shadow-elevated z-50">
                  <SelectItem value="male">男</SelectItem>
                  <SelectItem value="female">女</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                  <SelectItem value="prefer_not_to_say">不透露</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">生日</label>
              <Input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="h-12 rounded-xl bg-secondary border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Travel preferences */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-sm font-medium text-foreground">旅遊偏好</h2>
          <div className="flex flex-wrap gap-2">
            {interestTags.map((tag) => {
              const isSelected = selectedInterests.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleInterest(tag)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 btn-press ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-medium scale-105"
                      : "bg-card text-foreground border border-border hover:border-primary/50 hover:bg-secondary"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 inline mr-1.5" />}
                  {tag}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted">
            已選擇 <span className="text-primary font-medium">{selectedInterests.length}</span> 個偏好
          </p>
        </div>

        {/* Personal taboos */}
        <Card className="rounded-2xl border-border shadow-soft animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <CardContent className="p-5 space-y-3">
            <label className="text-sm font-medium text-foreground">個人禁忌</label>
            <div className="flex flex-wrap gap-2">
              {taboos.map((taboo) => (
                <span
                  key={taboo}
                  className="flex items-center gap-1.5 px-3 py-2 bg-secondary rounded-full text-sm animate-scale-in"
                >
                  {taboo}
                  <button
                    onClick={() => removeTaboo(taboo)}
                    className="w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTaboo}
                onChange={(e) => setNewTaboo(e.target.value)}
                placeholder="例如：海鮮、花生..."
                className="h-11 rounded-xl bg-secondary border-border"
                onKeyDown={(e) => e.key === "Enter" && addTaboo()}
              />
              <Button
                onClick={addTaboo}
                size="icon"
                variant="outline"
                className="h-11 w-11 rounded-xl flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Medical history */}
        <Card className="rounded-2xl border-border shadow-soft animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <CardContent className="p-5 space-y-3">
            <label className="text-sm font-medium text-foreground">疾病史</label>
            <div className="flex flex-wrap gap-2">
              {medicalHistory.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 px-3 py-2 bg-secondary rounded-full text-sm animate-scale-in"
                >
                  {item}
                  <button
                    onClick={() => removeMedical(item)}
                    className="w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newMedical}
                onChange={(e) => setNewMedical(e.target.value)}
                placeholder="例如：糖尿病、高血壓..."
                className="h-11 rounded-xl bg-secondary border-border"
                onKeyDown={(e) => e.key === "Enter" && addMedical()}
              />
              <Button
                onClick={addMedical}
                size="icon"
                variant="outline"
                className="h-11 w-11 rounded-xl flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency contact */}
        <Card className="rounded-2xl border-border shadow-soft animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <CardContent className="p-5 space-y-4">
            <label className="text-sm font-medium text-foreground">緊急聯絡人</label>
            <div className="space-y-3">
              <Input
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                placeholder="聯絡人姓名"
                className="h-12 rounded-xl bg-secondary border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <Input
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                placeholder="聯絡人電話"
                type="tel"
                className="h-12 rounded-xl bg-secondary border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Save button */}
        <Button
          onClick={handleSave}
          size="lg"
          className="w-full h-14 text-base font-medium rounded-2xl shadow-medium"
        >
          儲存變更
        </Button>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
