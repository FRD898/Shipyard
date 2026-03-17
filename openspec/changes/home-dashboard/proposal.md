## Why

The home page (`/`) is currently the default Next.js boilerplate. Shipyard needs a landing dashboard that surfaces the most actionable tasks — those due today or overdue, and those currently blocked — so the user can immediately see what needs attention without navigating to the full Manifest board.

## What Changes

- Replace the default Next.js home page with a **"Today's Focus" dashboard**
- Two task sections: **Due Today** (due today + overdue) and **Blocked** (status = Blocked)
- Simplified, non-draggable task cards reusing Manifest's visual language (type badges, priority dots, due date labels)
- Smart sorting: by urgency (overdue first), then priority (High → Medium → Low)
- Empty state when nothing needs attention
- Update root layout metadata from "Create Next App" to "Shipyard"
- Reads from the same `manifest-tasks` localStorage key — no new data layer

## Capabilities

### New Capabilities
- `home-dashboard`: Dashboard page showing due-today/overdue tasks and blocked tasks with priority-based sorting

### Modified Capabilities
<!-- No existing capabilities are modified -->

## Impact

- **No new dependencies**
- **Replaces**: default Next.js boilerplate at `app/page.tsx`
- **New feature directory**: `features/home/`
- **No breaking changes** to existing features
