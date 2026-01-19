# Mibu 設計系統交接文檔

## 一、品牌核心理念

**專案名稱**：Mibu（旅遊圖鑑收集 App）

**設計風格**：溫暖咖啡棕主題（Warm Coffee Brown Theme）
- **氛圍**：親和、柔軟、舒適
- **靈感來源**：日系可愛風格、圓潤設計
- **目標用戶**：喜歡探索、收集的旅遊愛好者

**品牌調性**：
- 溫暖而不刺眼
- 可愛而不幼稚
- 簡潔而有層次

---

## 二、色彩系統（HSL 格式）

### 主要顏色

| 變數名 | HSL 值 | HEX | 用途 |
|--------|--------|-----|------|
| `--background` | 40 33% 97% | #FBF8F3 | 暖奶油色背景 |
| `--foreground` | 30 24% 29% | #5D4E37 | 深棕色文字 |
| `--primary` | 30 22% 44% | #8B7355 | 咖啡棕主色（按鈕、重點） |
| `--accent` | 28 45% 59% | #C4956A | 焦糖橘強調色 |
| `--card` | 35 30% 93% | #F5EFE6 | 卡片淺米色 |
| `--muted` | 30 12% 58% | #A39585 | 暖灰色次要文字 |
| `--border` | 30 20% 87% | #E5DDD0 | 邊框顏色 |
| `--destructive` | 0 100% 95% | #FFE5E5 | 軟粉紅警示背景 |

### 等級專屬顏色（圖鑑系統）

| 等級 | 顏色 | 說明 |
|------|------|------|
| Lv.1 普通 | Primary 咖啡棕 | 基礎等級 |
| Lv.2 銅級 | `amber-600` | 銅色邊框 |
| Lv.3 銀級 | `gray-400` | 銀色邊框+光環 |
| Lv.4 金級 | `yellow-500` | 金色邊框+發光陰影 |
| Lv.5 鑽石 | `cyan-400 → blue-500` | 漸層+雙層光環 |

---

## 三、字體設計

```css
font-family: 'Rounded Mplus 1c', 'Noto Sans TC', system-ui, -apple-system, sans-serif;
```

- **主字體**：Rounded Mplus 1c（圓潤日系字體）
- **備用字體**：Noto Sans TC（繁體中文支援）
- **風格目標**：友善、可愛、易讀

---

## 四、圓角系統

| 類別 | 值 | 用途 |
|------|-----|------|
| `rounded-sm` | 8px | 小型元素 |
| `rounded-md` | 12px | 中型按鈕 |
| `rounded-lg` | 16px（基準） | 卡片、輸入框 |
| `rounded-xl` | 20px | 大型卡片 |
| `rounded-2xl` | 24px | 彈窗、Modal |
| `rounded-3xl` | 28px | 特殊裝飾元素 |

---

## 五、陰影系統

所有陰影使用 **棕色調** 而非純黑色，與整體配色融合：

```css
--shadow-soft: 0 2px 8px -2px hsl(30 20% 20% / 0.08), 
               0 1px 2px -1px hsl(30 20% 20% / 0.04);

--shadow-medium: 0 4px 16px -4px hsl(30 20% 20% / 0.12), 
                 0 2px 4px -2px hsl(30 20% 20% / 0.06);

--shadow-elevated: 0 12px 32px -8px hsl(30 20% 20% / 0.16), 
                   0 4px 8px -4px hsl(30 20% 20% / 0.08);
```

| 等級 | 類別 | 使用場景 |
|------|------|---------|
| 輕 | `shadow-soft` | 卡片預設狀態 |
| 中 | `shadow-medium` | 懸停狀態 |
| 重 | `shadow-elevated` | 浮動元素、Modal |

---

## 六、動畫系統

### 基礎動畫

