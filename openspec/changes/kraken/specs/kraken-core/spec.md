## ADDED Requirements

### Requirement: Canvas route exists
The application SHALL expose a `/kraken` route that renders the Excalidraw canvas.

#### Scenario: Navigate to canvas
- **WHEN** user navigates to `/kraken`
- **THEN** the Excalidraw canvas is rendered and fills the viewport

### Requirement: Canvas renders with drawing tools
The canvas SHALL render the full Excalidraw interface including drawing tools (selection, shapes, freehand, text, connectors, eraser).

#### Scenario: Default tool palette visible
- **WHEN** the canvas loads
- **THEN** the Excalidraw toolbar is visible with all default drawing tools

#### Scenario: User draws a shape
- **WHEN** user selects a shape tool and draws on the canvas
- **THEN** the shape is rendered on the canvas

### Requirement: Canvas fills viewport
The Excalidraw canvas SHALL fill the full width and height of the viewport.

#### Scenario: Full viewport rendering
- **WHEN** the canvas component mounts
- **THEN** the canvas container occupies 100% viewport width and 100% viewport height

### Requirement: Client-side only rendering
The Excalidraw component SHALL be loaded client-side only using dynamic import with SSR disabled.

#### Scenario: No server-side render errors
- **WHEN** the `/kraken` page is server-rendered
- **THEN** the Excalidraw component is not rendered on the server and loads only in the browser

### Requirement: Feature module structure
The kraken feature SHALL follow the project's feature-module pattern with components under `features/kraken/` and a barrel export at `features/kraken/index.ts`.

#### Scenario: Module structure
- **WHEN** the feature is implemented
- **THEN** `features/kraken/components/Kraken.tsx` contains the canvas component
- **THEN** `features/kraken/index.ts` re-exports the component
- **THEN** `app/kraken/page.tsx` imports from the feature module
