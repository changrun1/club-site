# 程式設計社網站部署指南

## 🚀 GitHub Pages 部署步驟

### ⚠️ 重要：先啟用 GitHub Pages
**在推送程式碼之前，必須先手動啟用 GitHub Pages！**

### 1. 啟用 GitHub Pages
1. 前往 GitHub 倉庫 `https://github.com/changrun1/club-site`
2. 點擊 **Settings** 標籤
3. 在左側選單中找到 **Pages**
4. 在 **Source** 中選擇 **GitHub Actions**
5. 點擊 **Save**

### 2. 自動部署
啟用 Pages 後，每次推送到 `master` 分支，GitHub Actions 會自動：
- 安裝依賴
- 建置網站  
- 部署到 GitHub Pages

你可以在 **Actions** 標籤中查看部署狀態。

### 3. 故障排除
如果看到 "Get Pages site failed" 錯誤：
1. 確認已在 Settings → Pages 中啟用 GitHub Actions
2. 確認倉庫有 Pages 的寫入權限
3. 等待幾分鐘後重新觸發 workflow

### 4. 網站地址
部署完成後，網站地址為：
```
https://changrun1.github.io/club-site/
```

### 5. CMS 後台地址
CMS 後台地址為：
```
https://changrun1.github.io/club-site/admin/
```

## 📝 CMS 設置與使用

### 🔐 簡單認證設置（推薦）

使用 Decap CMS 官方認證服務，只需要設置 GitHub OAuth App：

#### 步驟 1: 建立 GitHub OAuth App
1. 前往 `https://github.com/settings/developers`
2. 點擊 **OAuth Apps → New OAuth App**
3. 填寫資訊：
   - **Application name**: `Club Site CMS`
   - **Homepage URL**: `https://changrun1.github.io/club-site/`
   - **Authorization callback URL**: `https://decapcms-oauth.netlify.app/callback`
4. 建立後記錄 **Client ID**

#### 步驟 2: 更新環境變數
由於我們使用 Decap CMS 的認證服務，不需要額外設置。

#### 步驟 3: 存取 CMS
1. 前往 `https://changrun1.github.io/club-site/admin/`
2. 點擊 **Login with GitHub**
3. 輸入你的 GitHub Client ID（第一次會要求）
4. 授權後即可管理內容

### 🛠️ 替代方案：自行架設認證

如果你想要更多控制權，可以：
1. 使用 Netlify Functions
2. 自己架設 OAuth 服務
3. 使用其他第三方服務

但對於大多數情況，官方認證服務已經足夠。

### CMS 認證流程
1. 前往 `https://changrun1.github.io/club-site/admin/`
2. 點擊 **Login with GitHub**
3. 授權 GitHub 存取
4. 完成後即可管理內容

## � CMS 功能總覽

### 可管理的內容：
- ✅ **網站設定** - 基本資訊、聯絡方式、社群媒體
- ✅ **首頁設定** - 橫幅、關於內容、特色功能
- ✅ **公告管理** - 社團公告發布與分類
- ✅ **活動管理** - 活動資訊、報名連結、狀態管理
- ✅ **專案展示** - 專案作品、GitHub 連結、技術標籤
- ✅ **成員管理** - 成員資料、職位、聯絡方式
- ✅ **資源管理** - 學習資源分享
- ✅ **頁面內容** - 關於我們、加入我們等靜態頁面

### 編輯流程：
1. 在 CMS 後台編輯內容
2. 儲存後會建立 Pull Request
3. 合併 PR 後，GitHub Actions 自動部署
4. 更新內容會即時反映在網站上

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
- [GitHub Pages 文檔](https://docs.github.com/pages/)