| 動畫名 | 效果 | 時長 | 用途 |
|--------|------|------|------|
| `fade-in` | 淡入+上移 10px | 0.3s | 頁面載入、元素出現 |
| `scale-in` | 縮放 0.95→1 | 0.2s | 彈窗開啟 |
| `slide-up` | 上滑 20px | 0.4s | 內容載入 |
| `bounce-soft` | 輕微上下彈跳 | 2s 循環 | 吸引注意 |
| `wiggle` | 左右搖晃 ±3° | 0.5s | 成就解鎖提示 |
| `bounce-number` | 縮放 1→1.2 | 0.3s | 數字變化 |
| `pulse-soft` | 透明度 1→0.7 | 2s 循環 | 載入指示 |
| `shimmer` | 光澤滑過 | 2s 循環 | 進度條、載入骨架 |

### 互動效果

```css
/* 按鈕點擊 */
.btn-press {
  @apply transition-all duration-150 active:scale-[0.97] active:brightness-[0.97];
}

/* 卡片懸停 */
.card-hover {
  @apply transition-all duration-200 hover:-translate-y-0.5;
  box-shadow: var(--shadow-soft);
}
.card-hover:hover {
  box-shadow: var(--shadow-medium);
}

/* 互動元素浮起 */
.interactive-lift {
  @apply transition-transform duration-200 hover:-translate-y-1;
}
```

---

## 七、頁面功能與設計規範

### 1. 首頁 (HomePage)

**路徑**：`/` → `src/pages/HomePage.tsx`

**功能**：
- 用戶等級與經驗值卡片（點擊進入成就頁）
- 每日任務進度顯示（DailyQuests 組件）
- 公告區塊（最新公告、快閃活動、節慶活動）
- 每日登入連續天數顯示

**設計要點**：
- 頂部 Logo + 問候語
- 進度卡片使用 `card-hover` 互動效果
- 公告根據類型使用不同左邊框顏色（`border-l-4`）

---

### 2. 抽卡頁 (GachaPage)

**路徑**：`/gacha` → `src/pages/GachaPage.tsx`

**功能**：
- 選擇國家 → 選擇縣市
- 抽卡動畫（搖晃效果）
- 結果展示（TripCard）
- 查看歷史記錄

**設計要點**：
- 「正在探索」區塊順序：
  1. Logo 圖片
  2. 品牌名 "MIBU"
  3. 小字「正在探索 {國家}」
  4. 大標題 `{縣市}`
- 抽卡按鈕使用 `btn-press` + Primary 色
- 結果卡片根據稀有度顯示不同邊框

---

### 3. 圖鑑頁 (CollectionPage)

**路徑**：`/collection` → `src/pages/CollectionPage.tsx`

**功能**：
- Tab 切換：Gacha（抽卡）/ Collection（圖鑑）
- 縣市 → 分類 雙層手風琴展開
- 收集進度顯示
- 點擊地點開啟 Google Maps

**設計要點**：
- 使用 `Collapsible` 組件
- TripCard 顯示等級進度與邊框
- 空狀態使用 muted 色文字

---

### 4. 地圖頁 (MapPage)

**路徑**：`/map` → `src/pages/MapPage.tsx`

**功能**：
- 國家列表與狀態顯示
- 解鎖/募資中/即將推出/鎖定 四種狀態
- 全球統計數據
- 支援專案 CTA

**設計要點**：
- 國旗 emoji + 國家名稱
- 狀態徽章使用不同背景色：
  - 已解鎖：`bg-green-100 text-green-700`
  - 募資中：`bg-blue-100 text-blue-700`
  - 即將推出：`bg-amber-100 text-amber-700`
  - 鎖定：`bg-muted/50 text-muted`
- 募資進度條

---

### 5. 規劃頁 (PlannerPage)

**路徑**：`/planner` → `src/pages/PlannerPage.tsx`

**功能**：
- Tab 切換：Map / Chat
- 底部 Sheet：行程表 / 建立行程
- 購買流程：選擇國家 → 縣市 → 區域 → 天數 → 日期
- 價格計算與確認

