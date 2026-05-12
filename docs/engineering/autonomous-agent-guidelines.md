# Autonomous Agent Guidelines

# Purpose

This document defines implementation rules for autonomous coding agents working on QuickFill.

The goal is to maximize:
- implementation quality
- architectural consistency
- deterministic behavior
- modularity

---

# Core Engineering Principles

## Principle 1 — Deterministic First

The MVP must prioritize:
- reliability
- predictability
- explicit user actions

Avoid:
- hidden automation
- speculative behavior
- AI assumptions

---

## Principle 2 — Modular Isolation

Every major concern must remain isolated.

| Concern | Module |
|------|------|
| DOM interaction | DOM Engine |
| Matching | Matcher Engine |
| Persistence | Vault Engine |
| Popup rendering | Overlay Engine |
| Runtime orchestration | Event Engine |

Avoid cross-module leakage.

---

## Principle 3 — UI Is Presentation Only

UI components should:
- render props
- emit events
- reflect state

UI components must NOT:
- perform matching
- manipulate storage
- inject DOM values
- implement ranking logic

---

# Mandatory Architectural Rules

# Rule 1 — All Matching Through Matcher Engine

Allowed:
```text
Overlay → Matcher Engine
```

Disallowed:
```text
Component → fuzzy matching directly
```

All ranking logic must remain centralized.

---

# Rule 2 — All Webpage Interaction Through DOM Engine

Allowed:
```text
DOM Engine → input filling
```

Disallowed:
```text
UI component → document.querySelector
```

---

# Rule 3 — Shared Types Only

All modules must use:
```text
src/types/
```

Avoid:
- duplicated contracts
- inline object assumptions

---

# Rule 4 — Event Driven Flow

Preferred architecture:

```text
Browser Event
    ↓
Event Engine
    ↓
Store Update
    ↓
UI Update
```

Avoid:
- hidden side effects
- direct UI mutations

---

# Rule 5 — Explicit State Ownership

Every state must have:
- one clear owner
- one mutation path

Avoid:
- duplicated state
- conflicting updates

---

# Coding Standards

# TypeScript

Required:
- strict typing
- explicit return types
- shared interfaces

Avoid:
```ts
any
```

unless absolutely required.

---

# React Components

Components should remain:
- small
- focused
- composable

Preferred:
```text
single responsibility components
```

---

# Store Design

Stores should:
- remain lightweight
- avoid business logic
- expose clear actions

Avoid:
- async complexity inside stores
- DOM interaction inside stores

---

# DOM Interaction Rules

# Required

Support:
- native inputs
- React controlled inputs

Must:
- dispatch input events
- dispatch change events

---

# Disallowed

Do NOT:
- mutate innerHTML
- force rerenders
- override browser behavior aggressively

---

# Overlay Rules

# Required

Overlay should:
- render through portal
- avoid CSS collisions
- remain viewport safe

---

# Disallowed

Avoid:
- fixed hardcoded positions
- z-index hacks everywhere
- inline style chaos

---

# Search Rules

# MVP Matching

Use:
- Fuse.js
- heuristic scoring
- alias ranking

Avoid:
- runtime LLMs
- embeddings
- cloud APIs

---

# Ranking Rules

Preferred ranking order:

| Signal | Priority |
|------|------|
| exact key match | highest |
| alias match | high |
| placeholder similarity | medium |
| fuzzy match | medium |

---

# Sensitive Data Rules

Sensitive entries:
- must remain masked
- must never preview raw values
- require explicit selection

Examples:
- aadhaar
- pan
- bank details

---

# Performance Rules

# Required Targets

| Action | Target |
|------|------|
| popup open | <100ms |
| search update | instant |
| fill action | immediate |

---

# Avoid

- unnecessary rerenders
- large global state updates
- expensive DOM scans

---

# Storage Rules

# MVP Storage

Use:
```text
chrome.storage.local
```

Avoid:
- backend assumptions
- sync complexity
- encryption systems initially

---

# Accessibility Rules

Required:
- keyboard navigation
- focus visibility
- semantic buttons
- accessible input behavior

---

# Future AI Compatibility Rules

The following systems must remain replaceable:
- ranking logic
- search logic
- scoring logic

Future AI integration should extend:
```text
Matcher Engine
```

without rewriting:
- overlay UI
- vault storage
- event architecture

---

# Debugging Rules

The system should remain:
- inspectable
- debuggable
- observable

Avoid:
- hidden magic
- deeply nested abstractions
- overengineered patterns

---

# Preferred Development Order

```text
1. Types
2. Vault Engine
3. DOM Engine
4. Matcher Engine
5. Overlay UI
6. Event Engine
7. Keyboard Navigation
8. Add Key Flow
9. Save Selection Flow
10. Polish
```

---

# Testing Priorities

Highest priority:
- React input filling
- popup positioning
- keyboard navigation
- storage persistence

---

# MVP Simplicity Rules

The MVP should optimize for:
- shipping speed
- reliability
- maintainability

Avoid:
- plugin systems
- enterprise abstractions
- premature AI complexity
- microservice thinking

---

# Definition of Done

A feature is complete only if:
- architecture rules followed
- types are shared
- responsibilities isolated
- behavior deterministic
- UI responsive
- keyboard navigation works

---

# Final Engineering Philosophy

QuickFill should evolve through:
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
Hard to debug
```

Trust and UX quality are more important than aggressive automation.