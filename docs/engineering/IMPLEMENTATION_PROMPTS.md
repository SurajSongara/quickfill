# IMPLEMENTATION_PROMPTS.md

# Purpose

This document contains implementation prompts optimized for:
- autonomous coding agents
- smaller LLMs
- deterministic execution
- modular implementation

Prompts are intentionally:
- short
- scoped
- explicit
- dependency-aware

Avoid giving the full project to smaller models at once.

Instead:
- execute phase-by-phase
- validate after each phase
- keep prompts isolated

---

# Global Rules For Every Prompt

Use these rules in EVERY implementation prompt.

```text
Tech Stack:
- Plasmo
- React
- TypeScript
- Tailwind
- Zustand
- Fuse.js

Architecture Rules:
- UI components must not contain business logic
- All matching logic must stay inside matcher/
- All DOM interaction must stay inside dom/
- Shared types must come from src/types/
- Use strict TypeScript typing
- Keep components small and focused
- Use Zustand for global state
- Use chrome.storage.local for persistence
- Overlay must render using portal pattern

MVP Constraints:
- No AI
- No cloud sync
- No backend
- No auto-submit
- No autonomous filling
```

---

# PHASE 1 — Project Setup

# Prompt

```text
Setup a Plasmo Chrome extension project named QuickFill.

Requirements:
- TypeScript
- React
- TailwindCSS
- Zustand
- Fuse.js

Create folder structure:

src/
- background/
- content/
- overlay/
- vault/
- matcher/
- dom/
- events/
- state/
- shared/
- types/

Requirements:
- Content script should load successfully
- React overlay root should mount
- Tailwind should work
- Strict TypeScript enabled

Do not implement business logic yet.
Only project setup and structure.
```

---

# Expected Output

```text
- Project boots successfully
- Extension loads in Chrome
- Overlay root visible
```

---

# PHASE 2 — Shared Types

# Prompt

```text
Create shared TypeScript models for QuickFill.

Create:
- VaultEntry
- FieldContext
- SuggestionResult
- OverlayState
- SearchState

Requirements:
- Store all types inside src/types/
- Use strict typing
- No any types
- Export reusable interfaces/types

Do not implement logic yet.
```

---

# Expected Output

```text
Shared reusable types available globally.
```

---

# PHASE 3 — Vault Engine

# Prompt

```text
Implement Vault Engine for QuickFill.

Requirements:
- Use chrome.storage.local
- CRUD operations
- Strict TypeScript
- Store logic inside src/vault/

Implement:
- createEntry
- updateEntry
- deleteEntry
- getAllEntries
- getEntryById

Create Zustand vaultStore.

VaultEntry structure:
- id
- key
- value
- aliases
- category
- sensitive
- createdAt
- updatedAt

Do not implement UI yet.
```

---

# Expected Output

```text
Vault persistence working locally.
```

---

# PHASE 4 — DOM Engine

# Prompt

```text
Implement DOM Engine for QuickFill.

Requirements:
- Detect supported inputs
- Extract field metadata
- Support React-safe value filling

Supported:
- input
- textarea

Implement:
- extractFieldContext
- fillInputValue
- isSupportedInput

Field metadata:
- placeholder
- label
- name
- id
- aria-label

Important:
- Dispatch input events
- Dispatch change events
- Support React controlled inputs

No UI yet.
```

---

# Expected Output

```text
Input metadata extraction and value filling work reliably.
```

---

# PHASE 5 — Matcher Engine

# Prompt

```text
Implement Matcher Engine for QuickFill.

Requirements:
- Use Fuse.js
- Keep all logic inside src/matcher/
- No UI logic

Implement:
- getTopSuggestions
- searchVault

Matching inputs:
- key names
- aliases
- placeholders
- labels

Ranking priority:
1. exact key match
2. alias match
3. placeholder similarity
4. fuzzy match

Return top 3 ranked suggestions.

No AI logic.
No embeddings.
```

---

# Expected Output

```text
Deterministic ranked suggestions working.
```

---

# PHASE 6 — Overlay UI

# Prompt

```text
Implement Overlay UI for QuickFill.

Requirements:
- React components
- Tailwind styling
- Portal rendering
- Keyboard-friendly design

Create:
- OverlayContainer
- SearchBar
- SuggestionList
- SuggestionItem
- EmptyState

Requirements:
- Popup appears near active input
- Search input auto-focused
- Top suggestions visible
- Sensitive entries masked

Do not implement add-key modal yet.
```

