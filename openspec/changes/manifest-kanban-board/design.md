## Context

Shipyard is a Next.js 16 app (React 19, TypeScript, Tailwind CSS 4, pnpm) with feature-based organization. Existing features (kraken, notes) follow a pattern of `app/<feature>/` for routes and `features/<feature>/` for components/logic. Manifest will follow this same structure.

## Goals / Non-Goals

**Goals:**
- Fully functional Kanban board at `/manifest` route
- Drag-and-drop via `@atlaskit/pragmatic-drag-and-drop` (DOM-based, no HTML5 DnD limitations)
- All state managed client-side with localStorage persistence
- Dark theme with monospace typography matching a dense, terminal-like aesthetic

**Non-Goals:**
- No backend/database — localStorage only
- No multi-user collaboration or real-time sync
- No authentication or access control
- No undo/redo system
- No sub-tasks or task dependencies

## Decisions

### 1. Drag-and-drop: pragmatic-drag-and-drop
**Choice**: `@atlaskit/pragmatic-drag-and-drop` over `dnd-kit` or `react-beautiful-dnd`
**Rationale**: User-specified. Also: framework-agnostic, smaller bundle, better performance than react-beautiful-dnd (deprecated). No context providers needed — operates at DOM level.

### 2. State management: React state + localStorage
**Choice**: `useState`/`useReducer` with a custom `useLocalStorage` hook over Zustand or Redux
**Rationale**: Single-user, single-page app with a flat data model. A reducer handles all task mutations (create, update, move, delete) and localStorage syncs on every state change. No need for external state libraries.

### 3. Data model: flat task array with status field
**Choice**: Single `Task[]` array filtered by `status` to render columns, over a `Record<Status, Task[]>` column-based structure
**Rationale**: Simpler mutations — moving a task is just updating its `status` field. Column rendering derives from filtering. Status history is an append-only log on each task.

### 4. ID generation: crypto.randomUUID()
**Choice**: Browser-native `crypto.randomUUID()` over nanoid or uuid package
**Rationale**: Zero dependencies, available in all modern browsers, produces standard UUIDs.

### 5. Feature structure
**Choice**: Follow existing pattern — `app/manifest/page.tsx` for route, `features/manifest/` for all components and logic
**Rationale**: Consistency with kraken and notes features.

### 6. Styling approach
**Choice**: Tailwind CSS utility classes with CSS custom properties for column accent colors
**Rationale**: Consistent with project's existing Tailwind setup. Custom properties allow column colors to be defined once and referenced throughout.

## Risks / Trade-offs

- **localStorage limits (~5MB)** → Sufficient for hundreds of tasks. If users hit limits, data export could be added later.
- **No persistence across browsers/devices** → Acceptable for v1 single-user tool. Backend can be added later without changing the component architecture.
- **pragmatic-drag-and-drop learning curve** → Well-documented library with clear patterns for sortable lists and cross-container moves.
