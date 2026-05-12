# State Management

# Goals

State management should be:
- simple
- predictable
- modular
- minimal

The MVP should avoid:
- Redux complexity
- deeply nested state
- hidden mutations
- excessive global state

---

# Recommended State Library

```text
Zustand
```

Reasons:
- lightweight
- minimal boilerplate
- agent-friendly
- modular stores
- easy debugging

---

# State Design Principles

## Local First

Keep state local unless:
- multiple modules require it
- synchronization matters

---

## Deterministic Updates

All state updates should be:
- explicit
- predictable
- side-effect controlled

---

## UI Does Not Own Business Logic

UI components:
- consume state
- emit events

State mutations should occur through:
- stores
- services
- event handlers

---

# Global Stores

| Store | Responsibility |
|------|------|
| overlayStore | popup visibility and navigation |
| vaultStore | vault data |
| searchStore | search session |
| sessionStore | active webpage interaction |

---

# overlayStore

## Purpose

Controls popup UI behavior.

---

## Responsibilities

- popup visibility
- active suggestion index
- overlay positioning
- modal visibility

---

## Suggested Shape

```ts
type OverlayStore = {
  isOpen: boolean
  activeIndex: number
  anchorRect?: DOMRect

  openOverlay: () => void
  closeOverlay: () => void
  setActiveIndex: (index: number) => void
  setAnchorRect: (rect: DOMRect) => void
}
```

---

# vaultStore

## Purpose

Holds vault entries in memory.

---

## Responsibilities

- cache entries
- refresh vault state
- synchronize CRUD updates

---

## Suggested Shape

```ts
type VaultStore = {
  entries: VaultEntry[]

  loadEntries: () => Promise<void>
  addEntry: (entry: VaultEntry) => Promise<void>
  updateEntry: (id, updates) => Promise<void>
  deleteEntry: (id) => Promise<void>
}
```

---

# searchStore

## Purpose

Controls active search session.

---

## Responsibilities

- current query
- ranked suggestions
- search lifecycle

---

## Suggested Shape

```ts
type SearchStore = {
  query: string
  results: SuggestionResult[]

  setQuery: (query: string) => void
  setResults: (results: SuggestionResult[]) => void
  clearSearch: () => void
}
```

---

# sessionStore

## Purpose

Tracks active webpage interaction context.

---

## Responsibilities

- active element
- active field metadata
- active runtime session

---

## Suggested Shape

```ts
type SessionStore = {
  activeElement?: HTMLElement
  activeField?: FieldContext

  setActiveElement: (element: HTMLElement) => void
  setActiveField: (field: FieldContext) => void
  clearSession: () => void
}
```

---

# State Ownership Rules

# overlayStore Owns

- popup state
- keyboard navigation state
- positioning state

---

# vaultStore Owns

- vault entries
- persistence synchronization

---

# searchStore Owns

- query
- search results

---

# sessionStore Owns

- active webpage context
- focused element metadata

---

# Derived State Rules

Avoid storing:
- duplicated state
- computable state

Example:
```text
suggestion count
```

should be derived from:
```text
results.length
```

---

# State Mutation Rules

# Allowed

```text
Event Engine → Store
Vault Engine → Store
Matcher Engine → Store
```

---

# Disallowed

```text
UI Component → Direct Mutation
```

Use:
- explicit store actions
- services
- event orchestration

---

# Suggested Runtime Flow

# Focus Flow

```text
Input focused
      ↓
sessionStore updated
      ↓
Matcher Engine ranks entries
      ↓
searchStore updated
      ↓
overlayStore opens popup
```

---

# Search Flow

```text
Search query changed
      ↓
searchStore query updated
      ↓
Matcher Engine search
      ↓
results updated
```

---

# Fill Flow

```text
Suggestion selected
      ↓
DOM Engine fills input
      ↓
overlayStore closes popup
      ↓
searchStore cleared
```

---

# Add Entry Flow

```text
AddKeyModal submitted
      ↓
Vault Engine persists entry
      ↓
vaultStore refreshed
      ↓
Matcher cache refreshed
```

---

# Store Isolation Rules

Stores should NOT:
- directly manipulate DOM
- perform matching
- access UI components

Stores are:
- state containers
NOT:
- business engines

---

# Persistence Rules

## MVP

Persistent state:
```text
vaultStore only
```

via:
```text
chrome.storage.local
```

---

# Non Persistent UI State

Do NOT persist:
- popup visibility
- active selection
- search query

---

# Performance Rules

## Search Updates

Search state updates should feel:
```text
instant
```

---

## Overlay State

Popup interactions should:
- avoid unnecessary rerenders
- isolate active state changes

---

# Future AI State Extensions

Reserved future state:

```ts
type LearningState = {
  usageHistory: []
  learnedMappings: []
}
```

```ts
type AIState = {
  semanticSuggestions: []
  confidenceScores: []
}
```

These are intentionally excluded from MVP.

---

# Debugging Rules

Stores should remain:
- readable
- inspectable
- serializable

Avoid:
- hidden computed chains
- mutation-heavy logic

---

# MVP Simplicity Rules

The MVP state system should optimize for:
- fast implementation
- easy debugging
- low mental overhead

Avoid:
- enterprise patterns
- event sourcing
- CQRS complexity
- reducer overengineering

---

# Success Criteria

The state architecture succeeds if:
- data flow remains predictable
- UI behavior remains stable
- stores remain isolated
- future AI systems can integrate cleanly