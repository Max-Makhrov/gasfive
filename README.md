# 👋🏼Welcome to Google Apps Script ES-5 Local Dev Engine

# Project Setup Guide

## Installation Steps

1. **Clone the Repository:**
   - Open Terminal (or PowerShell on Windows)
   - Run: `git clone https://github.com/Max-Makhrov/gasfive.git --branch v1 MyNewProject`
   - Move to project directory: `cd MyNewProject`
   - Open in VS Code: `code .`

2. **Setup in VS Code:**
   - Run: `npm install`
   - Build: `npm run build` (wait for completion)
   - Update project ID in `.clasp.json`
     - Use `script.new` URL for standalone scripts.
   - Initialize Git: `git init`

3. **Version Control:**
   - Set GitHub origin: 
     - `git remote set-url origin https://github.com/Max-Makhrov/gasfive`
   - Use short branch names:
     - `git checkout -b "v1"`
     - `git push origin v1`
   - Verify the setup on GitHub.

## Tips & Best Practices

- **File Structure:** Keep code clean by following a 1 file = 1 function rule.
- **Type Imports:** Combine imports into one line; they're removed in the build for GAS.
- **Private Functions:** End names with "_", e.g., `testJsEngine_`.
- **JSDoc Comments:** Use them for parameters.
- **Function Usage:** Prefer functions over classes for compatibility and autocomplete.
- **Testing:** Use Vitest for tests. Sample command: `npm run test test\Sample\code.test.js --watch`
- **Project Configuration:** 
  - In `clasp.json`, set `"rootDir":".\\dist"` and place `appsscript.json` there to use one GAS folder.
- **Utilities:** 
  - Use `clasp open` if you lose the App Script URL.
  - Use `console.info` for key logs. Remove `console.log` before deploying.
- **Testing Single Files:** Faster to test individual files if needed.
- **Version Control:** 
  - Save every build: 
    - `git add .`
    - `git commit -m "comment"`
    - `git push origin v1`