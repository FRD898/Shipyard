## ADDED Requirements

### Requirement: Kraken canvas state persists across navigations
The system SHALL save the Excalidraw canvas state (elements, view background color, and embedded files) to localStorage whenever the scene changes, using a debounce interval to avoid excessive writes.

#### Scenario: Drawing persists after page refresh
- **WHEN** a user draws on the Kraken canvas and refreshes the page
- **THEN** the canvas SHALL restore all previously drawn elements, embedded files, and the view background color

#### Scenario: Drawing persists after navigating away and back
- **WHEN** a user draws on the Kraken canvas, navigates to another page, and returns to Kraken
- **THEN** the canvas SHALL display the previously drawn content

### Requirement: Kraken gracefully handles missing or corrupt stored data
The system SHALL fall back to an empty canvas when localStorage contains no saved data or the saved data cannot be parsed.

#### Scenario: First visit with no saved data
- **WHEN** a user visits the Kraken page for the first time (no localStorage entry)
- **THEN** the canvas SHALL render as a blank Excalidraw canvas with default settings

#### Scenario: Corrupt data in localStorage
- **WHEN** the stored kraken-scene value is invalid JSON or an incompatible shape
- **THEN** the canvas SHALL render as a blank canvas without errors
