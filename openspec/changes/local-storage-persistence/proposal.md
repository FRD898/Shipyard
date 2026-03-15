## Why

Kraken (Excalidraw canvas) and Notes (TipTap editor) lose all user content on navigation or page refresh. The Manifest feature already persists its task data via a `useLocalStorage` hook, but this hook is scoped inside `features/manifest/`. Promoting it to a shared utility and wiring it into both Kraken and Notes will give users the same persistence experience across all features.

## What Changes

- Move `features/manifest/hooks/useLocalStorage.ts` to a shared `hooks/` directory so any feature can reuse it.
- Update Manifest's import to point to the new shared location.
- Persist Excalidraw scene data (elements, appState subset, files) to localStorage on every change, with debouncing to avoid excessive writes.
- Restore saved Excalidraw scene via the `initialData` prop on mount.
- Persist TipTap editor content (JSON) to localStorage on every update via the `onUpdate` callback.
- Restore saved TipTap content on editor initialization.

## Capabilities

### New Capabilities
- `kraken-persistence`: Save and restore Excalidraw canvas state to/from localStorage.
- `notes-persistence`: Save and restore TipTap editor content to/from localStorage.

### Modified Capabilities

_(none — no existing spec-level requirements are changing)_

## Impact

- **Code**: `features/kraken/components/Kraken.tsx`, `features/notes/components/Notes.tsx`, `features/manifest/hooks/useTaskReducer.ts` (import path update), new shared `hooks/useLocalStorage.ts`.
- **Dependencies**: No new dependencies. Uses existing Excalidraw and TipTap APIs.
- **Storage**: Two new localStorage keys (`kraken-scene`, `notes-content`). Excalidraw scenes with many elements or embedded images (files) could grow large; localStorage has a ~5 MB limit per origin.
