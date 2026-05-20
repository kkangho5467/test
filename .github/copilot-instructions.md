# Copilot Instructions

## Tech Stack
- Next.js 16.2.6
- Tailwind CSS ^4
- App Router only

## Coding Conventions
- Use Server Components by default.
- Use Tailwind CSS only for styling.
- Prefer the App Router architecture for all routes, layouts, and data fetching.

## Known AI Mistakes
- Do not use `next/router`; use `next/navigation` instead.
- Do not use the Pages Router.
- Treat `params` as async and always `await` them before use.
