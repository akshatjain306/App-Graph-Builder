# App Graph Builder

A React + TypeScript application for visualizing and managing service dependency graphs using React Flow.

## Tech Stack

* React 19
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* Zustand
* TanStack Query
* React Flow
* MSW (Mock Service Worker)

## Features

### Application Management

* View multiple applications
* Select an application from the side panel
* Load graph data dynamically

### Graph Visualization

* Interactive React Flow canvas
* Zoom and pan support
* Fit View support
* MiniMap support
* Custom service nodes
* Service dependency edges

### Node Inspector

* Select nodes
* View node status
* Config tab
* Runtime tab
* Edit node name
* Edit CPU capacity
* Real-time updates

### Graph Editing

* Delete nodes using Delete key
* Delete nodes using Backspace key
* Automatic edge cleanup after node deletion

### State Management

* Zustand for UI and graph state
* React Query for server state
* Cached graph loading

### Mock APIs

* GET /api/apps
* GET /api/apps/:appId/graph
* Error simulation using MSW

### Responsive Design

* Desktop side panel
* Mobile slide-over drawer

---

## Project Structure

```text
src
├── app
├── components
├── features
│   ├── apps
│   ├── graph
│   └── inspector
├── layouts
├── mocks
├── stores
├── styles
└── types
```

---

## Installation

```bash
npm install
```

---

## Development

```bash
npm run dev
```

---

## Type Checking

```bash
npm run typecheck
```

---

## Linting

```bash
npm run lint
```

---

## Production Build

```bash
npm run build
```

---

## Preview Production Build

```bash
npm run preview
```

---

## Implemented Requirements

* React + TypeScript
* Tailwind CSS
* shadcn/ui
* Zustand
* TanStack Query
* React Flow
* Node Inspector
* Node Editing
* Node Deletion
* Loading States
* Error States
* Mock APIs
* Responsive Layout

---

## Author

Akshat Jain
