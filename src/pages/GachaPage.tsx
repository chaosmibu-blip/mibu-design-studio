import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import TripCard from "@/components/TripCard";
import mibuHoodie from "@/assets/mibu-hoodie.jpeg";

const cities: Record<string, string[]> = {
  "宜蘭縣": ["五結鄉", "羅東鎮", "礁溪鄉", "頭城鎮"],
  "台北市": ["信義區", "大安區", "中正區", "士林區"],
  "高雄市": ["前鎮區", "左營區", "鳳山區", "三民區"],
  "新北市": ["板橋區", "新店區", "淡水區", "三重區"],
  "桃園市": ["中壢區", "桃園區", "龜山區", "八德區"],
  "新竹縣": ["竹北市", "湖口鄉", "新豐鄉", "關西鎮"],
};

const sampleResults = [
  { duration: "0.5-1h", category: "美食", title: "肴饌手作坊", description: "職人手作的精緻點心，溫馨小店。適合品味手工藝，享受悠閒時光。" },
  { duration: "2-3h", category: "住宿", title: "水雲山莊庭園渡假民宿", description: "水雲山莊以雅緻庭園營造度假氛圍，遠離塵囂的寧靜空間，讓您與摯愛沉浸在大自然懷抱。是尋求放鬆身心的最佳選擇。" },
  { duration: "2-3h", category: "遊程體驗", title: "Healtdeva 赫蒂法莊園", description: "赫蒂法莊園歐風城堡，秒變公主！情侶閨蜜來打卡，享受夢幻美拍體驗。" },
  { duration: "2-3h", category: "遊程體驗", title: "永恆水教堂 - 香格里拉冬山河渡假飯店", description: "漫步水上教堂，感受聖潔浪漫氣息。情侶、準新人來此許下承諾，收穫唯美照片與永恆愛戀，讓幸福氛圍環繞你我！" },
];

const GachaPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"gacha" | "collection">("gacha");
  const [selectedCounty, setSelectedCounty] = useState("宜蘭縣");
  const [selectedDistrict, setSelectedDistrict] = useState("五結鄉");
  const [gachaCount, setGachaCount] = useState([3]);
  const [showResult, setShowResult] = useState(false);
  const [showCountyDropdown, setShowCountyDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

  const handleGacha = () => {
    setShowResult(true);
  };

  const handleMapClick = (title: string) => {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(title)}`, "_blank");
  };

  return (
    <PageLayout>
      <div className="flex flex-col min-h-full">
        {/* Connected Top Navigation Tabs */}
        <div className="bg-background border-b border-border">
          <div className="flex">
            <button
              onClick={() => {
                setActiveTab("gacha");
                setShowResult(false);
              }}
              className={`flex-1 py-4 text-base font-medium transition-all relative ${
                activeTab === "gacha"
                  ? "text-primary"
                  : "text-muted"
              }`}
            >
              扭蛋
              {activeTab === "gacha" && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-primary rounded-full" />
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab("collection");
                navigate("/collection");
              }}
              className={`flex-1 py-4 text-base font-medium transition-all relative ${
                activeTab === "collection"
                  ? "text-primary"
                  : "text-muted"
              }`}
            >
              圖鑑
              {activeTab === "collection" && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 px-4 pt-6 pb-4">
          {!showResult ? (
            <div className="space-y-6 animate-fade-in">
              {/* County selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">選擇縣市</label>
                <div className="relative">
                  <button
                    onClick={() => setShowCountyDropdown(!showCountyDropdown)}
                    className="w-full flex items-center justify-between p-4 bg-card rounded-2xl border border-border btn-press"
                  >
                    <span className="text-foreground">{selectedCounty}</span>
                    <span className={`text-muted transition-transform ${showCountyDropdown ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  {showCountyDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl border border-border shadow-lg z-10 overflow-hidden animate-scale-in max-h-60 overflow-y-auto">
                      {Object.keys(cities).map((county) => (
                        <button
                          key={county}
                          onClick={() => {
                            setSelectedCounty(county);
                            setSelectedDistrict(cities[county][0]);
                            setShowCountyDropdown(false);
                          }}
                          className={`w-full p-4 text-left hover:bg-secondary transition-colors ${
                            selectedCounty === county ? "bg-secondary text-primary font-medium" : "text-foreground"
                          }`}
                        >
                          {county}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* District selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">選擇鄉鎮區</label>
                <div className="relative">
                  <button
                    onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
                    className="w-full flex items-center justify-between p-4 bg-card rounded-2xl border border-border btn-press"
                  >
                    <span className="text-foreground">{selectedDistrict}</span>
                    <span className={`text-muted transition-transform ${showDistrictDropdown ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  {showDistrictDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl border border-border shadow-lg z-10 overflow-hidden animate-scale-in">
                      {cities[selectedCounty]?.map((district) => (
                        <button
                          key={district}
                          onClick={() => {
                            setSelectedDistrict(district);
                            setShowDistrictDropdown(false);
                          }}
                          className={`w-full p-4 text-left hover:bg-secondary transition-colors ${
                            selectedDistrict === district ? "bg-secondary text-primary font-medium" : "text-foreground"
                          }`}
                        >
                          {district}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Gacha count slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">扭蛋次數</label>
                  <span className="text-lg font-bold text-primary">{gachaCount[0]} 次</span>
                </div>
                <Slider
                  value={gachaCount}
                  onValueChange={setGachaCount}
                  min={1}
                  max={10}
                  step={1}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_.relative]:bg-secondary [&_[data-orientation=horizontal]>.bg-primary]:bg-primary"
                />
                <div className="flex justify-between text-xs text-muted">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>

              {/* Gacha button */}
              <Button
                onClick={handleGacha}
                className="w-full h-16 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg btn-press"
              >
                開始扭蛋！
              </Button>
            </div>
          ) : (
            <div className="animate-fade-in">
              {/* Result header */}
              <div className="text-center mb-6">
                <img
                  src={mibuHoodie}
                  alt="Mibu"
                  className="w-12 h-12 mx-auto mb-2 object-contain"
                />
                <span className="text-sm font-bold text-foreground tracking-widest">MIBU</span>
                <h2 className="text-2xl font-bold text-foreground mt-2">{selectedCounty}</h2>
                <p className="text-sm text-muted">
                  正在探索 <span className="text-primary">{selectedDistrict}</span>
                </p>
              </div>

              {/* Main area map link */}
              <div className="mb-4">
                <button
                  onClick={() => handleMapClick(`${selectedCounty}${selectedDistrict}`)}
                  className="w-full py-3 bg-card rounded-xl text-sm text-primary flex items-center justify-center gap-2 border border-border"
                >
                  <span>📍</span>
                  在 Google 地圖中查看
                </button>
              </div>

              {/* Trip cards */}
              <div className="space-y-4 mb-6">
                {sampleResults.slice(0, gachaCount[0]).map((result, index) => (
                  <TripCard
                    key={index}
                    duration={result.duration}
                    category={result.category}
                    title={result.title}
                    description={result.description}
                    onMapClick={() => handleMapClick(result.title)}
                  />
                ))}
              </div>

              {/* Re-gacha button */}
              <Button
                onClick={() => setShowResult(false)}
                className="w-full h-14 text-base font-bold rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg btn-press"
              >
                重新扭蛋 🔄
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default GachaPage;
