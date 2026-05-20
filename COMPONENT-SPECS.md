# Component Specs — PostCard & SearchBar

이 문서는 `PostCard`와 `SearchBar`의 상세 `props`/행동(spec)을 정의합니다. 구현팀은 이 스펙을 기준으로 컴포넌트를 작성하거나 현재 `components/SearchBar.tsx` 구현을 개선하세요.

## 공통 타입

```ts
export type Post = {
  id: string
  title: string
  content: string
  createdAt: string // ISO string
}
```

## PostCard

- 역할: 포스트 요약 정보를 카드 형태로 렌더링. 선택적으로 삭제 버튼을 표출하고 삭제 이벤트를 상위로 전파.
- 렌더링 위치: `PostList` 내에서 반복 사용.

```ts
type PostCardProps = {
  post: Post
  showDelete?: boolean // 기본 false
  onDelete?: (id: string) => void
  className?: string
}
```

행동
- `showDelete=true`이면 화면에 삭제 버튼을 노출.
- 삭제 버튼 클릭 시 `onDelete(post.id)`를 호출 (호출 전 `confirm`은 상위에서 처리 권장).

접근성
- 카드 내 버튼은 `aria-label="Delete post {title}"`를 사용.

사용 예시

```tsx
<PostCard post={p} showDelete onDelete={(id)=>handleDelete(id)} />
```

스타일 가이드
- 카드 배경: `var(--card-bg)`
- 패딩: `p-6`, 반경: `rounded-lg`, 그림자: `shadow-sm`

## SearchBar

- 역할: 포스트 목록의 검색어 입력, 필터링 트리거, 삭제 이벤트 위임(클라이언트에서 confirm 처리 후 호출).
- 설계: 가능한 한 `controlled` API를 제공하되, 간단한 사용을 위한 내부 상태 모드도 지원.

```ts
type SearchBarProps = {
  value?: string // controlled value
  defaultValue?: string // uncontrolled 초기값
  placeholder?: string
  onChange?: (value: string) => void // 입력 변화
  onSearch?: (query: string) => void // 제출(엔터/검색 버튼)
  onDelete?: (id: string) => void // 삭제 요청
  posts?: Post[] // (선택) 즉시 필터링을 내부에서 수행할 때 사용
}
```

동작 패턴
- Controlled: `value`와 `onChange`가 제공되면 컴포넌트는 입력 제어를 위임.
- Uncontrolled: `defaultValue`만 제공되면 내부 상태로 동작.
- 제출(엔터 또는 버튼): `onSearch(query)` 호출.
- 삭제 흐름 권장: `onDelete(id)`는 삭제 확정 후 호출. 컴포넌트는 `confirm()`를 직접 호출해도 무방하나, 보다 유연한 UX를 위해 상위에서 `confirm`을 처리하도록 `onRequestDelete` 이벤트를 제공하는 것도 고려.

접근성
- 검색 입력은 `role="search"`와 `aria-label="Search posts"`를 포함.
- 검색 버튼은 `aria-label="Search"`.

사용 예시 (상태 상위 관리)

```tsx
function PostsPage({ posts }: { posts: Post[] }){
  const [query, setQuery] = useState('')
  const filtered = posts.filter(p => p.title.includes(query) || p.content.includes(query))
  return (
    <>
      <SearchBar value={query} onChange={setQuery} onDelete={(id)=>handleDelete(id)} />
      <PostList posts={filtered} />
    </>
  )
}
```

간단 내부 모드 사용 예시

```tsx
<SearchBar defaultValue="" onSearch={(q)=>setQuery(q)} posts={posts} />
```

테스트 포인트
- 입력 제어(Controlled vs Uncontrolled) 동작 확인
- `onSearch`가 엔터/버튼에서 호출되는지 확인
- 삭제 플로우에서 `onDelete` 호출 전/후 confirm 처리 여부
