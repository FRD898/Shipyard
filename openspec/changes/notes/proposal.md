## Why

Shipyard needs a rich text editing experience for users to create and manage markdown notes. This is the first of three core features (notes, task board, excalidraw-based canvas). We're starting with a lightweight TipTap editor that supports basic markdown content — just the core editing experience, no extras yet.

## What Changes

- Add a TipTap-based editor with block-style editing (headings, lists, code blocks, quotes, bold, italic)
- Markdown input shortcuts (e.g. `# ` for headings, `**` for bold, `- ` for lists)
- Basic styled content area at `/notes` route

## Capabilities

### New Capabilities
- `notes-core`: TipTap editor integration with StarterKit extension, basic block types, inline formatting, and markdown input shortcuts

### Modified Capabilities

## Impact

- **Dependencies**: Adds `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/pm`
- **Routes**: New `/notes` route under the Next.js App Router
- **Components**: New `features/notes/components/Notes.tsx`
- **Project structure**: Feature-based organization under `features/<feature>/` — each feature (notes, task board, canvas) owns its components, hooks, utils, and types. Routes in `app/` import from features.

### Deferred to future iterations
- Formatting toolbar
- Slash command menu
- Link extension
- Markdown export
- Local storage persistence
- Document management
