# AGENT.md - Content Tools Desktop App

## Commands
- **Build**: `npm run build`
- **Dev**: `npm run dev`
- **Check/Lint**: `npm run check`
- **Preview**: `npm run preview`
- **Tauri**: `npm run tauri` (for native app commands)

## Tech Stack
- **Framework**: SvelteKit + Tauri (desktop app)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4
- **Icons**: `@lucide/svelte`
- **UI Components**: Custom components in `/src/lib/components/ui/`

## Code Style
- **Imports**: Use `$lib/` alias for library imports, relative paths for local components
- **Icons**: Import from `@lucide/svelte`, use `<Icon class="...">` syntax (not `<svelte:component>`)
- **Components**: Use Svelte 5 syntax with `$props()`, `$bindable()`, `{@render children()}`
- **Styling**: Tailwind classes, prefer utility-first approach
- **Types**: Strict TypeScript, define props interfaces
- **Naming**: kebab-case for files, PascalCase for components

## Project Structure
- **Routes**: `/src/routes/` - each feature gets its own folder
- **Components**: `/src/lib/components/` - reusable UI components
- **Utils**: `/src/lib/utils.ts` - utility functions
- **Layout**: Global layout with sidebar navigation in `+layout.svelte`
