🧠 Project Context: HERO HQ (Serverless Recruitment Portal)
📌 Project Overview
We are building a High-Velocity Recruitment Funnel for The CanMan, a premium service business in Texas.

Goal: Replace clunky email attachments with a frictionless, mobile-first application where candidates can apply and upload resumes instantly.

Core Value: "Ridiculous Hospitality." The UI must feel helpful, fast, and energetic—matching the brand's superhero mascot.

Constraint: 48-Hour Sprint. Must be ready for review by Monday Morning.

Platform: Firebase Hosting (Single Page Application).

🤝 AI Collaboration Protocol (Strict)

1. PERMISSION FIRST: You must always ask for explicit permission before adding new dependencies (npm packages) or changing the core architecture (e.g., switching from Firestore to a SQL DB).

2. THE "WHY" RULE: Before suggesting any code, you must explain the business logic:

The Risk: What happens if we do it the "lazy" way? (e.g., "If we just use a standard file input, mobile users might get confused.")

The Value: What is the premium benefit? (e.g., "Using react-dropzone gives immediate visual feedback, increasing conversion.")

🛠 Tech Stack (Strict)
Frontend: React (Vite) + TypeScript.

Styling: Tailwind CSS (v3.4). LIGHT MODE ONLY.

State Management: React Hooks (useState, useEffect) + useUpload custom hook.

Backend: Firebase (Client SDK).

Database: Cloud Firestore (NoSQL) for applicant metadata.

Storage: Firebase Storage for PDF/Docx files.

Routing: React Router DOM (v6).

Notifications: sonner (Toast notifications).

🎨 Design System (Strict)
Theme: "The Superhero Palette" (Clean, Vibrant, Trustworthy). NO DARK MODE. The site must feel like a clean, professional office.

Background: White (#ffffff) or Light Gray (gray-50) for contrast.

Brand Blue: Hero Blue (brand-blue / #0f6fb7)

Usage: Header Backgrounds, Hero Sections, Primary Text.

Concept: Trust, Service, Reliability.

Primary Action: CanMan Green (brand-green / #6c9817)

Usage: "Apply Now" Buttons, Success States, Checkmarks, Active Dropzones.

Concept: Freshness, "Go", Success.

Accent: Power Yellow (brand-yellow / #fcc23f)

Usage: Subtle badges, highlights, or the "Mascot" energy.

Typography:

Headings: Inter (Bold/ExtraBold). Clean and legible.

Body: Inter (Regular).

UI Architecture (The "Floating Card"):

The Form component must Negative Margin (-mt-20) upwards into the Blue Hero Header.

It must use shadow-2xl to create depth.

🏗 Architecture & Data Flow
The "Secure Upload" Pattern: We strictly separate the File (Blob) from the Data (JSON).

Step 1: The Upload (Storage)

User drops file -> React validates size (<5MB) & type (PDF/Doc).

React uploads directly to Firebase Storage: /resumes/YYYY/[uuid]\_[filename].

Result: We get a secure downloadURL.

Step 2: The Record (Firestore)

React takes the downloadURL + Form Data (Name, Email).

React writes a new document to applicants collection.

Result: A clean database record linking to the file.

📝 Coding Guidelines
TypeScript: Strictly typed. No any. Define interfaces for Applicant, UploadState.

Validation:

Client-Side First: Don't let the user upload a 50MB video. Block it in the browser to save bandwidth costs.

Error Handling:

Use sonner toasts.

Success: "Resume Received! We'll be in touch."

Error: "Upload failed. Please try a smaller PDF."

📂 Folder Structure
/src

/components/ui <-- Reusable atoms (Button, Input, Dropzone).

/components/layout <-- Navbar, Footer.

/hooks <-- useUpload.ts (Logic for Firebase Storage).

/lib <-- firebase.ts (Init).

/pages <-- Home.tsx (The Landing Page).

💬 Code Commenting Standards (Strict)
Goal: Code should explain the Business Intent, not the syntax.

BAD: // Upload the file

GOOD: // We upload to Storage FIRST to get the URL, ensuring we don't create a database record without a valid file attached.

BAD: // Margin top negative 20

GOOD: // Negative margin pulls the card up into the Hero Blue section to create the 'Floating' effect requested by client.
