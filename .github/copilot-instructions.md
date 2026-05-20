-## Tech Stack

- Next.js 16.2.6 (App Router only)
	- 교재 기준(Ch9): Next.js 16.2.1 — 문서/프롬프트는 교재 기준을 따릅니다. 실제 `package.json`이 더 최신일 수 있습니다.
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

## Supabase Auth / Ch9 notes

- 교재 기준 버전: `@supabase/supabase-js` 2.47.12, `@supabase/ssr` 0.5.2. (실제 설치 버전은 `package.json`을 따릅니다.)
- 환경변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Ch8/Ch9 규칙 유지).
- 인증: 이메일/비밀번호만 사용합니다. 소셜 로그인은 추가하지 않습니다.
- 클라이언트에서 인증 호출은 `signInWithPassword` / `signUp` / `signOut` 패턴을 사용합니다. 구버전 `auth.signIn()` 사용 금지.
- 서비스롤(`service_role`) 키는 절대 클라이언트에 두지 마세요.
- 보호 라우트는 `middleware.ts`로 구현합니다 (App Router 기준).
- 대시보드 확인 메뉴는 2026년 5월 기준으로 `Authentication -> Sign In / Providers -> Email`, `Authentication -> URL Configuration`을 안내합니다.

## Ch10 posts CRUD notes

- 게시글 컬럼명은 `posts.id`, `posts.user_id`, `posts.title`, `posts.content`, `posts.created_at`로 고정합니다.
- 프로필 컬럼명은 `profiles.id`, `profiles.username`, `profiles.avatar_url`, `profiles.role`로 고정합니다.
- CRUD는 App Router만 사용하고 `next/router`는 금지합니다.
- 수정/삭제 UI는 UX이며, 실제 보안은 Ch11 RLS에서 처리합니다.
- `lib/supabase/client.ts`와 `contexts/AuthContext.tsx`를 재사용해 브라우저 세션과 사용자 상태를 연결합니다.

## Ch8 CLI / 연결 확인

- 프로젝트 연결 확인은 `supabase projects list`와 `supabase projects api-keys` 기준으로 안내합니다.
- 문서 설명은 Ch7·Ch8 교재 기준을 우선하고, 실제 버전은 `package.json`을 따릅니다.

## Version Policy (간단)

- 교재 기준: Next.js 16.2.1, `@supabase/supabase-js` 2.47.12, `@supabase/ssr` 0.5.2
- 문서는 교재 기준으로 설명합니다. 실제 빌드/런타임 문제는 `package.json` 기준으로 진단하세요.

## Other Notes

- When adding new pages, follow App Router conventions: `app/<route>/page.tsx` or `app/<route>/<id>/page.tsx`.
- Keep components small and focused; prefer composition over monolith components.

