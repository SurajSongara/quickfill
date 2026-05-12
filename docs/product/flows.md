# User Flows

## Primary Flow — Smart Fill

### Goal
Fill an input using existing vault data.

---

## Flow

```text
User focuses input
        ↓
QuickFill popup appears
        ↓
Top 3 suggestions displayed
        ↓
User:
- clicks suggestion
OR
- uses keyboard navigation
        ↓
Selected value fills input
        ↓
Popup closes
```

---

# Example

## Website Input

```html
<input placeholder="Enter First Name" />
```

## Suggestions

```text
👤 first_name
👤 full_name
👤 preferred_name
```

---

# Search Flow

## Goal
Search vault when top suggestions are insufficient.

---

## Flow

```text
User focuses input
        ↓
Popup opens
        ↓
User types in search bar
        ↓
Suggestions filtered in real time
        ↓
User selects result
        ↓
Value fills input
```

---

# Example

## Input Field

```html
<input placeholder="Government ID" />
```

## User Types

```text
aad
```

## Results

```text
🪪 aadhaar
🪪 aadhaar_masked
```

---

# Add Key Flow

## Goal
Create new vault entry directly from popup.

---

## Flow

```text
No useful suggestion found
        ↓
User clicks "Add New Key"
        ↓
Inline form opens
        ↓
User enters:
- key
- value
- aliases
- sensitive toggle
        ↓
Entry saved locally
        ↓
Entry becomes searchable immediately
```

---

# Example

## User Input

```text
Key: employee_id
Value: EMP-001
Sensitive: false
```

---

# Save Selection Flow

## Goal
Save selected webpage text into vault.

---

## Flow

```text
User selects text on webpage
        ↓
Right click
        ↓
"Save to QuickFill"
        ↓
Mini form opens
        ↓
User enters key name
        ↓
Selection stored as vault value
```

---

# Example

## Selected Text

```text
Suraj Songara
```

## Saved As

```text
full_name
```

---

# Sensitive Fill Flow

## Goal
Protect sensitive values from accidental exposure.

---

## Flow

```text
Sensitive suggestion displayed
        ↓
Value remains masked in UI
        ↓
User explicitly selects entry
        ↓
Actual value fills input
```

---

# Example

## Popup

```text
🪪 aadhaar
```

NOT:

```text
1234-5678-9999
```

---

# Keyboard Navigation Flow

## Goal
Allow fast interaction without mouse.

---

## Flow

```text
User focuses input
        ↓
Popup opens
        ↓
Arrow keys navigate suggestions
        ↓
Enter selects item
        ↓
Value fills input
```

---

# Shortcut Flow

## Goal
Open QuickFill manually.

---

## Flow

```text
User presses shortcut
        ↓
QuickFill popup opens
        ↓
Search gains focus
        ↓
User searches vault
        ↓
Selection fills active field
```

---

# Empty State Flow

## Goal
Handle unmatched fields gracefully.

---

## Flow

```text
No good match found
        ↓
Display empty state
        ↓
Offer:
+ Add New Key
```

---

# Error Flow

## Goal
Handle failed fills safely.

---

## Flow

```text
Fill action triggered
        ↓
DOM update fails
        ↓
Display lightweight error
        ↓
Keep popup open
```

---

# Future AI Flow (Non MVP)

## Goal
Support semantic intelligence later.

---

## Future Flow

```text
Field focused
        ↓
Matcher Engine invoked
        ↓
Heuristic ranking
        ↓
AI reranking
        ↓
Context-aware suggestions
```

This flow is intentionally excluded from MVP implementation.

---

# MVP Supported Flows

## Included

- Smart fill
- Search
- Add key
- Save selection
- Keyboard navigation
- Sensitive fills

---

# Excluded

- Automatic filling
- Multi-step workflows
- AI reasoning
- Browser agents
- Autonomous submission
- File uploads
```