# 程式設計社網站

> 使用 Vue 3 + TypeScript + Vite 構建的現代化學生社團網站，集成 Decap CMS 內容管理系統

## 🌟 功能特色

- **現代化設計**: 使用 Vue 3 + TypeScript + Vite 技術棧
- **響應式布局**: 支持各種設備尺寸的完美顯示
- **內容管理**: 集成 Decap CMS，支持可視化內容編輯
- **GitHub Pages**: 自動部署到 GitHub Pages
- **多語言支持**: 完整的繁體中文本地化

## 🚀 快速開始

### 本地開發

1. **安裝依賴**
   ```bash
   npm install
   ```

2. **啟動開發服務器**
   ```bash
   npm run dev
   ```

3. **啟動 CMS 本地後端** (新終端)
   ```bash
   npx decap-server
   ```

4. **訪問網站**
   - 主網站: http://localhost:5173
   - CMS 管理: http://localhost:5173/admin

### 生產部署

網站會自動通過 GitHub Actions 部署到 GitHub Pages:
- 網站地址: https://changrun1.github.io/club-site/
- CMS 管理: https://changrun1.github.io/club-site/admin

## 🚨 重要修正

此版本已修正以下問題：

### ✅ 路由問題
- 添加 `404.html` 處理 GitHub Pages SPA 路由
- 刷新頁面不再顯示 404 錯誤

### ✅ Footer Overflow 問題  
- 修正 Footer 樣式防止內容溢出
- 添加 `overflow-x: hidden` 防止水平滾動
- 改善響應式設計和文字換行

### ✅ CMS 認證問題
- 配置 `local_backend: true` 用於本地開發
- 簡化認證流程，避免複雜的 OAuth 配置

## 📝 內容管理

### CMS 使用方式

**本地開發** (推薦):
1. 運行 `npx decap-server`
2. 訪問 http://localhost:5173/admin
3. 無需登錄，直接編輯內容

**生產環境**:
- 訪問線上 CMS 需要 GitHub 認證
- 如遇認證問題，請使用本地開發模式

### 內容類型

- **活動管理**: 社團活動資訊
- **專案展示**: 技術專案展示
- **成員管理**: 社團成員資料
- **網站設定**: 基本資訊和社群連結
- **最新公告**: 重要公告通知

## 🛠️ 技術架構

- **Vue 3**: 前端框架
- **TypeScript**: 類型安全
- **Vite**: 構建工具
- **Decap CMS**: 內容管理
- **GitHub Pages**: 靜態部署
- **SCSS**: 樣式預處理

## 📞 支持

如遇問題：
1. 查看本 README 文檔
2. 檢查 [Issues](https://github.com/changrun1/club-site/issues)
3. 創建新 Issue 描述問題

---

**快速連結**:
- 🌐 [網站首頁](https://changrun1.github.io/club-site/)
- ⚙️ [CMS 管理](https://changrun1.github.io/club-site/admin)
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
