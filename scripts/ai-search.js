/**
 * SkillsMP AI 語意搜尋腳本
 * 使用 AI 語意搜尋 SkillsMP 技能市場 (Cloudflare AI 驅動)
 * 
 * 用法: node ai-search.js <query>
 * 
 * 參數:
 *   query - AI 搜尋查詢 (必填)
 */

// API 設定
const API_BASE_URL = 'https://skillsmp.com';
const API_KEY = 'sk_live_skillsmp_7WDzBELUzXWmts0pt6666YbJBJWFbDLFFVR3wtXYRys';

/**
 * 執行 AI 語意搜尋
 * @param {string} query - AI 搜尋查詢
 * @returns {Promise<Object>} 搜尋結果
 */
async function aiSearchSkills(query) {
    // 建立 URL 參數
    const params = new URLSearchParams({
        q: query
    });

    const url = `${API_BASE_URL}/api/v1/skills/ai-search?${params.toString()}`;

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
        console.error('錯誤: 請提供 AI 搜尋查詢');
        console.error('用法: node ai-search.js <query>');
        process.exit(1);
    }

    // 合併所有參數作為查詢字串（支援空格）
    const query = args.join(' ');

    console.log(`正在進行 AI 語意搜尋: "${query}"`);
    console.log('---');

    const result = await aiSearchSkills(query);

    // 輸出結果
    console.log(JSON.stringify(result, null, 2));
}

// 執行主程式
main();
