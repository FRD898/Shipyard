## Context

Shipyard uses hand-rolled Tailwind for all UI: buttons, inputs, modals, badges, and navigation. The Manifest feature has the richest UI surface (dialog with form, filter bar, kanban cards with badges, columns). The NavPill is the global navigation component. Both use dark zinc styling throughout. There is no component library installed.

Current Manifest components:
- `ManifestBoard.tsx` — orchestrator with header, filters, columns, modal state
- `TaskModal.tsx` — create/edit dialog with form fields, delete confirmation
- `FilterBar.tsx` — search input + type/priority toggle filters
- `TaskCard.tsx` — draggable card with type badge, priority dot, due date
- `Column.tsx` — drop target with header, count badge, add button

Current NavPill (`components/nav-pill.tsx`):
- Fixed bottom bar with 4 nav links (home, notes, kraken, manifest)
- Dark semi-transparent background with blur

## Goals / Non-Goals

**Goals:**
- Initialize shadcn/ui with dark mode as the base theme
- Migrate Manifest's UI primitives (Dialog, Button, Input, Textarea, Badge, Label) to shadcn/ui
- Migrate NavPill to use shadcn/ui Button components for nav items
- Maintain exact same functionality and visual appearance (dark zinc aesthetic)
- Establish reusable component foundation for future features

**Non-Goals:**
- No behavior changes to Manifest (same drag-and-drop, same state management, same persistence)
- No migration of Notes or Kraken (future changes)
- No new features added during migration
- No changes to `types.ts`, `theme.ts`, `dates.ts`, `useTaskReducer.ts`, or `useLocalStorage.ts`

## Decisions

### 1. shadcn/ui initialization with dark mode base

Run `npx shadcn@latest init -t next` to scaffold. Configure dark mode in `globals.css` using shadcn's CSS variable system. Since the app is always-dark, set the dark theme colors as the defaults (no `.dark` class toggle needed — just set the root variables to dark values).

**Alternative considered:** Using `.dark` class on `<html>` — rejected because the app has no light mode and no toggle. Simpler to just set dark values as root defaults.

### 2. Component selection — minimal set

Only add components actually needed for Manifest + NavPill:
- `Dialog` — replaces TaskModal's hand-rolled modal
- `Button` — replaces all button elements across Manifest and NavPill
- `Input` — replaces search input and text fields
- `Textarea` — replaces description textarea
- `Badge` — replaces type/priority indicators and count badges
- `Label` — replaces form labels
- `Card` — optional, for TaskCard wrapper

This keeps the install small. More components can be added per-feature later.

### 3. Preserve drag-and-drop integration

TaskCard and Column use Atlassian Pragmatic DnD with `ref` callbacks. shadcn Card uses `forwardRef` internally, so the drag/drop refs can be composed. The DnD logic stays untouched — only the visual wrapper changes.

### 4. Migration strategy — component by component

Migrate each Manifest component independently in this order:
1. TaskModal (most complex, uses Dialog + form components)
2. FilterBar (uses Input + Button/Toggle)
3. TaskCard (uses Badge + Card)
4. Column (uses Badge + Button)
5. ManifestBoard (minor — just ensure imports work)
6. NavPill (uses Button)

Each step is independently testable. The board should work after each migration.

### 5. Keep theme.ts color mappings

The existing `COLUMN_COLORS`, `TYPE_COLORS`, and `PRIORITY_COLORS` in `theme.ts` work well. They can be applied to shadcn Badge via className props. No need to rebuild the color system.

## Risks / Trade-offs

- **[Risk] shadcn CSS variables conflict with existing globals.css variables** → The init process adds CSS variables to globals.css. Need to merge carefully with existing `--background`/`--foreground` variables and the tiptap variables we just added. Review the output of `shadcn init` before accepting.
- **[Risk] Drag-and-drop ref composition** → TaskCard and Column use refs for DnD. shadcn Card forwards refs, so this should work. If not, wrap shadcn Card in a div that holds the DnD ref.
- **[Trade-off] Bundle size increase** → Adding Radix UI primitives adds ~15-20KB gzipped. Acceptable for the consistency and accessibility gains.
- **[Trade-off] Visual differences** → shadcn components have their own default spacing/sizing. May need className overrides to exactly match the current compact Manifest aesthetic.
