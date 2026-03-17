## Why

Shipyard has three features (Notes, Kraken, Manifest) at separate routes with zero navigation between them — users must manually edit the URL to switch. A lightweight, always-available navigation element is needed that works across all three features despite their incompatible viewport strategies.

## What Changes

- Add a **floating navigation pill** component rendered globally from the root layout
- Fixed-position dock at bottom-center of the viewport with four targets: Home (~), Notes, Kraken, Manifest
- Dark semi-transparent pill with backdrop blur, monospace font, active route indicator
- Overlays content without pushing or rearranging any feature's layout

## Capabilities

### New Capabilities
- `nav-pill`: Global floating navigation dock that persists across all routes, providing instant feature switching via client-side navigation

### Modified Capabilities
<!-- No existing capabilities are modified -->

## Impact

- **New file**: `components/nav-pill.tsx` — shared client component
- **Modified file**: `app/layout.tsx` — renders NavPill in root layout
- **No new dependencies**
- **No breaking changes** to existing features
