# Low Level Design (LLD)

# LLD Goals

The system should be:
- modular
- deterministic
- easy for autonomous agents to implement
- easy to extend later

This document defines:
- module responsibilities
- interfaces
- contracts
- runtime behavior

---

# Runtime Layers

```text
Browser
  ↓
Content Script
  ↓
Event Engine
  ↓
DOM Engine
  ↓
Matcher Engine
  ↓
Vault Engine
  ↓
Overlay Engine
```

---

# Core Directory Layout

```text
src/
├── background/
├── content/
├── overlay/
├── vault/
├── matcher/
├── dom/
├── events/
├── state/
├── shared/
└── types/
```

---

# Module Definitions

# 1. Event Engine

## Directory

```text
src/events/
```

---

## Responsibility

Central event orchestration layer.

Handles:
- focus events
- keyboard shortcuts
- popup open/close
- selection events

---

## Main Events

| Event | Description |
|------|------|
| INPUT_FOCUSED | input activated |
| INPUT_BLURRED | input lost focus |
| SEARCH_UPDATED | query changed |
| SUGGESTION_SELECTED | suggestion chosen |
| POPUP_OPEN | open overlay |
| POPUP_CLOSE | close overlay |

---

## Public Contract

```ts
initializeEventListeners(): void
destroyEventListeners(): void
```

---

# 2. DOM Engine

## Directory

```text
src/dom/
```

---

## Responsibility

Webpage DOM interaction layer.

---

## Public Contract

```ts
extractFieldContext(element): FieldContext

fillInputValue(element, value): void

isSupportedInput(element): boolean
```

---

## FieldContext

```ts
type FieldContext = {
  id?: string
  name?: string
  placeholder?: string
  label?: string
  ariaLabel?: string
  inputType?: string
}
```

---

## Fill Strategy

Must support:
- native inputs
- React controlled inputs

Implementation requirements:
- native setter
- input event dispatch
- change event dispatch

---

# 3. Matcher Engine

## Directory

```text
src/matcher/
```

---

## Responsibility

Suggestion ranking and search.

This is the only intelligence layer.

---

## Public Contract

```ts
getTopSuggestions(
  field: FieldContext,
  limit?: number
): VaultEntry[]

searchVault(
  query: string
): VaultEntry[]
```

---

## MVP Matching Inputs

- key names
- aliases
- placeholders
- labels

---

## MVP Matching Strategy

Weighted heuristic scoring.

---

## Future Extension Point

Matcher implementation must be replaceable.

Future versions may use:
- embeddings
- semantic reranking
- AI scoring

without changing consumers.

---

# 4. Vault Engine

## Directory

```text
src/vault/
```

---

## Responsibility

Vault persistence and CRUD.

---

## Public Contract

```ts
getAllEntries(): Promise<VaultEntry[]>

createEntry(entry): Promise<void>

updateEntry(id, updates): Promise<void>

deleteEntry(id): Promise<void>

getEntryById(id): Promise<VaultEntry | null>
```

---

## Storage Backend

MVP:
```text
chrome.storage.local
```

---

## Future Support

Vault engine should support future:
- encryption
- cloud sync
- profile partitioning

---

# 5. Overlay Engine

## Directory

```text
src/overlay/
```

---

## Responsibility

Popup rendering and interaction UI.

---

## Main Components

| Component | Responsibility |
|------|------|
| SearchBar | search input |
| SuggestionList | ranked entries |
| SuggestionItem | individual result |
| AddKeyButton | create action |
| AddKeyModal | inline vault creation |

---

## Public Contract

```ts
openOverlay(anchorElement): void

closeOverlay(): void

updateSuggestions(entries): void
```

---

# 6. State Layer

## Directory

```text
src/state/
```

---

## Recommended State Tool

```text
Zustand
```

---

## Stores

| Store | Responsibility |
|------|------|
| overlayStore | popup visibility |
| vaultStore | vault entries |
| searchStore | query/results |
| sessionStore | active input |

---

# 7. Background Script

## Directory

```text
src/background/
```

---

## Responsibility

Chrome extension integrations.

Handles:
- context menu registration
- keyboard shortcuts
- extension lifecycle

---

# 8. Shared Layer

## Directory

```text
src/shared/
```

---

## Responsibility

Reusable utilities.

Examples:
- fuzzy scoring
- debounce helpers
- ranking utils
- DOM helpers

---

# 9. Types Layer

## Directory

```text
src/types/
```

---

## Responsibility

Shared TypeScript contracts.

All engines must consume shared types.

---

# Core Types

# VaultEntry

```ts
type VaultEntry = {
  id: string
  key: string
  value: string
  aliases: string[]
  category?: string
  sensitive: boolean
  createdAt: string
  updatedAt: string
}
```

---

# SuggestionResult

```ts
type SuggestionResult = {
  entry: VaultEntry
  score: number
}
```

---

# Runtime Flow

# Focus Flow

```text
focusin event
      ↓
Event Engine
      ↓
DOM Engine extracts metadata
      ↓
Matcher Engine ranks entries
      ↓
Overlay Engine renders popup
```

---

# Search Flow

```text
user types search query
      ↓
searchStore updated
      ↓
Matcher Engine performs search
      ↓
Overlay updates suggestions
```

---

# Fill Flow

```text
user selects suggestion
      ↓
DOM Engine fills input
      ↓
dispatch input/change events
      ↓
close overlay
```

---

# Add Entry Flow

```text
user clicks add key
      ↓
AddKeyModal opens
      ↓
Vault Engine stores entry
      ↓
vaultStore refreshes
      ↓
Matcher index updates
```

---

# Selection Save Flow

```text
user selects webpage text
      ↓
context menu action
      ↓
open quick save form
      ↓
Vault Engine persists entry
```

---

# Performance Goals

## MVP Targets

| Operation | Target |
|------|------|
| popup open | <100ms |
| search update | realtime |
| fill action | immediate |
| vault load | local speed |

---

# Error Handling Rules

## Matcher Failure

Fallback:
```text
empty suggestions
```

---

## Fill Failure

Behavior:
- preserve popup
- show lightweight error

---

## Storage Failure

Behavior:
- show inline toast
- preserve form state

---

# LLM Implementation Rules

## Required Principles

- single responsibility modules
- no hidden side effects
- typed interfaces only
- avoid tight coupling
- no business logic inside UI components

---

# AI Readiness Rules

The following must remain isolated:
- ranking logic
- search logic
- scoring logic

This ensures future AI upgrades require:
- engine replacement
NOT:
- UI rewrites
- storage rewrites
- event rewrites