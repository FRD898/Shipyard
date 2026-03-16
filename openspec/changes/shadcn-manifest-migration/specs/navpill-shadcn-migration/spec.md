## ADDED Requirements

### Requirement: NavPill uses shadcn Button for navigation items
Each navigation link in the NavPill SHALL use a shadcn `Button` component with ghost variant as the base, with custom styling for active/inactive states.

#### Scenario: Nav items render as shadcn Buttons
- **WHEN** the NavPill renders
- **THEN** each nav item (home, notes, kraken, manifest) SHALL be a shadcn Button wrapping a Next.js Link

### Requirement: NavPill preserves existing visual appearance
The dark semi-transparent background, blur effect, rounded pill shape, and active/inactive state styling SHALL remain visually consistent.

#### Scenario: NavPill looks the same after migration
- **WHEN** a user views any page
- **THEN** the NavPill SHALL appear at the bottom center with `bg-zinc-900/80`, `backdrop-blur-md`, and the same active (white text, zinc-700 bg) and inactive (zinc-400 text) states
