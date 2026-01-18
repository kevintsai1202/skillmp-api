/**
 * SkillsMP API Key 設定腳本
 * 用於設定 .env 檔案中的 API Key
 * 
 * 用法: node scripts/setup.js <api_key>
 * 
 * 參數:
 *   api_key - SkillsMP API Key (必填)
 */

const fs = require('fs');
const path = require('path');

/**
 * 驗證 API Key 格式
 * @param {string} apiKey - 要驗證的 API Key
 * @returns {boolean} 是否為有效格式
 */
function isValidApiKeyFormat(apiKey) {
    // SkillsMP API Key 格式: sk_live_skillsmp_...
    return /^sk_live_skillsmp_[a-zA-Z0-9]+$/.test(apiKey);
}

/**
 * 建立或更新 .env 檔案
 * @param {string} apiKey - 要儲存的 API Key
 */
function setupEnvFile(apiKey) {
    const envPath = path.resolve(__dirname, '..', '.env');
    const envContent = `# SkillsMP API 設定
SKILLSMP_API_KEY=${apiKey}
`;

    try {
        fs.writeFileSync(envPath, envContent, 'utf8');
        console.log('✅ API Key 設定成功！');
        console.log(`📁 已儲存至: ${envPath}`);
        console.log('');
        console.log('現在您可以執行搜尋腳本：');
        console.log('  node scripts/search.js "關鍵字"');
        console.log('  node scripts/ai-search.js "查詢內容"');
    } catch (error) {
        console.error('❌ 寫入 .env 檔案失敗:', error.message);
        process.exit(1);
    }
}

/**
 * 主程式入口
 */
function main() {
    const args = process.argv.slice(2);

    // 檢查必填參數
    if (args.length === 0) {
        console.log('SkillsMP API Key 設定工具');
        console.log('');
        console.log('用法: node scripts/setup.js <api_key>');
        console.log('');
        console.log('如何取得 API Key:');
        console.log('  1. 前往 https://skillsmp.com 並登入/註冊帳號');
        console.log('  2. 進入 https://skillsmp.com/settings/api 取得您的 API Key');
        console.log('  3. API Key 格式為 sk_live_skillsmp_...');
        console.log('');
        console.log('範例:');
        console.log('  node scripts/setup.js sk_live_skillsmp_您的金鑰');
        process.exit(1);
    }

    const apiKey = args[0];

    // 驗證 API Key 格式
    if (!isValidApiKeyFormat(apiKey)) {
        console.error('❌ API Key 格式無效');
        console.error('   正確格式: sk_live_skillsmp_...');
        console.error('   您輸入的: ' + apiKey);
        process.exit(1);
    }

    // 設定 .env 檔案
    setupEnvFile(apiKey);
}

// 執行主程式
main();
