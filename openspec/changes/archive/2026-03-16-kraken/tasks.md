## 1. Setup

- [x] 1.1 Install `@excalidraw/excalidraw` package via pnpm
- [x] 1.2 Create feature directory structure: `features/kraken/components/` and `features/kraken/index.ts`

## 2. Core Implementation

- [x] 2.1 Create `features/kraken/components/Kraken.tsx` — client component that dynamically imports and renders Excalidraw with `next/dynamic` (SSR disabled), full-viewport container
- [x] 2.2 Create `features/kraken/index.ts` barrel export re-exporting the Kraken component

## 3. Routing

- [x] 3.1 Create `app/kraken/page.tsx` route that imports and renders the Kraken component from the feature module

## 4. Styling

- [x] 4.1 Add canvas container styles to `app/globals.css` ensuring the Excalidraw canvas fills 100vw × 100vh
