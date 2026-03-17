## 1. Setup & Dependencies

- [x] 1.1 Install TipTap packages: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/pm`
- [x] 1.2 Create feature directory structure: `features/notes/components/`, `features/notes/index.ts`
- [x] 1.3 Create `/notes` route at `app/notes/page.tsx` (thin wrapper, imports from feature)

## 2. Core Editor (Lightweight)

- [x] 2.1 Implement `features/notes/components/Notes.tsx` with `useEditor` hook and StarterKit extension (paragraph, headings, bold, italic, lists, code block, blockquote, horizontal rule)
- [x] 2.2 Basic markdown input shortcuts (e.g. `# ` for heading, `- ` for list, `**` for bold) — provided by StarterKit's inputRules
- [x] 2.3 Export notes component from `features/notes/index.ts`

## 3. Page Integration & Styling

- [x] 3.1 Wire up notes in `/notes` page with basic layout
- [x] 3.2 Style editor content area with Tailwind CSS (typography, spacing)
- [x] 3.3 Responsive content width (centered, max-width for readability)

---

## Deferred (future iterations)

- Toolbar with formatting buttons and block type controls
- Slash command menu (`/`) for block insertion
- Link extension
- Markdown export serialization
- Local storage persistence (auto-save, document list)
- Mobile-specific optimizations
