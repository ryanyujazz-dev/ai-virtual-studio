# CLAUDE.md - AI Virtual Studio

This file provides STRICT guidance to Claude Code when working with the ai-virtual-studio Next.js project.

## Project Overview

**AI Virtual Studio** is an AI-powered video creation SaaS platform prototype implementing Phase 0 with complete frontend functionality using simulated AI data.

**Current Status**: Fully functional prototype with mock AI system. No real backend integration.

**Tech Stack**:
- **Framework**: Next.js 16.1.6 with App Router
- **UI**: Tailwind CSS v4 + Shadcn UI + Framer Motion
- **State Management**: Zustand with persist middleware (localStorage)
- **Drag & Drop**: @dnd-kit/core & @dnd-kit/sortable
- **Icons**: Lucide React
- **Internationalization**: English/Chinese with server-side cookie detection

## Development Commands

```bash
npm run dev    # Start Next.js dev server (http://localhost:3000)
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Project Structure

```
ai-virtual-studio/
├── app/                              # Next.js App Router pages
│   ├── dashboard/                    # Project management dashboard
│   ├── editor/[id]/                  # Parallel NLE workspace
│   │   ├── step1/                    # Script Room - AI planning & script editing
│   │   ├── step2/                    # Scene Room - Scene generation & takes
│   │   ├── step3/                    # Final Room - Timeline composition & export
│   │   └── layout.tsx                # Editor layout with navigation
│   ├── settings/                     # User settings (language)
│   ├── layout.tsx                    # Root layout with language detection
│   └── page.tsx                      # Home/Landing page
├── components/                       # Reusable React components
│   ├── common/                       # Shared components
│   ├── dashboard/                    # Dashboard-specific components
│   └── editor/                       # Editor workflow components (EditorHeader, EditorTabNavigation)
├── lib/                              # Utility libraries
│   ├── mock-ai.ts                    # Mock AI script generation system
│   ├── translations.ts               # English/Chinese translation dictionaries
│   └── useTranslation.ts             # React hook for translations (t() function)
└── store/                            # Zustand state management
    ├── projectStore.ts               # Project data & workflow state
    └── types.ts                      # TypeScript interfaces
```

## 🚨 CORE ARCHITECTURE RED LINES (CRITICAL) 🚨

### 1. Parallel NLE Workspace (No Linear Wizard)

- The workflow consists of 3 parallel workspaces: Step 1 (Script), Step 2 (Scene), and Step 3 (Final).
- **NEVER** add sequential "Next Step" (下一步) or "Previous" buttons to navigate between these rooms.
- Navigation MUST strictly rely on the global `EditorTabNavigation` component (`[ 文案 | 画面 | 生成 ]`).
- The Top Right corner of the `EditorHeader` should only contain global actions like "Save" (Ghost button) or "Export" (Solid white button).

### 2. The Zinc Standard (Visual Guidelines)

- **Extreme Minimalism**: The product must look like a high-end, professional editing software (like Vercel or Linear).
- **Colors**: STRICTLY use the Tailwind Zinc palette (`bg-zinc-950` for root, `bg-zinc-900` for panels, `border-zinc-800`).
- **BANNED**: Absolutely NO high-saturation gradients (no purple/pink/blue blobs), NO colored background images, NO heavy glassmorphism, and NO bright accent buttons.
- **DO NOT use Material-UI (@mui) or Emotion.**
- **Buttons**: Primary buttons must be simple black-on-white (`bg-white text-black`). Secondary buttons must be transparent with borders (`border-zinc-800`).

### 3. Data Hierarchy & Flow

- **Step 1 (Script Room)**: Generates macro **`Scenes` (场景)**.
- **Step 2 (Scene Room)**: Manages micro **`Shots` (分镜)** under a specific Scene. Generates multiple **`Takes` (视频草稿)**.
- **Step 3 (Final Room)**: Automatically pulls all `Takes` that were marked as **Starred (★)** in Step 2 into the global timeline.

### 4. State Management (Zustand)

- **DO NOT hardcode** `enhancedProjects[0]`. Always use `useParams` to get the `[id]` from the URL and fetch the correct project data using `useProjectStore().getEnhancedProject(id)`.

## Core Architecture

### State Management Pattern

**Project Store** (`store/projectStore.ts`):
Manages enhancedProjects array with CRUD operations.

**Data Structure** (`store/types.ts`):
Defines Project, Scene, Take interfaces.

### Internationalization System

- Server-side language detection from cookies in `app/layout.tsx`
- Client-side language state via Zustand store (useLanguageStore)
- `useTranslation()` hook provides `t()` function mapping keys from TranslationKey type

## Development Notes (Phase 0)

- **No backend**: All data client-side only (localStorage via Zustand persist)
- **Mock AI**: Simulated operations with delays and skeleton screens
- **Duration Calculation**: Auto-calculate from voiceover word count (~0.33s per Chinese character, ~0.12s for English)
