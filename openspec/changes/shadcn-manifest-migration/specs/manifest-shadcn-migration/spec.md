## ADDED Requirements

### Requirement: TaskModal uses shadcn Dialog
The task create/edit modal SHALL use shadcn `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` components as the modal wrapper.

#### Scenario: Modal opens and closes
- **WHEN** the user clicks to create or edit a task
- **THEN** a shadcn Dialog SHALL open with the form content, and clicking outside or pressing Escape SHALL close it

### Requirement: TaskModal form uses shadcn form components
The form fields SHALL use shadcn `Input`, `Textarea`, `Label`, and `Button` components.

#### Scenario: Form renders with shadcn components
- **WHEN** the TaskModal is open
- **THEN** the title field SHALL be a shadcn Input, description SHALL be a shadcn Textarea, all field labels SHALL use shadcn Label, and action buttons SHALL use shadcn Button with appropriate variants (default for save, secondary for cancel, destructive for delete)

### Requirement: FilterBar uses shadcn Input and Button
The search input SHALL use shadcn `Input` and filter toggles SHALL use shadcn `Button` with ghost/outline variants.

#### Scenario: Filter controls render with shadcn components
- **WHEN** the ManifestBoard renders
- **THEN** the search field SHALL be a shadcn Input and type/priority filter buttons SHALL be shadcn Buttons with active/inactive visual states

### Requirement: TaskCard uses shadcn Badge for indicators
The task type label and priority indicator SHALL use shadcn `Badge` components.

#### Scenario: Card displays type and priority badges
- **WHEN** a TaskCard renders
- **THEN** the task type (PRD, TDD, etc.) SHALL display as a shadcn Badge with the corresponding color from `TYPE_COLORS`, and priority SHALL display as a Badge or colored indicator

### Requirement: Column uses shadcn Badge and Button
The column task count SHALL use shadcn `Badge` and the add button SHALL use shadcn `Button`.

#### Scenario: Column header renders with shadcn components
- **WHEN** a Column renders
- **THEN** the task count SHALL be a shadcn Badge and the "+" add button SHALL be a shadcn Button with ghost variant

### Requirement: Drag-and-drop functionality is preserved
All Atlassian Pragmatic DnD behavior SHALL remain unchanged after migration.

#### Scenario: Task can be dragged between columns
- **WHEN** a user drags a TaskCard from one Column to another
- **THEN** the task status SHALL update and the card SHALL move to the target column, exactly as before migration

### Requirement: All existing visual aesthetics are preserved
The dark zinc theme, monospace typography, color-coded badges, and compact layout SHALL remain visually consistent after migration.

#### Scenario: Board looks the same after migration
- **WHEN** a user views the Manifest board
- **THEN** the overall appearance (dark background, zinc colors, compact cards, colored indicators) SHALL be visually consistent with the pre-migration version
