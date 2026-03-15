## 1. Shared Hook

- [x] 1.1 Move `features/manifest/hooks/useLocalStorage.ts` to `hooks/useLocalStorage.ts`
- [x] 1.2 Update the import in `features/manifest/hooks/useTaskReducer.ts` to point to the new shared location

## 2. Kraken Persistence

- [x] 2.1 Import `useLocalStorage` in `features/kraken/components/Kraken.tsx` and load saved scene data on mount via `initialData` prop
- [x] 2.2 Add a debounced `onChange` handler that saves elements, `viewBackgroundColor`, and files to localStorage under key `kraken-scene`

## 3. Notes Persistence

- [x] 3.1 Import `useLocalStorage` in `features/notes/components/Notes.tsx` and initialize the editor with saved JSON content from localStorage
- [x] 3.2 Add an `onUpdate` callback that saves `editor.getJSON()` to localStorage under key `notes-content`

## 4. Verification

- [x] 4.1 Verify Kraken: draw on canvas, refresh page, confirm content restores; navigate away and back, confirm content restores; clear localStorage, confirm blank canvas loads without errors
- [x] 4.2 Verify Notes: type content, refresh page, confirm content restores; navigate away and back, confirm content restores; clear localStorage, confirm default placeholder loads without errors
