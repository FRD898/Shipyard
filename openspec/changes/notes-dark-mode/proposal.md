## Why

The Notes feature renders as a flat white page with no visual boundaries — no content area distinction, no depth, no structure. The rest of the app (Manifest, Kraken, NavPill) already uses a dark aesthetic. Additionally, the TipTap editor has 4 hardcoded light-mode colors in `globals.css` that don't adapt when OS dark mode is active, making blockquotes, inline code, and horizontal rules invisible or jarring against a dark background.

## What Changes

- Style the Notes page with a dark background (`zinc-950`) and wrap the editor in a visually distinct container (`zinc-900` surface with subtle border and rounded corners)
- Update editor text color to light (`zinc-100`) for readability on dark surfaces
- Convert 4 hardcoded `.tiptap` CSS color values to CSS custom properties with light/dark variants via `prefers-color-scheme`
- Adjust editor padding and min-height to account for the new container layout

## Capabilities

### New Capabilities
- `notes-dark-theme`: Dark mode styling for the Notes editor — page background, editor container surface, and adaptive TipTap element colors

### Modified Capabilities
<!-- No existing spec-level behavior changes — this is purely visual styling -->

## Impact

- `app/notes/page.tsx` — page wrapper styling
- `features/notes/components/Notes.tsx` — editor text color and padding
- `app/globals.css` — CSS variables for TipTap element colors (blockquote, inline code, hr)
- No new dependencies, no API changes, no breaking changes
