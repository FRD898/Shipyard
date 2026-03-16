## ADDED Requirements

### Requirement: shadcn/ui is initialized with dark mode base
The project SHALL have shadcn/ui configured via `components.json` with dark mode CSS variables set as root defaults in `globals.css`.

#### Scenario: Project has shadcn configuration
- **WHEN** the project is built
- **THEN** a `components.json` file SHALL exist at the project root with correct paths and Tailwind CSS configuration

#### Scenario: Dark theme CSS variables are set
- **WHEN** `globals.css` is loaded
- **THEN** the root CSS variables SHALL use dark values (dark backgrounds, light foregrounds) matching the existing zinc-900/950 aesthetic

### Requirement: cn utility is available
The project SHALL have a `cn()` utility function (combining `clsx` and `tailwind-merge`) available at `lib/utils.ts`.

#### Scenario: cn utility merges classes correctly
- **WHEN** `cn("bg-zinc-900", "bg-zinc-800")` is called
- **THEN** it SHALL return `"bg-zinc-800"` (last conflicting class wins via tailwind-merge)

### Requirement: shadcn components are installed
The project SHALL have the following shadcn/ui components available under `components/ui/`: Dialog, Button, Input, Textarea, Badge, Label, Card.

#### Scenario: Components are importable
- **WHEN** a component imports `@/components/ui/button`
- **THEN** the Button component SHALL be available with variants: default, secondary, destructive, outline, ghost, link
