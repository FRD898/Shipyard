## 1. Setup & Dependencies

- [x] 1.1 Install TipTap packages: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/pm`
- [x] 1.2 Create feature directory structure: `features/editor/components/`, `features/editor/index.ts`
- [x] 1.3 Create `/editor` route at `app/editor/page.tsx` (thin wrapper, imports from feature)

## 2. Core Editor (Lightweight)

- [x] 2.1 Implement `features/editor/components/Editor.tsx` with `useEditor` hook and StarterKit extension (paragraph, headings, bold, italic, lists, code block, blockquote, horizontal rule)
- [x] 2.2 Basic markdown input shortcuts (e.g. `# ` for heading, `- ` for list, `**` for bold) — provided by StarterKit's inputRules
- [x] 2.3 Export editor component from `features/editor/index.ts`

## 3. Page Integration & Styling

- [x] 3.1 Wire up editor in `/editor` page with basic layout
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
