# App Graph Builder

An interactive service dependency graph visualizer built with **React 19**, **TypeScript**, **React Flow**, and **Zustand**. Select an application, explore its service topology, inspect node metrics, and edit configurations — all with a responsive, theme-aware interface.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6E9F18?logo=vitest&logoColor=white)

---

## ✨ Features

### Graph Visualization
- **Interactive React Flow canvas** — pan, zoom, drag nodes, and fit-to-view
- **Animated smooth-step edges** — flowing connection lines between services
- **MiniMap & Controls** — built-in navigation aids with dark/light mode support
- **Custom ServiceNode** — rich card UI with kind-based icons (Server / Database), metric tabs, gradient progress bars, and status badges
- **Dynamic `colorMode`** — React Flow's controls and minimap adapt to the active theme

### Application Management
- **App list with search** — real-time filtering by name
- **Language-colored badges** — Golang (cyan), Java (orange), Python (yellow), Ruby (red), Node (green)
- **Skeleton loading states** — animated placeholders during API fetches
- **Error states with retry** — graceful failure handling across all data-fetching surfaces

### Node Inspector
- **Tabbed interface** — Config and Runtime tabs powered by Radix UI / shadcn
- **Config editing** — rename nodes and adjust CPU capacity with a range slider
- **Runtime metrics** — CPU, Memory, Disk percentages and region display
- **Real-time draft sync** — edits update the graph canvas immediately

### Graph Editing
- **Delete nodes** — press `Delete` or `Backspace` to remove the selected node
- **Automatic edge cleanup** — connected edges are removed alongside the deleted node
- **Pane click deselection** — click empty canvas to deselect

### Theming
- **Light & Dark mode** — toggle via the toolbar button (Sun/Moon icon)
- **CSS custom property architecture** — semantic design tokens (`bg-app`, `text-fg`, `border-edge`, etc.) defined in `:root` / `.dark` and registered via Tailwind v4's `@theme inline`
- **Persisted preference** — saved to `localStorage`, survives page reload
- **Status color adaptation** — green/yellow/red status badges adjust contrast per theme

### Responsive Design
- **Desktop** — full layout with LeftRail, canvas, and side panel
- **Mobile** — LeftRail hidden, slide-over drawer for apps & inspector, hamburger menu trigger
- **Dynamic viewport** — `100dvh` for proper mobile browser height handling
- **Notch-safe** — `viewport-fit=cover` for edge-to-edge on modern phones

---

## 🏗️ Architecture

### Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **UI Framework** | React 19 | Component rendering |
| **Language** | TypeScript 5.9 | Type safety |
| **Bundler** | Vite 7 | Dev server + production builds |
| **Styling** | Tailwind CSS 4 + shadcn/ui | Utility-first CSS with Radix primitives |
| **Graph Engine** | React Flow (@xyflow/react) | Interactive node-edge canvas |
| **Client State** | Zustand | Lightweight stores for UI, graph drafts, controls |
| **Server State** | TanStack Query | Data fetching, caching, error/loading management |
| **API Mocking** | MSW (Mock Service Worker) | Intercepts `fetch` at the network level |
| **Testing** | Vitest + Testing Library | Unit and component tests |
| **Linting** | ESLint 9 + Prettier | Code quality and formatting |

### State Architecture

The app uses a **3-store pattern** to separate concerns:

```
┌─────────────────┐   ┌──────────────────────┐   ┌────────────────────────┐
│   ui.store      │   │   graph.store        │   │  graph-controls.store  │
│                 │   │                      │   │                        │
│ • selectedAppId │   │ • drafts{}           │   │ • triggerFitView()     │
│ • selectedNode  │   │ • hydrateGraph()     │   │ • fitViewCounter       │
│ • theme         │   │ • updateNodes()      │   └────────────────────────┘
│ • toggleTheme() │   │ • deleteNode()       │
│ • inspectorTab  │   │ • updateNodeData()   │
└─────────────────┘   └──────────────────────┘
```

**Data flow:** API → React Query → `hydrateGraph()` → Zustand draft → React Flow nodes/edges

### Project Structure

