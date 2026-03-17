## Context

Shipyard has three features: Manifest (task board), Kraken (Excalidraw canvas), and Notes (TipTap editor). Only Manifest currently persists state via a `useLocalStorage` hook located at `features/manifest/hooks/useLocalStorage.ts`. Kraken and Notes reset to defaults on every navigation or refresh.

## Goals / Non-Goals

**Goals:**
- Persist Kraken canvas and Notes editor content across navigations and page refreshes using localStorage.
- Reuse the existing `useLocalStorage` hook by promoting it to a shared location.

**Non-Goals:**
- Remote/cloud persistence or sync across devices.
- Versioning, undo history, or conflict resolution for stored data.
- Handling localStorage quota exceeded gracefully beyond silent failure (existing hook behavior).

## Decisions

### 1. Promote `useLocalStorage` to shared `hooks/` directory
**Rationale**: The hook is generic and feature-agnostic. Moving it to `hooks/useLocalStorage.ts` at the project root makes it available to all features without cross-feature imports. The only existing consumer (Manifest's `useTaskReducer`) gets a simple import path update.

**Alternative considered**: Duplicate the hook into each feature folder — rejected because it creates drift and violates DRY.

### 2. Kraken: use `initialData` + `onChange` with debounce
**Rationale**: Excalidraw's `onChange` fires on every pointer move during drawing. Writing to localStorage on every call would be wasteful. A debounced wrapper (300ms) batches rapid changes into a single write. The `initialData` prop cleanly restores state on mount without needing the imperative API.

We store `elements`, a subset of `appState` (only `viewBackgroundColor`), and `files` (for embedded images). Full `appState` contains transient UI state (cursor position, selected tool) that should not be restored.

**Alternative considered**: Using `excalidrawAPI` ref with manual save/load — rejected as more complex with no benefit over the declarative props.

### 3. Notes: use `onUpdate` callback with `editor.getJSON()`
**Rationale**: TipTap's `onUpdate` fires on content changes (not cursor moves), so no debounce is needed. `getJSON()` produces a serializable document structure that round-trips cleanly through `JSON.parse`/`JSON.stringify`. Content is read from localStorage before editor initialization via a state initializer to avoid hydration issues.

**Alternative considered**: Using `getHTML()` — rejected because JSON is more compact, lossless, and avoids HTML parsing on restore.

### 4. localStorage keys
- `kraken-scene` for Excalidraw data
- `notes-content` for TipTap data
- Existing `manifest-tasks` remains unchanged

## Risks / Trade-offs

- **localStorage size limit (~5 MB)**: Excalidraw scenes with many embedded images could exceed this. → The existing hook already silently catches write failures. Users would lose new changes but not crash. Acceptable for a local-first tool.
- **Stale appState fields**: Excalidraw's `appState` shape may change across versions. → We only persist `viewBackgroundColor`, minimizing surface area.
- **No migration path**: If stored data shape changes, old data may fail to load. → The hook falls back to initial value on parse failure, which is safe.
