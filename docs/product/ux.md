# UX Specification

## UX Philosophy

QuickFill should feel like:
- a command palette
- attached to browser inputs

The experience should prioritize:
- speed
- clarity
- predictability
- low cognitive load

---

# Core UX Principles

## Minimal Interaction

Users should complete fills in:
- one click
or
- keyboard enter

---

## Non-Intrusive

QuickFill should never:
- hijack forms
- auto-submit
- aggressively interrupt browsing

The popup should appear only:
- on focused inputs
- on keyboard shortcut

---

## Keyboard First

All major actions should support keyboard navigation.

Required:
- Arrow Up
- Arrow Down
- Enter
- Escape
- Tab

---

## Explicit Fill

Values are filled only when user:
- clicks suggestion
or
- presses Enter

No automatic filling behavior in MVP.

---

# Popup Behavior

## Trigger Conditions

Popup appears when:
- input receives focus
- keyboard shortcut activates QuickFill

Supported elements:
- input
- textarea

Not supported initially:
- contenteditable
- iframe embedded editors

---

# Popup Layout

## Structure

```text
┌─────────────────────────┐
│ Search vault...         │
├─────────────────────────┤
│ 👤 first_name           │
│ 🪪 aadhaar              │
│ 💼 linkedin             │
├─────────────────────────┤
│ + Add New Key           │
└─────────────────────────┘
```

---

# Popup Sections

## Search Input

Always focused when popup opens.

Supports:
- fuzzy search
- alias matching
- keyboard navigation

---

## Suggestions List

Displays:
- top ranked entries
- max 3 initial suggestions

Each suggestion includes:
- icon
- key label
- optional category

Sensitive values are never previewed.

---

## Add Key Action

Visible at bottom of popup.

Allows:
- inline vault creation
- quick onboarding

---

# Popup Positioning

Popup should:
- appear near active input
- avoid clipping
- remain visible within viewport

Implementation should use:
- portal rendering
- absolute positioning

---

# Search Behavior

## Matching Sources

Search should match:
- key names
- aliases

Search should NOT match:
- actual values

---

## Search Updates

Suggestions update:
- instantly while typing

No debounce required initially.

---

# Keyboard Navigation

## Required Keys

| Key | Action |
|------|------|
| Arrow Down | Next suggestion |
| Arrow Up | Previous suggestion |
| Enter | Fill selected value |
| Escape | Close popup |
| Tab | Move focus |

---

# Fill Behavior

## Fill Action

When user selects entry:
1. value inserted into field
2. input event dispatched
3. popup closes

Implementation must support:
- React inputs
- controlled components

---

# Sensitive Data Behavior

## Sensitive Entries

Sensitive entries:
- should appear masked
- should require explicit selection
- should never preview actual value

Examples:
- Aadhaar
- PAN
- Passport
- Bank details

---

# Inline Add Flow

## Add New Key

User can create entries directly from popup.

Flow:
1. Click "Add New Key"
2. Open compact form
3. Enter:
   - key
   - value
   - optional aliases
   - sensitive toggle
4. Save to vault

New entry becomes immediately searchable.

---

# Save Selection Flow

## Text Selection

When user selects text:
- context menu action available
- optional floating quick action available

Action:
- save selected text into vault

---

# Empty States

## No Suggestions

Show:
```text
No matching entries
+ Add New Key
```

---

# Loading States

Minimal loading behavior required because:
- storage is local
- matching is local

Avoid:
- spinners
- blocking overlays

---

# Error Handling

## Fill Failure

If filling fails:
- show small inline error
- preserve popup state

Avoid:
- page reloads
- modal interruptions

---

# Accessibility

## Required Accessibility Support

- keyboard navigation
- focus visibility
- semantic buttons
- screen-reader labels where possible

---

# UX Non Goals

MVP should avoid:
- animated complexity
- floating assistants
- AI chat interfaces
- autonomous workflows
- excessive onboarding

---

# UX Success Criteria

The UX succeeds if users can:
- focus field
- press arrow down
- press enter
- continue typing

within seconds.

QuickFill should feel:
- invisible
- immediate
- dependable