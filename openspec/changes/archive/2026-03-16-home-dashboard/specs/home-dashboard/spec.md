## ADDED Requirements

### Requirement: Dashboard displays due-today section
The home page SHALL display a "Due Today" section containing all non-Done tasks whose `dueDate` is today or in the past (overdue).

#### Scenario: Tasks due today appear
- **WHEN** the user navigates to `/` and there are tasks with `dueDate` equal to today's date and status is not "Done"
- **THEN** those tasks appear in the "Due Today" section

#### Scenario: Overdue tasks appear
- **WHEN** there are tasks with `dueDate` before today and status is not "Done"
- **THEN** those tasks appear in the "Due Today" section with their overdue label (e.g., "2d overdue")

#### Scenario: Done tasks excluded
- **WHEN** a task is due today but has status "Done"
- **THEN** that task does NOT appear in the "Due Today" section

#### Scenario: No due-today tasks
- **WHEN** there are no tasks due today or overdue
- **THEN** the "Due Today" section is not rendered

### Requirement: Dashboard displays blocked section
The home page SHALL display a "Blocked" section containing all tasks with status "Blocked".

#### Scenario: Blocked tasks appear
- **WHEN** there are tasks with status "Blocked"
- **THEN** those tasks appear in the "Blocked" section with a "blocked Xd" label indicating how long they have been blocked

#### Scenario: Blocked duration calculation
- **WHEN** a task has status "Blocked" and its `statusHistory` contains an entry with `to: "Blocked"`
- **THEN** the blocked duration is calculated from the timestamp of the most recent `to: "Blocked"` entry to today

#### Scenario: No blocked tasks
- **WHEN** there are no tasks with status "Blocked"
- **THEN** the "Blocked" section is not rendered

### Requirement: Due-today sorting order
Tasks in the "Due Today" section SHALL be sorted by: (1) overdue tasks first, ordered by most overdue, then due-today tasks; (2) within each group, sorted by priority High → Medium → Low.

#### Scenario: Overdue before due-today
- **WHEN** the section contains a task 3 days overdue (High priority) and a task due today (High priority)
- **THEN** the overdue task appears before the due-today task

#### Scenario: Priority sorting within overdue
- **WHEN** the section contains two overdue tasks — one High priority, one Low priority
- **THEN** the High priority task appears before the Low priority task

#### Scenario: Priority sorting within due-today
- **WHEN** the section contains two tasks due today — one Medium priority, one High priority
- **THEN** the High priority task appears before the Medium priority task

### Requirement: Blocked sorting order
Tasks in the "Blocked" section SHALL be sorted by: (1) priority High → Medium → Low; (2) within the same priority, by blocked duration longest first.

#### Scenario: Priority sorting for blocked tasks
- **WHEN** the section contains a High priority task blocked 1 day and a Low priority task blocked 5 days
- **THEN** the High priority task appears first

#### Scenario: Duration tie-breaker
- **WHEN** the section contains two High priority blocked tasks — one blocked 5 days and one blocked 2 days
- **THEN** the task blocked 5 days appears first

### Requirement: Task cards display type, priority, title, and contextual label
Each task card on the home page SHALL display: a colored type badge (matching Manifest's type colors), a priority dot (matching Manifest's priority colors), the task title, and a contextual label.

#### Scenario: Due-today card labels
- **WHEN** a task card appears in the "Due Today" section
- **THEN** it displays the task's current status as a label (e.g., "In Progress", "Queued") and the due date label (e.g., "due today", "2d overdue")

#### Scenario: Blocked card labels
- **WHEN** a task card appears in the "Blocked" section
- **THEN** it displays "blocked Xd" where X is the number of days since the task entered Blocked status

### Requirement: Task card click navigates to Manifest
Clicking a task card on the home page SHALL navigate the user to `/manifest`.

#### Scenario: Click navigates
- **WHEN** the user clicks on any task card on the home page
- **THEN** the browser navigates to `/manifest`

### Requirement: Empty state when no urgent tasks
When both sections are empty (no due-today/overdue tasks and no blocked tasks), the home page SHALL display an empty state message.

#### Scenario: All clear
- **WHEN** there are no tasks due today, no overdue tasks, and no blocked tasks
- **THEN** the home page displays a calm message such as "Nothing urgent. Smooth sailing."

### Requirement: Header with date
The home page SHALL display a header with the app name and today's formatted date (e.g., "Mon, Mar 16").

#### Scenario: Date display
- **WHEN** the user visits the home page on Monday, March 16
- **THEN** the header displays "Mon, Mar 16"

### Requirement: Section headers with task count
Each section SHALL display a header with the section name and the count of tasks in that section.

#### Scenario: Count badge
- **WHEN** the "Due Today" section contains 3 tasks
- **THEN** the section header displays "DUE TODAY" and "3"

### Requirement: App metadata reflects Shipyard branding
The root layout metadata SHALL be updated to use "Shipyard" as the app title and an appropriate description, replacing the default "Create Next App" boilerplate.

#### Scenario: Browser tab title
- **WHEN** the user opens any page in the app
- **THEN** the browser tab displays "Shipyard" (not "Create Next App")

#### Scenario: Meta description
- **WHEN** search engines or link previews read the page metadata
- **THEN** the description reflects Shipyard's purpose

### Requirement: Dark theme consistent with app
The home page SHALL use the same dark theme (zinc backgrounds, monospace font, zinc text colors) as the rest of the Shipyard app.

#### Scenario: Theme consistency
- **WHEN** the home page renders
- **THEN** it uses dark backgrounds, monospace typography, and zinc color palette consistent with the Manifest board
