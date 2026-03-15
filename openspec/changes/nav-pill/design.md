## Context

Shipyard is a Next.js 16 app (React 19, TypeScript, Tailwind CSS 4) with three features that have incompatible viewport strategies:

| Feature  | Layout                          | Theme         |
|----------|---------------------------------|---------------|
| Notes    | Centered `max-w-3xl`, normal flow | Dark (system) |
| Kraken   | `position: fixed; inset: 0`    | Light (Excalidraw) |
| Manifest | `h-screen` flex column          | Dark (`zinc-950`) |

Excalidraw (Kraken) renders its own UI controls: hamburger menu (top-left), tool palette (top-center), Library button (top-right), zoom/undo controls (bottom-left), help icon (bottom-right).

## Goals / Non-Goals

**Goals:**
- Provide always-visible navigation between all features
- Work with all three viewport strategies without layout changes
- Avoid conflicting with Excalidraw's built-in UI controls
- Match the monospace, developer-tool aesthetic

**Non-Goals:**
- No mobile-specific responsive behavior (pill is compact enough)
- No animation or auto-hide behavior
- No breadcrumbs or nested route display

## Decisions

### 1. Position: Bottom-center
**Choice**: `fixed bottom-4 left-1/2 -translate-x-1/2` over top-left, top-right, or sidebar
**Rationale**: Excalidraw occupies all four corners (hamburger top-left, Library top-right, zoom bottom-left, help bottom-right). Bottom-center is the only position free across all features. Notes and Manifest have no UI at bottom-center.

### 2. Overlay approach: Fixed position with high z-index
**Choice**: `z-[200]` overlay rather than reserving layout space
**Rationale**: Each feature manages its own viewport differently. Reserving space (top bar, sidebar) would require modifying every feature's layout. A fixed overlay is additive-only — zero changes to existing code.

### 3. Z-index: 200
**Choice**: `z-[200]` over `z-50` or `z-[9999]`
**Rationale**: Excalidraw footer uses `z-index: 100`. Manifest's TaskModal uses `z-50` (Tailwind scale = 50) with a `fixed inset-0` backdrop. At `z-[200]`, the pill floats above Excalidraw's UI but the TaskModal's full-screen backdrop still visually covers everything when open.

### 4. Component location: `components/`
**Choice**: `components/nav-pill.tsx` at project root over `features/` directory
**Rationale**: The nav pill is a shared, global component — not feature-specific. Creating `components/` as a peer to `features/` establishes a clear location for shared UI. The `@/*` path alias already supports this.

### 5. Manifest Add button: Move to column header
**Choice**: Move the "+ Add" button from column bottom to column header (as a `+` icon next to task count) over adding bottom padding to the board
**Rationale**: The bottom-center pill overlaps the bottom "+ Add" buttons on center columns (e.g., Blocked). Moving the add action to the header avoids the conflict entirely, keeps the button always visible regardless of scroll position, and follows the pattern used by Linear, Trello, and Notion.

### 6. Styling: Dark semi-transparent pill
**Choice**: `bg-zinc-900/80 backdrop-blur-md` with `border-zinc-700/50`
**Rationale**: Dark semi-transparent works on both light backgrounds (Notes, Kraken) and Manifest's dark theme. Backdrop blur provides depth separation from content beneath.

## Risks / Trade-offs

- **Pill may overlap bottom content on short viewports** → Acceptable for a developer tool; content scrolls past. The pill is only ~36px tall.
- **Excalidraw canvas interactions under the pill** → The pill blocks a small bottom-center area from canvas interaction. Acceptable trade-off for navigation access.
