# SkillsMP API Skill

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

A universal skill for searching and discovering AI skills from the [SkillsMP](https://skillsmp.com) marketplace. Compatible with all AI agents that support the SKILL format (Claude, Cursor, Windsurf, Antigravity, etc.).

## ✨ Features

- 🔍 **Keyword Search** - Fast keyword-based search of the SkillsMP library
- 🤖 **AI Semantic Search** - Intelligent semantic search powered by Cloudflare AI
- 📦 **Install Helper** - Automatically generate skill installation commands

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- [SkillsMP](https://skillsmp.com) account and API Key

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Key

#### Option 1: Using Setup Script (Recommended)

```bash
node scripts/setup.js <YOUR_API_KEY>
```

#### Option 2: Create .env File Manually

Copy `.env.example` to `.env` and add your API Key:

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
SKILLSMP_API_KEY=sk_live_skillsmp_xxxxxxxxxx
```

> **📍 Get Your API Key**  
> Visit the [SkillsMP API Settings](https://skillsmp.com/settings/api) page to obtain your API Key

## 📖 Usage

### Keyword Search

```bash
node scripts/search.js "<keyword>" [page] [per_page] [sort]
```

**Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| keyword | ✓ | Search keyword |
| page | | Page number, default: 1 |
| per_page | | Items per page, default: 20, max: 100 |
| sort | | `stars` or `recent` |

**Examples:**

```bash
# Basic search
node scripts/search.js "SEO"

# With pagination and sorting
node scripts/search.js "web scraper" 1 10 stars
```

### AI Semantic Search

Use natural language for intelligent searching:

```bash
node scripts/ai-search.js "<query>"
```

**Examples:**

```bash
node scripts/ai-search.js "How to create a web scraper"
node scripts/ai-search.js "skills for building REST APIs"
```

### Install Helper

Search for skills and get installation command suggestions:

```bash
node scripts/install-helper.js "<keyword>" [limit]
```

**Examples:**

```bash
# Search for Spring Boot related skills
node scripts/install-helper.js "spring boot"

# Show top 10 results
node scripts/install-helper.js "react" 10
```

## 📂 Project Structure

```
skillmp-api/
├── scripts/
│   ├── search.js         # Keyword search script
│   ├── ai-search.js      # AI semantic search script
│   ├── install-helper.js # Installation helper tool
│   └── setup.js          # API Key setup script
├── .env.example          # Environment variables example
├── .gitignore            # Git ignore file
├── package.json          # Project configuration
├── SKILL.md              # Skill documentation (for AI agents)
└── README.md             # This file
```

## 🔧 Skill Installation Workflow

> ⚠️ **Note**  
> SkillsMP skill IDs cannot be used directly with `npx add-skill`. Follow these steps:

1. **Search for skills**
   ```bash
   node scripts/install-helper.js "spring boot"
   ```

2. **Find the repository** - Use the GitHub search link from the output

3. **List available skills**
   ```bash
   npx add-skill <owner>/<repo> --list
   ```

4. **Install the skill**
   ```bash
   # Global installation
   npx add-skill <owner>/<repo> --skill "<skill-name>" -g -y
   
   # Project-local installation
   npx add-skill <owner>/<repo> --skill "<skill-name>" -y
   ```

## 📦 API Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    "skills": [...]
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
```

## 🔐 Security Notes

- The `.env` file contains sensitive information and is excluded from Git via `.gitignore`
- Never share or expose your API Key publicly

## 🌐 Compatibility

This skill is compatible with all AI agents that support the SKILL format:

- **Claude** (Anthropic)
- **Cursor**
- **Windsurf**
- **Antigravity** (Google DeepMind)
- And more...

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

## 🔗 Related Links

- [SkillsMP Website](https://skillsmp.com)
- [SkillsMP API Documentation](https://skillsmp.com/docs/api)
- [add-skill CLI](https://www.npmjs.com/package/add-skill)
