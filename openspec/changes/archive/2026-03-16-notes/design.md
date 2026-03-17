## Context

Shipyard is a Next.js 16 application (App Router, TypeScript, Tailwind CSS v4) that will host three features: a rich text editor, a task board, and an Excalidraw-based canvas. The notes feature is the first feature. This iteration is a lightweight version — just the core TipTap editor with basic markdown support.

## Goals / Non-Goals

**Goals:**
- Render a functional TipTap editor at `/notes`
- Support basic block types via StarterKit: paragraphs, headings (H1–H3), bullet/ordered lists, code blocks, blockquotes, horizontal rules
- Support inline formatting: bold, italic, strikethrough, inline code
- Markdown input shortcuts (type `# `, `- `, `**text**`, etc.)
- Clean, readable content area styled with Tailwind

**Non-Goals:**
- Formatting toolbar (future iteration)
- Slash command menu (future iteration)
- Link support (future iteration)
- Persistence / local storage / document management (future iteration)
- Markdown export (future iteration)
- Collaboration, auth, backend API

## Decisions

### 1. TipTap with StarterKit only
**Choice**: Use `@tiptap/starter-kit` which bundles paragraph, headings, lists, code block, blockquote, horizontal rule, bold, italic, strike, code, and history (undo/redo).
**Rationale**: StarterKit provides everything needed for the lightweight version in a single import. No extra extensions needed yet.

### 2. Feature-based directory structure
**Choice**: Organize by feature under `features/<feature>/`
```
app/
  notes/
    page.tsx              — Route entry, imports from feature
features/
  notes/
    components/
      Notes.tsx           — TipTap editor component
    index.ts               — Public exports for the feature
```
**Rationale**: Shipyard will have three features (notes, task board, canvas). Feature-based organization keeps each feature's components, hooks, utils, and types co-located. Routes in `app/` stay thin — they just import and render from `features/`. This scales cleanly as features grow and avoids a flat `components/` folder that mixes concerns.

### 3. Client component
**Choice**: `Notes.tsx` is a `"use client"` component, rendered from a server page at `app/notes/page.tsx`.
**Rationale**: TipTap requires browser APIs. The page component stays server-rendered; the editor mounts client-side.

## Risks / Trade-offs

- **Minimal feature set may feel incomplete** → This is intentional. We're validating the TipTap integration before adding complexity.
- **No persistence** → Content is lost on page refresh. Acceptable for this iteration; persistence is the next step.
