# High Level Design (HLD)

# System Overview

QuickFill is a browser extension that provides:
- smart form suggestions
- searchable vault access
- explicit value filling
- local-first storage

The architecture is modular and AI-ready.

---

# Core Architecture Goals

## MVP Goals

- deterministic behavior
- fast interaction
- minimal complexity
- isolated modules
- future extensibility

---

# High Level Architecture

```text
┌──────────────────────┐
│      Browser         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│     Event Engine     │
│ focus / selection    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      DOM Engine      │
│ field extraction     │
│ value injection      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    Matcher Engine    │
│ ranking / search     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│     Vault Engine     │
│ storage / CRUD       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    Overlay Engine    │
│ popup rendering      │
└──────────────────────┘
```

---

# Core Modules

# 1. Event Engine

## Responsibility

Central browser event orchestration.

Handles:
- input focus
- keyboard shortcuts
- text selection
- popup lifecycle events

---

## Inputs

- browser events
- user interactions

---

## Outputs

- popup open requests
- matcher requests
- vault actions

---

# 2. DOM Engine

## Responsibility

Interaction with webpage DOM.

Handles:
- field detection
- field metadata extraction
- React-safe value injection
- popup anchoring

---

## Responsibilities

### Input Detection

Supported:
- input
- textarea

---

### Metadata Extraction

Extract:
- placeholder
- label
- id
- name
- aria-label

---

### Value Fill

Inject values safely into:
- native inputs
- React-controlled inputs

---

# 3. Matcher Engine

## Responsibility

Suggestion ranking and search.

This is the central intelligence layer.

---

## MVP Responsibilities

- heuristic scoring
- fuzzy search
- alias matching
- ranking top suggestions

---

## Future Responsibilities

- semantic embeddings
- AI reranking
- contextual ranking
- adaptive learning

---

## Critical Rule

All matching logic must pass through:
```text
Matcher Engine
```

No UI component should implement matching directly.

---

# 4. Vault Engine

## Responsibility

Vault persistence and CRUD operations.

---

## MVP Storage

```text
chrome.storage.local
```

---

## Responsibilities

- create entry
- update entry
- delete entry
- retrieve entries
- search index preparation

---

## Future Extensions

- encrypted storage
- cloud sync
- profile separation
- secure export/import

---

# 5. Overlay Engine

## Responsibility

Floating popup rendering and interaction UI.

---

## Responsibilities

- popup rendering
- positioning
- keyboard navigation
- interaction states
- search UI

---

## Rendering Strategy

Use:
```text
document.body portal
```

Avoid inline DOM rendering.

---

# Runtime Lifecycle

# Focus Lifecycle

```text
Input focused
        ↓
Event Engine triggered
        ↓
DOM Engine extracts metadata
        ↓
Matcher Engine ranks suggestions
        ↓
Overlay Engine renders popup
        ↓
User selects entry
        ↓
DOM Engine fills value
```

---

# Save Selection Lifecycle

```text
User selects webpage text
        ↓
Context menu action
        ↓
Vault Engine stores entry
        ↓
Matcher index updated
```

---

# Matching Architecture

## MVP Strategy

Deterministic heuristic ranking.

Inputs:
- field metadata
- vault keys
- aliases

Outputs:
- ranked suggestions

---

## Ranking Signals

| Signal | Priority |
|------|------|
| exact key match | highest |
| alias match | high |
| placeholder similarity | medium |
| fuzzy similarity | medium |
| historical usage | future |

---

# State Management

## Recommended State Layers

| Layer | Scope |
|------|------|
| UI State | popup visibility |
| Session State | active input |
| Vault State | vault entries |
| Search State | search query/results |

---

# Security Model

## MVP Security Principles

- local-first storage
- no external APIs
- no automatic fill
- masked sensitive values
- explicit user action required

---

# Permission Strategy

Extension permissions should remain minimal.

Required:
- activeTab
- storage
- contextMenus

Avoid broad permissions initially.

---

# Future AI Extension Points

The following modules are intentionally isolated for future AI integration:

| Future Capability | Target Module |
|------|------|
| Semantic understanding | Matcher Engine |
| Embeddings | Matcher Engine |
| User behavior learning | Learning Engine |
| Context-aware ranking | AI Engine |
| Autonomous workflows | Agent Layer |

---

# Non Goals (MVP)

The HLD intentionally excludes:
- backend services
- AI inference pipelines
- multi-device sync
- OCR
- resume parsing
- browser automation

---

# Architectural Success Criteria

The architecture succeeds if:
- modules remain isolated
- matching logic is replaceable
- UI remains deterministic
- AI can be integrated later without rewrites
- autonomous agents can generate code safely