**設計要點**：
- 頂部三按鈕導航（Map / Itinerary / Chat）
- Sheet 使用圓角 `rounded-t-3xl`
- 購買按鈕使用 Primary 色

---

### 6. 成就頁 (AchievementsPage)

**路徑**：`/achievements` → `src/pages/AchievementsPage.tsx`

**功能**：
- 用戶等級與經驗值顯示
- Tab 切換：Daily / Onetime / Cumulative / Levels
- 成就卡片與進度
- 等級獎勵列表

**設計要點**：
- 使用 `ExperienceBar` 顯示進度
- 成就卡片使用 `AchievementCard` 組件
- 已解鎖成就使用 `wiggle` 動畫

---

### 7. 個人資料頁 (ProfilePage)

**路徑**：`/profile` → `src/pages/ProfilePage.tsx`

**功能**：
- 頭像選擇（Dialog）
- 基本資訊：暱稱、姓名、性別、生日
- 旅遊偏好標籤
- 個人禁忌 / 醫療史 / 緊急聯絡人
- 儲存變更

**設計要點**：
- 頭像使用圓形 + 編輯按鈕
- 偏好標籤使用可選擇的 chip 樣式
- 輸入框使用圓角 `rounded-lg`

---

### 8. 商家端頁面

#### Dashboard (`/merchant`)
- 商家名稱與選擇
- 功能選單（Analytics、Stores、Products、Profile）
- 登出按鈕

#### Analytics (`/merchant/analytics`)
- 數據圖表
- 時間範圍篩選

#### Stores (`/merchant/stores`)
- 店家列表
- 狀態標籤（active/pending）
- 新增店家按鈕

#### Products (`/merchant/products`)
- 商品列表
- 分類篩選
- 庫存狀態顏色（正常/低庫存/缺貨）

#### Coupons (`/merchant/coupons`)
- 優惠券列表
- 稀有度樣式（普通/稀有/史詩/傳說）
- 狀態篩選

#### Profile (`/merchant/profile`)
- 商家資訊編輯
- 營業文件
- 帳號設定
- 危險區域（刪除帳號）

---

## 八、核心組件規範

### TripCard（地點卡片）

**路徑**：`src/components/TripCard.tsx`

**Props**：
```typescript
interface TripCardProps {
  title: string;
  description?: string;
  category?: string;
  duration?: string;
  checkInCount?: number;      // 決定等級
  showProgress?: boolean;     // 顯示等級進度
  isFavorite?: boolean;
  isBlacklisted?: boolean;
  showActions?: boolean;      // 顯示操作按鈕
  onFavorite?: () => void;
  onBlacklist?: () => void;
  onClick?: () => void;
}
```

**等級系統**：
| 等級 | 打卡次數 | 邊框顏色 |
|------|---------|---------|
| Lv.1 普通 | 0-4 | Primary |
| Lv.2 銅級 | 5-14 | amber-600 |
| Lv.3 銀級 | 15-29 | gray-400 + 光環 |
| Lv.4 金級 | 30-49 | yellow-500 + 發光 |
| Lv.5 鑽石 | 50+ | cyan-400→blue-500 漸層 |

---

### LevelBadge（等級徽章）

**路徑**：`src/components/LevelBadge.tsx`

**Props**：
```typescript
interface LevelBadgeProps {
  level: number;              // 1-99
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;         // 顯示階段名稱
}
```

**階段劃分**：
| 等級範圍 | 階段名稱 | 漸層色 |
|---------|---------|--------|
| 1-9 | 新手旅人 | 咖啡棕 |
| 10-19 | 初級探險家 | 銅色 |
| 20-29 | 資深冒險者 | 銀色 |
| 30-49 | 傳說旅者 | 金色 |
| 50+ | 世界大師 | 鑽石漸層 |

