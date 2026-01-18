/**
 * SkillsMP 關鍵字搜尋腳本
 * 使用關鍵字搜尋 SkillsMP 技能市場
 * 
 * 用法: node search.js <query> [page] [limit] [sortBy]
 * 
 * 參數:
 *   query  - 搜尋關鍵字 (必填)
 *   page   - 頁碼，預設 1
 *   limit  - 每頁筆數，預設 20，最大 100
 *   sortBy - 排序方式，可選 'stars' 或 'recent'
 */

// API 設定
const API_BASE_URL = 'https://skillsmp.com';
const API_KEY = 'sk_live_skillsmp_7WDzBELUzXWmts0pt6666YbJBJWFbDLFFVR3wtXYRys';

/**
 * 執行關鍵字搜尋
 * @param {string} query - 搜尋關鍵字
 * @param {number} page - 頁碼
 * @param {number} limit - 每頁筆數
 * @param {string} sortBy - 排序方式
 * @returns {Promise<Object>} 搜尋結果
 */
async function searchSkills(query, page = 1, limit = 20, sortBy = null) {
    // 建立 URL 參數
    const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: limit.toString()
    });

    // 加入可選的排序參數
    if (sortBy && ['stars', 'recent'].includes(sortBy)) {
        params.append('sortBy', sortBy);
    }

    const url = `${API_BASE_URL}/api/v1/skills/search?${params.toString()}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            error: {
                code: 'FETCH_ERROR',
                message: error.message
            }
        };
    }
}

/**
 * 主程式入口
 */
async function main() {
    const args = process.argv.slice(2);

    // 檢查必填參數
    if (args.length === 0) {
        console.error('錯誤: 請提供搜尋關鍵字');
        console.error('用法: node search.js <query> [page] [limit] [sortBy]');
        process.exit(1);
    }

    const query = args[0];
    const page = parseInt(args[1]) || 1;
    const limit = parseInt(args[2]) || 20;
    const sortBy = args[3] || null;

    console.log(`正在搜尋: "${query}"`);
    console.log(`參數: 頁碼=${page}, 每頁=${limit}, 排序=${sortBy || '預設'}`);
    console.log('---');

    const result = await searchSkills(query, page, limit, sortBy);

    // 輸出結果
    console.log(JSON.stringify(result, null, 2));
}

// 執行主程式
main();
