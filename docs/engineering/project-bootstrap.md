# Project Bootstrap

# Purpose

This document defines:
- initial project setup
- dependency installation
- Git workflow
- development conventions
- MVP startup sequence

This setup is optimized for:
- autonomous agents
- smaller LLMs
- fast MVP execution

---

# 1. Create Project

## Recommended

```bash
npm create plasmo@latest quickfill
```

OR

```bash
pnpm create plasmo quickfill
```

---

# 2. Enter Project

```bash
cd quickfill
```

---

# 3. Install Core Dependencies

## Runtime

```bash
npm install zustand fuse.js
```

---

## Styling

```bash
npm install -D tailwindcss postcss autoprefixer
```

---

# 4. Initialize Tailwind

```bash
npx tailwindcss init -p
```

---

# 5. Recommended Project Structure

```text
quickfill/
├── docs/
├── public/
├── src/
│   ├── background/
│   ├── content/
│   ├── overlay/
│   ├── vault/
│   ├── matcher/
│   ├── dom/
│   ├── events/
│   ├── state/
│   ├── shared/
│   ├── types/
│   ├── hooks/
│   ├── config/
│   └── styles/
├── package.json
├── tsconfig.json
└── plasmo.config.ts
```

---

# 6. Recommended TypeScript Settings

## tsconfig.json

Requirements:
- strict mode enabled
- noImplicitAny enabled
- consistent casing enabled

---

# Recommended

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

# 7. Tailwind Setup

## tailwind.config.ts

Add:
```text
src/**/*.{ts,tsx}
```

to content paths.

---

# 8. Global CSS

## Create

```text
src/styles/globals.css
```

---

## Add

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

# 9. Git Initialization

## Initialize Git

```bash
git init
```

---

# 10. Recommended .gitignore

## Create

```text
.gitignore
```

---

## Add

```gitignore
node_modules
build
dist
.plasmo
.cache
.DS_Store
.env
```

---

# 11. First Commit

## Recommended

```bash
git add .
git commit -m "initial project setup"
```

---

# 12. Development Commands

## Start Dev Server

```bash
npm run dev
```

---

## Build Extension

```bash
npm run build
```

---

# 13. Chrome Extension Loading

## Steps

1. Open Chrome
2. Navigate:
```text
chrome://extensions
```
3. Enable:
```text
Developer Mode
```
4. Click:
```text
Load unpacked
```
5. Select:
```text
build/chrome-mv3-dev
```

---

# 14. Recommended Git Workflow

# Rule 1 — Commit After Every Phase

After each implementation phase:

```bash
git add .
git commit -m "phase-x complete"
```

---

# Example

```bash
git commit -m "vault engine implemented"
```

---

# Rule 2 — Small Commits Only

Avoid:
```text
huge multi-feature commits
```

Prefer:
```text
one module per commit
```

---

# Rule 3 — Stable Main Branch

Recommended branches:

```text
main
dev
feature/*
```

---

# 15. Recommended Commit Sequence

```text
initial setup
shared types
vault engine
dom engine
matcher engine
overlay ui
event engine
keyboard navigation
fill integration
add key modal
save selection flow
ux polish
```

---

# 16. Recommended Testing Strategy

# After Every Phase

Validate:
- TypeScript passes
- extension loads
- no runtime errors
- Chrome console clean

---

# Important

Smaller models often:
- introduce silent errors
- break imports
- duplicate types

Validate aggressively.

---

# 17. Recommended Autonomous Agent Workflow

# Correct Workflow

```text
1. Give single implementation prompt
2. Review generated code
3. Test manually
4. Commit changes
5. Continue to next phase
```

---

# Wrong Workflow

```text
Build complete extension end-to-end.
```

This usually causes:
- architecture drift
- broken coupling
- hallucinated abstractions

---

# 18. Critical MVP Constraints

DO NOT ADD:
- AI logic
- cloud sync
- backend
- encryption systems
- autonomous workflows

during MVP implementation.

---

# 19. MVP Success Milestone

The first true milestone is:

```text
Focus input
→ popup opens
→ suggestions visible
→ enter fills value
```

If this works reliably:
- architecture is validated
- UX direction is validated
- future AI path remains open

---

# 20. Recommended Early Test Sites

Test against:
- plain HTML forms
- React apps
- signup forms
- onboarding forms
- job application portals

---

# 21. Highest Risk Area

Most important technical validation:

```text
React-safe input filling
```

Validate early.

---

# 22. Recommended Development Priorities

Priority order:

```text
1. Reliability
2. Fast UX
3. Clean architecture
4. Keyboard navigation
5. Polish
6. AI later
```

---

# 23. Final Engineering Reminder

QuickFill should evolve like:

```text
Simple
    ↓
Reliable
    ↓
Fast
    ↓
Intelligent
```

NOT:

```text
Complex
    ↓
Fragile
    ↓
Slow
```

Ship the deterministic MVP first.