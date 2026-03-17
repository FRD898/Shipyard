## ADDED Requirements

### Requirement: Notes editor content persists across navigations
The system SHALL save the TipTap editor content as JSON to localStorage on every content change, and restore it when the editor initializes.

#### Scenario: Notes persist after page refresh
- **WHEN** a user types content in the Notes editor and refreshes the page
- **THEN** the editor SHALL display the previously typed content

#### Scenario: Notes persist after navigating away and back
- **WHEN** a user types content in the Notes editor, navigates to another page, and returns to Notes
- **THEN** the editor SHALL display the previously typed content

### Requirement: Notes gracefully handles missing or corrupt stored data
The system SHALL fall back to default placeholder content when localStorage contains no saved data or the saved data cannot be parsed.

#### Scenario: First visit with no saved data
- **WHEN** a user visits the Notes page for the first time (no localStorage entry)
- **THEN** the editor SHALL render with default placeholder content

#### Scenario: Corrupt data in localStorage
- **WHEN** the stored notes-content value is invalid JSON or an incompatible shape
- **THEN** the editor SHALL render with default placeholder content without errors
