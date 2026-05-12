# Event Flow

# Purpose

This document defines:
- runtime lifecycle
- event sequencing
- module interaction flow
- state transition behavior

The architecture should remain:
- deterministic
- event-driven
- modular

---

# Core Event Principles

## Single Direction Flow

Events should move in one direction:

```text
Browser Event
    ↓
Event Engine
    ↓
Domain Engine
    ↓
State Update
    ↓
UI Update
```

Avoid:
- circular updates
- hidden mutations
- UI-driven business logic

---

# Core Runtime Events

| Event | Description |
|------|------|
| INPUT_FOCUSED | supported input activated |
| INPUT_BLURRED | input lost focus |
| SEARCH_UPDATED | search query changed |
| SUGGESTION_SELECTED | user selected entry |
| POPUP_OPENED | overlay visible |
| POPUP_CLOSED | overlay hidden |
| ENTRY_CREATED | new vault item saved |
| ENTRY_UPDATED | vault item modified |
| ENTRY_DELETED | vault item removed |
| TEXT_SELECTED | webpage text selected |

---

# Focus Event Flow

## Goal

Open QuickFill when user focuses supported input.

---

# Flow

```text
User focuses input
        ↓
focusin event triggered
        ↓
Event Engine validates target
        ↓
DOM Engine extracts FieldContext
        ↓
Matcher Engine ranks suggestions
        ↓
overlayStore updated
        ↓
Overlay Engine renders popup
```

---

# Detailed Runtime Steps

## Step 1 — Browser Event

```text
focusin
```

Captured globally by content script.

---

## Step 2 — Validation

Event Engine checks:
- supported element
- popup not already active
- extension enabled

---

## Step 3 — Metadata Extraction

DOM Engine extracts:
- placeholder
- label
- name
- id
- aria-label

Produces:
```ts
FieldContext
```

---

## Step 4 — Suggestion Ranking

Matcher Engine:
- evaluates field metadata
- searches vault
- ranks suggestions

Produces:
```ts
SuggestionResult[]
```

---

## Step 5 — Overlay Render

Overlay Engine:
- positions popup
- renders suggestions
- focuses search input

---

# Search Flow

## Goal

Update suggestions while user types.

---

# Flow

```text
User types query
        ↓
SEARCH_UPDATED event
        ↓
searchStore updated
        ↓
Matcher Engine performs search
        ↓
Overlay rerenders results
```

---

# Matching Rules

Search should evaluate:
- key names
- aliases

Search should NOT evaluate:
- values

---

# Suggestion Selection Flow

## Goal

Fill selected value into active input.

---

# Flow

```text
User selects suggestion
        ↓
SUGGESTION_SELECTED event
        ↓
DOM Engine injects value
        ↓
input/change events dispatched
        ↓
Overlay closes
```

---

# Fill Requirements

DOM Engine must:
- support native inputs
- support React inputs
- preserve focus state

---

# Keyboard Navigation Flow

## Goal

Allow mouse-free interaction.

---

# Flow

```text
Arrow key pressed
        ↓
overlayStore activeIndex updated
        ↓
highlighted suggestion changes
```

---

# Supported Keys

| Key | Action |
|------|------|
| ArrowDown | next suggestion |
| ArrowUp | previous suggestion |
| Enter | select suggestion |
| Escape | close popup |
| Tab | normal browser navigation |

---

# Popup Close Flow

## Goal

Hide popup safely.

---

# Triggers

Popup closes when:
- Escape pressed
- input blurred
- fill completed
- user clicks outside

---

# Flow

```text
POPUP_CLOSE event
        ↓
overlayStore reset
        ↓
Overlay unmounted
```

---

# Add Entry Flow

## Goal

Create vault entries inline.

---

# Flow

```text
User clicks Add New Key
        ↓
AddKeyModal opens
        ↓
User submits form
        ↓
Vault Engine persists entry
        ↓
vaultStore updated
        ↓
Matcher cache refreshed
```

---

# Save Selection Flow

## Goal

Save selected webpage text into vault.

---

# Flow

```text
User selects text
        ↓
Context menu clicked
        ↓
TEXT_SELECTED event
        ↓
Quick save modal opens
        ↓
Vault Engine stores entry
```

---

# Sensitive Entry Flow

## Goal

Prevent accidental value exposure.

---

# Rules

Sensitive entries:
- never preview values
- require explicit selection
- should display masked label only

---

# Error Event Flow

# Matcher Failure

```text
Matcher error
        ↓
empty suggestion list
        ↓
show fallback state
```

---

# Fill Failure

```text
DOM injection failure
        ↓
show inline error
        ↓
preserve popup state
```

---

# Storage Failure

```text
Vault persistence failure
        ↓
show lightweight toast
        ↓
preserve form state
```

---

# State Synchronization Rules

## UI State

Overlay UI must react ONLY to:
- state updates
- emitted events

UI should NOT:
- directly mutate vault
- directly perform matching

---

# Engine Communication Rules

## Allowed

```text
Event Engine → Matcher Engine
Event Engine → Vault Engine
Event Engine → Overlay Engine
```

---

## Disallowed

```text
Overlay Engine → Vault Engine directly
UI Components → DOM Engine directly
```

Use:
- event-driven orchestration
- explicit contracts

---

# Future AI Event Extensions

The architecture should later support:

```text
FieldContext
    ↓
Heuristic Match
    ↓
Semantic Match
    ↓
AI Reranking
    ↓
Final Suggestions
```

without changing:
- overlay behavior
- event contracts
- storage models

---

# Performance Rules

## Popup Open

Target:
```text
<100ms
```

---

## Search Updates

Should feel:
```text
instant
```

---

## Fill Actions

Should complete:
```text
immediately
```

---

# Event Design Goals

The event system succeeds if:
- behavior remains predictable
- modules remain isolated
- debugging remains simple
- future AI layers can be inserted cleanly