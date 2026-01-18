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

## API Key

腳本已內建 API Key，可直接執行。
