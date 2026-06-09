# QuickFill

Local-first browser vault and smart-fill command palette for forms.

QuickFill is a Chrome extension that gives you instant access to your saved form values — email, address, phone, and anything else you type often. Focus a field, get suggestions, fill in one click or keystroke. All data stays on your machine.

---

## Features

- **Smart suggestions** — type in any field, QuickFill shows matching vault entries (exact, alias, fuzzy match)
- **Fast search** — filter your vault in real time from the overlay
- **Inline add** — save new key/value pairs without leaving the page
- **Save selection** — right-click any text on a page and save it directly to your vault
- **Sensitive values** — passwords and secrets are masked by default
- **Keyboard-first** — navigate suggestions with `↑` `↓`, fill with `Enter`, dismiss with `Esc`
- **Trigger modes** — auto-open on focus, or opt-in via a configurable keystroke (default: `/`)
- **Privacy-first** — no cloud, no accounts, no telemetry. Everything stays in `chrome.storage.local`

---

## Quick Start

### Prerequisites

- Node.js >= 18
- npm

### Install & Build

```sh
npm install
npm run build
```

The built extension is at `build/chrome-mv3-prod/`.

### Load in Chrome

1. Open `chrome://extensions`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `build/chrome-mv3-prod/` directory

### Seed test data (optional)

Open the extension's service worker console (`chrome://extensions` → QuickFill → **Service worker**) and paste:

```js
await chrome.storage.local.set({"quickfill:vault": {
  "1": { "id": "1", "key": "email", "value": "alice@example.com", "aliases": ["mail","work"], "category": "personal", "sensitive": false, "createdAt": 1, "updatedAt": 1 },
  "2": { "id": "2", "key": "password", "value": "supersecret123", "aliases": ["pass","pwd"], "category": "personal", "sensitive": true, "createdAt": 1, "updatedAt": 1 },
  "3": { "id": "3", "key": "phone", "value": "555-0199", "aliases": ["tel","mobile"], "category": "personal", "sensitive": false, "createdAt": 1, "updatedAt": 1 },
  "4": { "id": "4", "key": "address", "value": "123 Oak St, Springfield", "aliases": ["home"], "category": "personal", "sensitive": false, "createdAt": 1, "updatedAt": 1 },
  "5": { "id": "5", "key": "full_name", "value": "Alice Johnson", "aliases": ["name"], "category": "personal", "sensitive": false, "createdAt": 1, "updatedAt": 1 }
}})
```

Then reload any page and focus a form field.

### Test page

```sh
cd test
python3 -m http.server 3000
```

Open `http://localhost:3000/` and tab through the fields.

---

## Usage

### Auto mode (default)

Focus any `<input>` or `<textarea>` on a page — the overlay opens automatically with the top 3 matching entries.

### Keystroke mode

Click the ⚙ gear icon in the overlay search bar, switch to **Keystroke**, and set your trigger key (default `/`). Focus a field, press the trigger key, and the overlay opens with the search pre-filled from the field's current value.

### Add a new entry

- From the overlay: click **+ Add New Key**, fill in key, value, and optional aliases, then Save
- Save selected text: select text on any page, right-click → **Save to QuickFill**, enter a key name, Save

---

## Architecture

```
Browser Event → Event Engine → DOM Engine → Matcher Engine → Vault Engine
                                                  ↓
                                            Overlay Engine
                                                  ↓
                                              UI (React)
```

| Module | Responsibility |
|--------|---------------|
| **Vault Engine** | CRUD and persistence (`chrome.storage.local`) |
| **Matcher Engine** | Suggestion ranking via Fuse.js + heuristic scoring |
| **DOM Engine** | Field context extraction and value filling |
| **Overlay Engine** | Floating popup UI and positioning |
| **Event Engine** | Focus, keyboard, and click orchestration |

Suggestion priority: exact key match → alias match → partial/label match → fuzzy match.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Extension framework | Plasmo |
| UI | React 18 |
| State | Zustand |
| Fuzzy search | Fuse.js |
| Storage | `chrome.storage.local` |
| Language | TypeScript (strict) |

---

## Development

```sh
npm run dev        # watch mode with hot reload
npm run build      # production build
npm run typecheck  # TypeScript type checking
```

### Project structure

```
src/
├── background/    # Service worker (context menus)
├── contents/      # Content script entry (quickfill.tsx)
├── dom/           # Field extraction, label resolution, fill logic
├── events/        # Focus, keyboard, and input handlers
├── matcher/       # Ranking engine, fuzzy search, alias matching
├── overlay/       # React UI: SearchBar, SuggestionList, AddKeyModal, SettingsPanel, QuickSaveModal
├── state/         # Zustand stores (overlay, vault, search, session, settings)
├── types/         # Shared TypeScript types
├── vault/         # Vault service (CRUD, storage adapter)
└── styles/        # Global styles
```

---

## Documentation

Detailed docs are in the `docs/` directory:

| Directory | Contents |
|-----------|----------|
| `docs/product/` | Vision, UX rules, user flows |
| `docs/architecture/` | HLD, LLD, data models, event flow |
| `docs/engineering/` | Project structure, component map, state management, implementation plan |

---

## Roadmap

The project evolves in phases:

1. **Deterministic UX** — current MVP (heuristic matching, keyboard-first, manual save)
2. **Behavioral learning** — learn from repeated selections, propose alias mappings
3. **Semantic intelligence** — embedding-based matching beyond keywords
4. **Autonomous assistance** — optional multi-field recommendations

See `docs/future/` for the full roadmap.
