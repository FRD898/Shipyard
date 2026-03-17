## 1. Project Setup

- [x] 1.1 Install `@atlaskit/pragmatic-drag-and-drop` dependency
- [x] 1.2 Create `app/manifest/page.ts` route and `features/manifest/` directory structure
- [x] 1.3 Define TypeScript types: Task, TaskType, Priority, Status, StatusHistoryEntry

## 2. State & Persistence

- [x] 2.1 Implement `useLocalStorage` hook for persisting task state
- [x] 2.2 Implement task reducer with actions: create, update, delete, moveStatus
- [x] 2.3 Add status history tracking on every status change (append {from, to, timestamp})

## 3. Board Layout & Theme

- [x] 3.1 Build board layout with si horizontal scrollable columns and dark theme styling
- [x] 3.2 Define column accent colors and render column headers with task counts
- [x] 3.3 Apply monospace font and dense card layout with Tailwind utilities

## 4. Task Cards

- [x] 4.1 Build TaskCard component displaying title, type badge, priority dot, and smart due date label
- [x] 4.2 Implement type badge colors (PRD, TDD, Impl, Review, Bug, Docs)
- [x] 4.3 Implement priority dot colors (Low=gray, Medium=yellow, High=red)
- [x] 4.4 Implement smart due date labels ("due in 3d", "due tomorrow", "2d overdue") with overdue red highlight

## 5. Drag and Drop

- [x] 5.1 Integrate pragmatic-drag-and-drop: make cards draggable and columns drop targets
- [x] 5.2 Add visual drag feedback (drag preview, drop target highlighting)
- [x] 5.3 Handle drop events: update task status, record status history, skip if same column

## 6. Task CRUD & Modal

- [x] 6.1 Build add-task form triggered by per-column add button (title, description, type, priority, due date)
- [x] 6.2 Build edit modal with all task fields editable and status history timeline display
- [x] 6.3 Add delete action with confirmation in the edit modal

## 7. Filtering & Search

- [x] 7.1 Build header bar with type filter (multi-select toggle buttons)
- [x] 7.2 Add priority filter (multi-select toggle buttons)
- [x] 7.3 Add search input for title filtering (case-insensitive)
- [x] 7.4 Wire all filters with AND logic to filter visible tasks across columns
