## Why

Shipyard needs a freeform visual canvas for diagramming, sketching, and spatial thinking. Text-based notes cover linear content well, but many workflows — architecture diagrams, wireframes, brainstorming maps — require a spatial, drawable surface. Excalidraw provides a proven, open-source infinite canvas that integrates well with React.

## What Changes

- Add a new "kraken" feature module providing an Excalidraw-based infinite canvas
- Add `/kraken` route to the app for accessing the canvas
- Install `@excalidraw/excalidraw` as a runtime dependency
- Add canvas-specific styling to support the Excalidraw UI

## Capabilities

### New Capabilities
- `kraken-core`: Core canvas integration — rendering the Excalidraw component, configuring drawing tools, and managing canvas state (shapes, text, freehand drawing, connectors)

### Modified Capabilities
<!-- None — this is a new standalone feature with no changes to existing capabilities. -->

## Impact

- **Dependencies**: Adds `@excalidraw/excalidraw` package
- **Routes**: New `/kraken` route under `app/kraken/`
- **Features**: New `features/kraken/` module following the existing feature pattern
- **Styling**: May need global CSS additions for Excalidraw container sizing
