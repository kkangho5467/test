## Tech Stack

- Next.js 16.2.6 (App Router only)
- React 19.2.4
- Tailwind CSS 4
- TypeScript

## Key priorities
- App Router is used (follow App Router conventions)
- Tailwind CSS for styling; keep styles local to `app/`
- Use shadcn/ui for UI components when available

## Coding Conventions

- Use App Router and Server Components by default. Add `use client` only when the component requires browser APIs or interactivity (e.g., event handlers, local state, or DOM APIs); avoid adding it otherwise.
- Prefer TypeScript and strong typing for shared modules.
- Use Tailwind CSS for styling; keep styles in `app/` and component files.
- Do not create `pages/` router files or use `next/router`.

## Design Tokens

- Layout: `max-w-4xl mx-auto` for main content and `space-y-6` for vertical rhythm.
- Card & spacing: card padding `p-6`, rounded corners and subtle shadow (rounded-lg, shadow-sm).
- Theme tokens: set primary color and other tokens as CSS variables in `app/globals.css`.

## Component Rules

- Prefer `shadcn/ui` components (components/ui/) for Button, Card, Input, Dialog.
- Place custom components under `components/`.
- Use `Link` from `next/link` for navigation in client components.
- Avoid directly using Tailwind's default color names in component code; use CSS variables when possible.

## Known AI Mistakes / Do Not

- Do not use `next/router` — use `next/navigation` for App Router navigation.
- Do not fetch data on the client when it can be done on the server via Server Components.
- Do not introduce code that depends on global CSS not declared in `app/globals.css`.

## Other Notes

- When adding new pages, follow App Router conventions: `app/<route>/page.tsx` or `app/<route>/<id>/page.tsx`.
- Keep components small and focused; prefer composition over monolith components.

