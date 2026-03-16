## 1. shadcn/ui Setup

- [ ] 1.1 Run `npx shadcn@latest init -t next` and configure for dark mode base theme
- [ ] 1.2 Review and merge shadcn CSS variables into `app/globals.css` — preserve existing tiptap variables, set dark values as root defaults
- [ ] 1.3 Add shadcn components: `npx shadcn@latest add dialog button input textarea badge label card`
- [ ] 1.4 Verify `components.json`, `lib/utils.ts`, and `components/ui/*.tsx` files exist and build succeeds

## 2. Migrate TaskModal

- [ ] 2.1 Replace hand-rolled modal backdrop/container with shadcn Dialog, DialogContent, DialogHeader, DialogTitle
- [ ] 2.2 Replace native input/textarea elements with shadcn Input, Textarea, Label
- [ ] 2.3 Replace action buttons (Create/Save, Cancel, Delete) with shadcn Button variants (default, secondary, destructive)
- [ ] 2.4 Preserve type selector buttons, priority selector buttons, date input, delete confirmation logic, and status history display
- [ ] 2.5 Verify modal opens/closes correctly and form creates/edits/deletes tasks

## 3. Migrate FilterBar

- [ ] 3.1 Replace search input with shadcn Input (preserve magnifying glass icon)
- [ ] 3.2 Replace type filter buttons with shadcn Button (ghost variant, active/inactive states using existing TYPE_COLORS)
- [ ] 3.3 Replace priority filter buttons with shadcn Button (ghost variant, preserve colored dot indicators)
- [ ] 3.4 Verify search and filter functionality works correctly

## 4. Migrate TaskCard

- [ ] 4.1 Replace type label with shadcn Badge (apply TYPE_COLORS via className)
- [ ] 4.2 Replace priority dot with shadcn Badge or preserve as custom element
- [ ] 4.3 Ensure drag-and-drop refs still work — compose with shadcn Card or keep outer div for DnD ref
- [ ] 4.4 Verify cards are draggable and visual feedback (opacity/scale on drag) still works

## 5. Migrate Column

- [ ] 5.1 Replace task count display with shadcn Badge
- [ ] 5.2 Replace "+" add button with shadcn Button (ghost variant, small size)
- [ ] 5.3 Ensure drop target refs still work with updated markup
- [ ] 5.4 Verify drag-over visual feedback and drop behavior

## 6. Migrate NavPill

- [ ] 6.1 Replace nav item links with shadcn Button (ghost variant) wrapping Next.js Link
- [ ] 6.2 Preserve dark semi-transparent background, blur, rounded pill shape, and active/inactive states
- [ ] 6.3 Verify navigation works correctly across all routes

## 7. Verification

- [ ] 7.1 Full board test: create task, edit task, delete task, drag between columns
- [ ] 7.2 Filter test: search, type filters, priority filters, combinations
- [ ] 7.3 NavPill test: navigate between all 4 routes, verify active state highlighting
- [ ] 7.4 Visual comparison: board appearance matches pre-migration (dark theme, compact layout, colored badges)
- [ ] 7.5 Build check: `npm run build` succeeds with no errors
