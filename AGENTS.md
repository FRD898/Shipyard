# Agents

## Rules

- Do not add "Co-Authored-By" trailers or any attribution to Claude Code in commit messages.

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/).

Format: `<type>(<scope>): <description>`

### Types

- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation only
- `chore` — Build, deps, config, tooling
- `refactor` — Code change that neither fixes a bug nor adds a feature
- `style` — Formatting, whitespace (not CSS)
- `test` — Adding or updating tests

### Scopes

Use feature names as scopes when applicable: `notes`, `taskboard`, `canvas`.

### Examples

```
feat(notes): add slash command menu
fix(notes): resolve hydration mismatch on mount
docs: update README with project structure
chore: upgrade tiptap dependencies
```

## Project Structure

- `app/` — Next.js routes. Keep these thin; import from `features/`.
- `features/<name>/` — Feature modules. Co-locate components, hooks, utils, and types per feature.
- `openspec/` — OpenSpec change specs.
