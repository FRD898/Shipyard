## ADDED Requirements

### Requirement: Notes page has dark background
The Notes page (`/notes`) SHALL render with a `zinc-950` background that fills the full viewport height.

#### Scenario: Page renders with dark background
- **WHEN** a user navigates to `/notes`
- **THEN** the page background SHALL be `zinc-950` and extend to full viewport height (`min-h-screen`)

### Requirement: Editor renders in a styled container
The TipTap editor SHALL be wrapped in a visually distinct container with an elevated surface color, subtle border, and rounded corners.

#### Scenario: Editor container has visual depth
- **WHEN** the Notes page renders
- **THEN** the editor SHALL be inside a container with `zinc-900` background, `border-zinc-800/50` border, `rounded-lg` corners, and `max-w-3xl` width centered on the page

### Requirement: Editor text is light-colored for dark background
The editor text SHALL use a light color (`zinc-100`) for readability against the dark container surface.

#### Scenario: Text is readable on dark surface
- **WHEN** a user types in the editor
- **THEN** the text SHALL render in `zinc-100` color

### Requirement: Blockquote colors adapt to dark mode
The `.tiptap` blockquote border and text colors SHALL use CSS custom properties that provide dark-appropriate values.

#### Scenario: Blockquote is visible on dark background
- **WHEN** a blockquote element is rendered in the editor
- **THEN** the left border SHALL use `--tiptap-blockquote-border` (dark value: `#4b5563`) and the text SHALL use `--tiptap-blockquote-text` (dark value: `#9ca3af`)

### Requirement: Inline code background adapts to dark mode
The `.tiptap` inline code background SHALL use a CSS custom property that provides a dark-appropriate value.

#### Scenario: Inline code is visible on dark background
- **WHEN** an inline `code` element is rendered in the editor
- **THEN** the background SHALL use `--tiptap-code-bg` (dark value: `#27272a`)

### Requirement: Horizontal rule adapts to dark mode
The `.tiptap` horizontal rule border SHALL use a CSS custom property that provides a dark-appropriate value.

#### Scenario: Horizontal rule is visible on dark background
- **WHEN** an `hr` element is rendered in the editor
- **THEN** the border-top SHALL use `--tiptap-hr-border` (dark value: `#3f3f46`)

### Requirement: Code blocks remain unchanged
The `.tiptap` pre/code block styles (dark background `#1e1e1e`, light text `#d4d4d4`) SHALL NOT be modified as they already work in both light and dark contexts.

#### Scenario: Code block retains existing dark styling
- **WHEN** a code block is rendered in the editor
- **THEN** the background SHALL remain `#1e1e1e` and text SHALL remain `#d4d4d4`
