// 載入環境變數
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

/**
 * SkillsMP 技能安裝查詢腳本
 * 搜尋技能並提供安裝指令
 * 
 * 用法: node install-helper.js <query> [limit]
 * 
 * 參數:
 *   query - 搜尋關鍵字 (必填)
 *   limit - 顯示筆數，預設 5
 */

// API 設定
const API_BASE_URL = 'https://skillsmp.com';
const API_KEY = process.env.SKILLSMP_API_KEY;

// 檢查 API key 是否已設定
if (!API_KEY) {
    console.error('錯誤: 請設定環境變數 SKILLSMP_API_KEY');
    console.error('提示: 複製 .env.example 為 .env 並填入您的 API key');
    process.exit(1);
}

/**
 * 從 GitHub URL 解析 owner/repo
 * @param {string} githubUrl - GitHub 儲存庫 URL
 * @returns {Object|null} 包含 owner, repo 的物件
 */
function parseGitHubUrl(githubUrl) {
    if (!githubUrl) return null;

    // 格式: https://github.com/owner/repo/tree/branch/path
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return null;

    return {
        owner: match[1],
        repo: match[2],
        fullPath: `${match[1]}/${match[2]}`
    };
}

/**
 * 執行關鍵字搜尋
 * @param {string} query - 搜尋關鍵字
 * @param {number} limit - 每頁筆數
 * @returns {Promise<Object>} 搜尋結果
 */
async function searchSkills(query, limit = 5) {
    const params = new URLSearchParams({
        q: query,
        page: '1',
        limit: limit.toString(),
        sortBy: 'stars'
    });

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
 * 格式化輸出技能資訊
 * @param {Array} skills - 技能陣列
 */
function formatOutput(skills) {
    console.log('\n=== 搜尋結果 ===\n');

    // 收集所有唯一的儲存庫
    const repos = new Map();

    skills.forEach((skill, index) => {
        const parsed = parseGitHubUrl(skill.githubUrl);

        console.log(`【${index + 1}】${skill.name || skill.id}`);
        console.log(`    作者: ${skill.author}`);
        console.log(`    ⭐ Stars: ${skill.stars}`);
        if (skill.description) {
            const desc = skill.description.length > 80
                ? skill.description.substring(0, 80) + '...'
                : skill.description;
            console.log(`    說明: ${desc}`);
        }

        if (parsed) {
            console.log(`    GitHub: ${skill.githubUrl}`);
            console.log(`    安裝: npx add-skill ${parsed.fullPath} --list`);

            // 記錄儲存庫
            if (!repos.has(parsed.fullPath)) {
                repos.set(parsed.fullPath, []);
            }
            repos.get(parsed.fullPath).push(skill.name || skill.id);
        } else {
            console.log(`    SkillsMP: ${skill.skillUrl}`);
        }

        console.log('');
    });

    // 輸出快速安裝指令
    if (repos.size > 0) {
        console.log('=== 快速安裝指令 ===\n');

        repos.forEach((skillNames, repoPath) => {
            console.log(`# 儲存庫: ${repoPath}`);
            console.log(`# 列出所有技能:`);
            console.log(`npx add-skill ${repoPath} --list`);
            console.log('');
            console.log(`# 安裝全部技能:`);
            console.log(`npx add-skill ${repoPath} -g -a antigravity -y`);
            console.log('');
            if (skillNames.length > 0) {
                console.log(`# 安裝特定技能:`);
                skillNames.forEach(name => {
                    console.log(`npx add-skill ${repoPath} --skill "${name}" -g -a antigravity -y`);
                });
            }
            console.log('');
        });
    }
}

/**
 * 主程式入口
 */
async function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log('SkillsMP 技能安裝查詢工具');
        console.log('');
        console.log('用法: node install-helper.js <query> [limit]');
        console.log('');
        console.log('範例:');
        console.log('  node install-helper.js "spring boot"');
        console.log('  node install-helper.js "react" 10');
        process.exit(1);
    }

    const query = args[0];
    const limit = parseInt(args[1]) || 5;

    console.log(`正在搜尋: "${query}" (顯示前 ${limit} 筆，依 Stars 排序)`);

    const result = await searchSkills(query, limit);

    if (!result.success) {
        console.error('搜尋失敗:', result.error?.message || '未知錯誤');
        process.exit(1);
    }

    if (!result.data?.skills?.length) {
        console.log('找不到相關技能');
        process.exit(0);
    }

    formatOutput(result.data.skills);

    console.log(`總共找到 ${result.data.pagination.total} 個相關技能`);
}

// 執行主程式
main();