```
src/
├── app/                          # App root, providers, query client
│   ├── App.tsx                   # Root component + theme sync
│   ├── AppProviders.tsx          # QueryClientProvider wrapper
│   └── queryClient.ts            # TanStack Query configuration
│
├── features/                     # Feature-based modules
│   ├── apps/                     # Application list feature
│   │   ├── api/                  # API functions + tests
│   │   ├── components/           # AppList, AppListItem
│   │   └── hooks/                # useAppsQuery, useGraphQuery
│   │
│   ├── graph/                    # Graph visualization feature
│   │   ├── components/           # GraphCanvas, ServiceNode, Loading, Error
│   │   ├── hooks/                # useFitGraph, useDeleteSelectedNode, useGraphHydration
│   │   └── graph.constants.ts    # Node type registry
│   │
│   └── inspector/                # Node inspector feature
│       └── components/           # NodeInspector, ConfigTab, RuntimeTab, StatusBadge
│
├── hooks/                        # Shared hooks
│   └── useThemeSync.ts           # Syncs theme class to <html>
│
├── layouts/                      # Layout components
│   ├── TopBar.tsx                # Header with logo, theme toggle, fit-view
│   ├── LeftRail.tsx              # Icon sidebar (desktop only)
│   ├── DesktopSidePanel.tsx      # Right panel (≥768px)
│   ├── MobileSidePanel.tsx       # Slide-over drawer (<768px)
│   └── WorkspaceLayout.tsx       # Main layout shell
│
├── stores/                       # Zustand stores + tests
│   ├── ui.store.ts               # UI state + theme
│   ├── graph.store.ts            # Graph draft management
│   └── graph-controls.store.ts   # Fit-view trigger
│
├── mocks/                        # MSW mock layer
│   ├── browser.ts                # Service worker setup
│   ├── handlers/                 # Route handlers (apps, graphs)
│   ├── data/                     # Mock datasets
│   └── utils.ts                  # Delay + error simulation helpers
│
├── components/                   # Shared components
│   ├── ErrorBoundary.tsx         # React error boundary
│   └── ui/                       # shadcn/ui primitives (Tabs)
│
├── styles/
│   └── globals.css               # Theme tokens, base styles, scrollbar
│
├── types/                        # Shared TypeScript types
│   ├── app.types.ts
│   ├── common.types.ts
│   └── graph.types.ts
│
├── lib/                          # Utility functions
│   ├── cn.ts                     # clsx + tailwind-merge
│   └── validation.ts             # Zod schemas
│
├── test/
│   └── setup.ts                  # Vitest + Testing Library setup
│
└── main.tsx                      # Entry point (MSW init, dev-only guard)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.19.0
- **npm** ≥ 10

### Install & Run

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app opens at [http://localhost:5173](http://localhost:5173). MSW intercepts API requests automatically — no backend needed.

### Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Start Vite dev server |
| `build` | `npm run build` | TypeScript check + production build |
| `preview` | `npm run preview` | Preview the production build |
| `test` | `npm run test` | Run all tests with Vitest |
| `test:watch` | `npm run test:watch` | Run tests in watch mode |
| `typecheck` | `npm run typecheck` | TypeScript type checking |
| `lint` | `npm run lint` | ESLint with zero-warning policy |

---

## 🧪 Testing

```bash
npm run test
```

**14 tests** across 3 test files:

| Test File | Tests | Coverage |
|---|---|---|
| `graph.store.test.ts` | 6 | Store hydration, node updates, edge updates, node deletion, edge cleanup |
| `apps.api.test.ts` | 4 | `getApps` / `getGraph` success and failure paths with mocked fetch |
| `StatusBadge.test.tsx` | 4 | Renders status text, applies correct semantic class per status |

---

## 🎨 Design Decisions

### Semantic Design Tokens

Instead of scattering raw Tailwind color classes (`bg-zinc-900`, `text-white`) throughout components, the project uses **semantic CSS custom properties** registered via Tailwind v4's `@theme inline`:

```css
/* Light mode (default) */
:root {
  --surface-card: #ffffff;
  --text-primary: #18181b;
  --border-edge: #e4e4e7;
}

/* Dark mode */
.dark {
  --surface-card: #18181b;
  --text-primary: #fafafa;
  --border-edge: #27272a;
}
```

Components then use clean, intention-revealing classes: `bg-scard text-fg border-edge`.

### Draft-Based Graph Editing

Graph edits are stored as **Zustand drafts per app ID**, not written back to the server. This enables:
- Instant local edits (no API round-trip)
- Per-app undo potential
- Clean separation from server-cached data (React Query)

### MSW Production Guard

MSW is lazily imported and guarded behind `import.meta.env.DEV`:

```ts
async function enableMocking() {
  if (!import.meta.env.DEV) return;
  const { worker } = await import("@/mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}
```

This ensures mock code is **tree-shaken from production bundles**.

---

## 📡 Mock API Endpoints

| Method | Endpoint | Response | Notes |
|---|---|---|---|
| `GET` | `/api/apps` | `AppSummary[]` | List of all applications |
| `GET` | `/api/apps/:appId/graph` | `AppGraphResponse` | Node + edge data for an app |

Both endpoints include simulated network delay (800ms) and random error simulation to test error handling paths.

---

## ♿ Accessibility

- ARIA labels on all interactive elements (`button`, `input`, `dialog`)
- `aria-modal` and `role="dialog"` on the mobile slide-over panel
- `aria-label` landmarks on layout regions (`aside`, `main`, `header`)
- `aria-hidden` on decorative icons
- Keyboard-navigable React Flow nodes with visible focus rings
- `prefers-reduced-motion` media query disables animations

---

## ✅ Requirement Checklist

| Requirement | Status |
|---|---|
| React + TypeScript | ✅ |
| Tailwind CSS | ✅ (v4 with `@theme inline`) |
| shadcn/ui | ✅ (Tabs, Radix primitives) |
| Zustand state management | ✅ (3-store pattern) |
| TanStack Query | ✅ (data fetching + caching) |
| React Flow graph visualization | ✅ (custom nodes, animated edges) |
| Node Inspector (Config + Runtime) | ✅ (tabbed with editing) |
| Node editing (name, CPU) | ✅ |
| Node deletion (Delete/Backspace) | ✅ |
| Loading states | ✅ (skeleton + spinner) |
| Error states with retry | ✅ |
| MSW mock APIs | ✅ (dev-only guard) |
| Responsive layout | ✅ (mobile drawer, dvh, notch-safe) |
| Light/Dark theme | ✅ (semantic tokens, persisted) |
| Accessibility | ✅ (ARIA, keyboard, focus rings) |
| Unit tests | ✅ (14 tests, store + API + component) |
| Production build | ✅ (0 errors, 0 warnings) |

---

## Author

**Akshat Jain**
