# Component Map

# Purpose

This document defines:
- UI component hierarchy
- engine boundaries
- responsibility ownership
- allowed communication paths

The architecture should remain:
- modular
- event-driven
- predictable

---

# High Level Runtime Map

```text
Browser
  ↓
Content Script
  ↓
Event Engine
  ↓
State Layer
  ↓
Overlay UI
```

---

# Overlay UI Hierarchy

```text
OverlayContainer
├── SearchBar
├── SuggestionList
│   └── SuggestionItem
├── EmptyState
├── AddKeyButton
├── AddKeyModal
└── QuickSaveModal
```

---

# Component Responsibilities

# OverlayContainer

## Responsibility

Main popup orchestration container.

Coordinates:
- overlay visibility
- positioning
- keyboard navigation
- suggestion rendering

---

## Responsibilities

- subscribe to stores
- coordinate popup state
- pass data into child components

---

## Must NOT

- perform matching
- access storage directly
- manipulate DOM directly

---

# SearchBar

## Responsibility

Search query input.

---

## Responsibilities

- capture user typing
- emit search updates
- maintain focus behavior

---

## Inputs

```ts
query: string
```

---

## Outputs

```ts
onSearch(query: string)
```

---

# SuggestionList

## Responsibility

Render ranked suggestion collection.

---

## Responsibilities

- render ordered results
- highlight active item
- handle empty states

---

## Inputs

```ts
suggestions: SuggestionResult[]
activeIndex: number
```

---

# SuggestionItem

## Responsibility

Render single vault suggestion.

---

## Responsibilities

- display icon
- display key label
- handle selection state

---

## Sensitive Behavior

Sensitive items:
- must remain masked
- must never preview values

---

## Inputs

```ts
entry: VaultEntry
isActive: boolean
```

---

## Outputs

```ts
onSelect(entry)
```

---

# EmptyState

## Responsibility

Render fallback UI when no results exist.

---

## Responsibilities

- display no results state
- provide add key action

---

# AddKeyButton

## Responsibility

Trigger inline entry creation flow.

---

## Outputs

```ts
onOpenAddModal()
```

---

# AddKeyModal

## Responsibility

Create new vault entry.

---

## Responsibilities

- collect key data
- validate inputs
- trigger vault creation

---

## Inputs

```ts
initialValue?: string
```

---

## Outputs

```ts
onSubmit(entry)
onCancel()
```

---

# QuickSaveModal

## Responsibility

Save selected webpage text into vault.

---

## Responsibilities

- prefill selected text
- collect key name
- persist vault entry

---

# State Ownership Map

| State | Owner |
|------|------|
| popup visibility | overlayStore |
| active input | sessionStore |
| vault entries | vaultStore |
| search query | searchStore |
| active suggestion | overlayStore |

---

# Engine Ownership Map

| Engine | Responsibility |
|------|------|
| Event Engine | orchestration |
| DOM Engine | webpage interaction |
| Matcher Engine | ranking/search |
| Vault Engine | persistence |
| Overlay Engine | popup rendering |

---

# Allowed Communication Paths

# Allowed

```text
Overlay → State
State → Overlay
Events → State
Events → Engines
Matcher → Vault
```

---

# Disallowed

```text
UI → Vault directly
UI → Matcher directly
SuggestionItem → DOM Engine
Overlay → chrome.storage
```

Use:
- stores
- services
- events

instead.

---

# Keyboard Navigation Ownership

## Owner

```text
OverlayContainer
```

---

## Responsibilities

- active index tracking
- arrow navigation
- enter selection
- escape close

---

# Positioning Ownership

## Owner

```text
useOverlayPosition hook
```

---

## Responsibilities

- anchor calculations
- viewport safety
- scroll handling

---

# DOM Interaction Ownership

## Owner

```text
DOM Engine
```

---

## Responsibilities

- field extraction
- value injection
- event dispatching

UI components must never manipulate webpage DOM directly.

---

# Matching Ownership

## Owner

```text
Matcher Engine
```

---

## Responsibilities

- scoring
- ranking
- fuzzy matching
- alias evaluation

UI components should receive already-ranked results.

---

# Vault Ownership

## Owner

```text
Vault Engine
```

---

## Responsibilities

- persistence
- validation
- normalization
- CRUD operations

---

# Future AI Ownership

## Future AI Layer

Reserved modules:

```text
ai/
learning/
embeddings/
```

---

## Future Responsibilities

- semantic ranking
- contextual understanding
- adaptive learning
- reranking

---

# AI Isolation Rule

Future AI systems must plug into:
```text
Matcher Engine
```

without changing:
- overlay components
- DOM engine
- vault engine
- event system

---

# Component Design Rules

# Rule 1 — Dumb UI Components

UI components should:
- receive props
- emit events
- render state

Avoid:
- business logic
- ranking logic
- persistence logic

---

# Rule 2 — Single Responsibility

Each component should own:
- one clear behavior
- one rendering concern

---

# Rule 3 — Predictable Data Flow

Preferred flow:

```text
Event
  ↓
Store Update
  ↓
UI Render
```

Avoid:
```text
UI → direct mutation
```

---

# Rule 4 — Minimal Shared State

Only globalize state when:
- multiple systems require it
- synchronization matters

Keep local state local.

---

# Future Expansion Safety

The component system should support future:
- AI suggestions
- confidence indicators
- semantic explanations
- inline learning prompts

without redesigning:
- overlay hierarchy
- state structure
- event contracts

---

# Success Criteria

The component architecture succeeds if:
- responsibilities remain isolated
- autonomous agents can implement independently
- debugging remains simple
- future AI integration remains clean