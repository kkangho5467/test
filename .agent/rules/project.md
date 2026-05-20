# Project rules for agents and automation (Ch9-aware)

These rules are used by automated agents and helpers when modifying this repository.

Core constraints:
- Use Next.js App Router only. Do not add `pages/`-router code or `next/router`.
- Documentation and prompts follow the Ch9 Version Policy: Next.js 16.2.1, `@supabase/supabase-js` 2.47.12, `@supabase/ssr` 0.5.2.
- Actual installed dependency versions may be newer; do not overwrite `package.json`. If versions differ, record both **교재 기준** and **현재 설치 기준** in docs.
- Supabase Auth rules:
  - Only email/password authentication is used (no social providers).
  - Use `signInWithPassword`, `signUp`, `signOut` for client flows.
  - Do not place `service_role` keys or other server-only secrets in client code or `.env.local` with `NEXT_PUBLIC_` prefix.
  - Protect pages using `middleware.ts` (App Router middleware).
- For server-side Supabase usage (server actions, middleware), use `@supabase/ssr` helpers where appropriate.

Checklist for agent edits:
- When adding auth docs or code, add a Version Policy note and list the actual `package.json` versions.
- Do not change installed dependency versions; recommend upgrades in a separate note.
- Ask the user before creating or rotating secrets.
