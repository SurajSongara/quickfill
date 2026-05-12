# Folder Structure

# Goals

The project structure should be:
- modular
- predictable
- scalable
- autonomous-agent friendly

The structure must:
- isolate business logic
- separate UI from engines
- support future AI expansion
- minimize cross-module coupling

---

# Root Structure

```text
quickfill/
├── docs/
├── public/
├── src/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── plasmo.config.ts
```

---

# Docs Structure

```text
docs/
├── product/
├── architecture/
├── engineering/
└── future/
```

---

# Source Structure

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
├── types/
├── hooks/
├── config/
└── styles/
```

---

# Module Breakdown

# background/

## Responsibility

Chrome extension lifecycle and browser integrations.

---

## Example Files

```text
background/
├── index.ts
├── context-menu.ts
└── shortcuts.ts
```

---

## Responsibilities

- context menu registration
- keyboard shortcuts
- extension startup hooks

---

# content/

## Responsibility

Browser page integration layer.

Injected into webpages.

---

## Example Files

```text
content/
├── index.ts
├── content-root.tsx
└── listeners.ts
```

---

## Responsibilities

- initialize event listeners
- attach overlay root
- bootstrap runtime

---

# overlay/

## Responsibility

Popup UI system.

Pure presentation layer.

---

## Example Structure

```text
overlay/
├── components/
├── containers/
├── modals/
├── hooks/
├── utils/
└── index.tsx
```

---

# overlay/components/

Reusable UI components.

```text
components/
├── SearchBar.tsx
├── SuggestionList.tsx
├── SuggestionItem.tsx
├── EmptyState.tsx
└── LoadingState.tsx
```

---

# overlay/containers/

State-connected UI containers.

```text
containers/
├── OverlayContainer.tsx
└── SearchContainer.tsx
```

---

# overlay/modals/

Popup modal interfaces.

```text
modals/
├── AddKeyModal.tsx
└── QuickSaveModal.tsx
```

---

# vault/

## Responsibility

Vault persistence and CRUD.

---

## Example Structure

```text
vault/
├── vault-service.ts
├── vault-storage.ts
├── vault-mapper.ts
└── vault-validator.ts
```

---

## Responsibilities

- storage operations
- CRUD logic
- validation
- data normalization

---

# matcher/

## Responsibility

Suggestion ranking and search logic.

Central intelligence layer.

---

## Example Structure

```text
matcher/
├── matcher-service.ts
├── ranking-engine.ts
├── fuzzy-search.ts
├── scoring.ts
└── alias-matcher.ts
```

---

## Responsibilities

- heuristic scoring
- fuzzy matching
- alias ranking
- future AI extension

---

# dom/

## Responsibility

Webpage DOM interaction.

---

## Example Structure

```text
dom/
├── field-extractor.ts
├── input-filler.ts
├── dom-utils.ts
└── label-resolver.ts
```

---

## Responsibilities

- extract field metadata
- detect supported inputs
- inject values safely
- React-safe input filling

---

# events/

## Responsibility

Runtime orchestration.

---

## Example Structure

```text
events/
├── event-bus.ts
├── focus-handler.ts
├── keyboard-handler.ts
├── popup-handler.ts
└── selection-handler.ts
```

---

## Responsibilities

- lifecycle events
- orchestration logic
- popup coordination

---

# state/

## Responsibility

Global state management.

---

## Example Structure

```text
state/
├── overlay-store.ts
├── vault-store.ts
├── search-store.ts
└── session-store.ts
```

---

## Recommended Tool

```text
Zustand
```

---

# shared/

## Responsibility

Reusable utilities and constants.

---

## Example Structure

```text
shared/
├── constants/
├── utils/
├── helpers/
└── validators/
```

---

# types/

## Responsibility

Shared TypeScript contracts.

---

## Example Structure

```text
types/
├── vault.ts
├── matcher.ts
├── dom.ts
├── overlay.ts
└── events.ts
```

---

# hooks/

## Responsibility

Reusable React hooks.

---

## Example Structure

```text
hooks/
├── useKeyboardNavigation.ts
├── useOverlayPosition.ts
└── useSearch.ts
```

---

# config/

## Responsibility

Project configuration values.

---

## Example Structure

```text
config/
├── shortcuts.ts
├── permissions.ts
└── app-config.ts
```

---

# styles/

## Responsibility

Global styles.

---

## Example Structure

```text
styles/
├── globals.css
└── overlay.css
```

---

# Architectural Rules

# Rule 1 — No Business Logic Inside UI

UI components should:
- render state
- emit events

They should NOT:
- perform matching
- manipulate storage
- implement ranking

---

# Rule 2 — Matcher Isolation

All intelligence must remain inside:
```text
matcher/
```

Future AI systems should replace matcher internals without affecting:
- overlay
- storage
- event flow

---

# Rule 3 — Shared Types Only

All modules should consume shared contracts from:
```text
types/
```

Avoid duplicate type definitions.

---

# Rule 4 — Event Driven Coordination

Modules communicate through:
- events
- services
- store updates

Avoid:
- direct component coupling
- hidden state mutations

---

# Rule 5 — Minimal Cross Imports

Example:
```text
overlay → matcher direct imports
```

should be avoided.

Prefer:
```text
overlay → state/events
```

---

# Future AI Expansion Structure

Reserved future structure:

```text
src/
├── ai/
├── learning/
├── embeddings/
└── agents/
```

These are intentionally excluded from MVP implementation.

---

# MVP Simplicity Rules

The MVP structure should optimize for:
- implementation speed
- readability
- maintainability
- debugging simplicity

Avoid:
- microservice thinking
- excessive abstractions
- premature plugin systems

---

# Folder Structure Success Criteria

The structure succeeds if:
- autonomous agents can navigate easily
- responsibilities remain obvious
- future AI modules can be inserted cleanly
- debugging remains straightforward