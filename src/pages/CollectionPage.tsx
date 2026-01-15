import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import TripCard from "@/components/TripCard";

interface CollectionItem {
  date: string;
  title: string;
  description?: string;
  category: string;
  checkInCount: number;
}

interface CategoryData {
  name: string;
  items: CollectionItem[];
}

interface CountyData {
  name: string;
  shortName: string;
  totalLocations: number;
  categories: CategoryData[];
}

const taiwanCollections: CountyData[] = [
  {
    name: "宜蘭縣",
    shortName: "宜",
    totalLocations: 603,
    categories: [
      {
        name: "美食",
        items: [
          { date: "2025/12/29", title: "楓情卡拉 ok", category: "美食", checkInCount: 3 },
          { date: "2025/12/29", title: "The Roof 190 星空酒吧", description: "城市高空賞星空，特調美酒伴夜色。適合情侶約會，或與摯友小酌。", category: "美食", checkInCount: 12 },
          { date: "2025/12/29", title: "牛媽媽軟心宜蘭餅", description: "獨創軟心宜蘭餅，口感綿密細緻。創新滋味，是下午茶或送禮的溫暖心意。", category: "美食", checkInCount: 28 },
          { date: "2025/12/29", title: "邂逅街冰淇淋·咖椰吐司·甜點咖啡專賣", description: "冰淇淋、咖椰吐司與咖啡香，甜蜜交織。適合午后約會，享受悠閒甜點時光。", category: "美食", checkInCount: 45 },
        ],
      },
      {
        name: "遊程體驗",
        items: [
          { date: "2025/12/28", title: "Healtdeva 赫蒂法莊園", description: "赫蒂法莊園歐風城堡，秒變公主！情侶閨蜜來打卡。", category: "遊程體驗", checkInCount: 52 },
        ],
      },
    ],
  },
  {
    name: "台北市",
    shortName: "台",
    totalLocations: 353,
    categories: [
      {
        name: "美食",
        items: [
          { date: "2025/12/28", title: "鼎泰豐", description: "世界知名小籠包，皮薄餡鮮。", category: "美食", checkInCount: 8 },
        ],
      },
    ],
  },
  {
    name: "高雄市",
    shortName: "高",
    totalLocations: 163,
    categories: [],
  },
  {
    name: "新北市",
    shortName: "新",
    totalLocations: 82,
    categories: [],
  },
  {
    name: "桃園市",
    shortName: "桃",
    totalLocations: 22,
    categories: [],
  },
  {
    name: "新竹縣",
    shortName: "竹",
    totalLocations: 22,
    categories: [],
  },
];

const CollectionPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"gacha" | "collection">("collection");
  const [expandedCounty, setExpandedCounty] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

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
                navigate("/gacha");
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
              onClick={() => setActiveTab("collection")}
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
          <h1 className="text-2xl font-bold text-foreground mb-6">我的圖鑑</h1>

          {/* County list */}
          <div className="space-y-3">
            {taiwanCollections.map((county) => (
              <div key={county.name} className="space-y-3">
                {/* County card */}
                <button
                  onClick={() => setExpandedCounty(expandedCounty === county.name ? null : county.name)}
                  className="w-full bg-card rounded-2xl border border-border p-4 flex items-center gap-4 btn-press"
                >
                  {/* Short name badge */}
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-primary-foreground">{county.shortName}</span>
                  </div>

                  {/* County info */}
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-foreground">{county.name}</h3>
                    <p className="text-sm text-muted">{county.totalLocations} 個地點</p>
                  </div>

                  {/* Expand arrow */}
                  <span className={`text-muted transition-transform ${expandedCounty === county.name ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>

                {/* Expanded categories */}
                {expandedCounty === county.name && county.categories.length > 0 && (
                  <div className="ml-4 space-y-3 animate-fade-in">
                    {county.categories.map((category) => (
                      <div key={category.name} className="space-y-3">
                        {/* Category header */}
                        <button
                          onClick={() => setExpandedCategory(
                            expandedCategory === `${county.name}-${category.name}` 
                              ? null 
                              : `${county.name}-${category.name}`
                          )}
                          className="flex items-center gap-3 w-full text-left"
                        >
                          <div className="w-1 h-6 bg-primary/40 rounded-full" />
                          <span className="font-medium text-foreground">{category.name}</span>
                          <span className="px-2 py-0.5 bg-secondary text-primary text-xs rounded-full">
                            {category.items.length}
                          </span>
                          <span className={`text-muted ml-auto transition-transform ${
                            expandedCategory === `${county.name}-${category.name}` ? "rotate-180" : ""
                          }`}>
                            ▼
                          </span>
                        </button>

                        {/* Category items */}
                        {expandedCategory === `${county.name}-${category.name}` && (
                          <div className="ml-4 space-y-3 animate-fade-in">
                            {category.items.map((item, index) => (
                              <TripCard
                                key={index}
                                date={item.date}
                                duration=""
                                category={item.category}
                                title={item.title}
                                description={item.description}
                                checkInCount={item.checkInCount}
                                showProgress={true}
                                onMapClick={() => handleMapClick(item.title)}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty state for counties with no items */}
                {expandedCounty === county.name && county.categories.length === 0 && (
                  <div className="ml-4 p-4 text-center text-muted text-sm animate-fade-in">
                    尚未收集任何地點
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CollectionPage;
