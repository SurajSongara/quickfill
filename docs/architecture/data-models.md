# Data Models

# Design Goals

Data models should be:
- simple
- extensible
- deterministic
- AI-ready

The MVP should avoid:
- over-normalization
- premature abstractions
- backend-specific assumptions

---

# Core Entities

| Entity | Purpose |
|------|------|
| VaultEntry | reusable stored data |
| FieldContext | webpage field metadata |
| SuggestionResult | ranked matcher result |
| OverlayState | popup UI state |
| SearchState | active search session |

---

# VaultEntry

## Purpose

Represents a reusable user data item.

Examples:
- first_name
- email
- aadhaar
- linkedin

---

## Type Definition

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

# Field Definitions

| Field | Purpose |
|------|------|
| id | unique identifier |
| key | primary searchable name |
| value | actual stored value |
| aliases | alternative searchable names |
| category | optional grouping |
| sensitive | masking behavior |
| createdAt | creation timestamp |
| updatedAt | last modification timestamp |

---

# Example

```json
{
  "id": "uuid-1",
  "key": "aadhaar",
  "value": "XXXX-XXXX-XXXX",
  "aliases": [
    "aadhar",
    "gov_id",
    "aadhaar_number"
  ],
  "category": "identity",
  "sensitive": true,
  "createdAt": "2026-05-12T10:00:00Z",
  "updatedAt": "2026-05-12T10:00:00Z"
}
```

---

# FieldContext

## Purpose

Represents metadata extracted from active webpage input.

Used by:
- Matcher Engine
- Overlay Engine

---

## Type Definition

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

# Extraction Sources

The DOM Engine should attempt extraction from:
- input id
- input name
- placeholder
- associated label
- aria-label

---

# Example

```json
{
  "name": "gov_id",
  "placeholder": "Enter Aadhaar Number",
  "label": "Government ID",
  "inputType": "text"
}
```

---

# SuggestionResult

## Purpose

Represents ranked matcher output.

---

## Type Definition

```ts
type SuggestionResult = {
  entry: VaultEntry
  score: number
}
```

---

# Score Meaning

Higher score indicates:
- stronger match confidence
- higher suggestion priority

---

# Example

```json
{
  "entry": {
    "key": "aadhaar"
  },
  "score": 92
}
```

---

# OverlayState

## Purpose

Controls popup visibility and UI behavior.

---

## Type Definition

```ts
type OverlayState = {
  isOpen: boolean
  activeIndex: number
  anchorRect?: DOMRect
}
```

---

# Field Definitions

| Field | Purpose |
|------|------|
| isOpen | popup visibility |
| activeIndex | keyboard-selected suggestion |
| anchorRect | popup positioning |

---

# SearchState

## Purpose

Represents active search session.

---

## Type Definition

```ts
type SearchState = {
  query: string
  results: SuggestionResult[]
}
```

---

# SessionState

## Purpose

Tracks active webpage interaction.

---

## Type Definition

```ts
type SessionState = {
  activeElement?: HTMLElement
  activeField?: FieldContext
}
```

---

# Future AI Models

These models are intentionally deferred.

---

# SemanticMatchResult (Future)

```ts
type SemanticMatchResult = {
  entryId: string
  semanticScore: number
  explanation?: string
}
```

---

# LearningSignal (Future)

```ts
type LearningSignal = {
  fieldSignature: string
  selectedEntryId: string
  timestamp: string
}
```

---

# Storage Schema

# MVP Storage Structure

```json
{
  "vaultEntries": [],
  "settings": {}
}
```

---

# Future Storage Extensions

Possible future additions:
- encrypted values
- sync metadata
- usage history
- learned mappings
- profile partitions

---

# Data Rules

## Vault Rules

- keys should be unique
- aliases should be normalized
- sensitive defaults to false
- timestamps should use ISO format

---

## Search Rules

Search indexes should include:
- key
- aliases

Search indexes should NOT include:
- actual values

---

# Sensitive Data Rules

Sensitive entries:
- should never preview values in UI
- should require explicit fill action

Examples:
- aadhaar
- pan
- passport
- bank account

---

# Future Compatibility Rules

The data model must support future:
- semantic vectors
- AI metadata
- confidence scores
- usage analytics

without breaking:
- current storage
- current UI
- current matcher contracts

---

# MVP Simplicity Rules

The MVP intentionally avoids:
- relational schemas
- nested structures
- profile inheritance
- encrypted databases
- backend assumptions

The initial model should remain:
- flat
- readable
- easy to debug