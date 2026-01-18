import { useState } from "react";
import TripCard from "@/components/TripCard";
import { useCollection } from "@/hooks/useCollection";

const CollectionContent = () => {
  const [expandedCounty, setExpandedCounty] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const { getGroupedByCounty, getTotalCount, getTotalCheckIns, toggleFavorite, toggleBlacklist, items } = useCollection();
  const collections = getGroupedByCounty();

  const handleMapClick = (title: string) => {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(title)}`, "_blank");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/');
  };

  // 根據 ID 取得項目狀態
  const getItemById = (id: string) => items.find(item => item.id === id);

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground mb-2">我的圖鑑</h1>
      <p className="text-sm text-muted mb-6">
        已收藏 <span className="text-primary font-medium">{getTotalCount()}</span> 個地點，
        共打卡 <span className="text-primary font-medium">{getTotalCheckIns()}</span> 次
      </p>

      {/* Empty state */}
      {collections.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">還沒有收藏任何地點</p>
          <p className="text-sm text-muted mt-1">去扭蛋探索新地點吧！</p>
        </div>
      )}

      {/* County list */}
      <div className="space-y-3">
        {collections.map((county) => (
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

                    {/* Category items - 增加右側和上方間距讓浮動按鈕有空間 */}
                    {expandedCategory === `${county.name}-${category.name}` && (
                      <div className="ml-4 mr-3 space-y-6 pt-3 animate-fade-in">
                        {category.items.map((item) => {
                          const currentItem = getItemById(item.id);
                          return (
                            <TripCard
                              key={item.id}
                              id={item.id}
                              date={formatDate(item.lastCollectedAt)}
                              duration={item.duration || ""}
                              category={item.category}
                              title={item.title}
                              description={item.description}
                              checkInCount={item.checkInCount}
                              showProgress={true}
                              showActions={true}
                              isFavorite={currentItem?.isFavorite || false}
                              isBlacklisted={currentItem?.isBlacklisted || false}
                              onToggleFavorite={toggleFavorite}
                              onToggleBlacklist={toggleBlacklist}
                              onMapClick={() => handleMapClick(item.title)}
                            />
                          );
                        })}
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
  );
};

export default CollectionContent;