---

### ExperienceBar（經驗值條）

**路徑**：`src/components/ExperienceBar.tsx`

**Props**：
```typescript
interface ExperienceBarProps {
  current: number;
  max: number;
  level?: number;
  size?: 'sm' | 'md' | 'lg';
}
```

**特效**：
- 進度條使用 Primary 色填充
- 包含 `shimmer` 光澤動畫
- 顯示百分比或數值

---

### DailyQuests（每日任務）

**路徑**：`src/components/DailyQuests.tsx`

**功能**：
- 顯示每日任務列表
- 完成狀態勾選
- 獎勵領取

---

### AchievementCard（成就卡片）

**路徑**：`src/components/AchievementCard.tsx`

**功能**：
- 成就圖標與名稱
- 進度條（累計型）
- 解鎖狀態

---

## 九、佈局與導航

### PageLayout（頁面佈局）

**路徑**：`src/components/layout/PageLayout.tsx`

**結構**：
```
┌─────────────────────────┐
│ Safe Area Top           │
├─────────────────────────┤
│ Header（選用）          │
├─────────────────────────┤
│                         │
│ Main Content            │
│ (滾動區域)              │
│                         │
├─────────────────────────┤
│ BottomNav               │
├─────────────────────────┤
│ Safe Area Bottom        │
└─────────────────────────┘
```

---

### BottomNav（底部導航）

**路徑**：`src/components/layout/BottomNav.tsx`

**導航項目**：
| 圖標 | 標籤 | 路徑 |
|------|------|------|
| Home | 首頁 | `/` |
| Sparkles | 抽卡 | `/gacha` |
| BookOpen | 圖鑑 | `/collection` |
| Map | 地圖 | `/map` |
| User | 個人 | `/profile` |

**樣式**：
- 當前頁面：Primary 色 + 填充圖標
- 其他頁面：Muted 色

---

## 十、響應式與原生適配

### Safe Area 處理

```css
.safe-area-top {
  padding-top: env(safe-area-inset-top);
}
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
```

### 行動裝置優先

- 設計基準：375px 寬度
- 最大寬度限制：`max-w-md`（448px）
- 觸控優化：最小點擊區域 44×44px

### Capacitor 原生支援

**設定檔**：`capacitor.config.ts`

支援平台：
- iOS
- Android

---

## 十一、任務追蹤系統

### QuestTrackingContext

**路徑**：`src/contexts/QuestTrackingContext.tsx`

**功能**：
- 追蹤每日任務完成狀態
- 追蹤一次性任務完成狀態
- 解鎖成就獎勵

**任務類型**：
- 每日任務：每天重置
- 一次性任務：完成後永久記錄
- 累計任務：累計次數達標

---

## 十二、使用這份文檔的提示

### 給下一個 AI 的提示範例

```
我要建立一個新的旅遊圖鑑 App，請參考以下設計規範：

[貼上這份完整文檔]

請依照這個設計系統實作以下功能：
1. [具體功能需求]
2. [具體功能需求]

注意事項：
- 使用 React + Tailwind CSS + TypeScript
- 所有顏色使用 HSL 格式的 CSS 變數
- 遵循圓角、陰影、動畫規範
- 保持溫暖咖啡棕的品牌調性
```

### 關鍵設計原則

1. **色彩一致性**：永遠使用 CSS 變數，不直接寫顏色值
2. **圓角統一**：卡片用 `rounded-xl`，按鈕用 `rounded-lg`
3. **陰影層次**：預設 `shadow-soft`，懸停 `shadow-medium`
4. **動畫克制**：只在必要時使用動畫，避免過度
5. **觸控友善**：所有可點擊元素至少 44×44px

---

## 版本資訊

- **文檔版本**：1.0
- **最後更新**：2025 年 1 月
- **技術棧**：React 18 + Vite + Tailwind CSS + TypeScript + Capacitor
