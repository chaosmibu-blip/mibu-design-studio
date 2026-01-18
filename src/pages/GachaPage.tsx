import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import TripCard from "@/components/TripCard";
import ItemBox from "@/components/ItemBox";
import CollectionContent from "@/components/CollectionContent";
import { useCollection } from "@/hooks/useCollection";
import { TabBar } from "@/components/ui/tab-bar";
import { ChevronDown, Check, MapPin } from "lucide-react";
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

const tabs = [
  { id: "gacha", label: "扭蛋" },
  { id: "collection", label: "圖鑑" },
  { id: "items", label: "道具箱" },
];

const GachaPage = () => {
  const [activeTab, setActiveTab] = useState<string>("gacha");
  const [selectedCountry, setSelectedCountry] = useState("台灣");
  const [selectedCounty, setSelectedCounty] = useState("宜蘭縣");
  const [gachaCount, setGachaCount] = useState([5]);
  const [showResult, setShowResult] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCountyDropdown, setShowCountyDropdown] = useState(false);
  const [currentResults, setCurrentResults] = useState<typeof sampleResults>([]);
  const [animatingCount, setAnimatingCount] = useState(false);

  const { addMultipleToCollection } = useCollection();

  const handleGachaCountChange = (value: number[]) => {
    setAnimatingCount(true);
    setGachaCount(value);
    setTimeout(() => setAnimatingCount(false), 300);
  };

  const handleGacha = () => {
    // 隨機選取扭蛋結果
    const shuffled = [...sampleResults].sort(() => Math.random() - 0.5);
    const results = shuffled.slice(0, gachaCount[0]);
    setCurrentResults(results);
    setShowResult(true);

    // 自動收藏到圖鑑
    const itemsToAdd = results.map(result => ({
      title: result.title,
      description: result.description,
      category: result.category,
      county: selectedCounty,
      duration: result.duration,
    }));
    addMultipleToCollection(itemsToAdd);
  };

  const handleMapClick = (title: string) => {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(title)}`, "_blank");
  };

  return (
    <PageLayout>
      <div className="flex flex-col min-h-full">
        {/* Tab Bar */}
        <TabBar 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === "gacha") setShowResult(false);
          }}
        />

        <div className="flex-1 page-padding pt-6 pb-4 overflow-y-auto">
          {/* Items tab */}
          {activeTab === "items" && <ItemBox />}
          
          {/* Collection tab */}
          {activeTab === "collection" && <CollectionContent />}
          
          {/* Gacha tab */}
          {activeTab === "gacha" && (
            <>
              {!showResult ? (
                <div className="section-spacing animate-fade-in">
                  {/* Country selector */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">選擇國家</label>
                    <div className="relative">
                      <button
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="w-full flex items-center justify-between p-4 bg-card rounded-2xl border border-border shadow-soft btn-press"
                      >
                        <span className="text-foreground font-medium">{selectedCountry}</span>
                        <ChevronDown className={`w-5 h-5 text-muted transition-transform duration-200 ${showCountryDropdown ? "rotate-180" : ""}`} />
                      </button>
                      {showCountryDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl border border-border shadow-elevated z-50 overflow-hidden animate-scale-in max-h-60 overflow-y-auto">
                          {Object.keys(countries).map((country) => (
                            <button
                              key={country}
                              onClick={() => {
                                setSelectedCountry(country);
                                setSelectedCounty(countries[country][0]);
                                setShowCountryDropdown(false);
                              }}
                              className={`w-full p-4 text-left hover:bg-secondary transition-colors flex items-center justify-between ${
                                selectedCountry === country ? "bg-secondary text-primary font-medium" : "text-foreground"
                              }`}
                            >
                              {country}
                              {selectedCountry === country && <Check className="w-4 h-4 text-primary" />}
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
                        className="w-full flex items-center justify-between p-4 bg-card rounded-2xl border border-border shadow-soft btn-press"
                      >
                        <span className="text-foreground font-medium">{selectedCounty}</span>
                        <ChevronDown className={`w-5 h-5 text-muted transition-transform duration-200 ${showCountyDropdown ? "rotate-180" : ""}`} />
                      </button>
                      {showCountyDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl border border-border shadow-elevated z-50 overflow-hidden animate-scale-in max-h-60 overflow-y-auto">
                          {countries[selectedCountry]?.map((county) => (
                            <button
                              key={county}
                              onClick={() => {
                                setSelectedCounty(county);
                                setShowCountyDropdown(false);
                              }}
                              className={`w-full p-4 text-left hover:bg-secondary transition-colors flex items-center justify-between ${
                                selectedCounty === county ? "bg-secondary text-primary font-medium" : "text-foreground"
                              }`}
                            >
                              {county}
                              {selectedCounty === county && <Check className="w-4 h-4 text-primary" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Gacha count slider */}
                  <div className="space-y-4 bg-card rounded-2xl p-5 border border-border shadow-soft">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">扭蛋次數</label>
                      <span className={`text-2xl font-bold text-primary transition-transform duration-300 ${animatingCount ? 'animate-bounce-number' : ''}`}>
                        {gachaCount[0]} 次
                      </span>
                    </div>
                    <Slider
                      value={gachaCount}
                      onValueChange={handleGachaCountChange}
                      min={5}
                      max={12}
                      step={1}
                      className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-medium [&_[role=slider]]:w-6 [&_[role=slider]]:h-6 [&_.relative]:bg-secondary [&_[data-orientation=horizontal]>.bg-primary]:bg-primary"
                    />
                    <div className="flex justify-between text-xs text-muted">
                      <span>5</span>
                      <span>12</span>
                    </div>
                  </div>

                  {/* Gacha button */}
                  <Button
                    onClick={handleGacha}
                    size="lg"
                    className="w-full h-16 text-lg font-bold rounded-2xl shadow-elevated bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
                  >
                    開始扭蛋！
                  </Button>
                </div>
              ) : (
                <div className="animate-fade-in section-spacing">
                  {/* Result header */}
                  <div className="text-center">
                    <img
                      src={mibuLogo}
                      alt="Mibu"
                      className="w-14 h-14 mx-auto mb-3 object-contain rounded-xl shadow-soft"
                    />
                    <span className="text-sm font-bold text-foreground tracking-widest">MIBU</span>
                    <h2 className="text-2xl font-bold text-foreground mt-2">{selectedCounty}</h2>
                    <p className="text-sm text-muted">
                      正在探索 <span className="text-primary font-medium">{selectedCountry}</span>
                    </p>
                    <p className="text-sm text-primary mt-2 font-medium">
                      ✨ 已自動收藏 {currentResults.length} 個地點到圖鑑
                    </p>
                  </div>

                  {/* Main area map link */}
                  <button
                    onClick={() => handleMapClick(`${selectedCountry}${selectedCounty}`)}
                    className="w-full py-3.5 bg-card rounded-xl text-sm text-primary flex items-center justify-center gap-2 border border-border shadow-soft hover:shadow-medium transition-all duration-200 active:scale-[0.98]"
                  >
                    <MapPin className="w-4 h-4" />
                    在 Google 地圖中查看
                  </button>

                  {/* Trip cards */}
                  <div className="space-y-4">
                    {currentResults.map((result, index) => (
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
                    size="lg"
                    className="w-full h-14 text-base font-bold rounded-2xl shadow-medium"
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
