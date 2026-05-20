# Context — my-first-web 프로젝트 상태

## 현재 상태

- 홈 페이지, 전역 레이아웃, 헤더/푸터: 구현 완료
- 포스트 목록(`/posts`): 구현 완료, 검색/삭제 UI 포함
- 포스트 상세(`/posts/[id]`): 구현 완료
- 포스트 작성(`/posts/new`): 구현 완료, API 전송 및 탭 간 동기화 포함
- shadcn/ui 초기화: 완료
- `ARCHITECTURE.md`: 작성 완료

## 기술 결정 사항

- Next.js 16.2.6 App Router 사용
- Next.js 16.2.6 App Router 사용
	- 교재 기준(Ch9): Next.js 16.2.1 — 문서/예제는 교재 기준을 따릅니다. 실제 설치된 버전: `package.json` 참조 (`next": "16.2.6"`).
- React 19.2.4 + TypeScript + Tailwind CSS 4
- shadcn/ui는 `components/ui/` 경로에 복사해서 사용
- 로컬 데이터 소스는 `lib/posts.ts`
- 실데이터/인증/권한은 Ch8 이후 Supabase 또는 PostgreSQL로 이전 예정
- 데이터 모델은 UUID 기반 `users` / `posts` 중심으로 확장 예정

## Ch9 Supabase Auth 기준 요약

- 교재 기준 패키지: `@supabase/supabase-js` 2.47.12, `@supabase/ssr` 0.5.2
- 환경변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Ch8와 동일)
- 인증 방식: 이메일/비밀번호(`signInWithPassword`)만 사용, 소셜 로그인 사용 안 함
- 클라이언트에 `service_role` 키를 두지 않음
- 보호 라우트는 `middleware.ts`로 구현함

## 현재 설치(실제) 기준

- `package.json`에 명시된 주요 패키지 버전:
	- `next`: 16.2.6
	- `@supabase/supabase-js`: ^2.106.0
	- `@supabase/ssr`: ^0.10.3

문서의 설명과 코드 예제는 교재 기준(위)으로 통일하지만, 빌드나 런타임 문제는 현재 설치된 버전 기준으로 진단해야 합니다.

## 해결된 이슈

- `Button` export 불일치로 인한 빌드 오류 해결
- `SearchBar`의 `hideResults` 참조 오류 해결
- `await`를 non-async 핸들러에서 사용하던 문제 해결
- BroadcastChannel + `storage` fallback 동기화가 동작하도록 수정
- 중복 브로드캐스트/중복 삽입 문제 해결

## 진행 중 이슈 / 다음 결정

- SQL 스키마 또는 Prisma 스키마를 확정해야 함
- Supabase vs SQLite 중 개발 저장소를 결정해야 함
- 인증/권한(RLS) 설계는 Ch8 이후 적용 예정
- 댓글, 태그, 마이페이지는 확장 기능으로 남겨둠

## 참고 파일

- `.github/copilot-instructions.md` — 코딩 규칙
- `ARCHITECTURE.md` — 페이지맵, 컴포넌트 계층, 데이터 모델 설계
- `todo.md` — 작업 체크리스트
