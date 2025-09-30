# 程式設計社網站部署指南

## 🚀 Netlify 部署步驟

### 1. 部署到 Netlify
1. 前往 [Netlify](https://app.netlify.com)
2. 點擊 "New site from Git"
3. 選擇 GitHub 並授權
4. 選擇 `changrun1/club-site` 倉庫
5. 設定部署參數：
   - **Branch**: `master`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. 點擊 "Deploy site"

### 2. 設置 Netlify Identity (CMS 認證)
1. 在 Netlify 專案儀表板中，前往 **Settings → Identity**
2. 點擊 "Enable Identity"
3. 在 **Registration preferences** 中選擇 "Invite only"
4. 在 **Git Gateway** 中點擊 "Enable Git Gateway"

### 3. 設置 CMS 管理員
1. 前往 **Identity → Invite users**
2. 輸入管理員 email 地址
3. 管理員會收到邀請信，點擊確認後設置密碼

### 4. 存取 CMS 後台
部署完成後，CMS 後台地址為：
```
https://[your-site-name].netlify.app/admin/
```

## 📝 CMS 功能

### 內容管理
- **公告管理**: 新增/編輯社團公告
- **活動管理**: 管理社團活動資訊
- **專案展示**: 展示社團專案作品
- **成員管理**: 管理社團成員資料
- **資源管理**: 學習資源分享
- **頁面管理**: 關於我們、加入我們等頁面
- **網站設定**: 基本設定、首頁橫幅、特色功能

### 編輯工作流程
- 支援草稿模式
- 內容審核機制
- 版本控制
- 即時預覽

## 🛠️ 本地開發

### 環境需求
- Node.js 18+
- npm 或 yarn

### 開發指令
```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build

# 預覽生產版本
npm run preview
```

### 本地 CMS 開發
```bash
# 安裝 Decap CMS CLI
npm install -g @decap/cli

# 啟動本地 CMS 後端
npx decap-server

# 在另一個終端啟動前端
npm run dev
```

本地 CMS 後台地址：`http://localhost:5173/admin/`

## 🔧 自訂設定

### 修改網站資訊
編輯 `content/settings/site.yml` 檔案：
- 社團名稱
- 聯絡資訊  
- 社群媒體連結

### 新增內容類型
修改 `public/admin/config.yml` 檔案來新增新的內容類型。

### 樣式自訂
- 主要樣式檔案：`src/styles/`
- 組件樣式：各 `.vue` 檔案中的 `<style>` 區塊

## 📞 技術支援

如有問題請聯絡技術團隊或查看：
- [Decap CMS 文檔](https://decapcms.org/docs/)
- [Vue 3 文檔](https://vuejs.org/)
- [Netlify 文檔](https://docs.netlify.com/)