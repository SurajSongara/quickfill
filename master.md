# QuickFill

QuickFill is a local-first browser vault and smart-fill command palette for forms.

The product focuses on:
- fast UX
- deterministic behavior
- privacy-first storage
- AI-ready architecture
- incremental learning

---

# Product Goals

## MVP Goals
- Detect focused form inputs
- Suggest top matching vault keys
- Allow fast search across vault
- Fill values on explicit user action
- Add new vault entries inline
- Save selected text directly into vault
- Support keyboard-first interaction

## Non Goals (MVP)
- Autonomous form filling
- Runtime AI inference
- Cloud sync
- Resume parsing
- Multi-profile management
- Browser agents

---

# Architecture Principles

- Local-first
- Human-controlled
- Deterministic matching
- Modular engines
- AI-extensible
- Minimal permissions
- Keyboard-first UX

---

# Documentation Structure

## Product Docs

| File | Purpose |
|------|---------|
| `docs/product/vision.md` | Product vision and philosophy |
| `docs/product/ux.md` | UX rules and interaction behavior |
| `docs/product/flows.md` | User flows and scenarios |

---

## Architecture Docs

| File | Purpose |
|------|---------|
| `docs/architecture/hld.md` | High-level architecture |
| `docs/architecture/lld.md` | Low-level design |
| `docs/architecture/data-models.md` | Data contracts and schemas |
| `docs/architecture/event-flow.md` | Runtime event lifecycle |

---

## Engineering Docs

| File | Purpose |
|------|---------|
| `docs/engineering/folder-structure.md` | Project structure |
| `docs/engineering/component-map.md` | UI and engine boundaries |
| `docs/engineering/state-management.md` | Zustand store design |
| `docs/engineering/implementation-plan.md` | MVP execution phases |

---

## AI Evolution Docs

| File | Purpose |
|------|---------|
| `docs/future/ai-roadmap.md` | Future AI integration strategy |
| `docs/future/learning-engine.md` | Adaptive learning architecture |

---

# Core Modules

| Module | Responsibility |
|------|------|
| Vault Engine | Vault CRUD and persistence |
| Matcher Engine | Suggestion ranking and search |
| Overlay Engine | Floating UI rendering |
| DOM Engine | Input interaction and filling |
| Event Engine | Browser event orchestration |
| Learning Engine | Future behavioral learning |
| AI Engine | Future semantic intelligence |

---

# Locked MVP Stack

| Layer | Technology |
|------|------|
| Extension | Plasmo |
| UI | React |
| Styling | Tailwind |
| State | Zustand |
| Search | Fuse.js |
| Storage | chrome.storage.local |
| Language | TypeScript |

---

# MVP Scope

## Included
- Vault management
- Top 3 suggestions
- Searchable popup
- Explicit fill action
- Inline key creation
- Save selection to vault
- Sensitive field masking
- Keyboard navigation

## Excluded
- Auto-fill automation
- AI matching
- Cloud backend
- Team sync
- OCR
- File uploads
- Resume parsing

---

# Development Philosophy

QuickFill should evolve in phases:

1. Deterministic UX
2. Reliable matching
3. Behavioral learning
4. Semantic intelligence
5. Autonomous assistance

The MVP should optimize for:
- speed
- trust
- maintainability
- extensibility

NOT complexity.