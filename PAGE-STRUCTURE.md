# Page Structure — 설계 초안

## 목표

- App Router 규칙에 맞춘 명확한 라우트/컴포넌트 분해
- 각 페이지의 책임, 필요한 데이터(읽기/쓰기), 클라이언트/서버 구성 결정

## 라우트 맵 및 책임

- `/` (Server)
  - 컴포넌트: `Hero`, `RecentPosts`(Server) -> 내부에서 `PostCard` 사용
  - 데이터: 최근 3개 포스트(서버에서 조회)
  - 메모: SEO 메타, 오픈그래프 태그

- `/posts` (Server + Client SearchBar)
  - 컴포넌트: `PostList`(Server) -> 각각 `PostCard`; `SearchBar`(Client)
  - 데이터: 전체 포스트 목록(서버에서 제공), 클라이언트는 필터/삭제만 처리
  - 상호작용: 검색, 페이징(향후), 삭제(confirm, 클라이언트에서 호출)

- `/posts/[id]` (Server)
  - 컴포넌트: `PostDetail`(Server)
  - 데이터: 단일 포스트(+ 메타), 관련 포스트 제안(선택)
  - 메모: 서버 렌더링으로 SEO 최적화

- `/posts/new` (Client)
  - 컴포넌트: `NewPostForm`(Client)
  - 데이터: 폼 입력 -> Server Action 또는 API 호출로 저장
  - 상호작용: 유효성 검사, 로컬 프리뷰(선택), 제출 후 리디렉션

- 인증/마이페이지(추후)
  - 경로: `/auth/*`, `/me` 등
  - 클라이언트/서버 경계 명확화 필요

## 페이지별 UI 컴포넌트 목록 (요약)

- 공통: `Header`, `Footer`, `Container`
- 홈: `Hero`, `RecentPosts`, `SubscribeCTA`(선택)
- 포스트 목록: `PostList`, `PostCard`, `SearchBar`, `Pagination`(향후)
- 포스트 상세: `PostDetail`, `AuthorMeta`, `RelatedPosts`
- 새 포스트: `NewPostForm`, `Input`, `Textarea`, `Button`

## 데이터/상태 흐름 규칙

- 서버 책임: 데이터 조회(리스트/개별), SEO 메타 제공
- 클라이언트 책임: 로컬 UI 상태(검색어, 입력 폼, 삭제 확인) 및 사용자 상호작용
- 서버 연동: 저장/갱신/삭제는 Server Action 또는 API 라우트로 추상화

## 파일/폴더 제안 (app/ 기준)

- `app/page.tsx` (홈)
- `app/posts/page.tsx` (목록)
- `app/posts/[id]/page.tsx` (상세)
- `app/posts/new/page.tsx` (작성)
- `components/` — `Header.tsx`, `Footer.tsx`, `PostCard.tsx`, `SearchBar.tsx`, `NewPostForm.tsx`
- `components/ui/` — 디자인 시스템 컴포넌트

## 접근성/반응성/SEO 고려사항

- 모든 인터랙션은 키보드 접근성 보장 (tab order, aria 속성)
- 레이아웃은 모바일 우선, Tailwind의 반응형 유틸 사용
- 각 페이지에 적절한 메타 태그(og:title, description) 삽입

## 단기 착수 항목

1. `PostCard`와 `SearchBar`의 구체 API 확정 및 구현(우선순위 높음)
2. `app/posts/page.tsx`에 `components/ui` 버튼/카드 통합
3. `/posts/new` 폼 서버 저장 흐름 설계
