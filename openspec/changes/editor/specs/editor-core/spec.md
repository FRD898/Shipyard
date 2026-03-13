## ADDED Requirements

### Requirement: TipTap editor renders at /editor route
The system SHALL render a TipTap editor instance at the `/editor` route using `@tiptap/react` with the `useEditor` hook and StarterKit extension. The editor component SHALL live at `src/features/editor/components/Editor.tsx` and be imported by the route at `src/app/editor/page.tsx`.

#### Scenario: Editor mounts on page load
- **WHEN** user navigates to `/editor`
- **THEN** a TipTap editor is rendered with an editable content area

### Requirement: Block-based editing with standard block types
The editor SHALL support the following block types via StarterKit: paragraph, heading (H1, H2, H3), bullet list, ordered list, code block, blockquote, and horizontal rule.

#### Scenario: User types a paragraph
- **WHEN** user types text into the editor
- **THEN** the text is rendered as a paragraph block

#### Scenario: User creates a heading via markdown shortcut
- **WHEN** user types `# ` at the start of a line
- **THEN** the line converts to an H1 heading block

#### Scenario: User creates a bullet list via markdown shortcut
- **WHEN** user types `- ` at the start of a line
- **THEN** the line converts to a bullet list item

#### Scenario: User creates a code block
- **WHEN** user types triple backticks and presses Enter
- **THEN** a code block is inserted

### Requirement: Inline formatting support
The editor SHALL support bold, italic, strikethrough, and inline code as inline marks via StarterKit.

#### Scenario: User bolds text with keyboard shortcut
- **WHEN** user selects text and presses Ctrl/Cmd+B
- **THEN** the selected text is formatted as bold

#### Scenario: User uses markdown shortcut for bold
- **WHEN** user types `**text**`
- **THEN** the text is rendered as bold

### Requirement: Undo and redo
The editor SHALL support undo (Ctrl/Cmd+Z) and redo (Ctrl/Cmd+Shift+Z) via StarterKit's History extension.

#### Scenario: User undoes an action
- **WHEN** user presses Ctrl/Cmd+Z
- **THEN** the last edit is undone

### Requirement: Styled content area
The editor content area SHALL be styled with Tailwind CSS for readable typography, centered layout, and appropriate spacing.

#### Scenario: Editor has readable layout
- **WHEN** the editor loads
- **THEN** the content area has a max-width, is centered, and has clean typography
