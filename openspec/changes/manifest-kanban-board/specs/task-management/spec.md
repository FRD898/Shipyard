## ADDED Requirements

### Requirement: Task data model
Each task SHALL have: id (UUID), title (string, required), description (string, optional), type (one of: PRD, TDD, Impl, Review, Bug, Docs), priority (one of: Low, Medium, High), status (one of: Backlog, Queued, In Progress, Blocked, In Review, Done), dueDate (ISO date string, optional), createdAt (ISO timestamp), and statusHistory (array of {from, to, timestamp} entries).

#### Scenario: New task has required fields
- **WHEN** a task is created with title "Design API" type "TDD" and priority "High"
- **THEN** the task is assigned a UUID, createdAt is set to current time, status defaults to "Backlog", and statusHistory is initialized empty

### Requirement: Create task via add button
Each column SHALL have an add button. Clicking it SHALL open a creation form that allows setting title, description, type, priority, and due date. The task is created in the column where the button was clicked.

#### Scenario: Create task in specific column
- **WHEN** the user clicks the add button on the "Queued" column and fills in title "Write tests", type "Impl", priority "Medium"
- **THEN** a new task appears in the "Queued" column with the specified fields

#### Scenario: Title is required
- **WHEN** the user tries to create a task without a title
- **THEN** the form SHALL prevent submission and indicate that title is required

### Requirement: Edit task via modal
Clicking a task card SHALL open a modal displaying all task fields in an editable form, plus the full status history timeline.

#### Scenario: Open edit modal
- **WHEN** the user clicks on a task card
- **THEN** a modal opens showing the task's title, description, type, priority, due date, and a chronological status history timeline

#### Scenario: Save edits
- **WHEN** the user modifies fields in the edit modal and saves
- **THEN** the task is updated and the card reflects the changes

#### Scenario: Status history timeline
- **WHEN** a task has been moved through multiple columns
- **THEN** the edit modal displays each transition with from-status, to-status, and formatted timestamp

### Requirement: Delete task
The edit modal SHALL include a delete action to permanently remove a task.

#### Scenario: Delete from modal
- **WHEN** the user clicks delete in the edit modal and confirms
- **THEN** the task is removed from the board and localStorage

### Requirement: Task type badges
Each task card SHALL display a colored badge indicating its type: PRD (PRD Analysis), TDD (Tech Design), Impl (Implementation), Review (Code Review), Bug (Bug Fix), Docs (Documentation).

#### Scenario: Badge renders on card
- **WHEN** a task of type "Bug" is displayed
- **THEN** the card shows a "Bug" badge with the designated color for bug-type tasks

### Requirement: Priority indicator
Each task card SHALL display a colored dot indicating priority: Low (gray), Medium (yellow), High (red).

#### Scenario: Priority dot renders
- **WHEN** a task with priority "High" is displayed
- **THEN** the card shows a red priority dot

### Requirement: Smart due date labels
Task cards with a due date SHALL display a contextual label: "due today", "due tomorrow", "due in Xd", "Xd overdue". Overdue tasks SHALL have the due date highlighted in red.

#### Scenario: Future due date
- **WHEN** a task is due in 3 days
- **THEN** the card displays "due in 3d"

#### Scenario: Overdue task
- **WHEN** a task's due date is 2 days in the past
- **THEN** the card displays "2d overdue" with the label highlighted in red

#### Scenario: Due today
- **WHEN** a task is due today
- **THEN** the card displays "due today"

### Requirement: Status history tracking
Every time a task's status changes, the system SHALL append an entry to the task's statusHistory array with the previous status, new status, and current timestamp.

#### Scenario: History entry on column move
- **WHEN** a task is moved from "In Progress" to "In Review"
- **THEN** a new entry `{from: "In Progress", to: "In Review", timestamp: <now>}` is appended to the task's statusHistory