---

# Expected Output

```text
Popup UI renders correctly near focused inputs.
```

---

# PHASE 7 — Event Engine

# Prompt

```text
Implement Event Engine for QuickFill.

Requirements:
- Handle focus events
- Handle blur events
- Coordinate popup lifecycle

Implement:
- focusin listeners
- popup open/close flow
- matcher integration
- overlay updates

Flow:
focus input
→ extract metadata
→ rank suggestions
→ open overlay

Keep orchestration logic inside src/events/
```

---

# Expected Output

```text
Popup opens automatically on supported input focus.
```

---

# PHASE 8 — Keyboard Navigation

# Prompt

```text
Implement keyboard navigation for QuickFill overlay.

Requirements:
- ArrowUp
- ArrowDown
- Enter
- Escape

Behavior:
- navigate suggestions
- select active suggestion
- close popup on Escape

Use Zustand state.

Keep navigation logic isolated from UI rendering.
```

---

# Expected Output

```text
Full keyboard interaction working.
```

---

# PHASE 9 — Fill Integration

# Prompt

```text
Connect suggestion selection with DOM filling.

Flow:
- user selects suggestion
- DOM Engine fills value
- input/change events dispatched
- popup closes

Requirements:
- React-safe filling
- preserve focus
- no direct UI DOM manipulation

Use DOM Engine only for webpage interaction.
```

---

# Expected Output

```text
Suggestion selection fills active input reliably.
```

---

# PHASE 10 — Add Key Modal

# Prompt

```text
Implement AddKeyModal for QuickFill.

Requirements:
- inline vault creation
- modal UI
- Tailwind styling

Fields:
- key
- value
- aliases
- sensitive toggle

Behavior:
- validate inputs
- save to vault
- refresh search immediately

Keep persistence logic inside Vault Engine.
```

---

# Expected Output

```text
Users can create vault entries inline.
```

---

# PHASE 11 — Save Selection Flow

# Prompt

```text
Implement Save Selection flow for QuickFill.

Requirements:
- context menu integration
- detect selected webpage text
- open QuickSaveModal

Behavior:
- selected text prefilled
- user enters key name
- entry saved into vault

Use background script for context menu registration.
```

---

# Expected Output

```text
Selected webpage text can be saved into vault.
```

---

# PHASE 12 — UX Polish

# Prompt

```text
Polish QuickFill UX.

Requirements:
- smooth popup behavior
- viewport-safe positioning
- lightweight animations
- empty states
- loading states
- accessibility improvements

Requirements:
- avoid excessive animations
- maintain fast interaction
- keyboard navigation must remain stable
```

---

# Expected Output

```text
MVP feels polished and responsive.
```

---

# Recommended Execution Strategy

For smaller models:

DO:
- run one phase at a time
- validate manually after each phase
- keep prompts isolated
- avoid huge context windows

DO NOT:
- ask model to build entire project at once
- combine architecture + implementation + polish
- overload with future AI requirements

---

# Recommended Workflow

```text
1. Give phase prompt
2. Review generated code
3. Fix issues
4. Commit changes
5. Move to next phase
```

---

# Small Model Optimization Tips

# Good Prompting

Use:
- explicit file names
- explicit interfaces
- explicit outputs
- strict scope boundaries

---

# Bad Prompting

Avoid:
```text
Build intelligent autofill extension with modern architecture.
```

This causes:
- hallucinated abstractions
- architecture drift
- broken coupling

---

# Best Practice

Prefer:
```text
Implement only Matcher Engine.
Do not touch UI.
Use provided interfaces only.
```

---

# Critical Architecture Constraints

Never allow models to:
- put matching logic inside React components
- manipulate DOM directly from UI
- bypass Vault Engine
- duplicate shared types
- mix storage and rendering

---

# Final Engineering Strategy

QuickFill should evolve like:

```text
Reliable
    ↓
Fast
    ↓
Polished
    ↓
Intelligent
```

NOT:

```text
Complex
    ↓
Fragile
    ↓
Hard to debug
```

A smaller but deterministic MVP is better than an overengineered AI-first implementation.