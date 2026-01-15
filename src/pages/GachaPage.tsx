import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import TripCard from "@/components/TripCard";
import ItemBox from "@/components/ItemBox";
import CollectionContent from "@/components/CollectionContent";
import mibuLogo from "@/assets/mibu-logo.jpeg";

// 國家 -> 縣市結構
const countries: Record<string, string[]> = {
  "台灣": ["宜蘭縣", "台北市", "新北市", "桃園市", "新竹縣", "新竹市", "苗栗縣", "台中市", "彰化縣", "南投縣", "雲林縣", "嘉義市", "嘉義縣", "台南市", "高雄市", "屏東縣", "台東縣", "花蓮縣", "澎湖縣", "金門縣", "連江縣"],
};

const sampleResults = [
  { duration: "0.5-1h", category: "美食", title: "肴饌手作坊", description: "職人手作的精緻點心，溫馨小店。適合品味手工藝，享受悠閒時光。" },
  { duration: "2-3h", category: "住宿", title: "水雲山莊庭園渡假民宿", description: "水雲山莊以雅緻庭園營造度假氛圍，遠離塵囂的寧靜空間，讓您與摯愛沉浸在大自然懷抱。是尋求放鬆身心的最佳選擇。" },
  { duration: "2-3h", category: "遊程體驗", title: "Healtdeva 赫蒂法莊園", description: "赫蒂法莊園歐風城堡，秒變公主！情侶閨蜜來打卡，享受夢幻美拍體驗。" },
  { duration: "2-3h", category: "遊程體驗", title: "永恆水教堂 - 香格里拉冬山河渡假飯店", description: "漫步水上教堂，感受聖潔浪漫氣息。情侶、準新人來此許下承諾，收穫唯美照片與永恆愛戀，讓幸福氛圍環繞你我！" },
  { duration: "1-2h", category: "美食", title: "阿宗麵線", description: "經典台灣小吃，Q彈麵線配上濃郁大腸滷汁，一碗就是幸福。" },
  { duration: "3-4h", category: "遊程體驗", title: "九份老街", description: "山城老街風情，紅燈籠點亮夜色，品茶吃芋圓，感受濃濃懷舊氣息。" },
  { duration: "2-3h", category: "住宿", title: "日月潭雲品酒店", description: "湖畔五星級享受，晨曦倒映水面，讓身心完全放鬆。" },
  { duration: "1-2h", category: "美食", title: "度小月擔仔麵", description: "百年老店傳承古早味，一碗擔仔麵承載滿滿台南記憶。" },
  { duration: "2-3h", category: "遊程體驗", title: "太魯閣國家公園", description: "峽谷壯麗風光，大自然的鬼斧神工，每一個轉彎都是驚艷。" },
  { duration: "1-2h", category: "美食", title: "林聰明沙鍋魚頭", description: "嘉義必吃美食，濃郁湯頭配上鮮嫩魚肉，暖心又暖胃。" },
  { duration: "3-4h", category: "遊程體驗", title: "阿里山森林遊樂區", description: "雲海、日出、神木，三大奇景讓人流連忘返。" },
  { duration: "2-3h", category: "住宿", title: "墾丁夏都沙灘酒店", description: "私人沙灘配上蔚藍海岸，南國度假首選。" },
];

const GachaPage = () => {
  const [activeTab, setActiveTab] = useState<"gacha" | "collection" | "items">("gacha");
  const [selectedCountry, setSelectedCountry] = useState("台灣");
  const [selectedCounty, setSelectedCounty] = useState("宜蘭縣");
  const [gachaCount, setGachaCount] = useState([5]);
  const [showResult, setShowResult] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCountyDropdown, setShowCountyDropdown] = useState(false);

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
              className={`flex-1 py-4 text-sm font-medium transition-all relative ${
                activeTab === "gacha"
                  ? "text-primary"
                  : "text-muted"
              }`}
            >
              扭蛋
              {activeTab === "gacha" && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("collection")}
              className={`flex-1 py-4 text-sm font-medium transition-all relative ${
                activeTab === "collection"
                  ? "text-primary"
                  : "text-muted"
              }`}
            >
              圖鑑
              {activeTab === "collection" && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("items")}
              className={`flex-1 py-4 text-sm font-medium transition-all relative ${
                activeTab === "items"
                  ? "text-primary"
                  : "text-muted"
              }`}
            >
              道具箱
              {activeTab === "items" && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 px-4 pt-6 pb-4 overflow-y-auto">
          {/* Items tab */}
          {activeTab === "items" && <ItemBox />}
          
          {/* Collection tab */}
          {activeTab === "collection" && <CollectionContent />}
          
          {/* Gacha tab */}
          {activeTab === "gacha" && (
            <>
              {!showResult ? (
                <div className="space-y-6 animate-fade-in">
                  {/* Country selector */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">選擇國家</label>
                    <div className="relative">
                      <button
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="w-full flex items-center justify-between p-4 bg-card rounded-2xl border border-border btn-press"
                      >
                        <span className="text-foreground">{selectedCountry}</span>
                        <span className={`text-muted transition-transform ${showCountryDropdown ? "rotate-180" : ""}`}>▼</span>
                      </button>
                      {showCountryDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl border border-border shadow-lg z-10 overflow-hidden animate-scale-in max-h-60 overflow-y-auto">
                          {Object.keys(countries).map((country) => (
                            <button
                              key={country}
                              onClick={() => {
                                setSelectedCountry(country);
                                setSelectedCounty(countries[country][0]);
                                setShowCountryDropdown(false);
                              }}
                              className={`w-full p-4 text-left hover:bg-secondary transition-colors ${
                                selectedCountry === country ? "bg-secondary text-primary font-medium" : "text-foreground"
                              }`}
                            >
                              {country}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

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
                          {countries[selectedCountry]?.map((county) => (
                            <button
                              key={county}
                              onClick={() => {
                                setSelectedCounty(county);
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

                  {/* Gacha count slider */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">扭蛋次數</label>
                      <span className="text-lg font-bold text-primary">{gachaCount[0]} 次</span>
                    </div>
                    <Slider
                      value={gachaCount}
                      onValueChange={setGachaCount}
                      min={5}
                      max={12}
                      step={1}
                      className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_.relative]:bg-secondary [&_[data-orientation=horizontal]>.bg-primary]:bg-primary"
                    />
                    <div className="flex justify-between text-xs text-muted">
                      <span>5</span>
                      <span>12</span>
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
                      src={mibuLogo}
                      alt="Mibu"
                      className="w-12 h-12 mx-auto mb-2 object-contain rounded-lg"
                    />
                    <span className="text-sm font-bold text-foreground tracking-widest">MIBU</span>
                    <h2 className="text-2xl font-bold text-foreground mt-2">{selectedCounty}</h2>
                    <p className="text-sm text-muted">
                      正在探索 <span className="text-primary">{selectedCountry}</span>
                    </p>
                  </div>

                  {/* Main area map link */}
                  <div className="mb-4">
                    <button
                      onClick={() => handleMapClick(`${selectedCountry}${selectedCounty}`)}
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
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default GachaPage;
