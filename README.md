# 社團網站模板 (Club Website Template)

這是一個現代化的社團網站模板，採用 Vue 3 + TypeScript + Vite 技術棧開發，支援 Decap CMS 內容管理系統。

## 功能特色

### 🎯 核心功能
- **響應式設計** - 完美適配桌面、平板、手機
- **內容管理** - 整合 Decap CMS，無需技術背景即可管理內容
- **多語言準備** - 預留國際化支援架構
- **SEO 優化** - 支援 meta 標籤和語義化 HTML
- **無障礙設計** - 符合 WCAG 2.1 AA 標準

### 📱 頁面功能
- **首頁** - 社團介紹、最新消息、活動預告
- **關於我們** - 社團歷史、願景、組織架構
- **公告與消息** - 重要通知、活動資訊
- **活動** - 活動列表、活動詳情、報名資訊
- **專案** - 社團專案展示、成果分享
- **成員** - 幹部介紹、成員名單
- **資源** - 實用連結、下載資源
- **加入我們** - 入社申請、聯絡方式

### 🎨 設計特色
- **專業正式** - 適合學術組織和正式社團
- **色彩系統** - 藍色主調，傳達專業與信任
- **組件化** - 可重複使用的 UI 組件
- **設計系統** - 統一的間距、字體、顏色規範

## 技術架構

- **前端框架**: Vue 3 + Composition API
- **開發語言**: TypeScript
- **建置工具**: Vite
- **狀態管理**: Pinia
- **路由**: Vue Router 4
- **樣式**: SCSS + CSS 變數
- **內容管理**: Decap CMS
- **部署**: GitHub Pages + Cloudflare DNS

## 快速開始

### 1. 克隆專案
```bash
git clone <your-repo-url>
cd clubs
```

### 2. 安裝依賴
```bash
npm install
```

### 3. 啟動開發伺服器
```bash
npm run dev
```

### 4. 建置正式版本
```bash
npm run build
```

### 5. 預覽正式版本
```bash
npm run preview
```

## 目錄結構

```
src/
├── components/          # 組件
│   ├── base/           # 基礎 UI 組件
│   └── layout/         # 佈局組件
├── views/              # 頁面組件
├── stores/             # Pinia 狀態管理
├── styles/             # 樣式檔案
├── assets/             # 靜態資源
└── router/             # 路由配置

public/
└── admin/              # Decap CMS 管理介面
```

## 內容管理

### Decap CMS 設定
1. 設定 GitHub OAuth 應用程式
2. 更新 `public/admin/config.yml` 中的倉庫資訊
3. 部署到 GitHub Pages
4. 透過 `/admin/` 路徑進入管理介面

### 內容檔案位置
- 公告: `content/announcements/`
- 活動: `content/events/`
- 專案: `content/projects/`
- 頁面內容: `content/pages/`

## 自訂化指南

### 1. 品牌設定
編輯 `src/styles/variables.scss` 修改：
- 主要顏色
- 字體設定
- 間距規範

### 2. 網站設定
編輯 `src/stores/site.ts` 修改：
- 網站標題
- 聯絡資訊
- 社群媒體連結

### 3. 選單設定
編輯 `src/components/layout/AppHeader.vue` 修改導航選單

### 4. 頁面內容
- 修改 `src/views/` 下的各頁面組件
- 透過 Decap CMS 管理動態內容

## 部署設定

### GitHub Pages 部署
1. 在 GitHub 倉庫設定中啟用 Pages
2. 選擇 GitHub Actions 作為部署來源
3. 推送程式碼即可自動部署

### Cloudflare DNS
1. 在 Cloudflare 新增網域
2. 設定 CNAME 記錄指向 `<username>.github.io`
3. 啟用 HTTPS 和快取最佳化

## 貢獻指南

歡迎提交 Issue 和 Pull Request 來改善這個模板。

## 授權

MIT License - 詳見 [LICENSE](LICENSE) 檔案

## 技術支援

如有問題，請透過以下方式聯絡：
- 提交 GitHub Issue
- 查看[使用文件](docs/)
- 聯絡維護團隊
