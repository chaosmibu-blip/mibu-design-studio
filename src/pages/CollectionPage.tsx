import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, MapPin } from "lucide-react";
import mibuCollection2 from "@/assets/mibu-collection-2.png";

const collections = [
  {
    country: "日本",
    cities: [
      { name: "東京", collected: 8, total: 15, icon: "🗼" },
      { name: "大阪", collected: 5, total: 12, icon: "🏯" },
      { name: "京都", collected: 3, total: 10, icon: "⛩️" },
      { name: "北海道", collected: 2, total: 8, icon: "❄️" },
    ],
  },
  {
    country: "台灣",
    cities: [
      { name: "台北", collected: 10, total: 12, icon: "🏙️" },
      { name: "台中", collected: 4, total: 8, icon: "☀️" },
      { name: "高雄", collected: 6, total: 10, icon: "🌊" },
    ],
  },
  {
    country: "韓國",
    cities: [
      { name: "首爾", collected: 4, total: 14, icon: "🎭" },
      { name: "釜山", collected: 2, total: 8, icon: "🌉" },
    ],
  },
];

const CollectionPage = () => {
  const totalCollected = collections.reduce(
    (acc, country) => acc + country.cities.reduce((sum, city) => sum + city.collected, 0),
    0
  );
  const totalItems = collections.reduce(
    (acc, country) => acc + country.cities.reduce((sum, city) => sum + city.total, 0),
    0
  );

  return (
    <PageLayout>
      <div className="px-4 pt-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">我的圖鑑</h1>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border">
            <span className="text-sm font-medium text-primary">{totalCollected}</span>
            <span className="text-sm text-muted">/ {totalItems}</span>
          </div>
        </div>

        {/* Featured collection image */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img
            src={mibuCollection2}
            alt="Mibu 收藏展示"
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-primary-foreground">
            <p className="text-sm opacity-90">本月精選</p>
            <p className="text-lg font-bold">世界各地的 Mibu</p>
          </div>
        </div>

        {/* Collections by country */}
        {collections.map((countryData) => (
          <div key={countryData.country} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-primary rounded-full" />
              <h2 className="text-lg font-semibold text-foreground">{countryData.country}</h2>
            </div>

            <div className="space-y-2">
              {countryData.cities.map((city) => (
                <Card
                  key={city.name}
                  className="rounded-2xl border-border shadow-sm card-hover cursor-pointer"
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-2xl">
                      {city.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{city.name}</span>
                        <MapPin className="w-3 h-3 text-muted" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${(city.collected / city.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted whitespace-nowrap">
                          {city.collected}/{city.total}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default CollectionPage;