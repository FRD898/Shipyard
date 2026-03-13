## Why

Shipyard needs a rich text editing experience for users to create and manage markdown notes. This is the first of three core features (editor, task board, excalidraw-based canvas). We're starting with a lightweight TipTap editor that supports basic markdown content — just the core editing experience, no extras yet.

## What Changes

- Add a TipTap-based editor with block-style editing (headings, lists, code blocks, quotes, bold, italic)
- Markdown input shortcuts (e.g. `# ` for headings, `**` for bold, `- ` for lists)
- Basic styled content area at `/editor` route

## Capabilities

### New Capabilities
- `editor-core`: TipTap editor integration with StarterKit extension, basic block types, inline formatting, and markdown input shortcuts

### Modified Capabilities

## Impact

- **Dependencies**: Adds `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/pm`
- **Routes**: New `/editor` route under the Next.js App Router
- **Components**: New `src/features/editor/components/Editor.tsx`
- **Project structure**: Feature-based organization under `src/features/<feature>/` — each feature (editor, task board, canvas) owns its components, hooks, utils, and types. Routes in `src/app/` import from features.

### Deferred to future iterations
- Formatting toolbar
- Slash command menu
- Link extension
- Markdown export
- Local storage persistence
- Document management
