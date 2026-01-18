---
name: SkillsMP API
description: 搜尋 SkillsMP 技能市場的 AI 技能庫
---

# SkillsMP API Skill

此 Skill 提供 SkillsMP 技能市場的搜尋功能，支援關鍵字搜尋和 AI 語意搜尋。

## 功能

### 1. 關鍵字搜尋
使用關鍵字搜尋技能庫。

**執行方式：**
```pwsh
node scripts/search.js "<搜尋關鍵字>" [頁碼] [每頁筆數] [排序方式]
```

**參數：**
| 參數 | 必填 | 說明 |
|------|------|------|
| 搜尋關鍵字 | ✓ | 要搜尋的關鍵字 |
| 頁碼 | | 頁碼，預設 1 |
| 每頁筆數 | | 每頁筆數，預設 20，最大 100 |
| 排序方式 | | `stars` 或 `recent` |

**範例：**
```pwsh
# 基本搜尋
node scripts/search.js "SEO"

# 指定分頁與排序
node scripts/search.js "web scraper" 1 10 stars
```

---

### 2. AI 語意搜尋
使用 AI 進行語意搜尋（Cloudflare AI 驅動）。

**執行方式：**
```pwsh
node scripts/ai-search.js "<搜尋查詢>"
```

**參數：**
| 參數 | 必填 | 說明 |
|------|------|------|
| 搜尋查詢 | ✓ | 自然語言查詢 |

**範例：**
```pwsh
node scripts/ai-search.js "How to create a web scraper"
```

---

## 回應格式

成功回應：
```json
{
  "success": true,
  "data": {
    "skills": [...]
  }
}
```

錯誤回應：
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "錯誤訊息"
  }
}
```

## API Key 設定

使用此 Skill 前，需要先設定您的 SkillsMP API Key。

### 首次使用檢查

執行任何搜尋腳本前，AI 代理應先檢查 `.env` 檔案是否存在：

```pwsh
Test-Path .env
```

如果回傳 `False`，代表尚未設定 API Key，請依照下方步驟引導使用者。

---

### 取得 API Key

1. 前往 [SkillsMP 官網](https://skillsmp.com) 並登入/註冊帳號
2. 進入 [API 設定頁面](https://skillsmp.com/settings/api) 取得您的 API Key
3. API Key 格式為 `sk_live_skillsmp_...`

---

### 設定方式

#### 方式一：使用設定腳本（推薦）

請使用者提供 API Key 後，執行：

```pwsh
node scripts/setup.js <使用者的API_KEY>
```

範例：
```pwsh
node scripts/setup.js sk_live_skillsmp_7WDzBELUzXWmts0pt6666YbJBJWFbDLFFVR3wtXYRys
```

#### 方式二：AI 代理直接建立 .env

如果使用者提供了 API Key，AI 代理可直接建立 `.env` 檔案：

```pwsh
@"
# SkillsMP API 設定
SKILLSMP_API_KEY=<使用者的API_KEY>
"@ | Out-File -FilePath .env -Encoding utf8
```

---

### AI 代理操作流程

當使用者要求使用 SkillsMP 搜尋功能時，AI 代理應：

1. **檢查 .env 是否存在**
   - 若存在 → 直接執行搜尋腳本
   - 若不存在 → 進入設定流程

2. **引導使用者取得 API Key**
   - 告知使用者前往 https://skillsmp.com/settings/api
   - 請使用者複製 API Key 並貼上

3. **設定 API Key**
   - 使用 `setup.js` 腳本或直接建立 `.env` 檔案
   - 確認設定成功後再執行搜尋

> [!IMPORTANT]
> `.env` 檔案包含敏感資訊，已被加入 `.gitignore`，不會上傳到 GitHub。
> 請妥善保管您的 API Key，切勿公開分享。
