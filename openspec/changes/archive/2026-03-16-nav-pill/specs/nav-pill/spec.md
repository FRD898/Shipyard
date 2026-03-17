## ADDED Requirements

### Requirement: Floating pill visible on all routes
The navigation pill SHALL be rendered on every page of the application as a fixed-position element at the bottom-center of the viewport.

#### Scenario: Pill present on home page
- **WHEN** the user navigates to `/`
- **THEN** the floating navigation pill is visible at the bottom-center of the viewport

#### Scenario: Pill present on feature pages
- **WHEN** the user navigates to `/notes`, `/kraken`, or `/manifest`
- **THEN** the floating navigation pill is visible at the bottom-center of the viewport

### Requirement: Four navigation targets
The pill SHALL contain four navigation links: Home (`~`), Notes, Kraken, and Manifest, linking to `/`, `/notes`, `/kraken`, and `/manifest` respectively.

#### Scenario: Navigate between features
- **WHEN** the user clicks "kraken" in the pill while on `/notes`
- **THEN** the app navigates to `/kraken` via client-side routing without a full page reload

#### Scenario: Navigate to home
- **WHEN** the user clicks `~` in the pill
- **THEN** the app navigates to `/`

### Requirement: Active route indicator
The pill SHALL visually highlight the navigation item corresponding to the current route.

#### Scenario: Active state on exact route
- **WHEN** the user is on `/manifest`
- **THEN** the "manifest" item is highlighted and all other items are in their inactive state

#### Scenario: Home active only on exact match
- **WHEN** the user is on `/notes`
- **THEN** only "notes" is highlighted, not `~` (home)

### Requirement: No layout interference
The pill SHALL overlay content using fixed positioning without pushing, rearranging, or reserving space in any feature's layout.

#### Scenario: Does not affect Kraken canvas
- **WHEN** the user is on `/kraken`
- **THEN** the Excalidraw canvas remains `position: fixed; inset: 0` and the pill floats above it

#### Scenario: Does not affect Manifest board
- **WHEN** the user is on `/manifest`
- **THEN** the kanban board's `h-screen` flex layout is unaffected

### Requirement: Does not conflict with Excalidraw controls
The pill SHALL be positioned to avoid overlapping Excalidraw's built-in UI controls (hamburger menu, toolbar, zoom controls, undo/redo, Library button, help icon).

#### Scenario: Clear of bottom-left controls
- **WHEN** the user is on `/kraken`
- **THEN** the pill does not overlap the zoom/undo/redo controls at the bottom-left

#### Scenario: Clear of bottom-right controls
- **WHEN** the user is on `/kraken`
- **THEN** the pill does not overlap the help icon at the bottom-right

### Requirement: Z-index layering
The pill SHALL float above page content and Excalidraw's UI (`z-index: 100`) but SHALL be covered by modal overlays (e.g., Manifest's TaskModal at `z-50` with full-viewport backdrop).

#### Scenario: Pill above Excalidraw footer
- **WHEN** the user is on `/kraken`
- **THEN** the pill is visible above the Excalidraw canvas and its controls

#### Scenario: Modal covers pill
- **WHEN** the user opens a task modal on `/manifest`
- **THEN** the modal's backdrop visually covers the navigation pill

### Requirement: Dark semi-transparent styling
The pill SHALL use a dark semi-transparent background with backdrop blur, monospace font, and a pill (rounded) shape to match the developer-tool aesthetic.

#### Scenario: Visual appearance
- **WHEN** the pill renders
- **THEN** it has a dark semi-transparent background, backdrop blur effect, rounded-full shape, monospace typography, and a subtle border
