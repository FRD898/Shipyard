## 1. Component Structure

- [x] 1.1 Create `features/home/components/` directory
- [x] 1.2 Create `HomeTaskCard.tsx` — simplified card with type badge, priority dot, title, contextual label; click navigates to `/manifest`
- [x] 1.3 Create `TaskSection.tsx` — reusable section with heading, count badge, and responsive grid of HomeTaskCards; renders nothing if empty
- [x] 1.4 Create `HomePage.tsx` — main client component reading tasks from `useTaskReducer`, computing sections, sorting, and rendering

## 2. Task Filtering & Sorting Logic

- [x] 2.1 Filter due-today tasks: `dueDate` is today or past, status !== "Done"
- [x] 2.2 Filter blocked tasks: `status === "Blocked"`
- [x] 2.3 Sort due-today: overdue first (most overdue at top), then due today; secondary sort by priority High → Medium → Low
- [x] 2.4 Sort blocked: by priority High → Medium → Low, then by blocked duration (longest first)
- [x] 2.5 Compute "blocked Xd" from most recent `to: "Blocked"` entry in `statusHistory`

## 3. Page Integration

- [x] 3.1 Update `app/layout.tsx` metadata: title → "Shipyard", description → appropriate app description
- [x] 3.2 Update `app/page.tsx` to import and render `<HomePage />`
- [x] 3.3 Verify header displays formatted date (e.g., "Mon, Mar 16")
- [x] 3.4 Verify empty state renders when no urgent tasks exist
- [x] 3.5 Verify NavPill remains functional at the bottom
