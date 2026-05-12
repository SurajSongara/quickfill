# Learning Engine

# Purpose

This document defines the future behavioral learning system for QuickFill.

The MVP intentionally excludes implementation.

This design exists to ensure:
- future extensibility
- AI-ready architecture
- clean integration paths

---

# Learning Philosophy

QuickFill should learn gradually through:
- repeated usage
- accepted suggestions
- field interactions
- user-confirmed mappings

The system should remain:
- explainable
- privacy-friendly
- user-controlled

---

# Primary Goals

## Improve Suggestion Accuracy

Use historical behavior to:
- boost relevant entries
- improve ranking quality
- reduce search effort

---

## Reduce User Repetition

Detect:
- repeated manual actions
- recurring field mappings
- common form patterns

Then:
- suggest optimizations

---

## Preserve Determinism

Learning should:
- enhance ranking
- NOT override user control

Users must always:
- confirm fills
- understand suggestions

---

# Learning Scope

# MVP Exclusions

The MVP will NOT include:
- behavioral tracking
- ranking adaptation
- semantic learning
- AI inference
- usage analytics

---

# Future Learning Signals

Potential future signals:

| Signal | Purpose |
|------|------|
| repeated selections | ranking boost |
| repeated field mappings | alias learning |
| domain-specific fills | contextual ranking |
| search frequency | prioritization |
| rejected suggestions | ranking reduction |

---

# Core Learning Concepts

# Learned Mapping

## Purpose

Associate webpage fields with vault entries.

---

## Example

```text
gov_id → aadhaar
professional_profile → linkedin
tax_identifier → pan_number
```

---

## Suggested Model

```ts
type LearnedMapping = {
  fieldSignature: string
  entryId: string
  confidence: number
  createdAt: string
}
```

---

# Usage Signal

## Purpose

Track accepted suggestions.

---

## Suggested Model

```ts
type UsageSignal = {
  fieldSignature: string
  selectedEntryId: string
  timestamp: string
}
```

---

# Rejection Signal

## Purpose

Track ignored or rejected suggestions.

---

## Suggested Model

```ts
type RejectionSignal = {
  fieldSignature: string
  rejectedEntryId: string
  timestamp: string
}
```

---

# Field Signature

## Purpose

Create stable identifier for webpage fields.

---

## Example Inputs

- placeholder
- label
- input name
- domain

---

## Example

```text
linkedin.com:professional_profile
```

---

# Suggested Learning Flow

```text
User focuses field
        ↓
Suggestions shown
        ↓
User selects entry
        ↓
Usage signal stored
        ↓
Future ranking boosted
```

---

# Alias Learning Flow

```text
Repeated mapping detected
        ↓
Learning Engine proposes alias
        ↓
User approves learning
        ↓
Alias stored in vault
```

---

# Important Constraint

Learning should NEVER:
- silently mutate vault entries
- silently add aliases
- autonomously fill forms

User approval required.

---

# Learning Architecture

# Suggested Placement

```text
Matcher Engine
    ↓
Learning Engine
    ↓
Final Ranking
```

---

# Suggested Future Runtime

```text
Heuristic Match
        ↓
Learned Mapping Boost
        ↓
Semantic Ranking
        ↓
Final Suggestions
```

---

# Learning Categories

# 1. Alias Learning

Learn:
```text
field term → vault alias
```

---

# 2. Ranking Learning

Boost:
- frequently selected entries
- trusted mappings

---

# 3. Domain Learning

Learn:
- domain-specific preferences
- recurring website patterns

---

# Example

On:
```text
workday.com
```

Prefer:
```text
professional profile entries
```

---

# Privacy Rules

Learning data should remain:
- local-first
- inspectable
- removable

Avoid:
- opaque telemetry
- hidden analytics
- automatic cloud upload

---

# User Controls

Future settings should allow:
- disable learning
- reset learned mappings
- clear usage history
- export/import learning data

---

# Suggested Storage

Potential future storage:

```json
{
  "usageSignals": [],
  "learnedMappings": [],
  "rankingHistory": []
}
```

---

# Confidence Model

## Purpose

Represent certainty of learned behavior.

---

## Example

```ts
type ConfidenceScore = {
  score: number
  source: "heuristic" | "behavioral" | "semantic"
}
```

---

# Future UX Opportunities

Potential future UI:
- "Learn this mapping?"
- confidence indicators
- adaptive suggestions
- smart recommendations

---

# Important UX Rule

Learning prompts should remain:
- lightweight
- infrequent
- dismissible

Avoid:
- spammy onboarding
- aggressive AI prompts

---

# Future AI Integration

Learning signals may later feed:
- semantic ranking
- adaptive matching
- contextual suggestions
- AI reranking systems

---

# AI Isolation Rule

Learning systems should extend:
```text
Matcher Engine
```

without rewriting:
- overlay UI
- vault storage
- event architecture

---

# Failure Handling

If learning data becomes corrupted:
- fallback to heuristic matching
- preserve normal extension behavior

Learning should enhance:
- NOT block functionality

---

# Long Term Vision

The Learning Engine may eventually support:
- adaptive ranking
- contextual intelligence
- semantic memory
- personalized workflows

However:
- predictability
- explainability
- explicit user control

must remain core principles.