## ADDED Requirements

### Requirement: Board displays six status columns
The board SHALL render six columns in fixed order: Backlog, Queued, In Progress, Blocked, In Review, Done. Each column SHALL display a header with the status name and a distinct accent color.

#### Scenario: All columns visible on load
- **WHEN** the user navigates to `/manifest`
- **THEN** all six columns are visible in a horizontal scrollable layout with their respective headers and accent colors

#### Scenario: Column shows task count
- **WHEN** a column contains tasks
- **THEN** the column header SHALL display the number of tasks in that column

### Requirement: Drag and drop cards between columns
The board SHALL support drag-and-drop of task cards between columns using `@atlaskit/pragmatic-drag-and-drop`. Moving a card to a different column SHALL update its status.

#### Scenario: Move card to a new column
- **WHEN** the user drags a task card from "Backlog" and drops it on the "In Progress" column
- **THEN** the card moves to "In Progress", the task's status is updated, and a status history entry is recorded with the current timestamp

#### Scenario: Visual drag feedback
- **WHEN** the user begins dragging a card
- **THEN** the card SHALL show a drag preview and valid drop targets SHALL be visually indicated

#### Scenario: Drop on same column
- **WHEN** the user drags a card and drops it back on the same column
- **THEN** no status change occurs and no history entry is added

### Requirement: Dark theme with monospace design
The board SHALL use a dark theme with monospace font, minimal spacing, and dense card layout. Column headers SHALL each have a unique accent color.

#### Scenario: Visual theme applied
- **WHEN** the board renders
- **THEN** the background is dark, text uses a monospace font, and each column header has its designated accent color

### Requirement: Persistent board state
The board SHALL persist all tasks and their state to localStorage. On page load, the board SHALL restore the previous state.

#### Scenario: State survives page reload
- **WHEN** the user creates tasks, moves them between columns, and reloads the page
- **THEN** all tasks appear in their last-known columns with full history intact

#### Scenario: Empty board on first visit
- **WHEN** the user visits `/manifest` for the first time (no localStorage data)
- **THEN** the board renders with six empty columns
