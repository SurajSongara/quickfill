# AI Roadmap

# Purpose

This document defines how QuickFill can evolve from:
- deterministic smart fill
to
- AI-assisted browser memory

The MVP intentionally excludes runtime AI.

This roadmap exists to ensure:
- future scalability
- clean architecture evolution
- no major rewrites later

---

# AI Philosophy

QuickFill should evolve gradually:

```text
Deterministic UX
    ↓
Behavioral Learning
    ↓
Semantic Matching
    ↓
Contextual Understanding
    ↓
Autonomous Assistance
```

The product should prioritize:
- trust
- predictability
- explainability

before:
- aggressive automation

---

# Current MVP Intelligence

## MVP Matcher

The MVP uses:
- heuristic scoring
- fuzzy matching
- alias ranking

The current intelligence layer is:
```text
Matcher Engine
```

This module is intentionally isolated for future AI upgrades.

---

# AI Evolution Principles

## Principle 1 — Human Controlled

AI should assist first.

NOT:
- autonomously act
- submit forms
- override user decisions

---

## Principle 2 — Explainable Suggestions

Future AI systems should remain explainable.

Users should understand:
- why suggestion appeared
- what field was inferred
- confidence level

---

## Principle 3 — Layered Intelligence

AI should enhance existing ranking.

NOT replace:
- event system
- overlay system
- vault system

---

# Planned AI Evolution

# Phase 1 — Learned Aliases

## Goal

Improve matching using user behavior.

---

## Example

```text
gov_id → aadhaar
tax_identifier → pan_number
```

---

## Behavior

System observes:
- repeated user selections
- field patterns
- accepted suggestions

Then:
- proposes learned aliases

---

## Characteristics

- deterministic
- local-first
- explainable

---

# Phase 2 — Semantic Matching

## Goal

Understand meaning instead of keywords only.

---

## Example

Field:
```text
Professional Profile URL
```

AI infers:
```text
linkedin
```

---

## Suggested Architecture

```text
FieldContext
    ↓
Embedding Generation
    ↓
Semantic Similarity
    ↓
Suggestion Ranking
```

---

## Integration Point

Inside:
```text
Matcher Engine
```

---

# Phase 3 — Hybrid Ranking

## Goal

Combine:
- heuristic ranking
- semantic ranking
- learned behavior

---

## Example Flow

```text
Heuristic Match
    ↓
Semantic Reranking
    ↓
Behavioral Boost
    ↓
Final Suggestions
```

---

# Phase 4 — Context Awareness

## Goal

Use webpage context for better suggestions.

---

## Example Signals

- website domain
- form section title
- nearby labels
- historical site usage

---

## Example

On:
```text
linkedin.com
```

Prefer:
```text
professional entries
```

---

# Phase 5 — Confidence Scoring

## Goal

Communicate suggestion certainty.

---

## Example

```text
High Confidence
Medium Confidence
Low Confidence
```

---

## UX Opportunities

- confidence badges
- AI explanation tooltips
- semantic reasoning preview

---

# Phase 6 — Smart Vault Learning

## Goal

Reduce manual setup friction.

---

## Example Behaviors

- detect repeated manual typing
- suggest vault creation
- learn common mappings

---

## Example

```text
Detected repeated PAN usage.
Save to QuickFill?
```

---

# Phase 7 — Personal Memory Layer

## Goal

Evolve vault into structured browser memory.

---

## Future Capabilities

- grouped identities
- contextual profiles
- environment-aware suggestions
- temporal usage patterns

---

# Phase 8 — Autonomous Assistance

## Goal

Allow optional AI-assisted workflows.

---

## Example Capabilities

- multi-field recommendations
- onboarding acceleration
- job application assistance
- repetitive workflow automation

---

# Important Constraint

Autonomous actions should remain:
- optional
- explainable
- reviewable

---

# Reserved AI Modules

Future structure:

```text
src/
├── ai/
├── learning/
├── embeddings/
├── semantic/
└── agents/
```

These are intentionally excluded from MVP.

---

# Suggested Future AI Stack

# Local AI Options

Potential future local inference:
- Transformers.js
- ONNX Runtime
- MiniLM embeddings

---

# Cloud AI Options

Potential future cloud systems:
- OpenAI embeddings
- reranking APIs
- semantic inference services

---

# Recommended Future Strategy

Preferred architecture:
```text
Hybrid AI
```

Use:
- heuristics first
- AI fallback second
- user confirmation always

---

# AI Data Principles

## Sensitive Data Protection

AI systems should:
- minimize raw value exposure
- avoid external transmission by default
- preserve local-first behavior

---

# Explainability Rules

Future AI suggestions should support:
- confidence
- reasoning
- reversibility

Avoid:
- black-box automation

---

# Future UX Opportunities

Potential future UI:
- semantic suggestion badges
- AI explanation panels
- adaptive ranking
- contextual recommendations

These should integrate into:
```text
Overlay Engine
```

without redesigning:
- state architecture
- event system
- vault structure

---

# AI Readiness Success Criteria

The architecture succeeds if future AI systems can be added by extending:
```text
Matcher Engine
```

without rewriting:
- popup UI
- vault engine
- event flow
- DOM interaction
- storage models

---

# Long Term Vision

QuickFill may eventually evolve into:
- semantic browser memory
- intelligent form assistant
- adaptive browser command layer
- personal workflow copilot

However:
- trust
- speed
- predictability

must remain core principles forever.