## Context

Shipyard is a Next.js 16 app (React 19, TypeScript, Tailwind CSS 4, pnpm) with feature-based organization. Features live under `features/<name>/` with routes at `app/<name>/`. The Manifest feature already provides full task management with a Kanban board. The home dashboard is a read-only view that surfaces urgent tasks from the same localStorage data.

## Goals / Non-Goals

**Goals:**
- Glanceable dashboard at `/` showing tasks needing immediate attention
- Two sections: due today (including overdue) and blocked tasks
- Priority-aware sorting within each section
- Consistent visual language with Manifest (type badges, priority dots, dark theme)
- Clicking a task card navigates to `/manifest` for editing

**Non-Goals:**
- No inline editing or task creation from the home page
- No drag-and-drop
- No filtering or search (the sections are the filter)
- No new data persistence — reads existing `manifest-tasks` localStorage

## Decisions

### 1. Read-only view reusing existing state
**Choice**: Read from `useTaskReducer` (same `manifest-tasks` localStorage key) rather than duplicating state
**Rationale**: Single source of truth. Tasks created/edited in Manifest appear automatically on the home dashboard.

### 2. Component structure: separate feature directory
**Choice**: `features/home/components/` following existing feature pattern
**Rationale**: Consistency with kraken, notes, manifest feature directories. Keeps home-specific components isolated.

### 3. Simplified task cards (no drag)
**Choice**: New `HomeTaskCard` component instead of reusing `TaskCard`
**Rationale**: `TaskCard` is tightly coupled to drag-and-drop via `@atlaskit/pragmatic-drag-and-drop`. A simpler card avoids importing the DnD library on the home page and provides a cleaner read-only presentation.

### 4. Sorting strategy
**Choice**: Due Today sorted by overdue-first then priority; Blocked sorted by priority then blocked-duration
**Rationale**: Overdue tasks are the most urgent (already past deadline). Within the same urgency tier, higher priority tasks surface first. For blocked tasks, priority is the primary concern since blocked duration is secondary to business importance.

### 5. Navigation on click
**Choice**: Click navigates to `/manifest` rather than opening an edit modal
**Rationale**: The home page is a summary view. Editing belongs on the Manifest board where the user has full context of all columns and can drag tasks between statuses.

## Risks / Trade-offs

- **No deep-link to specific task**: Clicking navigates to `/manifest` but doesn't scroll to or highlight the specific task. Acceptable for v1 since the board is compact enough to locate tasks visually.
- **Stale data on tab switch**: If the user edits tasks in Manifest on another tab, the home page won't reflect changes until refresh. Acceptable since this is a single-user tool.
