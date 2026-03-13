# Shipyard

A Next.js application with three core features:

- **Notes** — Notion-like rich text editor built with TipTap
- **Task Board** — Kanban-style task management (planned)
- **Canvas** — Excalidraw-based drawing app (planned)

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Editor**: TipTap (ProseMirror)
- **Package Manager**: pnpm
- **Specs**: OpenSpec

## Project Structure

```
app/                  # Next.js routes (thin wrappers)
  notes/
features/             # Feature modules (components, hooks, utils, types)
  notes/
openspec/             # OpenSpec change specs
```

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000/notes](http://localhost:3000/notes) to use the editor.

## Scripts

| Command      | Description              |
|-------------|--------------------------|
| `pnpm dev`  | Start dev server         |
| `pnpm build`| Production build         |
| `pnpm start`| Start production server  |
| `pnpm lint` | Run ESLint               |
