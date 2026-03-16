## 1. shadcn/ui Setup

- [x] 1.1 Run `npx shadcn@latest init -t next` and configure for dark mode base theme
- [x] 1.2 Review and merge shadcn CSS variables into `app/globals.css` — preserve existing tiptap variables, set dark values as root defaults
- [x] 1.3 Add shadcn components: `npx shadcn@latest add dialog button input textarea badge label card`
- [x] 1.4 Verify `components.json`, `lib/utils.ts`, and `components/ui/*.tsx` files exist and build succeeds

## 2. Migrate TaskModal

- [x] 2.1 Replace hand-rolled modal backdrop/container with shadcn Dialog, DialogContent, DialogHeader, DialogTitle
- [x] 2.2 Replace native input/textarea elements with shadcn Input, Textarea, Label
- [x] 2.3 Replace action buttons (Create/Save, Cancel, Delete) with shadcn Button variants (default, secondary, destructive)
- [x] 2.4 Preserve type selector buttons, priority selector buttons, date input, delete confirmation logic, and status history display
- [x] 2.5 Verify modal opens/closes correctly and form creates/edits/deletes tasks (build passes, manual verification needed)

## 3. Migrate FilterBar

- [x] 3.1 Replace search input with shadcn Input (preserve magnifying glass icon)
- [x] 3.2 Replace type filter buttons with shadcn Button (ghost variant, active/inactive states using existing TYPE_COLORS)
- [x] 3.3 Replace priority filter buttons with shadcn Button (ghost variant, preserve colored dot indicators)
- [x] 3.4 Verify search and filter functionality works correctly (build passes, manual verification needed)

## 4. Migrate TaskCard

- [x] 4.1 Replace type label with shadcn Badge (apply TYPE_COLORS via className)
- [x] 4.2 Replace priority dot with shadcn Badge or preserve as custom element (kept as custom span — Badge would add unnecessary weight for a 2px dot)
- [x] 4.3 Ensure drag-and-drop refs still work — compose with shadcn Card or keep outer div for DnD ref (kept outer div for DnD ref)
- [x] 4.4 Verify cards are draggable and visual feedback (opacity/scale on drag) still works (build passes, manual verification needed)

## 5. Migrate Column

- [x] 5.1 Replace task count display with shadcn Badge
- [x] 5.2 Replace "+" add button with shadcn Button (ghost variant, small size)
- [x] 5.3 Ensure drop target refs still work with updated markup (kept outer div for DnD ref)
- [x] 5.4 Verify drag-over visual feedback and drop behavior (build passes, manual verification needed)

## 6. Migrate NavPill

- [x] 6.1 Replace nav item links with shadcn Button (ghost variant) wrapping Next.js Link via render prop
- [x] 6.2 Preserve dark semi-transparent background, blur, rounded pill shape, and active/inactive states
- [x] 6.3 Verify navigation works correctly across all routes (build passes, manual verification needed)

## 7. Verification

- [ ] 7.1 Full board test: create task, edit task, delete task, drag between columns (manual)
- [ ] 7.2 Filter test: search, type filters, priority filters, combinations (manual)
- [ ] 7.3 NavPill test: navigate between all 4 routes, verify active state highlighting (manual)
- [ ] 7.4 Visual comparison: board appearance matches pre-migration (dark theme, compact layout, colored badges) (manual)
- [x] 7.5 Build check: `npm run build` succeeds with no errors
