Project Textbook: "HERO HQ" – Serverless Recruitment Portal
Abstract
HERO HQ is a dedicated recruitment landing page for The CanMan. It serves as a high-performance "audition stage" for potential hires.

Unlike standard forms, this project converts Cade’s email requirements into a Serverless React Application. It utilizes a "Floating Card" UI architecture to create depth and a state-driven "Smart Dropzone" to make the file upload process feel premium.

Core Objective: transform a generic "Apply" process into a brand experience that reflects The CanMan’s core value: Ridiculous Hospitality.

Tech Stack:

Frontend: React (Vite) + TypeScript.

Styling: Tailwind CSS (v3.4).

Backend: Firebase (Firestore + Storage).

Hosting: Firebase Hosting.

Chapter 1: The "Cade" Specification Map
This section translates the client's email requirements into technical components.

1.1 Global Navigation (The Header)
Requirement: Logo (Top-Left) + Links (About Us, Our Work, Contact).

Implementation:

Background: White or Transparent (Sticky on scroll).

Logo: The acquired "CanMan" SVG/PNG.

Links: Smooth scroll anchors (e.g., #about, #portfolio, #contact).

Mobile: Hamburger menu for smaller screens.

1.2 The Main Banner (The Hook)
Requirement: Headline "Join Our Creative Team!", Subhead, CTA Button.

Implementation:

Background: Solid Brand Blue (#0f6fb7) with subtle texture or gradient.

Typography: White text, bold Sans-Serif (Inter/Montserrat).

CTA Button: Brand Green (#6c9817) pill-shaped button. Hover effect: brightness-110.

1.3 Content Sections
About Us:

Content: Mission statement ("Ridiculous Hospitality"), Culture check.

Layout: Two-column grid (Text Left, Image/Icon Right).

Portfolio/Skills:

Content: Prompt to showcase work.

Interaction: This section will lead directly into the Contact Form logic.

1.4 The Engine (Contact & Upload)
Requirement: Name, Email, Message, File Upload.

Implementation: A unified form handling text input and binary file upload simultaneously.

1.5 Footer
Requirement: Contact info, socials, copyright.

Implementation: Dark Gray (#1f2937) background. Simple clean links.

Chapter 2: UI/UX Design System (The "Funnel" Logic)
This is the specific elaboration on the "Floating Card" and "Dropzone" architecture.

2.1 The "Floating Card" Architecture
To create a modern, high-depth look, the Form does not sit below the Hero section. It sits on top of the boundary line.

Visual Blueprint:

Layer 1 (Hero Background): A solid block of Hero Blue (#0f6fb7) taking up the top 45% of the viewport.

Layer 2 (The Overlap): The Application Form is containerized in a white card with shadow-2xl.

The CSS Trick:

The Form container uses a Negative Top Margin (e.g., -margin-top: 5rem).

This pulls the form up into the Blue Banner.

Result: The form straddles the line between the Blue Banner and the White Body.

2.2 The Smart Dropzone (State Logic)
The file upload component (react-dropzone) has three distinct visual states to provide feedback to the user.

State A: IDLE (The Invitation)
Trigger: Default state when page loads.

Visual:

Border: dashed, border-gray-300, border-2.

Background: bg-gray-50.

Icon: UploadCloud (Lucide-React), color text-gray-400.

Text: "Drag & Drop your Resume here" (Subtext: "PDF or DOCX, max 5MB").

State B: ACTIVE (The Reaction)
Trigger: User drags a file over the browser window.

Visual:

Border: solid, Brand Green (#6c9817), border-2.

Background: bg-green-50 (Very light tint).

Icon: ArrowDownCircle, color Brand Green (#6c9817).

Animation: The icon triggers a slight "bounce" animation.

Text: "Drop it!" (Bold).

State C: SUCCESS (The Confirmation)
Trigger: File passes validation and is accepted by the browser.

Visual:

Border: solid, border-green-500, border-1.

Background: White.

Icon: FileText (Lucide-React), color text-blue-600.

Text: Displays the actual filename (e.g., resume.pdf) + "Ready to upload".

Decorator: A solid Green Checkmark badge in the corner.

Chapter 3: Data Architecture (Firebase)
3.1 The "Two-Step" Submission Flow
To ensure speed, we separate the heavy file upload from the light data submission.

Step 1: The Blob Upload (Storage)

When user clicks "Submit":

The file is uploaded to Firebase Storage path: /resumes/2026/[uuid]\_[filename]

Firebase returns a public downloadUrl.

Step 2: The Record Creation (Firestore)

Once downloadUrl is received, we create a document in the applicants collection:

{
"name": "User Input",
"email": "User Input",
"message": "User Input",
"resume_url": "https://firebasestorage.googleapis.com/...",
"status": "new",
"timestamp": "serverTimestamp()"
}

Chapter 4: Branding Assets (Acquired)
Primary Green: #6c9817 (Used for Success States, Buttons).

Brand Blue: #0f6fb7 (Used for Hero Backgrounds, Headers).

Accent Yellow: #fcc23f (Used for subtle highlights/badges).

Fonts: Inter or Roboto (Clean, Sans-Serif).
