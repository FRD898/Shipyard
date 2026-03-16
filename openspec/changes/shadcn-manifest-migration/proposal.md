## Why

The Manifest feature (and the rest of Shipyard) uses hand-rolled Tailwind components for all UI primitives — buttons, inputs, modals, badges, form controls. This leads to inconsistent styling, duplicated patterns, and more code to maintain. Adding shadcn/ui provides a consistent, accessible component foundation that can be shared across all features. Migrating Manifest first establishes the pattern — it has the richest UI surface (dialog, form, filters, cards, badges) making it the ideal pilot.

## What Changes

- Initialize shadcn/ui in the project (CLI setup, CSS variables, `cn` utility)
- Add shadcn/ui components: Dialog, Button, Input, Textarea, Badge, Label, Card
- Migrate Manifest's TaskModal to use shadcn Dialog, Input, Textarea, Button, Label
- Migrate Manifest's FilterBar to use shadcn Input and Button/Toggle components
- Migrate Manifest's TaskCard to use shadcn Badge for type/priority indicators
- Migrate Manifest's Column to use shadcn Badge for count and Button for add action
- Migrate the NavPill (global navigation) to use shadcn Button/Toggle components for nav items
- Preserve all existing functionality: drag-and-drop, localStorage persistence, dark theme
- Dark mode as the base theme configuration

## Capabilities

### New Capabilities
- `shadcn-setup`: Project-level shadcn/ui initialization with dark mode base theme and component library
- `manifest-shadcn-migration`: Migrating Manifest's hand-rolled UI to shadcn/ui components while preserving behavior
- `navpill-shadcn-migration`: Migrating the global NavPill navigation to shadcn/ui components

### Modified Capabilities
<!-- No spec-level behavior changes — this is a UI implementation refactor only -->

## Impact

- **New dependencies**: `@radix-ui/react-dialog`, `@radix-ui/react-label`, `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css` (installed by shadcn CLI)
- **New files**: `components/ui/*.tsx` (shadcn components), `components.json`, `lib/utils.ts`
- **Modified files**: `app/globals.css` (shadcn CSS variables), all files under `features/manifest/components/`, `components/nav-pill.tsx`
- **Preserved**: Atlassian Pragmatic DnD, `useTaskReducer`, `useLocalStorage`, `theme.ts`, `dates.ts`, `types.ts`
