<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Agent Rules (Ch9 additions)

- When assisting with Ch9 Supabase Auth tasks, follow the **Ch9 Version Policy**: Next.js 16.2.1, `@supabase/supabase-js` 2.47.12, `@supabase/ssr` 0.5.2 for documentation and prompts. Actual `package.json` versions may differ and should be respected at runtime.
- Do not suggest `next/router` or `pages/`-based patterns. Use App Router and `next/navigation` only.
- For Auth: use Supabase email/password flows (`signInWithPassword`, `signUp`, `signOut`) and `middleware.ts` for protected routes. Do not expose `service_role` keys on the client.
- Supabase dashboard guidance should point to `Authentication -> Sign In / Providers -> Email` and `Authentication -> URL Configuration` for 2026년 5월.
- For CLI linkage checks, use `supabase projects list` and `supabase projects api-keys`.
- For Ch10 CRUD docs, keep `posts` and `profiles` column names fixed as provided by the user, reuse `lib/supabase/client.ts`, and treat edit/delete UI as UX only; real security belongs to Ch11 RLS.
