import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, Sparkles } from "lucide-react";
import mibuCollection1 from "@/assets/mibu-collection-1.png";

const countries = ["日本", "台灣", "韓國", "泰國"];
const cities: Record<string, string[]> = {
  "日本": ["東京", "大阪", "京都", "北海道"],
  "台灣": ["台北", "台中", "高雄", "花蓮"],
  "韓國": ["首爾", "釜山", "濟州島"],
  "泰國": ["曼谷", "清邁", "普吉島"],
};

const GachaPage = () => {
  const [activeTab, setActiveTab] = useState<"gacha" | "collection">("gacha");
  const [selectedCountry, setSelectedCountry] = useState("日本");
  const [selectedCity, setSelectedCity] = useState("東京");
  const [gachaCount, setGachaCount] = useState([1]);
  const [showResult, setShowResult] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const handleGacha = () => {
    setShowResult(true);
    setTimeout(() => setShowResult(false), 3000);
  };

  return (
    <PageLayout>
      <div className="px-4 pt-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("gacha")}
            className={`flex-1 py-3 px-4 rounded-2xl text-sm font-medium transition-all btn-press ${
              activeTab === "gacha"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-foreground border border-border"
            }`}
          >
            🎰 扭蛋
          </button>
          <button
            onClick={() => setActiveTab("collection")}
            className={`flex-1 py-3 px-4 rounded-2xl text-sm font-medium transition-all btn-press ${
              activeTab === "collection"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-foreground border border-border"
            }`}
          >
            📚 圖鑑
          </button>
        </div>

        {activeTab === "gacha" ? (
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
                  <ChevronDown className={`w-5 h-5 text-muted transition-transform ${showCountryDropdown ? "rotate-180" : ""}`} />
                </button>
                {showCountryDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl border border-border shadow-lg z-10 overflow-hidden animate-scale-in">
                    {countries.map((country) => (
                      <button
                        key={country}
                        onClick={() => {
                          setSelectedCountry(country);
                          setSelectedCity(cities[country][0]);
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

            {/* City selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">選擇城市</label>
              <div className="relative">
                <button
                  onClick={() => setShowCityDropdown(!showCityDropdown)}
                  className="w-full flex items-center justify-between p-4 bg-card rounded-2xl border border-border btn-press"
                >
                  <span className="text-foreground">{selectedCity}</span>
                  <ChevronDown className={`w-5 h-5 text-muted transition-transform ${showCityDropdown ? "rotate-180" : ""}`} />
                </button>
                {showCityDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl border border-border shadow-lg z-10 overflow-hidden animate-scale-in">
                    {cities[selectedCountry]?.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setShowCityDropdown(false);
                        }}
                        className={`w-full p-4 text-left hover:bg-secondary transition-colors ${
                          selectedCity === city ? "bg-secondary text-primary font-medium" : "text-foreground"
                        }`}
                      >
                        {city}
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
              <Sparkles className="w-6 h-6 mr-2" />
              開始扭蛋！
            </Button>

            {/* Gacha info */}
            <p className="text-center text-xs text-muted">
              消耗 {gachaCount[0] * 10} 金幣
            </p>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {/* Collection grid preview */}
            <div className="text-center py-8">
              <img
                src={mibuCollection1}
                alt="Mibu 收藏"
                className="w-full max-w-sm mx-auto rounded-2xl shadow-lg"
              />
              <p className="text-muted mt-4">點擊「圖鑑」頁面查看完整收藏</p>
            </div>
          </div>
        )}

        {/* Result modal */}
        {showResult && (
          <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 animate-fade-in">
            <Card className="w-80 rounded-3xl shadow-2xl animate-scale-in">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🎊</div>
                <h3 className="text-xl font-bold text-foreground mb-2">恭喜獲得！</h3>
                <div className="w-32 h-32 mx-auto bg-secondary rounded-2xl mb-4 flex items-center justify-center">
                  <span className="text-5xl">🗼</span>
                </div>
                <p className="text-foreground font-medium">東京鐵塔</p>
                <p className="text-sm text-muted mt-1">日本・東京</p>
                <Button
                  onClick={() => setShowResult(false)}
                  className="mt-6 w-full rounded-xl bg-primary text-primary-foreground btn-press"
                >
                  太棒了！
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default GachaPage;