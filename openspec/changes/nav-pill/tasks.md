## 1. Component Setup

- [x] 1.1 Create `components/nav-pill.tsx` as a client component with nav items array (href, label) for Home (~), Notes, Kraken, Manifest
- [x] 1.2 Implement active route detection using `usePathname()` with exact match for `/` and prefix match for feature routes

## 2. Styling & Layout

- [x] 2.1 Apply fixed bottom-center positioning with `z-[200]`, dark semi-transparent background, backdrop blur, rounded-full pill shape, and monospace font
- [x] 2.2 Style nav items with active state (highlighted background + white text) and inactive state (muted text + hover effect)
- [x] 2.3 Add pointer cursor on hover for all nav items

## 3. Integration

- [x] 3.1 Import and render `NavPill` in `app/layout.tsx` after `{children}` inside `<body>`
