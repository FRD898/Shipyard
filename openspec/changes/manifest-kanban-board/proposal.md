## Why

Shipyard needs a visual task management tool for tracking work across its development lifecycle. Manifest provides a Kanban board purpose-built for software teams, with task types that map directly to development phases (PRD, Tech Design, Implementation, Review, Bug Fix, Docs) and a status history log for traceability.

## What Changes

- Add a new Kanban board app called **Manifest** under `apps/manifest/`
- Six columns representing workflow stages: Backlog → Queued → In Progress → Blocked → In Review → Done
- Task cards with typed badges (PRD, TDD, Impl, Review, Bug, Docs), priority dots (Low/Medium/High), and smart due-date labels
- Drag-and-drop between columns using `@atlaskit/pragmatic-drag-and-drop`
- Edit modal with full status history timeline
- Header filters (type, priority) and title search
- Dark theme, monospace font, dense layout with colored column accents
- Local state persistence (localStorage)

## Capabilities

### New Capabilities
- `kanban-board`: Core board layout with six status columns, drag-and-drop card movement, and column-specific color accents
- `task-management`: Task CRUD operations, task model (title, description, type, priority, due date, created date), and status history tracking
- `task-filtering`: Header-level filters by task type and priority, plus title search

### Modified Capabilities
<!-- No existing capabilities are modified -->

## Impact

- **New dependency**: `@atlaskit/pragmatic-drag-and-drop`
- **New app**: `apps/manifest/` — standalone React app
- **No breaking changes** to existing code
