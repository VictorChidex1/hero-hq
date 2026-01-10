# 🦅 Hero HQ: The CanMan Recruitment Portal

> **"We don't hire employees. We draft superheroes."**

Welcome to the internal source code for **Hero HQ**, a high-performance recruitment funnel designed to attract, qualify, and convert top-tier talent for **The CanMan**.

## 📖 About The Project

This is not a standard corporate careers page. It is a psychological "Recruitment Funnel" engineered to filter candidates based on culture fit before they even apply.

- **The Problem:** Traditional job applications are boring and attract generic applicants.
- **The Solution:** A high-octane, brand-heavy portal that sells the "Brotherhood" culture first, and the job second.
- **The Tech:** A lightning-fast SPA (Single Page Application) built for mobile-first engagement.

---

## ⚡ Tech Stack

We utilize a modern, type-safe stack designed for stability and speed.

- **Frontend**: React (Vite) + TypeScript
- **Styling**: Tailwind CSS (Custom Design System)
- **Backend / Database**: Firebase (Firestore)
- **File Storage**: Cloudinary (Optimized Resume Storage)
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Icons**: Lucide React

---

## 🏗️ Core Architecture

We follow strict **Component Composition** and **Mobile-First** principles.

### 1. The Dynamic Header (`Header.tsx`)

A smart navigation bar that adapts to user behavior.

- **Composition**: It is a pure container for `ServiceStrip` (Top Bar) and `Navbar` (Main Nav).
- **Behavior**: The top bar slides up and vanishes on scroll (`translate-y`), maximizing screen space for mobile users.

### 2. The Smart Dropzone (`FloatingForm.tsx`)

An interactive state machine for file uploads.

- **Logic**: Uses the `useUpload` hook to manage the lifecycle: `IDLE` -> `UPLOADING` -> `SUCCESS` | `ERROR`.
- **Safety**: Blocks form submission until the resume is successfully uploaded and verified.
- **Visuals**: Changes colors (Gray -> Green) and icons based on state.

### 3. The Recruitment Funnel (Content Strategy)

- **Hero Section**: High-impact imagery with a Brand Blue overlay (`bg-brand-blue/90`) to ensure text readability.
- **Culture Check (`About.tsx`)**: "We aren't a corporate machine." - Filters for culture fit.
- **Impact Proof (`Portfolio.tsx`)**: Dumps the "Project Gallery" for "Impact Stats" (e.g., 50,000+ Customers).

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/VictorChidex1/hero-hq.git
    cd hero-hq
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env.local` file in the root:

    ```env
    VITE_FIREBASE_API_KEY=your_key
    VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
    ```

4.  **Run Development Server:**

    ```bash
    npm run dev
    ```

5.  **Build for Production:**
    ```bash
    npm run build
    ```

---

## 📱 Mobile Optimization

This app is built **Mobile-First**.

- **Thumb-Friendly**: All touch targets are min 44px.
- **No Horizontal Scroll**: Global `overflow-x-hidden` protects against layout shifts.
- **Fold Optimization**: Hero padding is adjusted (`pt-24`) to bring CTAs "above the fold" on iPhone screens.

---

## 🏆 Credits

- **Lead Architect**: Victor Chidera (User)
- **AI Pair Programmer**: Antigravity (Google DeepMind)
- **Design Inspiration**: Kelvin's Grid, Modern SaaS Landings.
