# TODO — my-first-web

## 1단계: 설계 파일 및 초기화
- [x] `app/` 기본 레이아웃과 홈 페이지 구현
- [x] `.github/copilot-instructions.md` 작성
- [x] `context.md` 작성
- [x] `todo.md` 작성
- [x] `ARCHITECTURE.md` 작성

## 2단계: UI 시스템
- [x] `npx shadcn@latest init` 실행
- [x] shadcn/ui에서 `button, card, input, dialog` 추가
- [x] `app/globals.css`에 디자인 토큰 설정
- [x] `Button`, `Card`, `Input`, `Dialog` export 정리

## 3단계: 블로그 기능
- [x] 포스트 목록(`/posts`) 구현
- [x] 포스트 상세(`/posts/[id]`) 구현
- [x] 포스트 작성(`/posts/new`) 구현
- [x] 검색, 삭제, 목록 갱신 동기화 구현
- [x] BroadcastChannel + `storage` fallback 구현

## 4단계: 데이터 모델 및 저장소
- [ ] SQL 스키마 초안 작성
- [ ] TypeScript 데이터 타입 정리
- [ ] SQLite vs Postgres 결정
- [ ] Prisma 또는 대체 ORM 선택
- [ ] 마이그레이션/시드 구조 작성

## 5단계: API와 인증
- [ ] CRUD API 정식화
- [ ] 검색 API 추가
- [ ] 인증/권한 설계
- [ ] RLS 또는 권한 검증 추가

### Ch9 (Supabase Auth) 추가 작업
- [x] 회원가입 구현
- [x] 로그인 구현
- [x] 로그아웃 구현
- [x] Header 로그인 상태 분기
- [x] `/posts/new` 보호
- [x] `npm run build` 검증
- [x] Vercel 배포 URL 검증
- [x] `contexts/AuthContext.tsx` 생성 (AuthProvider + useAuth)
- [x] `lib/auth.ts` 생성 (signInWithPassword, signUp, signOut 래퍼)

### Ch10 (게시글 CRUD) 준비 작업
- [ ] 게시글 목록 조회 정리
- [ ] 게시글 상세 조회 정리
- [ ] 게시글 생성 흐름 확인
- [ ] 게시글 수정 UI/경로 설계
- [ ] 게시글 삭제 UI/경로 설계
- [ ] Ch8 스키마 컬럼명 재확인
- [ ] `lib/supabase/client.ts` 재사용 경로 정리
- [ ] `AuthProvider/useAuth`와 CRUD 접근 흐름 연결
- [ ] 수정/삭제는 UX, 보안은 Ch11 RLS로 분리

## 6단계: 마무리
- [ ] 테스트 보강
- [ ] 문서 정리
- [ ] 스크린샷 검증

## 진행률
- 완료 기준: 19/34
- 상태: Ch9 Supabase Auth 완료, Ch10 게시글 CRUD 문서 정비 시작 단계
