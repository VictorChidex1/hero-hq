Architecture Decision Record: The Hybrid Integration Strategy
Project: Hero HQ / CanMan Careers Portal Date: January 2026 Status: Live / Production

1. The Context
   The client (CanMan) operates a WordPress environment (Avada Theme) on a shared hosting server. The new application ("Hero HQ") is a high-performance React Single Page Application (SPA).

Constraint: Direct hosting of React build files in the WordPress subfolder caused conflict with WordPress rewriting rules (.htaccess) and required unsafe SFTP access for updates.

Requirement: The client requires the app to be managed/installed via the WordPress Admin Dashboard.

2. The Solution: "Hybrid Iframe Integration"
   We have decoupled the Hosting from the Presentation.

The Backend (Host): Google Firebase Hosting.

Role: Serves the React application assets (JS/CSS) and handles routing/logic.

Benefit: Provides CDN speed, SSL security, and zero load on the client's WordPress server.

The Frontend (Presentation): WordPress "Connector" Plugin.

Role: A custom lightweight plugin (canman-integration) that defines a shortcode [canman_hq].

Mechanism: Renders a full-height, borderless <iframe> pointing to the Firebase URL.

3. The Deployment Workflow (CI/CD)
   This architecture creates a seamless update loop:

Development: Engineer pushes code updates to the React codebase.

Deployment: Engineer runs npm run build && npx firebase deploy.

Update: The content inside the WordPress iframe updates instantly.

Note: No file uploads, Zip files, or WordPress login is required for future updates.

4. Technical Specifications
   Plugin Name: CanMan HQ Portal

Shortcode: [canman_hq]

Target URL: https://canman-hero-hq.web.app/

Performance: Iframe includes loading="lazy" to protect the parent site's Core Web Vitals.

Security: The WordPress database and PHP backend are completely isolated from the React application logic.
