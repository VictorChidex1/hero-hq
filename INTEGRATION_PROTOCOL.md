PROJECT DOCUMENTATION: Hero HQ Integration Protocol
Target System: WordPress (Apache Server) Source System: React (Vite/Firebase) Deployment Strategy: Subdirectory Static Hosting Client Constraint: Zero "Ongoing Management Fees" / Centralized Hosting

🛑 PHASE 0: CRITICAL PRE-REQUISITE
INSTRUCTION TO AI AGENT: Before executing any step in this protocol, you must ingest and analyze the entire current codebase of the Hero HQ application.

Context Required: You must understand the folder structure, vite.config.js, package.json, and the Routing architecture (react-router-dom).

Goal: Ensure no file path, asset import, or API call is broken during the reconfiguration. Do not hallucinate file paths. Read the actual source.

PHASE 1: Architecture Overview
We are deploying this Single Page Application (SPA) built with React/Vite into a subfolder of a client's existing WordPress server.

The "Mothership": canmancan.com (WordPress).

The "Module": canmancan.com/careers (Our React App).

The Backend: Google Firebase (Auth/Firestore) remains the invisible data layer.

Conflict Resolution: WordPress and React run in parallel. They share the domain but do not share session logic. WordPress handles its own auth; React handles Firebase auth via LocalStorage.

PHASE 2: Local Configuration (The "Base" Path)
Objective: Teach React that it no longer lives at the root (/) but in a subdirectory.

1. Modify vite.config.js Locate the configuration file. Update the base property to match the target folder name exactly.

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/careers/', // <--- CRITICAL: Must match the folder name on the server
})

2. Modify Router (App.jsx or main.jsx) Ensure react-router-dom knows about the base path so navigation works.
// If using BrowserRouter
<BrowserRouter basename="/careers">
  <App />
</BrowserRouter>

PHASE 3: Server Routing (The Rewrite Rule)
Objective: Prevent 404 errors when a user refreshes a sub-page (e.g., /careers/apply).

Create a file named .htaccess in the public folder (or create it manually in the dist folder after building). It must contain exactly this code:
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /careers/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /careers/index.html [L]
</IfModule>

Logic: This tells the Apache server, "If you can't find the specific file requested, just load index.html and let React handle the routing."

------

PHASE 4: The Build Process
Objective: Compile the code for production.

Open Terminal.

Run Command: npm run build

Verify: Check the dist folder.

Open dist/index.html in a text editor.

Ensure script and style tags look like <script src="/careers/assets/..." (Correct) and NOT <script src="/assets/..." (Incorrect).

------

PHASE 5: Deployment (Handover)
Objective: Move files to the client server.

Zip: Compress the contents of the dist folder into careers.zip.

Upload: Log in to Client's cPanel/FTP.

Target: Navigate to public_html. Create a new folder named careers.

Extract: Upload careers.zip into this folder and extract it.

Result: The file structure on the server should look like:

public_html/careers/index.html

public_html/careers/assets/

public_html/careers/.htaccess

------

PHASE 6: Backend Security (Firebase)
Objective: Allow the new domain to talk to the database.

Go to Firebase Console -> Authentication -> Settings -> Authorized Domains.

Add Domain: canmancan.com

Reason: If skipped, login attempts will fail with an "Unauthorized Domain" error because Firebase protects against domain spoofing.

------
PHASE 7: Maintenance & Bug Fixes
Objective: How to handle future edits without breaking the site.

Rule: NEVER edit files directly on the WordPress server.

Edit: Make changes locally in VS Code.

Test: Run npm run dev locally.

Build: Run npm run build to generate a fresh dist package.

Replace: Delete the old files in the server's careers folder and upload the new build.
```
