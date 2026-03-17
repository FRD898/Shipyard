## ADDED Requirements

### Requirement: Filter by task type
The board header SHALL include a type filter that allows selecting one or more task types. When active, only tasks matching the selected types SHALL be visible.

#### Scenario: Filter to single type
- **WHEN** the user selects "Bug" in the type filter
- **THEN** only tasks with type "Bug" are shown across all columns

#### Scenario: Filter to multiple types
- **WHEN** the user selects "Bug" and "Impl" in the type filter
- **THEN** only tasks with type "Bug" or "Impl" are shown

#### Scenario: Clear type filter
- **WHEN** the user clears the type filter
- **THEN** all tasks are visible regardless of type

### Requirement: Filter by priority
The board header SHALL include a priority filter that allows selecting one or more priority levels. When active, only tasks matching the selected priorities SHALL be visible.

#### Scenario: Filter to high priority
- **WHEN** the user selects "High" in the priority filter
- **THEN** only tasks with priority "High" are shown across all columns

#### Scenario: Combined type and priority filter
- **WHEN** the user selects type "Impl" and priority "High"
- **THEN** only tasks that are both type "Impl" AND priority "High" are shown

### Requirement: Search by title
The board header SHALL include a search input. Typing in it SHALL filter tasks to those whose title contains the search string (case-insensitive).

#### Scenario: Search matches partial title
- **WHEN** the user types "auth" in the search input
- **THEN** only tasks whose title contains "auth" (case-insensitive) are visible

#### Scenario: Search with no matches
- **WHEN** the user types a string that matches no task titles
- **THEN** all columns appear empty (but remain visible)

#### Scenario: Clear search
- **WHEN** the user clears the search input
- **THEN** all tasks are visible (subject to any active type/priority filters)

### Requirement: Filters combine with AND logic
All active filters (type, priority, search) SHALL combine using AND logic. A task must match all active filters to be visible.

#### Scenario: All filters active
- **WHEN** type filter is "Bug", priority filter is "High", and search is "login"
- **THEN** only tasks that are type "Bug" AND priority "High" AND title contains "login" are shown
