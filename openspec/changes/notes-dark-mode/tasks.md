## 1. CSS Variables for TipTap Elements

- [x] 1.1 Add `--tiptap-blockquote-border`, `--tiptap-blockquote-text`, `--tiptap-code-bg`, `--tiptap-hr-border` CSS variables to `:root` in `app/globals.css` with light-mode values
- [x] 1.2 Add dark-mode overrides for the same variables inside the existing `@media (prefers-color-scheme: dark)` block in `app/globals.css`
- [x] 1.3 Replace 4 hardcoded hex values in `.tiptap` rules with `var()` references: blockquote border (`#d1d5db`), blockquote text (`#6b7280`), inline code bg (`#f3f4f6`), hr border (`#e5e7eb`)

## 2. Dark Page and Editor Container

- [x] 2.1 Update `app/notes/page.tsx` — add `min-h-screen bg-zinc-950 px-4 py-8` to `<main>`, wrap `<Notes />` in a container div with `mx-auto max-w-3xl rounded-lg border border-zinc-800/50 bg-zinc-900`
- [x] 2.2 Update `features/notes/components/Notes.tsx` — add `text-zinc-100` to editor class attribute and adjust min-height/padding to `min-h-[calc(100vh-8rem)] p-6`

## 3. Verification

- [ ] 3.1 Visual check: navigate to `/notes`, confirm dark page background with elevated editor container (manual — Playwright unavailable)
- [ ] 3.2 Visual check: type content, confirm light text on dark surface
- [ ] 3.3 Visual check: create blockquote, inline code, and hr elements — confirm all are visible against dark background
- [ ] 3.4 Visual check: confirm code blocks (`pre`) retain existing dark styling unchanged
- [ ] 3.5 Visual check: confirm NavPill still renders correctly at bottom of page
