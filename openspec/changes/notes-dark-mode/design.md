## Context

The Notes feature is a TipTap rich text editor rendered as a full-page white canvas with no visual boundaries. The rest of the app (Manifest board, Kraken canvas, NavPill) uses a dark zinc-based aesthetic. The editor's `.tiptap` CSS in `globals.css` uses 4 hardcoded light-mode hex colors that become invisible or jarring against dark backgrounds.

Current files:
- `app/notes/page.tsx` — thin wrapper with `mx-auto max-w-3xl`
- `features/notes/components/Notes.tsx` — TipTap editor with no color classes
- `app/globals.css` — CSS variables for body colors (already dark-aware) + hardcoded `.tiptap` element colors (not dark-aware)

## Goals / Non-Goals

**Goals:**
- Give the Notes editor a styled dark container with visual depth (elevated surface on darker page)
- Make all TipTap element colors (blockquote, inline code, hr) adapt to dark backgrounds
- Match the app's existing dark zinc aesthetic

**Non-Goals:**
- No theme toggle or light/dark mode switcher — Notes will be always-dark like Manifest
- No theme context provider or shared theme system
- No changes to other features (Manifest, Kraken, NavPill)
- No new dependencies or libraries

## Decisions

### 1. Always-dark with hardcoded Tailwind classes (not system-preference toggle)

Manifest and Kraken are always dark. Making Notes always-dark keeps the app consistent. The page wrapper and editor container use explicit zinc Tailwind classes rather than relying on `prefers-color-scheme`.

**Alternative considered:** CSS variables with `prefers-color-scheme` media query — rejected because the rest of the app doesn't toggle, so Notes toggling would feel inconsistent.

### 2. Two-layer dark surface for depth

Page background at `zinc-950` with editor container at `zinc-900` creates visual separation. A subtle `border-zinc-800/50` and `rounded-lg` define the content area without being heavy.

**Alternative considered:** Single flat dark background — rejected because it recreates the same "boundless void" problem just in dark instead of white.

### 3. CSS variables for `.tiptap` element colors

The 4 hardcoded colors in `.tiptap` rules are replaced with CSS custom properties. Light values stay in `:root`, dark values go in the `prefers-color-scheme: dark` media query (which already exists). This keeps the global CSS clean and allows `.tiptap` styles to work correctly if the editor is ever used in a light context.

**Alternative considered:** Hardcode dark values directly — rejected because it breaks the `.tiptap` styles for any future light-mode usage and doesn't follow the existing pattern in `globals.css`.

### 4. Editor text via Tailwind class, not CSS variable

The editor text color is set via `text-zinc-100` on the editor's class attribute rather than modifying the `--foreground` CSS variable. This keeps the change scoped to Notes and avoids side effects on other pages.

## Risks / Trade-offs

- **[Risk] Notes is always dark while body CSS variables still toggle** → The Tailwind classes on the Notes page and editor explicitly set colors, overriding the body-level CSS variables. No conflict because explicit classes take precedence.
- **[Trade-off] `.tiptap` CSS variables still respond to system preference** → This means the blockquote/code/hr colors may show light values if OS is in light mode, but since the page itself is always dark, the dark variant colors will be the ones seen. If a mismatch occurs, the dark values can be hardcoded later.
