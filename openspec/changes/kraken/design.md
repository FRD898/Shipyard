## Context

Shipyard currently has a "notes" feature using TipTap for rich text editing. The project follows a feature-module pattern (`features/<name>/`) with thin App Router wrappers (`app/<name>/page.tsx`). All feature components are client-rendered React components.

Excalidraw is a well-established open-source drawing tool with a React component library (`@excalidraw/excalidraw`). It provides an infinite canvas with built-in tools for shapes, text, freehand drawing, connectors, and more.

## Goals / Non-Goals

**Goals:**
- Integrate Excalidraw as a client-rendered canvas at `/kraken`
- Follow the existing feature-module pattern established by "notes"
- Provide a fully functional drawing canvas out of the box (shapes, text, freehand, connectors)
- Manage canvas state locally in the component

**Non-Goals:**
- Real-time collaboration or multi-user editing
- Server-side persistence or database storage (local state only for now)
- Custom Excalidraw plugins or tool extensions
- Export/import functionality (beyond what Excalidraw provides by default)

## Decisions

### 1. Use `@excalidraw/excalidraw` React component
**Decision**: Use the official Excalidraw React package rather than building a custom canvas.
**Rationale**: Excalidraw provides a mature, feature-rich drawing experience. Building from scratch would take significantly longer and produce an inferior result.
**Alternatives**: Fabric.js (lower-level, more work), tldraw (good but different API surface), raw Canvas API (too low-level).

### 2. Dynamic import with `next/dynamic` and SSR disabled
**Decision**: Load the Excalidraw component via `next/dynamic` with `{ ssr: false }`.
**Rationale**: Excalidraw relies heavily on browser APIs (DOM, Canvas, pointer events) and cannot render server-side. Dynamic import avoids SSR errors and keeps the initial page load lean.

### 3. Feature module structure mirroring "notes"
**Decision**: Place all kraken code under `features/kraken/` with a barrel export at `features/kraken/index.ts`.
**Rationale**: Consistency with the established project pattern. Makes the feature easy to find and maintains a clean separation of concerns.

### 4. Full-viewport canvas layout
**Decision**: The Excalidraw canvas will fill the full viewport height and width.
**Rationale**: Drawing tools work best with maximum screen real estate. Unlike text editors, canvases benefit from an immersive, full-screen experience.

## Risks / Trade-offs

- **Bundle size** → Excalidraw is a large package (~500KB+ gzipped). Mitigated by dynamic import so it only loads on the `/kraken` route.
- **SSR incompatibility** → Excalidraw cannot render on the server. Mitigated by `next/dynamic` with `ssr: false`.
- **No persistence** → Canvas state is lost on page refresh. Acceptable for MVP; persistence can be added later via localStorage or a backend.
