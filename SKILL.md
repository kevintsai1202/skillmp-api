---
name: SkillsMP API
description: Search and discover AI skills from the SkillsMP marketplace
---

# SkillsMP API Skill

This skill provides search functionality for the SkillsMP skill marketplace, supporting both keyword search and AI semantic search.

## Prerequisites

- **Node.js** 18 or higher
- **SkillsMP API Key** from [skillsmp.com/settings/api](https://skillsmp.com/settings/api)

## Installation

First-time setup requires installing Node.js dependencies:

```bash
cd <skill-directory>
npm install
```

> [!NOTE]
> This step only needs to be run once. Check if `node_modules` directory exists before running.

## API Key Configuration

### Check if API Key is configured

Before running any search script, check if `.env` file exists:

```bash
# Check if .env exists
test -f .env && echo "Configured" || echo "Not configured"
```

### Setup API Key

**Option 1: Using setup script (Recommended)**

```bash
node scripts/setup.js <API_KEY>
```

**Option 2: Create .env file directly**

Create a `.env` file with the following content:

```env
SKILLSMP_API_KEY=sk_live_skillsmp_xxxxxxxxxx
```

> [!TIP]
> Get your API Key from [SkillsMP API Settings](https://skillsmp.com/settings/api)

---

## Features

### 1. Keyword Search

Search the skill library using keywords.

**Usage:**
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

---

### 2. AI Semantic Search

Use AI-powered semantic search (Cloudflare AI).

**Usage:**
```bash
node scripts/ai-search.js "<query>"
```

**Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| query | ✓ | Natural language query |

**Examples:**
```bash
node scripts/ai-search.js "How to create a web scraper"
node scripts/ai-search.js "skills for building REST APIs"
```

---

### 3. Install Helper

Search skills and get installation command suggestions.

**Usage:**
```bash
node scripts/install-helper.js "<keyword>" [limit]
```

**Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| keyword | ✓ | Skill keyword to search |
| limit | | Number of results to show, default: 5 |

**Examples:**
```bash
node scripts/install-helper.js "spring boot"
node scripts/install-helper.js "react" 10
```

**Output includes:**
- Skill name, author, stars, description
- GitHub search link to find the repository
- Installation command instructions

---

## Skill Installation Workflow

> [!IMPORTANT]
> SkillsMP skill IDs cannot be used directly with `npx add-skill`.
> Follow these steps to install a skill:

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
   # For global installation
   npx add-skill <owner>/<repo> --skill "<skill-name>" -g -y
   
   # For project-local installation
   npx add-skill <owner>/<repo> --skill "<skill-name>" -y
   ```

---

## Response Format

**Success Response:**
```json
{
  "success": true,
  "data": {
    "skills": [...]
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
```

---

## Agent Workflow

When a user requests SkillsMP search functionality:

1. **Check if `.env` exists**
   - If exists → Run search script directly
   - If not → Guide user through setup

2. **Guide user to get API Key**
   - Direct user to https://skillsmp.com/settings/api
   - Ask user to provide the API Key

3. **Configure API Key**
   - Use `setup.js` script or create `.env` file
   - Verify setup before running search

> [!CAUTION]
> The `.env` file contains sensitive information and is excluded from Git.
> Never share or expose your API Key publicly.
