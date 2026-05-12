# Implementation Plan

# Goals

The MVP implementation should optimize for:
- speed
- clarity
- deterministic behavior
- autonomous-agent friendliness

The implementation should remain:
- modular
- incremental
- testable

---

# MVP Scope

## Included

- input detection
- popup overlay
- top suggestions
- vault search
- keyboard navigation
- explicit fill
- inline add key
- save selected text
- local storage

---

## Excluded

- runtime AI
- cloud sync
- OCR
- resume parsing
- browser agents
- auto-submit
- autonomous workflows

---

# Recommended Development Order

The implementation should follow strict layering.

---

# Phase 1 — Project Setup

## Goal

Initialize extension foundation.

---

## Tasks

- initialize Plasmo project
- configure TypeScript
- configure Tailwind
- install Zustand
- install Fuse.js
- setup folder structure
- setup shared types

---

## Deliverables

```text
- extension boots successfully
- content script injected
- React overlay root mounted
```

---

# Phase 2 — Vault Engine

## Goal

Implement local-first storage system.

---

## Tasks

- define VaultEntry model
- implement CRUD service
- implement storage adapter
- implement validators
- implement vaultStore

---

## Deliverables

```text
- create entry
- update entry
- delete entry
- retrieve entries
- persistence works
```

---

# Phase 3 — DOM Engine

## Goal

Support webpage interaction safely.

---

## Tasks

- detect supported inputs
- extract FieldContext
- implement label extraction
- implement React-safe fill logic

---

## Deliverables

```text
- field metadata extraction works
- values fill reliably
- React inputs supported
```

---

# Phase 4 — Matcher Engine

## Goal

Implement deterministic suggestion ranking.

---

## Tasks

- setup Fuse.js
- implement fuzzy search
- implement heuristic scoring
- implement top suggestion ranking
- implement alias matching

---

## Suggested Ranking Priority

| Signal | Weight |
|------|------|
| exact key match | 100 |
| alias match | 90 |
| placeholder match | 70 |
| label similarity | 60 |
| fuzzy similarity | 50 |

---

## Deliverables

```text
- top 3 suggestions generated
- search works instantly
- aliases supported
```

---

# Phase 5 — Overlay Engine

## Goal

Build popup interaction layer.

---

## Tasks

- create OverlayContainer
- create SearchBar
- create SuggestionList
- create SuggestionItem
- implement popup positioning
- implement empty state

---

## Deliverables

```text
- popup renders near input
- suggestions visible
- search interaction works
```

---

# Phase 6 — Keyboard Navigation

## Goal

Enable fast keyboard-first UX.

---

## Tasks

- arrow navigation
- enter selection
- escape close
- active item highlighting

---

## Deliverables

```text
- full keyboard navigation works
```

---

# Phase 7 — Event Engine

## Goal

Centralize runtime orchestration.

---

## Tasks

- focus handlers
- blur handlers
- popup lifecycle
- search lifecycle
- event coordination

---

## Deliverables

```text
- popup lifecycle stable
- event sequencing predictable
```

---

# Phase 8 — Add Key Flow

## Goal

Allow inline vault creation.

---

## Tasks

- AddKeyModal
- entry validation
- vault persistence
- instant search refresh

---

## Deliverables

```text
- user creates entries inline
- entries searchable immediately
```

---

# Phase 9 — Save Selection Flow

## Goal

Allow selected webpage text to be stored.

---

## Tasks

- context menu integration
- text selection extraction
- QuickSaveModal
- vault persistence

---

## Deliverables

```text
- selected text saved successfully
```

---

# Phase 10 — UX Polish

## Goal

Improve interaction quality.

---

## Tasks

- popup animations
- viewport safety
- loading states
- empty states
- error states
- accessibility cleanup

---

## Deliverables

```text
- polished interaction experience
```

---

# Suggested Parallelization

Autonomous agents can work safely in parallel on:

| Area | Parallel Safe |
|------|------|
| Vault Engine | yes |
| Matcher Engine | yes |
| Overlay Components | yes |
| DOM Engine | yes |
| Shared Types | yes |

---

# Sequential Dependencies

## Required Order

```text
Types
  ↓
Vault Engine
  ↓
Matcher Engine
  ↓
Overlay Integration
```

---

# Testing Strategy

# MVP Testing Focus

## Critical Areas

| Area | Priority |
|------|------|
| React input filling | highest |
| popup positioning | high |
| keyboard navigation | high |
| vault persistence | high |
| search ranking | medium |

---

# Recommended Manual Test Sites

Test against:
- React forms
- plain HTML forms
- login forms
- onboarding forms
- job application forms

---

# Performance Targets

| Operation | Target |
|------|------|
| popup open | <100ms |
| search update | realtime |
| fill action | immediate |
| vault retrieval | local speed |

---

# Autonomous Agent Guidance

# Important Rules

## Rule 1

Do NOT allow agents to:
- mix UI with business logic
- place ranking logic inside components
- directly mutate DOM from UI

---

## Rule 2

All matching must go through:
```text
Matcher Engine
```

---

## Rule 3

All webpage interaction must go through:
```text
DOM Engine
```

---

## Rule 4

Keep stores lightweight.

Avoid:
- hidden side effects
- async complexity inside components

---

# MVP Success Criteria

The MVP succeeds if users can:

1. focus an input
2. see suggestions instantly
3. search vault quickly
4. fill values reliably
5. create new entries inline

with:
- low latency
- predictable behavior
- minimal onboarding

---

# Post MVP Direction

After MVP stabilization:

## Phase 2 Features

- learned aliases
- confidence scoring
- better ranking
- profile support
- encrypted sensitive values

---

## Future AI Features

- semantic matching
- embeddings
- contextual ranking
- AI reranking
- adaptive learning
- autonomous assistance

These should integrate by extending:
```text
Matcher Engine
```

NOT by rewriting:
- overlay
- storage
- event system